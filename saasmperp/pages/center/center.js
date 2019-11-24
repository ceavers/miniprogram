// pages/center/center.js
import {api} from "../../utils/api/api.js"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null
  },
  toChangePwPage(){
    wx.navigateTo({
      url: '/pages/changePw/changePw',
    })
  },
  toPersonalPage(){
    wx.navigateTo({
      url: '/pages/personal/personal',
    })
  },
  toAuthorityPage(){
    wx.navigateTo({
      url: '/pages/authority/authority',
    })
  },
  toManagePage(){
    wx.navigateTo({
      url: '/pages/employee_management/employee_management',
    })
  },
  toMorePage(){
    wx.navigateTo({
      url: '/pages/more/more',
    })
  },
  getUserInfo(){
    if (!app.globalData.userInfo) {
      api.user.getUserInfo()
        .then(res => {
          app.globalData.userInfo = res.data;
          this.setData({
            userInfo: res.data
          })
        })
        .catch(err => {

        })
    }else{
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
  },
  //退出登陆
  exit(){
    wx.showModal({
      title: '提示',
      content: '确认要退出当前登陆？',
      success(res) {
        if (res.confirm) {
          wx.removeStorageSync('token');
          app.globalData.userInfo = null;
          wx.reLaunch({
            url: '/pages/accredit/accredit',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
    this.getUserInfo()
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