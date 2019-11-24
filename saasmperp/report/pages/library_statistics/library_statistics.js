// report/pages/library_statistics/library_statistics.js
import {api} from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //默认本月
    index: 0, 
    recordList: [],  //记录列表
  },
  toDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/report/pages/library_statistics_detail/library_statistics_detail?id='+id,
    })
  },
  chooseMouth(e) {
    if (e.currentTarget.dataset.index != this.data.index) {
      this.setData({
        index: e.currentTarget.dataset.index
      })
      this.getDepositGoodsList(this.data.index)
    }
  },

  // 获取商品入库列表
  getDepositGoodsList(index){
    let data = { type:true}
    let month = new Date().getMonth()+1
    if(index == 0){
      data.monthly = month
    }else if(index ==1){
      data.monthly = month-1
      if (month == 1){
        data.monthly = 12
        data.year = new Date().getFullYear()-1
      }
    }
    wx.showLoading({
      title: '加载中...',
    })
    api.report.getDepositGoodsList(data)
      .then(res=>{
        // console.log(res)
        this.setData({
          recordList: res.datas.products
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
    this.getDepositGoodsList(this.data.index)
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