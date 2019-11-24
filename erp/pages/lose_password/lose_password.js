// pages/lose_password/lose_password.js
import { api } from "../../utils/api/api.js"
Page({
  phone: function (e) {
    let that = this
    console.log(e.detail.value)
    that.setData({
      phone: Number(e.detail.value)
    })
  },
  //验证手机正则
  tel: function (e) {
    let that = this
    if (!(/^1[3456789]\d{9}$/.test(that.data.phone)) && that.data.phone != "") {
      wx.showToast({
        title: '请填入正确的号码',
        icon: "none",
        duration: 2000
      })
    }else{
      that.setData({
        disabled: false,
      })
    }
  },
  
  register: function () {
    wx.navigateTo({
      url: '../../pages/chose_com/chose_com'
    })
  },
  code: function (e) {
    let that = this
    that.setData({
      code: Number(e.detail.value)
    })
  },
  code1:function(){
    let that=this
    if (that.data.phone != "" && that.data.code!=""){
      that.setData({
        disabled1:false
      })
    }
  },
  next:function(){
    let that = this
    wx.setStorageSync('verification_code', that.data.code)
    wx.setStorageSync('tel ', that.data.phone)
    wx.navigateTo({
      url: '../reset_password/reset_password',
    })
  },

 //获取验证码
  codeInfo: function (e) {
    let that = this
    let data = {
      tel: Number(that.data.phone),
      scene_type: 2
    }
    api.login.code(data)
      .then(res => {
        console.log(res)
        if (res.code == 1) {
          //获取验证码操作
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    code: '',
    disabled:true,
    disabled1:true
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