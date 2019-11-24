// market/pages/select_time/select_time.js
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disountObj: {},
    orderId: '',
    showSelectDateModal: false,//选择时间弹窗flag
    dateObj: {},
    accountList: [],//账户类型列表
    showAccountListModal: false,//账户类型弹窗
    account: {},//选择账户
    money: '',//物流费用
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let firstdate = new Date(options.date * 1000)
    let dateObj = {
      date: firstdate.toLocaleDateString(),
      timeStamp: options.date
    }
    console.log(options)
    this.setData({
      dateObj,
      orderId: options.orderId,
      money: options.money
    })
    this.getAccountList();
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
  //选择时间
  selectDate() {
    this.setData({
      showSelectDateModal: true
    })
  },
  //确认选择时间
  confirmDate(e) {
    let timeStamp = new Date(e.detail.year + '/' + e.detail.month + '/' + e.detail.day)
    let dateObj = {
      date: e.detail.year + '/' + e.detail.month + '/' + e.detail.day,
      timeStamp: timeStamp.getTime() / 1000
    }
    this.setData({
      dateObj
    })
  },
  //确认修改
  createOrder(e) {
    api.market.editOrder({
      order_id: this.data.orderId,
      order_type: 0,
      logistics_pay_money: e.detail.value.money,
      pay_account: this.data.account.account_id,
      logistics_is_pay: e.detail.value.moneyType ? 1 : 0
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