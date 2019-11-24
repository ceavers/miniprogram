// pages/register/register.js
import { api } from "../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nikename:'',
    phone:'',
    code:'',
    display:false,
    disabled:true,
    disabled1:true,
    code_ma:"获取验证码"
  },
  nikename:function(e){
     let that=this
     that.setData({
       nikename: e.detail.value
     })
  },
  dialog_btn: function (e) {
    console.log(e)
    wx.setClipboardData({
      data:"0000",
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  phone:function(e){
    let that = this
    that.setData({
      phone: e.detail.value
    })
  
  },
  tel:function(e){
    let that =this
    if (!(/^1[3456789]\d{9}$/.test(that.data.phone)) || that.data.phone !="") {
      that.setData({
        disabled1:false
      })
    }
  },
  code:function(e){
    let that = this
    that.setData({
      code: e.detail.value
    })
    if (that.data.phone != "" && that.data.nikename != "" && that.data.code !=""){
      that.setData({
        disabled:false
      })
    }
  },
  //
  //获取验证码
  codeInfo: function (e) {
    let that = this
    let data = {
      tel: Number(that.data.phone),
      scene_type: 1
    }
    api.login.code(data)
      .then(res => {
        console.log(res)
        if (res.code == 1) {
          let nsecond = 60;
          let appCount = setInterval(function () {
            nsecond -= 1;
            that.setData({
              disabled1:true,
              code_ma: nsecond
            })
            if (nsecond < 1) {
              clearInterval(appCount);
              //取消指定的setInterval函数将要执行的代码 
              that.setData({
                disabled1: false,
                code_ma:"获取验证码",
              })
            }
            console.log(nsecond);
          }, 1000);
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  //注册
  register1:function(e){
    let that = this
    let data={
      business_name: wx.getStorageSync("business_name "),
      tel:that.data.phone,
      contact_name :that.data.nikename,
      verification_code :that.data.code,
      industry_id: wx.getStorageSync("industry_id "),
      role_id :1,
      scene_type :0
    }
    api.login.register(data)
      .then(res => {
        console.log(res)
        if (res.code == 1) {
           that.setData({
             display:true
           })
          
        }
      })
      .catch(err => {

      })
  },
  //注册成功
  login_btn:function(){
    wx.redirectTo({
      url: '../login/login'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    that.setData({
      display: false
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