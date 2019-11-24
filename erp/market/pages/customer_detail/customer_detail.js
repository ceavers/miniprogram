// 客户详情
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',//用户id
    showEditModal: false,//修改flag
    showReceivablesModal: false,//收款flag
    receivablesModalList: {},//客户收款
    customerDetailMes: {},//客户详情信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId: options.userId
    })
    
  },
  //打电话
  call(){
    wx.makePhoneCall({
      phoneNumber: customerDetailMes.phone //仅为示例，并非真实的电话号码
    })
  },
  //获取客户详情信息
  getCustomerDetailMes(){
    api.market.getCustomerDetail({
      user_id: this.data.userId
    }).then(res => {
      this.setData({
        customerDetailMes: res.datas.user
      })
    })
  },
  //修改弹窗
  showEditModal(){
    this.setData({
      showEditModal: true
    })
  },
  //收款弹窗
  showReceivablesModal(){
    this.setData({
      showReceivablesModal: true,
      receivablesModalList: {
        title: '客户收款',
        detail: [{
          cname: '销售应收',
          url: '/market/pages/sales_receivables/sales_receivables?name=' + this.data.customerDetailMes.user_name + '&userId=' + this.data.customerDetailMes.user_id + '&money=' + this.data.customerDetailMes.order_recevable,
          imageSrc: '/market/images/sale.png'
        }, {
          cname: '预付款',
            url: '/market/pages/payment_in_advance/payment_in_advance?name=' + this.data.customerDetailMes.user_name + '&userId=' + this.data.customerDetailMes.user_id,
          imageSrc: '/images/market-ticket.png'
        },]
      },//客户收款
    })
  },
  //隐藏修改弹窗
  hideEditModal(){
    this.setData({
      showEditModal: false
    })
  },
  //修改客户
  editCustomer(){
    wx.navigateTo({
      url: '/market/pages/edit_customer/edit_customer?userMes=' + JSON.stringify(this.data.customerDetailMes),
    })
  },
  //删除客户
  delCustomer(){
    api.market.delCustomer({
      user_id: this.data.userId,
      supplier_id: 12,
    }).then(res => {
      if(res.code == 1){
        wx.showToast({
          title: '删除成功',
        })
        setTimeout(() => {
          wx.navigateBack({
            detal: 1
          })
        }, 1000)
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
    this.getCustomerDetailMes();
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