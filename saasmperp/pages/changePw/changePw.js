// pages/changePw/changePw.js
import {api} from '../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldPw:'',
    newPw:'',
    newPwAgain:'',
    canClick:0
  },
  getOldPW(e){
    this.setData({
      oldPw:e.detail.value
    })
    if (this.data.oldPw.length&&this.data.newPw.length>6&& this.data.newPwAgain.length>6){
      this.setData({
        canClick: 1
      })
    }else{
      this.setData({
        canClick: 0
      })
    }
  },
  getNewPW(e){
    this.setData({
      newPw: e.detail.value
    })
    if (this.data.oldPw.length && this.data.newPw.length>6 && this.data.newPwAgain.length>6) {
      this.setData({
        canClick: 1
      })
    } else {
      this.setData({
        canClick: 0
      })
    }
  },
  getNewPWAgain(e){
    this.setData({
      newPwAgain: e.detail.value
    })
    if (this.data.oldPw.length && this.data.newPw.length>6 && this.data.newPwAgain.length>6) {
      this.setData({
        canClick: 1
      })
    } else {
      this.setData({
        canClick: 0
      })
    }
  },
  changePw(){
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/;
    if (this.data.canClick===0){
      return
    }
    if (!reg.test(this.data.newPw)){
      wx.showToast({
        title: '密码由数字和字母组成',
        icon:"none"
      })
      return
    } else if (this.data.newPw !== this.data.newPwAgain){
      wx.showToast({
        title: '两次新密码不一致',
        icon: "none"
      })
      return
    }else{
      const data={
        //未加密 实际接口更改
        old_password: this.data.oldPw,
        new_password: this.data.newPw
      }
      api.user.updataInfo(data)
      .then(res=>{
        wx.showToast({
          title: '修改成功',
          icon: 'success',
        })
        setTimeout(() => {
          wx.navigateBack({
            
          })
        }, 1000)
      })
      .catch(res=>{

      })
    }
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