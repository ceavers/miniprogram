// market/pages/sell_invoice_modify_wuliu_information/sell_invoice_modify_wuliu_information.js
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderMes: {},
    orderId: ''
  },
  //修改物流费用页面
  toModifyWuliuCosts(){
    wx.navigateTo({
      url: '/market/pages/sell_invoice_modify_wuliu_costs/sell_invoice_modify_wuliu_costs?orderId=' + this.data.orderId + '&date=' + this.data.orderMes.date + '&money=' + this.data.orderMes.courier_money
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId: options.orderId
    })
  },
  //获取销售单
  getSellInvoiceList() {
    api.sellInvoice.getSellInvoiceList({
      user_id: 1,//本人id
      user_name_order_id: this.data.orderId,
    }).then(res => {
      if (res.code == 1) {
        let orderMes = res.datas.sale_order[0]
        orderMes.cdate = new Date(orderMes.date * 1000).toLocaleDateString().replace(/\//g, "-");
        this.setData({
          orderMes,
        })
      }
    })
  },
  //确认修改
  editOrder(e) {
    api.market.editOrder({
      order_id: this.data.orderId,
      order_type: 0,
      logistics: e.detail.value.courierName,
      logistics_id: e.detail.value.orderId
    }).then(res => {
      if (res.code == 1) {
        wx.navigateBack({
          detal: 1
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
    this.getSellInvoiceList();
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