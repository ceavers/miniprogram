// pages/accredit/accredit.js
import {api} from "../../utils/api/api.js"
Page({
 


  onGotUserInfo:function(e){
      console.log(e)
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //插入登录的用户的相关信息到数据库
      let data={
        rawData: e.detail.rawData, 
        signature: e.detail.signature
      }
      wx.login({
        success(res) {
          if (res.code) {
            data.code=res.code
            //发起网络请求
            api.login.wxLogin(data)
            .then(res=>{
               console.log(res)
               if(res.code==1){
                 wx.setStorageSync('token',res.data.wxlogin.token);
                 wx.showLoading({
                   title: '授权成功',
                   success:function(){
                     wx.redirectTo({
                       url: '../chose_peo/chose_peo'
                     })
                   }
                 })
               }
            })
            .catch(err=>{
             
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
      
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