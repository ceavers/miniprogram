// report/pages/warehouse_statistics_detail/warehouse_statistics_detail.js
import {api} from "../../../utils/api/api.js"
import { putComma } from "../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList:[],  //记录列表
  },

  //获取仓库统计详情
  getWarehouseStatisticsInfo(id){
    api.report.getWarehouseStatisticsInfo({ depo_id:id})
      .then(res=>{
        console.log(res)
        let list = res.data
        list.stock_money = putComma(list.stock_money)
        this.setData({
          recordList: list
        })
      })
      .catch(err=>{

      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    this.getWarehouseStatisticsInfo(id)
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