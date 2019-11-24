// warehouse/pages/monthly_sales/monthly_sales.js
import {api} from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product_id:0,  //商品id
    salesData:[],   //销售列表
    nowMonth:'',  //本月
    lastMonth:'', //上月
  },
  lineAni(width) {
    let lineAni = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear',
      delay: 1000
    })
    lineAni.width(width).step();//step每个步骤结束必写
    return lineAni.export()
  },

  getDate(){
    // 本月
    var nowDate = new Date();
    var month = nowDate.getMonth() + 1
    if (month<10){
      month = "0" + month
    }
    var nowMonth = nowDate.getFullYear() + "-" + month
    // 上月
    var lastDate = new Date();
    lastDate.setMonth(lastDate.getMonth() - 1)
    var month2 = lastDate.getMonth() + 1
    if(month2<10){
      month2 = "0" + month2
    }
    var lastMonth = lastDate.getFullYear() + "-" + month2

    this.setData({
      nowMonth: nowMonth,
      lastMonth: lastMonth
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this 
    this.setData({ product_id: options.goodsId})

    _this.getDate();

    wx.showLoading({
      title: '加载中...',
    })
    api.warehouse.getMonthlySale({ product_id: this.data.product_id })
      .then(rea => {
        let jsonStr = JSON.stringify(rea.datas.results)
        var list = JSON.parse(jsonStr)
        for (var i = 0; i < list.length; i++) {
          if (list[i].month === _this.data.nowMonth) {
            list[i].month = "本月"
          }
          if (list[i].month === _this.data.lastMonth) {
            list[i].month = "上月"
          }
          if (list[i].amount > 10000) {
            list[i].amount2 = (list[i].amount / 10000).toFixed(2) + "万"
          }
        }
        _this.setData({ salesData: list })
        setTimeout(()=>{
          for (let j = 0; j < list.length;j++){
            const width = Math.round((list[j].amount / list[j].goal) * 100) + "%"
            list[j].anmiate = _this.lineAni(width)
          }
          _this.setData({ salesData: list})
        },100)
        wx.hideLoading()
      })
      .catch(err => {
        wx.hideLoading()
      })
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