// warehouse/pages/invoices/invoices.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  toStoragePageOut(){
    wx.navigateTo({
      url: "/warehouse/pages/outStorage_list/outStorage_list?type=0",
    })
  },
  toStoragePageIn(){
    wx.navigateTo({
      url: "/warehouse/pages/outStorage_list/outStorage_list?type=1",
    })
  },
  toAllotPage(){
    wx.navigateTo({
      url: "/warehouse/pages/allot_list/allot_list",
    })
  },
  toCheckListPage(){
    wx.navigateTo({
      url: "/warehouse/pages/stock_check_list/stock_check_list",
    })
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