// pages/more/more.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    manageModule:[],
    moduleDes:[
      {
        src: '/images/more-sale.png',
        moreTitle: '销售管理',
        functionDes: '客户生命周期管理、客户跟踪、销售知识库、话术管理、合同文档管理等',
        applyDes: '需要CRM管理的场景、解决客户归属、销售过程跟踪，建立售前、售后服务体系，并做知识、话术管理',
      },
      {
        src: '/images/more-report.png',
        moreTitle: '统计报表',
        functionDes: '商品管理、客户管理、销售管理、采 购管理、库存管理、统计报表等',
        applyDes: '全面的进销存管理，帮助企业管货、 管客、管账，通过手机、电脑紧密协作，销 售员开单、财务收款、库管发货',
      },
      {
        src: '/images/more-finance.png',
        moreTitle: '财务记账',
        functionDes: '应收应付管理、收支记账、this.model、账户转账、借入借出、资金流 水等',
        applyDes: '全面、细致的财务管理，与客户供应商对账、发送账单等，通过手机记账、看报表、方便、高效',
      },
      {
        src: '/images/more-stock.png',
        moreTitle: '仓库管理',
        functionDes: '库存管理、出库单、入库单、仓库管理、库存调拨、库存盘点等',
        applyDes: '更全面、细致的仓库管理，支持多仓库、异地仓库管理，过手机实时查库存、调货、方便、高效',
      }
    ]
  },
  checked(e){
    const checked = this.data.manageModule.filter(item=>{
      return item.checked
    })
    const index = e.currentTarget.dataset.index;
    if (checked.length <= 1 && this.data.manageModule[index].checked){
      wx.showToast({
        title: '至少开通一个模块',
        icon:'none'
      })
      return
    }
    this.data.manageModule[index].checked = !this.data.manageModule[index].checked;
    this.setData({
      manageModule:this.data.manageModule
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync("manageModule")) {
      this.setData({
        manageModule: wx.getStorageSync("manageModule")
      })
      app.globalData.manageModule = wx.getStorageSync("manageModule");
    } else {
      this.setData({
        manageModule: app.globalData.manageModule
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
    app.globalData.manageModule = this.data.manageModule
    wx.setStorageSync('manageModule', this.data.manageModule)
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