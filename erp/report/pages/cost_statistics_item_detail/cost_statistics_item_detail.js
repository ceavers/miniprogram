// report/pages/cost_statistics_item_detail/cost_statistics_item_detail.js
import {api} from '../../../utils/api/api.js'
import { putComma } from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList:[],
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.index){
      const data = {
        monthly: options.month,
        year: options.year
      }
      api.report.getStatisticsDetail(data)
      .then(res=>{
        res.datas.items[options.index].items.forEach(item=>{
          item.money_p = putComma(item.money)
        })
        this.setData({
          itemList: res.datas.items[options.index].items
        })
        let total =0
        this.data.itemList.forEach(item=>{
          total += item.money;
        })
        total = putComma(total)
        this.setData({
          total: total
        })
      })
      .catch(err=>{

      })
    }else{
      wx.showToast({
        title: '页面参数异常',
        icon:'none'
      })
    }
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