// warehouse/pages/inventory_list/inventory_list.js
import {api} from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalShow: false,
    moreActionShow: false,
    deleteShow:false,
    adjustShow:false,
    checkBillDetail:null,
    units:[],
    note:''
  },
  adjustStock(){
    if (this.data.checkBillDetail.order_state==0){
      this.setData({
        adjustShow: true,
      })
    } else if (this.data.checkBillDetail.order_state == 1){
      this.setData({
        modalShow: true
      })
    }
  },
  cancelAdjust(){
    this.setData({
      adjustShow: false
    })
  },
  adjust(){
    const data={
      order_id:this.data.orderId
    }
    api.warehouse.checkdeStocktaking(data)
    .then(res=>{
      this.data.checkBillDetail.order_state = 1;
      this.setData({
        checkBillDetail:this.data.checkBillDetail,
        adjustShow:false
      })
      wx.showToast({
        title: '调库成功',
      })
    })
    .catch(err=>{

    })
  },
  comfirm(){
    this.setData({
      modalShow: false
    })
  },
  moreAction() {
    this.setData({
      moreActionShow: true
    })
  },
  moreActionCancel() {
    this.setData({
      moreActionShow: false
    })
  },
  toEditNote() {
    wx.navigateTo({
      url:`/warehouse/pages/edit_note/edit_note?type=${this.data.type}&orderId=${this.data.orderId}`,
    })
  },
  toDetail(e) {
    const code = e.currentTarget.dataset.code;
    wx.navigateTo({
      url: `/warehouse/pages/godown_entry_detail/godown_entry_detail?type=${this.data.type}&code=${code}&orderId=${this.data.orderId}&state=${this.data.checkBillDetail.order_state}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type && options.orderId) {
      this.setData({
        type: options.type,
        orderId: options.orderId
      })
      this.getCheckBillDetail();
    } else {
      wx.showToast({
        title: '页面参数异常',
        icon:'none'
      })
    }
  },
  //获取盘点单详情
  getCheckBillDetail(){
    const data ={
      order_id:this.data.orderId
    }
    api.warehouse.getCheckBillDetail(data)
    .then(res=>{
      this.setData({
        checkBillDetail: res.data,
        units: res.data.units,
        note: res.data.note
      })
    })
    .catch(err=>{

    })
  },
  deleteList() {
    this.setData({
      moreActionShow: false,
      deleteShow: true
    })
  },
  delCancel() {
    this.setData({
      deleteShow: false
    })
  },
  delComfirm() {
    //暂无接口
    this.setData({
      deleteShow: false
    })
    wx.showToast({
      title: '删除成功',
    })
    setTimeout(() => {
      wx.navigateBack({
        delta: 2
      })
    }, 1000)
  },
  addGoods() {
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
  copyOrder() {
    //暂无接口
    this.setData({
      moreActionShow: false
    })
    wx.navigateTo({
      url: `/warehouse/pages/check/check?type=${this.data.type}`,
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
    if (getApp().globalData.flag){
      this.onLoad({type:this.data.type,orderId:this.data.orderId})
      getApp().globalData.flag=0
    }
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