// market/pages/customer_detail/customer_detail.js
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showEditModal: false,//修改flag
    showReceivablesModal: false,//付款flag
    receivablesModalList: {
      title: '付款',
      detail: [{
        cname: '采购应付款',
        url: '/market/pages/purchasing_payment/purchasing_payment',
        imageSrc: '/market/images/shopping.png'
      }, {
        cname: '预付付款',
        url: '/market/pages/supplier_payment_in_advance/supplier_payment_in_advance',
        imageSrc: '/market/images/payment.png'
      },]
    },//付款弹窗信息
    supplierId: '',//供应商id
    supplierMes: '',//供应商信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      supplierId: options.id
    })
  },
  //获取供应商详情
  getSupplierDetail(){
    api.market.getSupplierList({
      customer_id: 1,
      supplier_id: this.data.supplierId,
      page_index: 1,
      page_size: 1
    }).then(res => {
      if(res.code == 1){
        this.setData({
          supplierMes: res.datas.supplier[0]
        })
      }
    })
  },
  //修改弹窗
  showEditModal() {
    this.setData({
      showEditModal: true
    })
  },
  //收款弹窗
  showReceivablesModal() {
    this.setData({
      showReceivablesModal: true,
      receivablesModalList: {
        title: '付款',
        detail: [{
          cname: '采购应付款',
          url: '/market/pages/purchasing_payment/purchasing_payment?id=' + this.data.supplierId + '&name=' + this.data.supplierMes.supplier_name + '&money=' + this.data.supplierMes.should_pay_money,
          imageSrc: '/market/images/shopping.png'
        }, {
          cname: '预付付款',
          url: '/market/pages/supplier_payment_in_advance/supplier_payment_in_advance?id=' + this.data.supplierId + '&name=' + this.data.supplierMes.supplier_name,
          imageSrc: '/market/images/payment.png'
        },]
      },//付款弹窗信息
    })
  },
  //隐藏修改弹窗
  hideEditModal() {
    this.setData({
      showEditModal: false
    })
  },
  //去修改供货商
  gotoEditSupplierMes(){
    wx.navigateTo({
      url: '/market/pages/edit_supplier/edit_supplier?mes=' + JSON.stringify(this.data.supplierMes),
    })
  },
  //删除供应商
  deleteSupplier(){
    api.market.delSupplier({
      user_id: 1,
      supplier_id: this.data.supplierId
    }).then(res => {
      if(res.code == 1){
        wx.showToast({
          title: '删除成功',
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
    this.getSupplierDetail();
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