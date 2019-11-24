// market/pages/customer/customer.js
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showList: true,//显示用户列表
    supplierList: [],//供应商列表
    showCustomerMes: false,//显示供应商详情flag
    showSaleModal: false,//显示销售弹窗flag
    showReceivablesModal: false,//显示收款弹窗flag
    customerReceiptList: {
      title: '付款',
      detail: [{
        cname: '采购应付款',
        url: '/market/pages/supplier_list/supplier_list',
        imageSrc: '/market/images/shopping.png'
      }, {
        cname: '预付付款',
        url: '/market/pages/sales_receivables/sales_receivables',
        imageSrc: '/market/images/payment.png'
      },]
    },//付款弹窗信息
    salesBillList: {
      title: '销售开单',
      detail: [{
        cname: '选商品开单',
        url: '/market/pages/supplier_list/supplier_list',
        imageSrc: '/images/kc-goods.png'
      }, {
        cname: '拍单据录单',
        url: '/market/pages/supplier_list/supplier_list',
        imageSrc: '/images/market-photo.png'
      }]
    },//销售开单
    supplierId: '',//供应商id
    searchInput: '',//搜索信息
    supplierDetail: {},//查询得到的供应商
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  //获取供应商列表
  getSupplierList(){
    api.market.getSupplierList({
      customer_id: 1,
      supplier_name_phone: this.data.searchInput,
      page_index: 1,
      page_size: 10
    }).then(res => {
      if(res.code == 1){
        this.setData({
          supplierList: res.datas.supplier
        })
        if(!res.datas.supplier.length){
          wx.showToast({
            title: '没有查询到相应的信息',
            icon: 'none'
          })
        }
      }
    })
  },
  //获取供应商详情
  getSupplierDetail() {
    api.market.getSupplierList({
      customer_id: 1,
      supplier_id: this.data.supplierId,
      page_index: 1,
      page_size: 10
    }).then(res => {
      if (res.code == 1) {
        this.setData({
          supplierDetail: res.datas.supplier[0]
        })
      }
    })
  },
  //查询信息双向绑定
  searchInput(e){
    this.setData({
      searchInput: e.detail.value
    })
  },
  //创建供应商页面
  gotoCreateSupplier() {
    wx.navigateTo({
      url: '/market/pages/create_supplier/create_supplier',
    })
  },
  //显示供应商详情信息
  showCustomerMes(e) {
    this.setData({
      supplierId: e.currentTarget.dataset.id,
      showCustomerMes: true
    })
    this.getSupplierDetail();
  },
  //关闭供应商详情信息
  closeCustomerMes() {
    this.setData({
      supplierId: '',
      showCustomerMes: false
    })
  },
  //销售弹窗
  showSaleModal() {
    this.setData({
      showSaleModal: true
    })
  },
  //收款弹窗
  showReceivablesModal() {
    this.setData({
      showReceivablesModal: true,
      customerReceiptList: {
        title: '付款',
        detail: [{
          cname: '采购应付款',
          url: '/market/pages/purchasing_payment/purchasing_payment?id=' + this.data.supplierId + '&name=' + this.data.supplierDetail.supplier_name + '&money=' + this.data.supplierDetail.should_pay_money,
          imageSrc: '/market/images/shopping.png'
        }, {
          cname: '预付付款',
            url: '/market/pages/supplier_payment_in_advance/supplier_payment_in_advance?id=' + this.data.supplierId + '&name=' + this.data.supplierDetail.supplier_name,
          imageSrc: '/market/images/payment.png'
        },]
      },//付款弹窗信息
    })
  },
  //去供应商详情页
  gotoSupplierDetail(e) {
    wx.navigateTo({
      url: '/market/pages/supplier_detail/supplier_detail?id=' + e.currentTarget.dataset.id,
    })
  },
  //去采购
  gotoPurchase(){
    wx.navigateTo({
      url: '/market/pages/order_select/order_select?type=purchase',
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
    this.setData({
      showCustomerMes: false,//显示供应商详情flag
      showSaleModal: false,//显示销售弹窗flag
      showReceivablesModal: false,//显示收款弹窗flag
    })
    this.getSupplierList();
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