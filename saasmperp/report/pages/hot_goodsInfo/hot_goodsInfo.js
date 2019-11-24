// report/pages/hot_goodsInfo/hot_goodsInfo.js
import {api} from "../../../utils/api/api.js"
import {putComma} from "../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product_id:0, //商品Id
    index:0,  //0-当前月 1-上个月
    goodsInfo:[]  //商品信息
  },

  // 获取商品信息
  getHotGoodsInfo(){
    var _this = this
    let data = {
      product_id: this.data.product_id,
    }
    const month = new Date().getMonth() + 1
    if (this.data.index == 0){
      data.monthly = month
    }else if(this.data.index == 1){
      data.monthly = month -1
      if (month == 1){
        data.monthly=1
        data.year = new Date().getFullYear() -1
      }
    }
    wx.showLoading({
      title: '加载中...',
    })
    api.report.getHotGoodsInfo(data)
      .then(res => {
        let list = res.data
        list.sale_gross = putComma(list.sale_gross)
        list.gross_profit = putComma(list.gross_profit)
        _this.setData({
          goodsInfo: res.data
        })
        wx.hideLoading()
      })
      .catch(err => {
        wx.hideLoading()
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      product_id:options.goodsId,
      index: options.index
    })
    this.getHotGoodsInfo()
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