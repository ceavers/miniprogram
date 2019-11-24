// report/pages/inventory_statistics/inventory_statistics.js
import {api} from "../../../utils/api/api.js"
import { colorList } from "../../utils/color.js"
import { putComma } from "../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList:[],  //记录数据
    stock_total:0,   //总库存
  },
  toDetailPage(e){
    var id = this.data.recordList[e.currentTarget.dataset.index].depo_id
    wx.navigateTo({
      url: '/report/pages/inventory_statistics_detail/inventory_statistics_detail?id='+id,
    })
  },

  // 绘画进度条
  lineAni(width,color) {
    let lineAni = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
      delay: 50
    })
    lineAni.backgroundColor(color).width(width).step();//step每个步骤结束必写
    return lineAni.export()
  },

  //获取存货统计列表
  getStockStatisticsList(){

    wx.showLoading({
      title: '加载中...',
    })
    api.report.getStockStatisticsList({})
      .then(res=>{
        let list = res.data.datas
        let stock_total=res.data.stock_total
        if (stock_total>10000){
          stock_total = (stock_total/10000).toFixed(2) +'万'
        }
        for(let i=0;i<list.length;i++){
          list[i].color = colorList[i]
          if (list[i].depo_money<10000){
            list[i].depo_money = putComma(list[i].depo_money)
          }else{
            list[i].depo_money = (list[i].depo_money/10000).toFixed(2)+'万'
          }
        }
        this.setData({
          recordList: list,
          stock_total: stock_total
        })
        setTimeout(()=>{
          let list = res.data.datas
          for(let i=0;i<list.length;i++){
            list[i].anmiate = this.lineAni(list[i].scale+'%',list[i].color)
          }
          this.setData({
            recordList:list
          })
        },100)
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

    this.getStockStatisticsList()
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