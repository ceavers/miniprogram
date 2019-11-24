// market/pages/purchasing_payment/purchasing_payment.js
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    supplierId: '',
    payMoney: 0,
    account: {},
    accountList: [],
    showAccountModal: false,//显示账户列表flag
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.name,
      supplierId: options.id,
      payMoney: options.money
    })
    this.getAccountList()
  },
  //获取账户列表
  getAccountList(){
    api.market.getAccountList({

    }).then(res => {
      if(res.code == 1){
        this.setData({
          accountList: res.datas.accounts,
          account: res.datas.accounts[0]
        })
      }
    })
  },
  //显示账户列表
  showAccountModal(){
    this.setData({
      showAccountModal: true
    })
  },
  //选择账户
  selectAccount(e){
    this.setData({
      account: this.data.accountList[e.detail]
    })
  },
  //去采购列表
  gotoPaymoney(){
    wx.navigateTo({
      url: '/market/pages/supplier_total_payable/supplier_total_payable?id=' + this.data.supplierId,
    })
  },
  //确认付款
  confirmCharge(e){
    api.market.payPurchaseMoney({
      supply_id: this.data.supplierId,
      should_pay: this.data.payMoney,
      actually_money: e.detail.value.amountCollected,
      pay_account: this.data.account.account_id,
      note: e.detail.value.remark
    }).then(res => {
      if(res.code == 1){
        wx.showToast({
          title: '付款成功',
        })
        setTimeout(() => {
          wx.navigateBack({
            detal: 1
          })
        },1000)
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