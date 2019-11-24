// finance/pages/bus_list/bus_list.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shadow: false,
    shadow1:false,
    itmes:"",
    sup_name:"",
    sup_no:"",
    payable_name:"",
    payable_sum:"",
    pre_payable_sum:"",
    sup_address:"",
    contact_name:"",
    contact_tel:"",
  },
  caigou:function(){
    let that =this
    wx.navigateTo({
      url: '../caigou_page/caigou_pay',
    })
   that.setData({
     shadow:false,
     shadow1:false,
   })
  },
  bkp_input(e){
    let that =this
     console.log(e.detail.value)
     let data={
       query_content: e.detail.value,
     }
    api.finance.busListCX(data)
      .then(res => {
        if (res.code == 1) {
          console.log(res)
          that.setData({
            itmes: res.datas.payables
          })
        }
      })
      .catch(err => {
      })
  },
  payment_yufu:function(){
     let that =this
     wx.navigateTo({
       url: '../yufu_pay/yufu_pay',
     })
    that.setData({
      shadow: false,
      shadow1: false,
    })
  },
  showModal: function (e) {
    console.log(e)
    let that = this
    that.setData({
      shadow: true
    })
    let data = {
      payable_id:e.currentTarget.dataset.id
    }
    api.finance.busListXQ(data)
      .then(res => {
        if (res.code == 1) {
          console.log(res)
          that.setData({
            payable_name: res.data.payable_name,
            payable_sum: res.data.payable_sum,
            pre_payable_sum: res.data.pre_payable_sum,
            contact_name: res.data.supplier.contact_name,
            contact_tel: res.data.supplier.contact_tel,
            sup_address: res.data.supplier.sup_address,
            sup_headpic: res.data.supplier.sup_headpic,
            sup_name: res.data.supplier.sup_name,
            sup_no: res.data.supplier.sup_no
          })
        }
      })
      .catch(err => {
      })

  },
  remove: function () {
    let that = this
    that.setData({
      shadow: false
    })
  },
  fukuan:function(){
    let that=this
    that.setData({
      shadow1:true
    })
  },
  payment_btn:function(){
    let that = this
    that.setData({
      shadow1: false
    })
  },
  bottom_btn: function () {
    wx.navigateTo({
      url: '../new_bus/new_bus',
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that =this
    let data = {
      token: wx.getStorage({
        key: "token"
      })
    }
    api.finance.busList(data)
      .then(res => {
        if (res.code == 1) {
          console.log(res)
          that.setData({
            itmes:res.datas.payables
          })
        }
      })
      .catch(err => {
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