// warehouse/pages/client_sales/client_sales.js
import {api} from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    salesData:[],
    product_id:0  //商品id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    console.log(options)
    this.setData({ product_id:options.goodsId})
    wx.showLoading({
      title: '加载中...',
    })
    api.warehouse.getClientSale({ product_id: this.data.product_id})
      .then(rea=>{
        var list = rea.datas.results
        _this.setData({ salesData:list})
        wx.hideLoading()
      })
      .catch(err=>{
        wx.hideLoading()
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