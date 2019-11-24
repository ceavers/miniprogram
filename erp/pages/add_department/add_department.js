// pages/add_department/add_department.js
import {api} from '../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit(e){
    const data =e.detail.value;
    if (data.name.length == 0 || data.mobile.length == 0 || data.user_id.length == 0 || data.sort.length == 0){
      wx.showToast({
        title: '请完善部门信息',
        icon:'none'
      })
      return
    }
    if ((/^1[34578]\d{9}$/.test(data.mobile)) && data.mobile.length == 11) {
      api.department.addDepartment(data)
      .then(res=>{
        wx.showToast({
          title: '添加部门成功',
          icon: 'success',
        })
        setTimeout(() => {
          wx.navigateBack({
            
          })
        }, 1000)
      })
      .catch(err=>{

      })
    }else{
      wx.showToast({
        title: '请输入正确手机号',
        icon: 'none'
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