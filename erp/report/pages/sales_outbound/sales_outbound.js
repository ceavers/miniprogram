// report/pages/sales_outbound/sales_outbound.js
import  {api} from "../../../utils/api/api.js"
import {putComma} from "../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //默认本月
    index: 0,
    recordList:[],  //记录列表
  },
  toDetail(e){
    var id = this.data.recordList[e.currentTarget.dataset.index].id
    wx.navigateTo({
       url: '/report/pages/sales_outbound_detail/sales_outbound_detail?id='+id+'&index='+this.data.index,
    })
  },
  chooseMouth(e){
    if (this.data.index != e.currentTarget.dataset.index) {
      this.setData({
        index: e.currentTarget.dataset.index
      })
      this.getPushGoodsList()
    }
  },

  // 获取商品出库列表
  getPushGoodsList(){
    var monthly
    if (this.data.index == '0') {
      monthly = new Date().getMonth() + 1
    } else if (this.data.index == '1') {
      monthly = new Date().getMonth()
    }
    wx.showLoading({
      title: '加载中...',
    })
    api.report.getPurchaseGoodsList({ monthly: monthly, type: false })
      .then(res => {
        let list = res.datas.products
        for(let i=0;i<list.length;i++){
          list[i].money = putComma(list[i].money)
        }
        this.setData({
          recordList: list
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
    this.getPushGoodsList()
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