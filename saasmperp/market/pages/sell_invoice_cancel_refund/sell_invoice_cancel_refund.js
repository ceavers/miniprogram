// market/pages/sell_invoice_cancel_refund/sell_invoice_cancel_refund.js
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderMoney:"",
    refund_money:"",
    sttime:"",
    account_name:"",
  },
  button(){
    let that =this
    let data={
      buy_account:"6568484545478487",
      supply_account:"6568484545478487",
      money:that.data.orderMoney,
    }
    api.warehouse2.getRefund(data)
      .then(res => {
        if (res.code == 1) {
          console.log(res)
          wx.navigateBack({
            delta: 1
          })
        }
      })
      .catch(err => {

      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   let that =this
   that.setData({
     orderMoney:wx.getStorageSync('orderMoney'),
     refund_money: wx.getStorageSync('refund_money'),
     sttime:wx.getStorageSync('sttime'),
     account_name:wx.getStorageSync('account_name')
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