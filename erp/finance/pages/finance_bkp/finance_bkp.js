  // finance/pages/finance_bkp/finance_bkp.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[],
    shadow:false,
    customer_id:"",
    customer_name:"",
    receivable_name:"",
    pre_receivable_sum:"",
    receivable_sum:"",
    customer_address:"",
    head_people:"",
    customer_mobile:"",
    customer_headpic:"",
    show:false,
    shadow1:false,
    type_id:"",
    filterData:[
      {
        className: '客户列表',
        typeId: "custcat_id",
        data: [
          {
            name: '不限',
            id: -1,
            checked: true
          }
        ]
      },
      {
        className: '部门列表',
        typeId: "dept_id",
        data: [
          {
            name: '不限',
            id: -1,
            checked: true
          }
        ]
      },
      {
        className: '员工列表',
        typeId: "user_id",
        data: [
          {
            name: '不限',
            id: -1,
            checked: true
          }
        ]
      },
    ],
  },
  bkp_input(e){
    console.log(e)
    let that =this
    let data={
      query_content:e.detail.value
    }
    api.finance.bkpListCX(data)
      .then(res => {
        if (res.code == 1) {
          console.log(res)
          that.setData({
            items: res.datas.customer_cats
          })
        }
      })
      .catch(err => {
        console.log(1234)
      })
  },
  fukuan(){
    let that =this
    that.setData({
      shadow1:true
    })
  },
  caigou: function () {
    let that = this
    wx.navigateTo({
      url: '../caigou_page/caigou_pay',
    })
    that.setData({
      shadow: false,
      shadow1: false,
    })
  },
  payment_yufu: function () {
    let that = this
    wx.navigateTo({
      url: '../yufu_pay/yufu_pay',
    })
    that.setData({
      shadow: false,
      shadow1: false,
    })
  },
  payment_btn(){
    let that = this
    that.setData({
      shadow1: false
    })
  },
  remove(){
    let that =this 
    that.setData({
      shadow:false
    })
  },
  setFilterItem(e){
    let that =this
    console.log(e)
    const data=e.detail.value
    api.finance.bkpListSX(data)
      .then(res => {
        if (res.code == 1) {
          console.log(res)
         that.setData({
            items:res.datas.customer_cats
          })
        }
      })
      .catch(err => {
      })
  },
  bkp_img(){
    let that =this
    that.setData({
      show:true
    })
  },
  bkpXQ(e){
    let that = this
    that.setData({
      shadow: true
    })
   console.log(e)
    let data = {
      receivable_id: e.currentTarget.dataset.id,
    }
    api.finance.bkpListXQ(data)
      .then(res => {
        if (res.code == 1) {
          console.log(res)
        that.setData({
          customer_headpic: res.data.customer.customer_headpic,
          customer_id: res.data.customer.customer_id,
          customer_name: res.data.customer.customer_name,
          receivable_name: res.data.receivable_name,
          pre_receivable_sum: res.data.pre_receivable_sum,
          receivable_sum: res.data.receivable_sum,
          customer_address: res.data.customer.customer_address,
          head_people: res.data.customer.head_people,
          customer_mobile: res.data.customer.customer_mobile,
        })
        }
      })
      .catch(err => {
        console.log(1234)
      })
  },
  selectFilterItem(e){
    console.log(e)
    let that =this
    that.setData({
      type_id:e.detail
    })
    
  },
  selectFilterClass(e){
    console.log(e)
    that.setData({
      condition_name:e.detail
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
    api.finance.bkpList(data)
      .then(res => {
        if (res.code == 1) {
          console.log(res)
          that.setData({
            items:res.datas.customer_cats
          })
        }
      })
      .catch(err => {
        console.log(1234)
      })
    let data1 = {
      token: wx.getStorage({
        key: "token"
      })
    }
    api.finance.bkpListSXL(data1)
      .then(res => {
        if (res.code == 1) {
          console.log(res)
          if (!res.datas.filter_conditiones){
            wx.redirectTo({
              url: '../index/index',
            })
          }
          for (let i = 0; i < res.datas.filter_conditiones[0].condition.length; i++) {
            that.data.filterData[0].data.push(res.datas.filter_conditiones[0].condition[i])
          }
          for (let i = 0; i < res.datas.filter_conditiones[1].condition.length; i++) {
            that.data.filterData[2].data.push(res.datas.filter_conditiones[1].condition[i])
          }
          for (let i = 0; i < res.datas.filter_conditiones[2].condition.length; i++) {
            that.data.filterData[1].data.push(res.datas.filter_conditiones[2].condition[i])
          }
          that.setData({
            filterData: that.data.filterData
          })
        }
      })
      .catch(err => {
      })
    console.log(that.data.filterData) 
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