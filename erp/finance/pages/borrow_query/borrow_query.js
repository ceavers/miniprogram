// finance/pages/borrow_query/borrow_query.js
import {
  api
} from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cp_type: "请选择",
    shadow: false,
    items: [],
    bus_type: "请选择",
    shadow1: false,
    items1: [],
    show: false,
    startTime: "2019-1-1",
    endtime: "2019-1-1",
    inputdata1: "",
    inputdata: "",
    loan_type: "",
    account_id: ""
  },
  radioChange(e) {
    let that = this
    that.setData({
      shadow: false,
      cp_type: e.detail,
    })
  },
  radioChange1(e) {
    let that = this
    that.setData({
      shadow1: false,
      bus_type: e.detail,
    })
  },
  type() {
    let that = this
    that.setData({
      shadow: true,
      items: [{
          value: '请选择',
        },
        {
          value: '借入',
          id: "0"
        },
        {
          value: '借出',
          id: "1"
        },
      ]
    })
  },
  endtime() {
    let that = this
    that.setData({
      show1: true
    })
  },
  //选择初始时间
  starttime() {
    let that = this
    that.setData({
      show: true
    })
  },
  bus_type() {
    let that = this
    that.setData({
      shadow1: true,
      items1: [{
          value: '请选择',
        },
        {
          value: '现金账户',
          id: "0"
        },
        {
          value: '支付宝',
          id: "1"
        },
        {
          value: '微信',
          id: "2"
        },
      ]
    })
  },
  setTime(e) {
    console.log(e)
    let that = this
    let time = e.detail.year + "-" + e.detail.month + "-" + e.detail.day 
    that.setData({
      startTime: time
    })
  },
  setTime1(e) {
    console.log(e)
    let that = this
    let time = e.detail.year + "-" + e.detail.month + "-" + e.detail.day 
    that.setData({
      endtime: time
    })
  },
  remove(e) {
    let that = this
    that.setData({
      cp_type: "请选择",
      shadow: false,
      items: [],
      bus_type: "请选择",
      shadow1: false,
      items1: [],
      show: false,
      startTime: "",
      endtime: "",
      inputdata1: "",
      inputdata: "",
      journal_id: ""
    })
  },
  indexInfo(e) {
    console.log(e)
    let that = this
    that.setData({
      loan_type: e.detail
    })
  },
  indexInfo1(e) {
    console.log(e)
    let that = this
    that.setData({
      account_id: e.detail
    })
  },
  loaner_name(e) {
    let that = this
    that.setData({
      loaner_name: e.detail.value
    })
  },
  submit() {
    let that = this
    let data = {
      loan_type: that.data.loan_type,
      loaner_name: that.data.loaner_name,
      account_id: that.data.account_id,
      start_time: that.data.startTime,
      end_timeL: that.data.endtime,
      journal_id: that.data.journal_id,
    }
      api.finance.borrowCx(data)
        .then(res => {
          if (res.code == 1) {
            wx.setStorage({
              key: 'query',
              data: 1,
            })
             wx.navigateBack({
               data:1
             })
             wx.setStorage({
               key: 'loans',
               data: res.datas.loans,
             })
            wx.setStorage({
              key: 'starttime',
              data: that.data.startTime,
            })
            wx.setStorage({
              key: 'type',
              data: that.data.loan_type,
            })
            wx.setStorage({
              key: 'nickname',
              data: that.data.loaner_name,
            })
          }
        })
        .catch(err => {
        })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})