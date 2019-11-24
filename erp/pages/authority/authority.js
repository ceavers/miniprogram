// pages/authority/authority.js
import {api} from '../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authList:[]
  },
  toPermissionSetting(){
    wx.navigateTo({
      url: '/pages/permissionSetting/permissionSetting',
    })
  },
  getRoleList(){
    api.user.getRoleList()
    .then(res=>{
      const authList=res.datas.roles;
      this.setData({
        authList: authList
      })
    })
    .catch(err=>{

    })
  },
  toAuthInfo(e){
    const roleId = e.currentTarget.dataset.roleid;
    wx.navigateTo({
      url: `/pages/permissionSetting/permissionSetting?roleId=${roleId}`,
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
    this.getRoleList();
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