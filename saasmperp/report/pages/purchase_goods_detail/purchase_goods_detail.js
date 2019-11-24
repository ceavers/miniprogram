// report/pages/purchase_goods_detail/purchase_goods_detail.js
import {api} from "../../../utils/api/api.js"
import { putComma } from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    produce_id:0, //商品id
    index:0,  //0-本月 1-上月
    recordList: [] //记录列表
  },

  // 获取商品入库明细
  getPushGoodsInfo(){
    let monthly
    if(this.data.index == '0'){
      monthly=new Date().getMonth()+1
    }else if(this.data.index == '1'){
      monthly=new Date().getMonth()
    }
    console.log()
    wx.showLoading({
      title: '加载中...',
    })
    api.report.getPurchaseGoodsDetail({ produce_id: this.data.produce_id, monthly: monthly,type:true})
      .then(res=>{
        // console.log(res)
        res.data.depo_product.depo_gross = putComma(res.data.depo_product.depo_gross )
        this.setData({
          recordList: res.data.depo_product
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
    this.setData({
      produce_id:options.id,
      index:options.index
    })
    this.getPushGoodsInfo()
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