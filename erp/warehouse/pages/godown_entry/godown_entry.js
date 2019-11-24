// warehouse/pages/godown_entry/godown_entry.js
import {api} from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0,//0出库 1入库 2库存调拨 3盘点
    orderId:'',
    actionShow:false,
    modalShow:false,
    deleteShow:false,
    moreActionShow:false,
    typeData:[
      {
        title:'出库单',
        state:'已出库 ',
        toastText:'此出库单已出库',
        btnText:'出库'
      },
      {
        title:'入库单',
        state:'已入库',
        toastText:'此入库单已完成入库',
        btnText: '入库'
      },
      {
        title:'调拨单',
        state:'已调库',
        toastText:'此调拨单已完成调库',
        btnText:'调库'
      }
    ],
    orderCode:'',
    outInBillDetail:null,
    allotBillDetail:null,
    units:[],
    note:''
  },
  toDetail(e){
    const code = e.currentTarget.dataset.code;
    wx.navigateTo({
      url: `/warehouse/pages/godown_entry_detail/godown_entry_detail?type=${this.data.type}&code=${code}&orderId=${this.data.orderId}`,
    })
  },
  godownEntry(){
    this.setData({
      actionShow:true
    })
  },
  cancelAction(){
    this.setData({
      actionShow: false
    })
  },
  inAction(){
    this.setData({
      actionShow: false,
      modalShow: true
    })
  },
  comfirm(){
    this.setData({
      modalShow: false
    })
  },
  moreAction(){
    this.setData({
      moreActionShow: true
    })
  },
  moreActionCancel(){
    this.setData({
      moreActionShow: false
    })
  },
  toEditNote(){
    wx.navigateTo({
      url: `/warehouse/pages/edit_note/edit_note?type=${this.data.type}&orderId=${this.data.orderId}`,
    })
  },
  deleteList(){
    this.setData({
      moreActionShow:false,
      deleteShow:true
    })
  },  
  delCancel(){
    this.setData({
      deleteShow: false
    })
  },
  delComfirm(){
    //暂无接口
    this.setData({
      deleteShow: false
    })
    wx.showToast({
      title: '删除成功',
    })
    if(this.data.type==0){
      setTimeout(() => {
        wx.navigateBack({
          delta: 3
        })
      }, 1000)
    }else{
      setTimeout(() => {
        wx.navigateBack({
          delta: 2
        })
      }, 1000)
    }
  },
  addGoods(){
    //暂无接口
    this.setData({
      moreActionShow: false
    })
    setTimeout(() => {
      wx.navigateTo({
        url: `/warehouse/pages/inStorage_add_goods/inStorage_add_goods?type=${this.data.type}&add=1`,
      })
    }, 1000)
  },
  copyOrder(){
    //暂无接口
    this.setData({
      moreActionShow: false
    })
    switch (this.data.type){
      case "0":
      wx.navigateTo({
        url: `/warehouse/pages/stock_removal/stock_removal?type=${this.data.type}`,
      })
      break;
      case "1":
      wx.navigateTo({
        url: `/warehouse/pages/godown_entry_nostate/godown_entry_nostate?type=${this.data.type}`,
      })
      break;
      case "2":
      wx.navigateTo({
        url: `/warehouse/pages/allot/allot?type=${this.data.type}`,
      })
      break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type && options.orderId){
      this.setData({
        type: options.type,
        orderId: options.orderId
      })
      this.setNavTitle();
    }else{
      wx.showToast({
        title: '页面参数异常',
      })
    }
  },
  setNavTitle(){
    switch (this.data.type) {
      case '0':
        wx.setNavigationBarTitle({
          title: '出库列表',
        })
        this.getOutInBillDetail();
        break;
      case '1':
        wx.setNavigationBarTitle({
          title: '入库列表',
        })
        this.getOutInBillDetail();
        break;
      case '2':
        wx.setNavigationBarTitle({
          title: '调拨单列表',
        })
        this.getAllotBillDetail();
        break;
    }
  },
  //出入库单详情
  getOutInBillDetail(){
    const data={
      order_id:this.data.orderId,
      action:this.data.type
    }
    api.warehouse.getOutInBillDetail(data)
    .then(res=>{
      this.setData({
        outInBillDetail:res.data,
        orderCode: res.data.order_code,
        units: res.data.units,
        note: res.data.note
      })
    })
    .catch(err=>{

    })
  },
  //调拨单详情
  getAllotBillDetail(){
    const data={
      order_id:this.data.orderId
    }
    api.warehouse.getAllotBillDetail(data)
    .then(res=>{
      this.setData({
        allotBillDetail:res.data,
        orderCode: res.data.order_code,
        units: res.data.units,
        note: res.data.note
      })
    })
    .catch(err=>{

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