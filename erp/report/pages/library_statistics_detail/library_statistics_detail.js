// report/pages/library_statistics_detail/library_statistics_detail.js
import {api} from "../../../utils/api/api.js"
import { putComma } from "../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList:[],  //记录列表
  },

  // 获取商品入库详情
  getDepositGoodsInfo(id){
    wx.showLoading({
      title: '加载中...',
    })
    api.report.getDepositGoodsInfo({ produce_id:id,type:true})
      .then(res=>{
        console.log(res)
        let list = res.data.depo_product
        list.depo_gross = putComma(list.depo_gross)
        this.setData({
          recordList: list
        })
        wx.hideLoading()
      })
      .catch(err=>{
        wx.hideLoading()
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id)
    this.getDepositGoodsInfo(options.id)
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