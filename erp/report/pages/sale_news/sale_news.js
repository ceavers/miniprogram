// report/pages/sale_news/sale_news.js
import {api} from "../../../utils/api/api.js"
import {colorList} from "../../utils/color.js"
import { putComma } from "../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choice:'d', //选择 d-日报 m-月报 q-季报
    totalList:[], //获取的总数据
    recordList:[], //记录列表
    page_index:1  //分页
  },

  //点击切换 日、月、季 
  bindChoice(e){
    var choiceid = e.currentTarget.dataset.choiceid
    if (this.data.choice != choiceid){
      this.setData({
        choice: choiceid
      })
      this.getSaleNews()
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

  // 销售报表接口
  getSaleNews(){
    let dmq = this.data.choice
    wx.showLoading({
      title: '加载中...',
    })
    api.report.getSaleNews({ dmq: dmq})
      .then(res=>{
        let recordList = res.datas.sale_reports
        for (let i = 0; i < recordList.length;i++){
          recordList[i].rate = recordList[i].rate.toFixed(0);
          recordList[i].color = colorList[i]
          if(this.data.choice == 'm'){
            recordList[i].date = recordList[i].date.split('-')[0] + '-' + recordList[i].date.split('-')[1]
          }
          recordList[i].sale_gross1 = putComma(recordList[i].sale_gross)
        }
        let list1 = res.datas
        list1.total = putComma(list1.total_sale_gross)
        this.setData({
          totalList: list1,
          recordList: recordList
        })
        setTimeout(() => {
          let list = [...this.data.recordList]
          for (let i = 0; i < list.length; i++) {
            let width = list[i].rate
            if (width > 100) {
              width = 100 + "%"
            }else{
              width = width+'%'
            }
            list[i].anmiate = this.lineAni(width,list[i].color)
          }
          this.setData({
            recordList: list
          })
        },100)
        wx.hideLoading()
      })
      .catch(err=>{
        wx.hideLoading()
      })
  },

  //销售报表详情
  toSaleNewsInfo(e){
    let index = e.currentTarget.dataset.index
    let data = JSON.stringify(this.data.recordList[index])
    let choice = this.data.choice
    let num = this.data.totalList.total_sale_gross
    wx.navigateTo({
      url: '../sale_newsInfo/sale_newsInfo?data=' + data + '&choice=' + choice+'&num='+num,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSaleNews()
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