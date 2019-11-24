// report/pages/outbound_amount_detail/outbound_amount_detail.js
import {api} from '../../../utils/api/api.js'
import { putComma } from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getDataDetail(data){
    api.report.getOutInMoneyDetail(data)
    .then(res=>{
      res.data.inout.outbound_gross = putComma(res.data.inout.outbound_gross)
      this.setData({
        detail: res.data.inout
      })
    })
    .catch(err=>{

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.params){
      const data = JSON.parse(options.params)
      this.getDataDetail(data)
    }
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