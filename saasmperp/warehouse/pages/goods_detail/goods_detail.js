// warehouse/pages/goods_detail/goods_detail.js
import {api} from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    salesData:[],
    product_id:0,//商品id
  },
  toSalesDetailPage(e){
    console.log(e)
    var id = e.currentTarget.dataset.id;  //点击的角标
    let goods_detail = JSON.stringify(this.data.salesData[id])
    wx.navigateTo({
      url: '/warehouse/pages/sales_history/sales_history?goods_detail=' + goods_detail,
    })
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    this.setData({
      product_id:options.goodsId
    })

    //昨天的时间
    var day1 = new Date();
    day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
    var lastmonth = (day1.getMonth() + 1)
    var lastdate = day1.getDate()
    if (lastmonth<10){
      lastmonth = '0' + lastmonth
    }
    if (lastdate<10){
      lastdate = "0" + lastdate
    }
    var yesterday = day1.getFullYear() + "-" + lastmonth + "-" + lastdate;

    //今天的时间
    var day2 = new Date();
    day2.setTime(day2.getTime());
    var month = (day2.getMonth() + 1)
    var date = day2.getDate()
    if (month<10){
      month = "0" + month
    }
    if (date<10){
      date = "0" + date
    }
    var nowDay = day2.getFullYear() + "-" + month + "-" + date;

    console.log("昨天:", yesterday, "今天:", nowDay)
    wx.showLoading({
      title: '加载中...',
    })
    api.warehouse.getSaleDetail({ product_id: this.data.product_id})
      .then(res=>{
        let jsonStr = JSON.stringify(res.datas.results)
        var salesData = JSON.parse(jsonStr)
        for (var i = 0; i < salesData.length;i++){
          
          if (salesData[i].date === nowDay){
            salesData[i].date="今天"
          }
          if (salesData[i].date === yesterday){
            salesData[i].date = "昨天"
          }
        }
        _this.setData({
          salesData: salesData
        })
        wx.hideLoading()
      })
      .catch(err=>{
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