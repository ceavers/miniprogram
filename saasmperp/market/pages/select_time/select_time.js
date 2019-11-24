// market/pages/select_time/select_time.js
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disountObj: {},
    orderId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let firstdate = new Date(options.date * 1000)
    let dateObj = {
      date: firstdate.toLocaleDateString(),
      timeStamp: options.date
    }
    console.log(options)
    this.setData({
      dateObj,
      orderId: options.orderId,
    })
  },
  //选择时间
  selectDate() {
    this.setData({
      showSelectDateModal: true
    })
  },
  //确认选择时间
  confirmDate(e) {
    console.log(e)
    let timeStamp = new Date(e.detail.year + '/' + e.detail.month + '/' + e.detail.day)
    let dateObj = {
      date: e.detail.year + '/' + e.detail.month + '/' + e.detail.day,
      timeStamp: timeStamp.getTime() / 1000
    }
    this.setData({
      dateObj
    })
  },
  //确认修改
  createOrder(e){
    api.market.editOrder({
      order_id: this.data.orderId,
      date: this.data.dateObj.timeStamp,
      note: e.detail.value.remark
    }).then(res => {
      if (res.code == 1) {
        wx.navigateBack({
          detal: 1
        })
      }
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