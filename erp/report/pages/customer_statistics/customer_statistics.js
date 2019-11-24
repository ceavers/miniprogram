// report/pages/customer_statistics/customer_statistics.js
import {api} from "../../../utils/api/api.js"
import {putComma} from "../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choice: 1, //选择 1-本月 2-上月 3-本年
    recordList:[],  //请求的数据
    total_sale:0, //合计收入
  },

  //头部 点击切换 
  bindChoice(e) {
    var choiceid = e.currentTarget.dataset.choiceid
    if (this.data.choice != choiceid) {
      this.setData({choice: choiceid})
      this.getCustomerStatisticsList()
    }
  },


  //接口
  getCustomerStatisticsList(){
    let choice = this.data.choice
    let data ={}
    const month = new Date().getMonth()+1
    if (choice == 1) {
      data.monthly = month
    } else if (choice == 2){
      data.monthly = month -1
      if (month == 1){
        data.monthly = 12
        data.year = new Date().getFullYear()-1
      }
    } else if (choice == 3){
      data.year = new Date().getFullYear()
    }
    wx.showLoading({
      title: '加载中...',
    })
    api.report.getCustomerStatisticsList(data)
      .then(res=>{
        // console.log(res)
        let list = res.datas.customer_sales
        for(let i=0;i<list.length;i++){
          list[i].sale_gross = putComma(list[i].sale_gross)
        }
        this.setData({
          recordList: res.datas.customer_sales,
          total_sale: putComma(res.datas.total_sale)
        })
        wx.hideLoading()
      })
      .catch(err=>{
        wx.hideLoading()
      })
  },

  // 跳转详情页
  toCustomerStatisticsInfo(e){
    const id = this.data.recordList[e.currentTarget.dataset.index].customer_id
    wx.navigateTo({
      url: '../customer_statisticsInfo/customer_statisticsInfo?id=' + id + '&choice=' + this.data.choice,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCustomerStatisticsList()
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