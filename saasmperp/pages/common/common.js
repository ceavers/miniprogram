// pages/common/common.js
import {api} from '../../utils/api/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    manageModule:[],
    selectIndex:0,
    showPhotoModal: false,//显示弹窗拍照flag
    photoModalList: {
      title: '拍单据',
      detail: [{
        cname: '销售单',
        imageSrc: '/images/market-ticket.png',
        url: '/market/pages/sales_slip/sales_slip'
      }, {
        cname: '采购单',
        imageSrc: '/images/market-purchase.png',
        url: '/market/pages/purchasing_order/purchasing_order'
      },]
    }
  },
  toSettingPage(){
    wx.navigateTo({
      url: `/pages/setting/setting?swperIndex=${this.data.manageModule1[this.data.selectIndex].id}`,
    })
  },
  getUserInfo() {
    if (!app.globalData.userInfo) {
      api.user.getUserInfo()
        .then(res => {
          app.globalData.userInfo = res.data;
          this.setData({
            userInfo: res.data
          })
        })
        .catch(er => {

        })
    } else {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
  },
  changeSwiperIndex(e){
    console.log(e)
    this.setData({
      selectIndex: e.detail.current
    })
    wx.setNavigationBarTitle({
      title: this.data.manageModule1[this.data.selectIndex].title,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //显拍照类型弹窗
  showPhotoModal(){
    this.setData({
      showPhotoModal: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.pageIndex){
      this.setData({
        selectIndex: options.pageIndex
      })
    }
    if (wx.getStorageSync("manageModule")){
      this.setData({
        manageModule: wx.getStorageSync("manageModule")
      })
      app.globalData.manageModule = wx.getStorageSync("manageModule");
    }else{
      this.setData({
        manageModule: app.globalData.manageModule
      })
    }
    const manageModule1 = this.data.manageModule.filter(item=>{
      return item.checked
    })
    this.setData({
      manageModule1: manageModule1
    })
    wx.setNavigationBarTitle({
      title: this.data.manageModule1[this.data.selectIndex].title,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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
    this.getUserInfo()
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