// pages/login_phone/login_phone.js
import { api } from "../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    code:'',
    disabled:true,
    code_ma:"获取验证码",
    disabled1:true,
  },
  register: function () {
    wx.navigateTo({
      url: '../../pages/chose_com/chose_com'
    })
  },
  login:function(){
    wx.navigateTo({
      url: '../../pages/login/login'
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
        disabled1:false
      })
    }
  },
  remove: function () {
    wx.navigateTo({
      url: '../lose_password/lose_password',
    })
  },
  phone:function(e){
      console.log(e.detail.value)
      let that =this
      that.setData({
        phone: Number(e.detail.value)  
      })
  },
  code:function(e){
    let that=this
    that.setData({
      code: Number(e.detail.value)
    })
    if (that.data.phone != "" && that.data.code != ""){
         that.setData({
           disabled:false
         })
    }
  },
  //获取验证码
  codeInfo:function(e){
    console.log(e)
    let that = this
    let data = {
      tel:that.data.phone,
      scene_type :1
    }
    api.login.code(data)
      .then(res => {
        console.log(res)
        if (res.code == 1) {
          if (res.code == 1) {
            let nsecond = 60;
            let appCount = setInterval(function () {
              nsecond -= 1;
              that.setData({
                disabled1: true,
                code_ma: nsecond
              })
              if (nsecond < 1) {
                clearInterval(appCount);
                //取消指定的setInterval函数将要执行的代码 
                that.setData({
                  disabled1: false,
                  code_ma: "获取验证码",
                })
              }
              console.log(nsecond);
            }, 1000);
          }
        }
      })
      .catch(err => {

      })
  },
  //登录
  phone_login:function(e){
     let that =this
     let data={
       tel: that.data.phone,
       scene_type: 1,
       verification_code:that.data.code
     }
    api.login.codeLogin(data)
      .then(res => {
        console.log(res)
        if (res.code == 1) {
          wx.redirectTo({
            url: '../index/index'
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