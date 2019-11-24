// report/pages/customer_statisticsInfo/customer_statisticsInfo.js
import  {api} from "../../../utils/api/api.js"
import {colorList} from "../../utils/color.js"
import {putComma} from "../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customer_id:0,  //客户id
    choice:0,  
    recordList:[],  //记录列表
    historyList:[], //历史记录
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

  // 客户销售详情接口
  getCustomerStatisticsInfo(){
    let data = {
      customer_id: this.data.customer_id,
    }
    const month = new Date().getMonth() + 1
    if (this.data.choice==1){
      data.monthly = month
    } else if (this.data.choice == 2){
      data.monthly = month -1
      if (month == 1){
        data.monthly = 12
        data.year = new Date().getFullYear() -1
      }
    } else if (this.data.choice == 3){
      data.year = new Date().getFullYear()
    }
    wx.showLoading({
      title: '加载中...',
    })
    api.report.getCustomerStatisticsInfo(data)
      .then(res=>{
        let historyList = res.datas.customer_sale.history_brief_sales
        for (let i = 0; i < historyList.length;i++){
          historyList[i].color = colorList[i]
          historyList[i].sale_gross = putComma(historyList[i].sale_gross)
        }
        let recordList = res.datas.customer_sale.current_sale
        recordList.sale_gross = putComma(recordList.sale_gross)
        recordList.sale_gross_profit = putComma(recordList.sale_gross_profit)
        this.setData({
          recordList: recordList,
          historyList: historyList
        })
        setTimeout(()=>{
          let list = res.datas.customer_sale.history_brief_sales
          for(let i=0;i<list.length;i++){
            let width = list[i].percent
            if (width>100){
              width = 100 +'%'
            }else{
              width = width + '%'
            }
            list[i].anmiate = this.lineAni(width, list[i].color)
          }
          this.setData({
            historyList:list
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
    this.setData({
      customer_id:options.id,
      choice: options.choice
    })
    this.getCustomerStatisticsInfo();
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