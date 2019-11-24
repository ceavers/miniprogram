// finance/pages/borrow_list/borrow_list.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starttime: "",
    sigetype:"",
    sTime:"",
    type:"",
    nickname: "",
    sxTrue:true,
    show:false,
    show1:false,
    zIndex:1,
    loan_type:"",
    account_id:"",
    smId:"",
    items:"",
    nick_name:"",
    filterData:[
      {className: "借贷类型",data:["借入","借出"]}, {className: "资金账户",data:["现金账户","支付宝","微信"]},
    ],
  },
  shadow(){
    let that =this
    that.setData({
      show:true,
      zIndex:0
    })
  },
  submit(){
    let that =this
    wx.navigateTo({
      url: '../borrow_query/borrow_query',
    })
  },
  new_borrow(){
     let that =this
     that.setData({
       show1:true
     })
  },
  jiechu(){
    wx.navigateTo({
      url: '../borrow_out/borrow_out',
    })
    let that =this
    that.setData({
      show1:false
    })
  },
  jieru(){
    wx.navigateTo({
      url: '../borrow_new/borrow_new',
    })
    let that = this
    that.setData({
      show1: false
    })
  },
  quxiao(){
     let that =this
     that .setData({
       show1: false
     })
  },
  selectFilterClass(e) {
    let that = this
    that.setData({
      smId: e.currentTarget.dataset.index
    })
  },
  selectFilterItem(e) {
    let that = this
    if (that.data.smId == "0") {
      that.setData({
        loan_type: e.detail
      })
    }
    if (that.data.smId == "1") {
      that.setData({
        account_id: e.detail
      })
    }
  },
  exit(){
    let data = {
      token: wx.getStorage({
        key: "token"
      })
    }
    api.finance.borrowList(data)
      .then(res => {
        if (res.code == 1) {
          console.log(res)
          that.setData({
            items: res.datas.loans
          })
        }
      })
      .catch(err => {
      })
    let that =this 
    that.setData({
      sxTrue:false 
    })
    wx.removeStorageSync('starttime')
    wx.removeStorageSync('type')
    wx.removeStorageSync('nickname')
    wx.removeStorageSync('loans')
    wx.removeStorageSync('query')
  },
  //筛选
  comfirm() {
    let that = this
    let data = {
      loan_type: that.data.loan_type,
      account_id: that.data.account_id
    }
    api.finance.borrowSx(data)
      .then(res => {
        if (res.code == 1) {
          api.finance.borrowList(data)
            .then(res => {
              if (res.code == 1) {
                console.log(res)
                that.setData({
                  items: res.datas.loans
                })
              }
            })
            .catch(err => {

            })
        }
      })
      .catch(err => {

      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  loanDe(e){
    console.log(e.currentTarget.dataset.id)
   wx.navigateTo({
     url: '../bus_loan_detail/bus_loan_detail',
   })
   wx.setStorage({
     key: 'loan_id',
     data: e.currentTarget.dataset.id,
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
    let that =this
    console.log(wx.getStorageSync('query'))
    if (wx.getStorageSync('query') == 1) {
      that.setData({
        sxTrue: true,
        starttime: wx.getStorageSync('starttime'),
        type: wx.getStorageSync('type'),
        nickname: wx.getStorageSync('nickname'),
        sTime:true
      })
      if (that.data.nickname == "" || that.data.nickname == null){
        that.setData({
          nick_name: false
        })    
      }else{
        that.setData({
          nick_name: true
        })  
      }
      if(that.data.type==""){
        that.setData({
          sigetype:false
        })    
      }else{
        that.setData({
          sigetype: true
        })  
      }
      
    } else {
      that.setData({
        sxTrue: false
      })
    }
    
    if (wx.getStorageSync('query')==1) {
      that.setData({
        items: wx.getStorageSync('loans')
      })
    }else{
      let data = {
        token: wx.getStorage({
          key: "token"
        })
      }
      api.finance.borrowList(data)
        .then(res => {
          if (res.code == 1) {
            console.log(res)
            that.setData({
              items: res.datas.loans
            })
          }
        })
        .catch(err => {
        })
    } 
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