// warehouse/pages/sales_history/sales_history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_detail:[]//商品 历史销售信息列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var goods_detail = JSON.parse(options.goods_detail)
    console.log(goods_detail)
    this.setData({
      goods_detail: goods_detail
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