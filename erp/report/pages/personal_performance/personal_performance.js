// report/pages/personal_performance/personal_performance.js
import {api} from "../../../utils/api/api.js"
import { colorList, randomColor } from '../../utils/color.js'
import { putComma } from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0, //0-本月 1-上个月
    recordList:[],  //记录列表
  },

  // 头部点击事件
  bindNow(e) {
    if (this.data.index != e.currentTarget.dataset.index) {
      var index = e.currentTarget.dataset.index
      this.setData({
        index: e.currentTarget.dataset.index
      })
      this.getPerformanceList(index);
    }
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

  // 获取绩效列表
  getPerformanceList(index){
    let dat= {}
    const month = new Date().getMonth() + 1
    if(index == 0){
      dat.monthly = month
    }else if(index == 1){
      dat.monthly = month -1
      if (month == 1){
        dat.monthly = 12
        dat.year = new Date().getFullYear()-1
      }
    }
    wx.showLoading({
      title: '加载中...',
    })
    api.report.getPerformanceList(dat)
      .then(res=>{
        res.data.customers.forEach((item,index)=>{
          item.color = colorList[index] || randomColor()
          item.gross_sale1 = putComma(item.gross_sale)
        })
        this.setData({
          recordList: res.data.customers
        })
        setTimeout(()=>{
          let list = [...res.data.customers]
          for(let i=0;i<list.length;i++){
            let width = Math.round((list[i].gross_sale / list[i].total_sale) * 100)
            if (width > 100) {
              width = 100 + "%"
            } else {
              width = width + '%'
            }
            list[i].anmiate = this.lineAni(width, list[i].color)
          }
          this.setData({
            recordList: list
          })
        },50)
        wx.hideLoading()
      })
      .catch(err=>{
        wx.hideLoading()
      })
  },

  // 跳转至个人绩效详情页
  toPerformanceInfo(e){
    let index = e.currentTarget.dataset.index
    let id = this.data.recordList[index].customer_id
    wx.navigateTo({
      url: '../performanceInfo/performanceInfo?id='+id+'&index='+this.data.index,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPerformanceList(0)
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