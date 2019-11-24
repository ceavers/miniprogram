//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图
    bannerImages: [],
    currentIndex:0
  },
  //轮播切换
  swiperChange(e){
    this.setData({
      currentIndex:e.detail.current
    })
  },
  toCenterPage(){
    wx.navigateTo({
      url: '/pages/center/center',
    })
  },
  toCommonPage(e){
    const index=e.currentTarget.dataset.index;
    wx.navigateTo({
      url: `/pages/common/common?pageIndex=${index}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!wx.getStorageSync('token')){
      wx.redirectTo({
        url: '/pages/accredit/accredit',
      })
    }
    this.setModule()
  },
  setModule(){
    if (wx.getStorageSync("manageModule")) {
      var manageModule = wx.getStorageSync("manageModule")
    } else {
      var manageModule = app.globalData.manageModule
    }
    const bannerImages = [
      {
        title: '销售',
        src: "/images/market.png",
        des: '今日销售',
        number: 100.00
      },
      {
        title: '报表',
        src: "/images/statement.png",
        des: '报表总数',
        number: 20
      },
      {
        title: '财务',
        src: "/images/finance.png",
        des: '本月支出',
        number: 100.00
      },
      {
        title: '仓库',
        src: "/images/warehouse.png",
        des: '库存数量',
        number: 10000
      }
    ]
    const banner = []
    manageModule.forEach((item, index) => {
      if (item.checked) {
        banner.push(bannerImages[index])
      }
    })
    if (banner.length-1 < this.data.currentIndex){
      this.setData({
        currentIndex: banner.length-1
      })
    }
    this.setData({
      bannerImages: banner
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
    this.setModule()
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