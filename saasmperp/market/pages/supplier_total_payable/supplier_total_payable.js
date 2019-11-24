// market/pages/supplier_total_payable/supplier_total_payable.js
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    supplierId: '',//供应商id
    payMoneyList: {},//应付列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      supplierId: options.id
    })
    this.getSupplierShouldPayMoney();
  },
  //获取应付列表
  getSupplierShouldPayMoney(){
    api.market.getSupplierShouldPayMoney({
      user_id: 1,
      page_index: 1,
      page_size: 10
    }).then(res => {
      if(res.code == 1){
        let payMoneyList = {}
        res.datas.should_pay.forEach(item => {
          let today = new Date().toLocaleDateString().replace(/\//g, "-");
          let date = new Date(item.date * 1000).toLocaleDateString().replace(/\//g, "-");
          if (today == date) {
            date = '今天'
          }
          item.cdate = date
          if (payMoneyList[date]) {
            payMoneyList[date].push(item)
          } else {
            payMoneyList[date] = [item]
          }
        })
        this.setData({
          payMoneyList
        })
      }
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