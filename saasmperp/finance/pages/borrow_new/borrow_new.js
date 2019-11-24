// finance/pages/borrow_new/borrow_new.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shadow:false,
    cp_type: '请选择',
    loaner_name:"",
    loan_sum:"",
    show:false,
    startTime:"",
    indexId:"",
    items: [
      { value:'支付宝' ,id:"0"},
      { value:'微信支付',id:"1"},
      { value:'现金支付',id:"2"},
    ]
  },
  loaner_name(e){
    console.log(e)
    console.log(e.detail.value)
    let that =this
    that.setData({
      loaner_name:e.detail.value
    })
  },
  loan_sum(e){
    console.log(e)
    console.log(e.detail.value)
    let that = this
    that.setData({
      loan_sum: e.detail.value
    })
  },
  xianjinInfo(){
    this.setData({
      shadow:true
    })
  },
  radioChange(e) {
    let that = this
    that.setData({
      shadow: false,
      cp_type: e.detail
    })
  },
  journal_id(e){
    let that = this
    that.setData({
      indexId: e.journal_id
    })
  },
  indexInfo(e){
   console.log(e)
    let that = this
    that.setData({
       indexId:e.detail
    })
  },
  starttime(){
   let that =this
     that.setData({
       show:true
     })
  },
  setTime(e) {
    console.log(e)
    let that = this
    let time = e.detail.year + "年" + e.detail.month + "月" + e.detail.day + "日"
    that.setData({
      startTime: time
    })
  },
  lit(){
    wx.navigateBack({
      delta:1
    })
  },
  new_borrow(){
    let that = this
    if (that.data.loaner_name == "" || that.data.loan_sum == "" || that.data.record_time=="" || that.data.account==""){
      wx.showToast({
        title: '请正确输入',
        icon: 'none',
        duration: 1500
      })
    }else{
      let data = {
        loan_type: 0,
        loaner_name: that.data.loaner_name,
        loan_sum: that.data.loan_sum,
        record_time: that.data.starttime,
        account: {
          account_id: that.data.indexId,
          account_name: that.data.cp_type,
        },
      }
      api.finance.borrowNew(data)
        .then(res => {
          if (res.code == 1) {
            console.log(res)
            wx.showToast({
              title: '新建成功',
              icon: 'none',
              duration: 1500
            })
            setTimeout(function () {
              wx.navigateBack({
                data: 1
              })
            }, 2000)
          }
        })
        .catch(err => {
          console.log(res)
        })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function (options) {

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