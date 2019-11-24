// market/pages/purchase_invoice_pay/purchase_invoice_pay.js
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    orderMes: {},
    disountObj: {},
    accountList: [],//账户类型列表
    showAccountListModal: false,//账户类型弹窗
    account: {},//选择账户
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let firstdate = new Date()
    let dateObj = {
      date: firstdate.toLocaleDateString(),
      timeStamp: firstdate.getTime() / 1000
    }
    console.log(options)
    this.setData({
      dateObj,
      orderId: options.orderId,
    })
    this.getAccountList();
    this.getSellInvoiceList();
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
  //选择时间
  selectDate() {
    this.setData({
      showSelectDateModal: true
    })
  },
  //确认选择时间
  confirmDate(e) {
    console.log(e)
    let timeStamp = new Date(e.detail.year + '/' + e.detail.month + '/' + e.detail.day)
    let dateObj = {
      date: e.detail.year + '/' + e.detail.month + '/' + e.detail.day,
      timeStamp: timeStamp.getTime() / 1000
    }
    this.setData({
      dateObj
    })
    
  },
  //获取账户类型
  getAccountList() {
    api.market.getAccountList({

    }).then(res => {
      if (res.code == 1) {
        this.setData({
          accountList: res.datas.accounts,
          account: res.datas.accounts[0]
        })
      }
    })
  },
  //显示账户列表
  showAccountListModal() {
    this.setData({
      showAccountListModal: true
    })
  },
  //选择账户类型
  getAccount(e) {
    console.log(e)
    this.setData({
      account: this.data.accountList[e.detail]
    })
  },
  //确认修改
  createOrder(e) {
    api.market.editOrder({
      order_id: this.data.orderId,
      date: this.data.dateObj.timeStamp,
      note: e.detail.value.remark
    }).then(res => {
      if (res.code == 1) {
        wx.navigateBack({
          detal: 1
        })
      }
    })
  },
  //确认收款
  confirmReceipt(e){
    wx.showToast({
      title: '收款成功',
    })
    setTimeout(() => {
      wx.navigateBack({
        detal: 1
      })
    },1000)
    
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