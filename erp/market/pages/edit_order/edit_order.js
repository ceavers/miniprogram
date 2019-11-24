// market/pages/edit_order/edit_order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},//用户默认信息
    delivery: {},//发货方式，
    deliveryList: [{
      type: 0,
      typeName: '送货',
      account_name: '送货'
    }, {
        type: 1,
        typeName: '自提',
        account_name: '自提'
      }, {
        type: 3,
        typeName: '代发',
        account_name: '代发'
      },],//发货方式列表
    showDeliveryModal: false,//发货方式弹窗flag
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user: JSON.parse(options.user),
      delivery: this.data.deliveryList[0]
    })
  },
  //发货方式选择
  showDeliveryModal(){
    this.setData({
      showDeliveryModal: true
    })
  },
  //选择发货方式
  getDeliveryType(e){
    this.setData({
      delivery: this.data.deliveryList[e.detail]
    })
  },
  //确认修改
  editOrder(e){
    console.log(e)
    app.globalData.editCustomer = {
      man: e.detail.value.man,
      phone: e.detail.value.phone,
      address: e.detail.value.address,
      delivery: this.data.delivery
    }
    wx.navigateBack({
      detal: 1
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