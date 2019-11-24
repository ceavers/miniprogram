// pages/changePhoneNext/changePhoneNext.js
import {api} from '../../utils/api/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldTel:'',
    code:''
  },
  getCode(e){
    this.setData({
      code:e.detail.value
    })
  },
  //下一步
  nextAction(){
    const codeLength = this.data.code.length;
    if (codeLength < 4) {
      wx.showToast({
        title: '请输入完整验证码',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: `/pages/changeName/changeName?fromPage='changephone'&code=${this.data.code}`,
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
    this.setData({
      oldTel: app.globalData.userInfo.tel
    })
    const data ={
      tel: app.globalData.userInfo.tel,
      scene_type:2
    }
    api.user.getCode(data)
    .then(res => {

    })
    .catch(err => {

    })
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