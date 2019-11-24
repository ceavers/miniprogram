// finance/pages/bus_loan_query/bus_loan_query.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate:'2019-07-16',  //开始日期
    endDate:'2019-07-18',
    items1:[],
    items2:[],
    shadow:false,
    incomeContent: '请选择',
    accountContent: '请选择',
    isSearch:false,
    selectModal: '', //选择的弹框是2个之中的哪一个
    loanner_name:'',  //借贷人名称
    turnal_sn:'',  //流水单号
    isClearContent:false,  //是否清空了查询内容
    showPicker2:false,
    showPicker:false,
  },

  setTime(e) {

    let month = parseInt(e.detail.month) >= 10 ? e.detail.month : '0' + e.detail.month;
    let day = parseInt(e.detail.day) >= 10 ? e.detail.day : '0' + e.detail.day;
    let startTime = e.detail.year + '-' + month + '-' + day
    this.setData({
      startDate: startTime
    })
  },

  setTime2(e) {
    let month = parseInt(e.detail.month) >= 10 ? e.detail.month : '0' + e.detail.month;
    let day = parseInt(e.detail.day) >= 10 ? e.detail.day : '0' + e.detail.day;
    let endTime = e.detail.year + '-' + month + '-' + day
    this.setData({
      endDate: endTime
    })
  },

  cancel() {
    this.setData({
      showPicker: false
    })
  },

  cancel2() {
    this.setData({
      showPicker2: false
    })
  },
  showPicker() {
    //显示开始日期弹框
    this.setData({
      showPicker: true
    })
  },

  showPicker2() {
    //显示结束日期弹框
    this.setData({
      showPicker2: true
    })

  },

  loannerName(e){
    this.setData({
      loanner_name:e.detail.value
    });
  },
  turnalSn(e){
    this.setData({
      turnal_sn: e.detail.value
    })
  },

  clearContent() {
    //清空查询的内容
    this.setData({
      isClearContent: true,
      startDate: '请选择',
      endDate: '请选择',
      incomeContent: '请选择',
      accountContent: '请选择',

      items1: [],
      items2: [],
      loanner_name: '',
      turnal_sn: '',
    });
  },

  queryTransferInquiry(){
    //查询借入借出

    var data = {};
    var searchData = {};

    if (this.data.startDate != '请选择') {
      searchData['开始日期'] = this.data.startDate;
      data['start_time'] = this.data.startDate;
    }

    if (this.data.endDate != '请选择') {
      searchData['结束日期'] = this.data.endDate;
      data['end_time'] = this.data.endDate;
    }

    if (this.data.incomeContent != '请选择'){
      data['loan_type'] = this.data.incomeContent == '借入' ? 0 : 1;
      searchData['借入借出'] = this.data.incomeContent;
    }

    if (this.data.accountContent != '请选择'){
      data['account_id'] = 8538;
      searchData['账户'] = this.data.accountContent;
    }

    if (this.data.loanner_name.trim().length){
      //如果输入了借贷人的名称
      data['loanner_name'] = this.data.loanner_name;
      searchData['借贷人'] = this.data.loanner_name;
    }
    if (this.data.turnal_sn.trim().length){
      data['journal_id'] = this.data.turnal_sn;
      searchData['流水号'] = this.data.turnal_sn;
    }
    //var searchData = JSON.stringify(searchData);

      var searchDataArr = [];
      for (var item in searchData) {

        searchDataArr.push(item + '：' + searchData[item]);

      }
      
    api.finance2.getLoan(data)
      .then(res => {
        
        console.log(res);
        if(res.code === 1){
          // wx.navigateTo({
          //   url: `/finance/pages/bus_loan_list/bus_loan_list?data=${data}&searchData=${searchData}&isSearch=${true}`,
          // })
          //返回上个页面并且把参数传递过去
          let pages = getCurrentPages();
          let prevpage = pages[pages.length -2];
          prevpage.setData({
            searchData: searchDataArr,
            isSearch:true,
            loanList: res.datas.loans
          });
          wx.navigateBack({
            delta:1
          })
        }
      })
  },

  //两个弹框之间
  showIncomeModal() {
    
    this.setData({
      selectModal: 1,
    });
    if (this.data.items1.length) {
      //如果不是第一次点开,要保留之前的选择的内容
      this.setData({
        shadow: true,
        items1: this.data.items1,
        

      });

    } else {
      this.setData({
        shadow: true,

        items1: [
          { value: '请选择', checked: true },
          { value: '借入', checked: false },
          { value: '借出', checked: false }
        ]

      });
    }


  },

  closeModal(){
    this.setData({
      shadow:false
    })
  },

  showAccountModal(){
    this.setData({
      selectModal: 2,
    });
    if (this.data.items2.length) {
      //如果不是第一次点开,要保留之前的选择的内容
      this.setData({
        shadow: true,
        items2: this.data.items2,

      });
    } else {
      this.setData({
        shadow: true,

        items2: [
          { value: '请选择', checked: true },
          { value: '现金账户', checked: false },
          
        ]

      });
    }
  },

  choiceContent(e) {
    //选择相应的内容
    //根据选择的哪个弹框来改变相应弹框的值

    if (this.data.selectModal == 1) {
      for (var i in this.data.items1) {
        if (this.data.items1[i].value == e.detail) {
          this.data.items1[i].checked = true;
        }
        else {
          this.data.items1[i].checked = false;
        }

      }
      this.setData({
        shadow: false,
        items1: this.data.items1,
        incomeContent: e.detail
      });
    }
    else if (this.data.selectModal == 2) {
      for (var i in this.data.items2) {
        if (this.data.items2[i].value == e.detail) {
          this.data.items2[i].checked = true;
        }
        else {
          this.data.items2[i].checked = false;
        }

      }
      this.setData({
        shadow: false,
        items2: this.data.items2,
        accountContent: e.detail
      });
    }
    

  },

  //修改日期
  changeStartDate(event) {
    this.setData({
      startDate: event.detail.value
    });
  },

  changeEndDate(event) {
    this.setData({
      endDate: event.detail.value
    });
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})