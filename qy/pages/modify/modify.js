// pages/modify/modify.js
import { api } from '../../utils/api/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    role: 3,
    userId: ''
  },
  listenSwitch(e){
    console.log(e.detail.value);
    this.setData({
      isStop: e.detail.value
    })
  },
  listenRadio(e){
    this.setData({
      role: e.detail.value
    })
  },
  saveMes(){
    api.user.upDateEmploy({ service_id: this.data.userId, role: this.data.role }).
    then(res => {
      if(res.code === 0){
        wx.showToast({
          title: '修改成功',
          duration: 1500,
          success: function(){
            wx.navigateBack()
          }
        })
        
      } else {
        wx.showToast({
          title: '修改失败',
          icon: 'fail',
        })
      }
    }).
    catch(res => {
      wx.showToast({
        title: '网络错误！',
        icon: 'fail'
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      userId: options.serviceId,
      name: options.name,
      role:options.role
    })
  }
})