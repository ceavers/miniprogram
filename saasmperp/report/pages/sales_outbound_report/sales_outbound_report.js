// report/pages/sales_outbound_report/sales_outbound_report.js
import {api} from "../../../utils/api/api.js"
import { colorList } from "../../utils/color.js"
import { putComma } from "../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //默认本月
    index: 0,
    recordList:[], //记录列表
    outbound_gross:0, //出库总数
  },
  chooseMouth(e) {
    if (this.data.index != e.currentTarget.dataset.index){
      this.setData({
        index: e.currentTarget.dataset.index
      })
      this.getMonthlyPurchase(this.data.index)
    }
  },
  toDetailPage(e) {
    let list = this.data.recordList[e.currentTarget.dataset.index]
    list.anmiate=null
    let data = JSON.stringify(list)
    wx.navigateTo({
      url: '/report/pages/sales_outbound_report_detail/sales_outbound_report_detail?data='+data,
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

  // 获取出库月报列表
  getMonthlyPurchase(index) {
    let data = {
      type: false
    }
    let month = new Date().getMonth()+1
    if(index == 0){
      data.monthly = month
    }else if(index == 1){
      data.monthly = month-1
      if (month == 1){
        data.monthly =12
        data.year = new Date().getFullYear()-1
      }
    }else if(index == 2){
      data.year = new Date().getFullYear()
    }
    wx.showLoading({
      title: '加载中...',
    })
    api.report.getMonthlyPurchase(data)
      .then(res => {
        // console.log(res)
        let list = [...res.data.datas]
        for (let i = 0; i < list.length; i++) {
          list[i].date = list[i].date.split('-')[0] + '-' + list[i].date.split('-')[1]
          let year = new Date().getFullYear()
          if (list[i].date.split('-')[0] == year && list[i].date.split('-')[1] == month){
            list[i].date = '本月'
          }
          if (month != 1 && list[i].date.split('-')[0] == year && list[i].date.split('-')[1] == month-1){
            list[i].date = '上月'
          } else if (month == 1 && list[i].date.split('-')[0] == year - 1 && list[i].date.split('-')[1] == 12){
            list[i].date = '上月'
          }
          list[i].color = colorList[i]
          if (list[i].number >= 10000) {
            list[i].number = (list[i].number / 10000).toFixed(2) + '万'
          }else{
            list[i].number = putComma(list[i].number)
          }
          list[i].money = putComma(list[i].money)
        }
        this.setData({
          recordList: list,
          outbound_gross: putComma(res.data.outbound_gross)
        })
        setTimeout(() => {
          for (let i = 0; i < list.length; i++) {
            list[i].anmiate = this.lineAni(list[i].rate,list[i].color)
          }
          this.setData({
            recordList: list
          })
        }, 100)
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
    this.getMonthlyPurchase(0)
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