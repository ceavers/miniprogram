// finance/pages/bus_transfer_inquiry/bus_transfer_inquiry.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate:'2019-07-16',
    endDate:'2019-07-22',
    items1: [],  //第一个点击请选择的弹框的内容
    items2:[],
    items3:[],
    shadow: false,  //是否显示点击请选择的弹框
    isClearContent:false,   //是否清空了查询内容
    rolloutContent:'请选择',
    rollinContent:'请选择',
    personContent: '请选择',
    selectModal:'', //选择的弹框是三个之中的哪一个
    staffList: [],  
    operator_id:'',  //操作人id
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

  clearContent(){
    //清空查询的内容
    this.setData({
      startDate:'',
      endDate:'',
      personContent:'',
      rolloutContent:'',
      rollinContent:''
    });
  },


  //下面三个点击请选择的弹框
  showRolloutModal(){

    this.setData({
      selectModal: 1,
    });
    if (this.data.items1.length) {
      //如果不是第一次点开,要保留之前的选择的内容
      this.setData({
        shadow: true,
        items1: this.data.items1,
      
      });

      
    }else{
      this.setData({
        shadow: true,
       
        items1: [
          { value: '请选择', checked: true },
          { value: '现金账户', checked: false },
          { value: '银行卡1', checked: false }
        ]

      });
    }

    
  },

  showRollinModal(){
    this.setData({
      selectModal: 2,
    });
    if (this.data.items2.length) {
      //如果不是第一次点开,要保留之前的选择的内容
      this.setData({
        shadow: true,
        items2: this.data.items2,
        
      });
    }
    else{
      this.setData({
        shadow: true,
       
        items2: [
          { value: '请选择', checked: true },
          { value: '现金账户', checked: false },
          { value: '银行卡6', checked: false },
          { value: '银行卡2', checked: false }
        ]
      });

    }
    
  },

  showPersonModal(){
    this.setData({
      selectModal: 3,
    });
    if (this.data.items3.length) {
      //如果不是第一次点开,要保留之前的选择的内容
      this.setData({
        shadow: true,
        items3: this.data.items3,
      
      });
    }else{
      this.data.items3.push({value:'请选择',checked:true,user_id:'none'});
      this.data.staffList.forEach(item => {
        this.data.items3.push({ value: item.user_name, checked: false, user_id: item.user_id });
      });
      this.setData({
        shadow: true,        
        items3: this.data.items3
      });
    }
    
    
  },

  getId(e){
    //点击操作人获取id
    this.setData({
      operator_id:e.detail
    });
  },

  choiceContent(e){
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
        rolloutContent: e.detail
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
        rollinContent: e.detail
      });
    }
    else if (this.data.selectModal == 3) {
      for (var i in this.data.items3) {
        if (this.data.items3[i].value == e.detail) {
          this.data.items3[i].checked = true;
        }
        else {
          this.data.items3[i].checked = false;
        }

      }
      this.setData({
        shadow: false,
        items3: this.data.items3,
        personContent: e.detail
      });
    }
  
  },

  closeAccModal(){
    this.setData({
      shadow: false
    });
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

  queryTransferInquiry() {
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

    if (this.data.rolloutContent != '请选择') {
      data['out_account_id'] = 7248;
      searchData['转出账户'] = this.data.rolloutContent;
    }

    if (this.data.rollinContent != '请选择') {
      data['in_account_id'] = 7078;
      searchData['转入账户'] = this.data.rollinContent;
    }

    if (this.data.personContent != '请选择') {
      //操作人的名称
      data['operator_id'] = this.data.operator_id;
      searchData['操作人'] = this.data.personContent;
    }

      var searchDataArr = [];
      for (var item in searchData) {

        searchDataArr.push(item + '：' + searchData[item]);

      }
    
    console.log(66666666666677);
    console.log(data);
    //var searchData = JSON.stringify(searchData);

    //转账查询
    api.finance2.getTransfer(data)
      .then(res => {
        
        console.log(res);
        if (res.code === 1) {
          // wx.navigateTo({
          //   url: `/finance/pages/bus_loan_list/bus_loan_list?searchData=${searchData}&isSearch=${true}`,
          // })
          
          let pages = getCurrentPages();
          let prevpage = pages[ pages.length -2];
          prevpage.setData({
            searchData: searchDataArr,
            isSearch:true,
            transferList: res.datas.transfers
          });
          wx.navigateBack({
            delta:1
          })
        }
      })
  },

  clearContent() {
    //清空查询的内容
    this.setData({
      isClearContent: true,
      startDate: '请选择',
      endDate: '请选择',
      personContent: '请选择',
      rolloutContent: '请选择',
      rollinContent: '请选择',
      items1: [],
      items2: [],
      items3: [],  
      
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取员工列表
    api.finance2.getStaff()
      .then(res => {
        
        console.log(res);
        
        this.setData({
          staffList:res.datas.users
        })
      })
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