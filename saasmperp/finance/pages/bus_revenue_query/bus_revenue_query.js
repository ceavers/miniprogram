// finance/pages/bus_revenue_query/bus_revenue_query.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate:'2019-03-04',
    endDate:'2019-05-06',
    items1: [],  //第一个点击请选择的弹框的内容
    items2: [],
    items3: [],
    shadow: false,  //是否显示点击请选择的弹框
    personContent: '请选择',
    rolloutContent: '请选择',
    rollinContent: '请选择',
    
    selectModal: '', //选择的弹框是三个之中的哪一个
    inoutList:[],  //查询出来的收支列表
    isClearContent:false,  //是否清空了内容
    showPicker:false,
    showPicker2:false
  },

  setTime(e){
    
    let month = parseInt(e.detail.month) >= 10 ? e.detail.month : '0'+e.detail.month;
    let day = parseInt(e.detail.day) >= 10 ? e.detail.day : '0' + e.detail.day;
    let startTime = e.detail.year + '-' + month + '-' + day
    this.setData({
      startDate: startTime
    })
  },

  setTime2(e){
    let month = parseInt(e.detail.month) >= 10 ? e.detail.month : '0' + e.detail.month;
    let day = parseInt(e.detail.day) >= 10 ? e.detail.day : '0' + e.detail.day;
    let endTime = e.detail.year + '-' + month + '-' + day
    this.setData({
      endDate: endTime
    })
  },

  cancel(){
    this.setData({
      showPicker: false
    })
  },

  cancel2(){
    this.setData({
      showPicker2: false
    })
  },
  showPicker(){
    //显示开始日期弹框
    this.setData({
      showPicker:true
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
      isClearContent:true,
      startDate:'请选择',
      endDate:'请选择',
      personContent:'请选择',
      rolloutContent:'请选择',
      rollinContent:'请选择',
      items1:[],
      items2:[],
      items3:[]
    });
  },

  queryRevenue(){
    var data = {};
    

    if (this.data.startDate != '请选择') {
      data['start_time'] = this.data.startDate;
    }

    if (this.data.endDate != '请选择') {
      data['end_time'] = this.data.endDate;
    }

    if(this.data.rolloutContent != '请选择'){
      data['inout_type'] = this.data.rolloutContent == '收入' ? 0 : 1;
    }

    if(this.data.rollinContent != '请选择'){
      data['account_id'] = 8538;
    }


    //取出对应的经手人的id

    if (this.data.personContent != '请选择'){
      this.data.items3.forEach(item => {
        if (item.value == this.data.personContent){
          data['operator_id'] = item.operator_id; 
        }
      });
      
    }
    console.log(data);
    
    //查询收支记账
    api.finance2.getRevenue(data)
      .then(res => {
        console.log(res);
        
        //var inoutList = JSON.stringify(res.datas.inouts);
        var searchData2 = {};
        if (this.data.startDate != '请选择') {
          searchData2['开始日期'] = this.data.startDate;
        }

        if (this.data.endDate != '请选择') {
          searchData2['结束日期'] = this.data.endDate;
        }

        if (this.data.rolloutContent != '请选择') {
          searchData2['收入支出'] = this.data.rolloutContent;
        }

        if (this.data.rollinContent != '请选择') {
          searchData2['账户'] = this.data.rollinContent;
        }
        if (this.data.personContent != '请选择') {
          searchData2['经手人'] = this.data.personContent;
        }
        
        var searchDataArr = [];

        for (var item in searchData2) {
          searchDataArr.push(item + '：' + searchData2[item]);
         }

        let pages = getCurrentPages();
        let prevpage = pages[ pages.length - 2];
        prevpage.setData({
          searchData: searchDataArr,
          isSearch:true,
          inoutList: res.datas.inouts
        });

        wx.navigateBack({
          delta:1
        })
      })
    
  },

  closeAccModal(){
    //关闭请选择弹框
    this.setData({
      shadow:false
    });
  },

  //下面三个点击请选择的弹框
  showRolloutModal() {
      //收入支出
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
          { value: '收入', checked: false },
          { value: '支出', checked: false }
        ]

      });
    }


  },

  showRollinModal() {
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
    else {
      this.setData({
        shadow: true,

        items2: [
          { value: '请选择', checked: true },
          { value: '现金账户', checked: false }        
        ]
      });

    }

  },

  showPersonModal() {
    this.setData({
      selectModal: 3,
    });
    if (this.data.items3.length) {
      //如果不是第一次点开,要保留之前的选择的内容
      this.setData({
        shadow: true,
        items3: this.data.items3,

      });
    } else {
      //查询员工列表
      api.finance2.getStaff()
        .then(res => {
          console.log(res);
          if (res.code === 1) {
            this.data.items3.push({ value: '请选择', checked: true })
            res.datas.users.forEach((i,j) => {
              this.data.items3.push({ value: i.user_name, checked: false, operator_id: i.user_id})
            });
            this.setData({
              shadow: true,
              items3: this.data.items3
            });
          }
        })

    
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
    //查询账户列表
    api.finance2.getAccountList()
      .then(res => {
        console.log(res);
        //取出所有的账户类型，作为筛选,等出接口的时候再做

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