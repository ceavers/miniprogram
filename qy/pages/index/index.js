//index.js
//获取应用实例
import { api } from '../../utils/api/api.js'
import { checkLogin } from '../../utils/upload.js'
const app = getApp()

Page({
  data: {
    indicatorDots: false,
    autoplay: true,
    circular: true,
    interval: 3000,
    duration: 2000,
    backImages: [
      "/images/banner1.jpg",
      "/images/banner2.jpg",
      "/images/banner3.jpg",
      "/images/banner4.jpg"],
    currentItemId: 1,
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    showModal: false, // 显示modal弹窗
    showModalApply: false// 显示申请弹窗
  },
  swiperChange: function (e) {
    var currentItemId = e.detail.currentItemId;
    this.setData({
      currentItemId: currentItemId
    })
  },
  stopPropagation(event){

  },
  // VIP客服弹窗
  btnPopups(){
    if (wx.qy) {
      if (getApp().globalData.userInfo === null || getApp().globalData.user === null) {
        checkLogin.login(api, this)
      } else {
        wx.navigateTo({
          url: "/pages/chat/chat"
        })
      }
    } else {
      wx.showToast({
        title: '请进入企业微信登录',
        icon: 'none'
      })
      return
    }
  },
  visitorChat(){
    if (wx.qy) {
      if (getApp().globalData.userInfo === null || getApp().globalData.user === null) {
        checkLogin.login(api, this)
      } else {
        wx.navigateTo({
          url: "/pages/visitorChat/visitorChat"
        })
      }
    } else {
      wx.showToast({
        title: '请进入企业微信登录',
        icon: 'none'
      })
      return
    }
  },
  confirm:function(){
    console.log("知道了")
    this.setData({
      showModal: false
    })
  },
  confirmApply:function() {
    console.log("确定")
    this.setData({
      showModalApply: false
    })
  },
  onLoad: function (options) {
    wx.hideTabBar();
    app.editTabbar();

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  onReady: function(){
  },
  getUserInfo:function(res){
  },
  //关闭弹窗
  close(){
    this.setData({
      showModalApply:false
    })
  }
})
