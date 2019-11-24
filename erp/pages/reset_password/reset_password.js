// pages/reset_password/reset_password.js
import { api } from "../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    new_pwd:'',
    old_pwd:'',
    disabled:true
  },
  new:function(){
     let that =this
     if(that.data.old_pwd != that.data.new_pwd){
       wx.showToast({
         title: '请再次确认密码',
         icon: "none",
         duration: 2000
       })
     }else{
       that.setData({
         disabled:false
       })
     }

  },
  new_pwd: function (e) {
    let that = this
    that.setData({
      new_pwd: Number(e.detail.value)
    })
  },
  old_pwd: function (e) {
    let that = this
    that.setData({
      old_pwd: Number(e.detail.value)
    })
  },
  submit:function(){
    let that = this
    let data = {
      tel: wx.getStorageSync("tel"),
      verification_code: wx.getStorageSync("verification_code"),
      pwd :that.data.new_pwd,
      scene_type: 2
    }
    api.login.submit(data)
      .then(res => {
        console.log(res)
        if (res.code == 1) {
          wx.navigateTo({
            url: '../index/index',
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