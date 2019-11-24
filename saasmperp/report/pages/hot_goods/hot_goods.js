// report/pages/hot_goods/hot_goods.js
import {api} from "../../../utils/api/api.js"
import { putComma } from "../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:  0, //0-本月 1-上个月
    goodsList: [],  //商品列表
    // nowMonth: 0,  //本月
    // lastMonth: 0, //上月
    monthly:0,  //
  },

  // 头部点击事件
  bindNow(e){
    if (this.data.index != e.currentTarget.dataset.index) {
      var index = e.currentTarget.dataset.index
      this.setData({
        index: e.currentTarget.dataset.index
      })
      this.getHotList(index);
    }
  },

  // 获取热销商品列表
  getHotList(index){
    let data = {}
    const month = new Date().getMonth() + 1
    if (index == 0) {
      data.monthly = month
    } else if (index == 1) {
      data.monthly = month -1
      if (month == 1){
        data.monthly = 12,
        data.year = new Date().getFullYear()-1
      }
    }
    var _this = this
    wx.showLoading({
      title: '加载中...',
    })
    api.report.getHotGoodsList(data)
      .then(res => {
        let list = res.datas.hot_products
        for(let i=0;i<list.length;i++){
          list[i].gross_sale = putComma(list[i].gross_sale)
        }
        _this.setData({
          goodsList: list
        })
        wx.hideLoading()
      })
      .catch(err => {
        wx.hideLoading()
      })
  },


  // 跳转至 此商品销售额 页面
  toHotGoodsInfo(e){
    var goodsId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../hot_goodsInfo/hot_goodsInfo?goodsId=' + goodsId + '&index=' + this.data.index,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotList(0);
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