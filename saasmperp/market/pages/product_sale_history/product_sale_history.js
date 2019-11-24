// 订单应付列表
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    pagesIndex: 1,
    goods: {},//订单应付列表    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId: options.userId
    })
    this.getProductSaleMes();
  },
  //获取订单应付列表
  getProductSaleMes() {
    api.market.getProductSaleMes({
      supplier_id: this.data.userId,
      user_supplier_type: 0,
    }).then(res => {
      if (res.code == 1) {
        this.setData({
          goods: res.data
        })
      }
    }).catch(res => {
      console.error(res)
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