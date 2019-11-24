// pages/vipapply/vipapply.js
import { api } from '../../utils/api/api.js'
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mes: []
  },
  pass(e){
    console.log(e)
    api.user.passApply({ userId: e.currentTarget.dataset.id }).
    then(res => {
        if(res.code === 0){
          wx.showToast({
            title: '操作成功!',
            duration: 1500
          })
          this.onLoad()
        } 
    })
  },
  refuse(e){
    api.user.refuseApply({ userId: e.target.dataset.id }).
    then(res => {
      if (res.code === 0) {
        wx.showToast({
          title: '操作成功!',
          duration: 1500
        })
        this.onLoad()
      } 
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.user.getVipApply().
    then(res => {
      console.log(res)
      if(res.code === 0){
        this.setData({
          mes: res.data
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