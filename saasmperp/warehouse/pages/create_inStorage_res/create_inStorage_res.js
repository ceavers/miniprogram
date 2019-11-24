// warehouse/pages/create_inStorage_res/create_inStorage_res.js
import {api} from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    orderId:''
  },
  toGodownEntryPage(){
    wx.navigateTo({
      url: `/warehouse/pages/godown_entry/godown_entry?type=${this.data.type}&orderId=${this.data.orderId}`,
    })
  },
  toCheckList(){
    wx.navigateTo({
      url: `/warehouse/pages/inventory_list/inventory_list?type=${this.data.type}&orderId=${this.data.orderId}`,
    })
  },
  //继续开单
  continueCreate(){
    if (this.data.type == 0 || this.data.type == 1){
      wx.navigateBack({
        delta:2
      })
      return
    }
    wx.navigateBack({
      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type && options.id){
      this.setData({
        type: options.type,
        orderId:options.id
      })
      this.setNavTitle()
    }else{
      wx.showToast({
        title: '页面参数异常',
        icon:'none'
      })
    }
  },
  setNavTitle() {
    switch (this.data.type) {
      case '0':
        wx.setNavigationBarTitle({
          title: '新建出库单',
        })
        break;
      case '1':
        wx.setNavigationBarTitle({
          title: '新建入库单',
        })
        break;
      case '2':
        wx.setNavigationBarTitle({
          title: '新建调拨单',
        })
        break;
      case '3':
        wx.setNavigationBarTitle({
          title: '新建盘点单',
        })
        break;
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