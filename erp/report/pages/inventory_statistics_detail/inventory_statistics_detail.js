// report/pages/inventory_statistics_detail/inventory_statistics_detail.js
import {api} from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList: [],  //记录数据
  },

  // 获取存货统计详情
  getStockStatisticsInfo(depo_id){
    api.report.getStockStatisticsInfo({ depo_id: depo_id})
      .then(res=>{
        console.log(res)
        let list = res.data
        list.stock_money = this.putComma(list.stock_money)
        this.setData({
          recordList: list
        })
      })
      .catch(err=>{
        
      })
  },

  //加逗号
  putComma(num){
    let numStr = num.toString()  
    let integer = numStr.split('.')[0]  //按小数点切 取整数
    let decimal = numStr.split('.')[1]  //取小数
    let reg = /(?=(\B)(\d{3})+$)/g  //加逗号正则 只适用于整数
    integer = integer.replace(reg,',')
    let res = integer
    if (decimal != undefined) {
      res = integer + '.' + decimal
    }
    return res
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var depo_id = options.id
    this.getStockStatisticsInfo(depo_id)
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