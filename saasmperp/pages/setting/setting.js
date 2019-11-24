// pages/setting/setting.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  check(e){
    const index = e.currentTarget.dataset.index;
    if(e.detail.value){
      const checkedData = this.data.manageData.modules.filter(item => {
        return item.checked
      })
      if (checkedData.length >= 9) {
        wx.showToast({
          title: '最多添加9个模块',
          icon: 'none'
        })
        this.data.manageData.modules[index].checked = false
      } else {
        this.data.manageData.modules[index].checked = true
      }
    }else{
      this.data.manageData.modules[index].checked = false
    }
    this.setData({
      manageData: this.data.manageData
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.swperIndex){
      const index=app.globalData.manageModule.findIndex(item=>{
        return item.id == options.swperIndex
      })
      this.setData({
        manageData: app.globalData.manageModule[options.swperIndex],
        index: index
      })
    }else{
      wx.showToast({
        title: '传参错误',
        icon:"none"
      })
      wx.navigateBack({
        
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
    app.globalData.manageModule[this.data.index] = this.data.manageData
    wx.setStorageSync('manageModule', app.globalData.manageModule)
    const pages=getCurrentPages()
    pages[pages.length-2].setData({
      manageModule: app.globalData.manageModule
    })
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