// pages/changeName/changeName.js
import {api} from '../../utils/api/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    code:'',
    phone:''
  },
  changeName(){
    const name = this.data.name.trim();
    if (!name.length){
      wx.showToast({
        title: '请输入名字',
        icon:'none'
      })
      return 
    }
    const data = {
      username: name
    }
    api.user.updataInfo(data)
      .then(res => {
        app.globalData.userInfo.name = name;
        wx.showToast({
          title: '修改成功',
          icon:'success',
        })
        setTimeout(()=>{
          wx.navigateBack({
            
          })
        },1000)
      })
      .catch(err => {

      })
  },
  changePhone(){
    var phone = this.data.phone;
    if ((/^1[34578]\d{9}$/.test(phone)) && phone.length == 11) {
      const data={
        verification_code:this.data.code,
        telephone: phone
      }
      api.user.updataInfo(data)
      .then(res=>{
        app.globalData.userInfo.tel = phone;
        wx.showToast({
          title: '修改成功',
          icon: 'success',
        })
        setTimeout(() => {
          wx.navigateBack({
            delta:3
          })
        }, 1000)
      })
      .catch(err=>{

      })
    } else {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return
    }
  },
  getName(e){
    this.setData({
      name:e.detail.value
    })
  },
  getPhone(e){
    this.setData({
      phone: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.fromPage ){
      wx.setNavigationBarTitle({
        title: '电话修改',
      })
      this.setData({
        fromPage: options.fromPage,
        code: options.code
      })
    } 
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