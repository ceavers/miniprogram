// market/pages/customer_mes/customer_mes.js
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    supplierId: '',//供应商id
    lineAni: '',
    cumulativeSalesList: [],//历史
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      supplierId: options.id
    })
    this.getSupplierPurchaseHistory();
  },
  //获取历史列表
  getSupplierPurchaseHistory(){
    api.market.getSupplierPurchaseHistory({
      supplier_id: this.data.supplierId,
      page_index: 1,
      page_size: 10
    }).then(res => {
      if(res.code == 1){
        let cumulativeSalesList = res.datas.buy_history,
          _this = this;
        this.setData({
          cumulativeSalesList
        })
        cumulativeSalesList.forEach(item => {
          item.ani = _this.lineAni(item.month_sales_money, 100000)
          console.log(item.ani)
          if (item.month == (new Date()).getMonth() + 1) {
            item.month = '本月'
          } else if (item.month == (new Date()).getMonth()) {
            item.month = '上月'
          } else {
            item.month = item.month + '月'
          }
        })
        this.setData({
          cumulativeSalesList
        })
      }
    })
  },
  //线条动画
  /**
   * actual 实际销售金额
   * target 目标销售金额
   */
  lineAni(actual, target) {
    let lineAni = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear',
      delay: 1000
    })
    let lineWidth = (actual / target) * 100 + '%'
    lineAni.width(lineWidth).step();//step每个步骤结束必写
    return lineAni.export()
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