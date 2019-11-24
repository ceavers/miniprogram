// market/pages/supplier_water_detail/supplier_water_detail.js
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payId: '',
    detailMes: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      payId: options.waterId
    })
    this.getSupplierPayHistory();
  },
  //获取付款历史详情信息
  getSupplierPayHistory(){
    api.market.getSupplierPayHistory({
      user_id: 1,
      pay_id:  this.data.payId
    }).then(res => {
      if(res.code == 1){
        res.datas.pay_list[0].date = new Date(res.datas.pay_list[0].date * 1000).toLocaleDateString().replace(/\//g, "-");
        this.setData({
          detailMes: res.datas.pay_list[0]
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