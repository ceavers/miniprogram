// market/pages/sell_invoice_view_customer_information/sell_invoice_view_customer_information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderMes: {}
  },
  toMidifyCustomerInformation(){
    if (this.data.orderMes.order_type == 1){
      wx.showToast({
        title: '订单已付款，不能修改客户信息',
        icon: 'none'
      })
    } else {
      wx.redirectTo({
        url: '/market/pages/sell_invoice_modify_customer_information/sell_invoice_modify_customer_information?orderMes=' + JSON.stringify(this.data.orderMes),
      })
    }
  },
  //去客户详情页面
  gotoCustomer(){
    wx.redirectTo({
      url: '/market/pages/customer_detail/customer_detail?userId=' + this.data.orderMes.customer_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderMes: JSON.parse(options.orderMes)
    })
    console.log(this.data.orderMes)
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