// report/pages/cash_flow/cash_flow.js
import {api} from '../../../utils/api/api.js'
import { putComma } from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //默认本月
    index: 0,
    detail:null,
    cashFlowYear:null
  },
  chooseMouth(e) {
    if (e.currentTarget.dataset.index==this.data.index){
      return
    }
    this.setData({
      index: e.currentTarget.dataset.index
    })
    if (this.data.index == 0 || this.data.index == 1){
      let month = new Date().getMonth()+1;
      const data={}
      data.monthly = month
      if (this.data.index == 1){
        data.monthly = month-1
        if (month == 1) {
          data.monthly = 12
          data.year = new Date().getFullYear() - 1
        }
      }
      this.getCashFlow(data)
    } else if (this.data.index == 2){
      this.getCashFlowByYear()
    }
  },
  toDetail(e){
    this.setData({
      index:3
    })
    const data={
      monthly:e.currentTarget.dataset.month
    }
    this.getCashFlow(data)
  },
  getCashFlow(data){
    api.report.getCashFlow(data)
    .then(res=>{
      let resData=res.data
      for (let prop in resData){
        for (let value in resData[prop]){
          resData[prop][value] = putComma(resData[prop][value])
        }
      }
      resData.income = putComma(resData.income)
      this.setData({
        detail: resData
      })  
    })
    .catch(err=>{

    })
  },
  getCashFlowByYear(){
    api.report.getCashFlowByYear()
    .then(res=>{
      const resData = res.datas
      resData.total_gross = putComma(resData.total_gross)
      resData.cash_flows.forEach(item=>{
        item.gross = putComma(item.gross)
      })
      this.setData({
        cashFlowYear: resData
      })
    })
    .catch(err=>{

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const data={
      monthly:new Date().getMonth()+1
    }
    this.getCashFlow(data)
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