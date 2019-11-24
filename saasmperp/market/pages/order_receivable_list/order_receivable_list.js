// 订单应付列表
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    pagesIndex: 1,
    orderReceivableList: {},//订单应付列表    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId: options.userId
    })
    this.getOrderReceivableList();
  },
  //获取订单应付列表
  getOrderReceivableList(){
    api.market.getOrderReceivableList({
      supplier_id: this.data.userId,
      user_supplier_type: 0,
    }).then(res => {
      if(res.code == 1){
        let orderReceivableList = {}
        res.datas.order.forEach(item => {
          let today = new Date().toLocaleDateString().replace(/\//g, "-");
          let date = new Date(item.date * 1000).toLocaleDateString().replace(/\//g, "-");
          if (today == date) {
            date = '今天'
          }
          item.cdate = date
          if (orderReceivableList[date]) {
            orderReceivableList[date].push(item)
          } else {
            orderReceivableList[date] = [item]
          }
        })
        this.setData({
          orderReceivableList
        })
      }
    }).catch(res => {
      console.error(res)
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