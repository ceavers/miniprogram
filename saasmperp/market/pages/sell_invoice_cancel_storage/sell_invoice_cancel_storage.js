// market/pages/sell_invoice_cancel_storage/sell_invoice_cancel_storage.js
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    depo_name:"",
    imageUrl:"",
    imagetext:"",
    goods_number:"",
    product_color:"",
    product_size:"",
    product_price: "",
    product_count: "",
  },
  button(){
    let that = this
    let data = {
      supplier_id: wx.getStorageSync('customer_id'),
      product_id:wx.getStorageSync('product_id'),
      count: that.data.product_count,
      color: that.data.product_color,
      size: that.data.product_size,
      
    }
    api.warehouse2.getWarehouse(data)
      .then(res => {
        if (res.code == 1) {
          console.log(res)
          wx.navigateBack({
            delta: 1
          })
        }
      })
      .catch(err => {

      })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that =this
      that.setData({
        depo_name:wx.getStorageSync('depo_name'),
        imageUrl:wx.getStorageSync('imageUrl'),
        imagetext:wx.getStorageSync('imagetext'),
        goods_number:wx.getStorageSync('goods_number'),
        product_color:wx.getStorageSync('product_color'),
        product_size:wx.getStorageSync('product_size'),
        product_price:wx.getStorageSync('product_price'),
        product_count:wx.getStorageSync('product_count'),
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