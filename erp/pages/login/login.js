// pages/login/login.js
import { api } from "../../utils/api/api.js"
Page({
   
  
  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    password:'',
    disabled:true
  },
  username:function(e){
    let that =this
    that.setData({
      username: e.detail.value
    })
  },
  login_phone:function(){
      wx.navigateTo({
        url: '../../pages/login_phone/login_phone'
      })
  },
  password:function(e){
    let that = this
    that.setData({
      password: e.detail.value
    })
    if(that.data.password!="" && that.data.username!=""){
       that.setData({
         disabled:false
       })
    }
  },
  loginInfo: function (e) {
    let that =this
    let data = {
      tel: Number(that.data.username) ,
      pwd:that.data.password
    }
    api.login.login(data)
      .then(res => {
        if(res.code == 1) {
          wx.setStorageSync('tel', res.data.wxlogin_common.tel)
          wx.redirectTo({
            url: '../index/index'
          })
        }
      })
      .catch(err => {

      })
  },
  //忘记密码
  remove:function(){
     wx.navigateTo({
       url: '../lose_password/lose_password',
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