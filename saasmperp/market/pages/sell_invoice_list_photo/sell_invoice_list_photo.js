// market/pages/sell_invoice_list_ commodity/sell_invoice_list_ commodity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ishaveOutModel:false,//已出库弹窗
    isdiscountModel:false,//优惠
    isReceiptModel:false,//收款
    showCancelModel: false,//收款发货弹窗
    cancelList: {
      title: '业务流程',
      detail: [{
        cname: '出库',
        eventName: 'showOutModel',
        imageSrc: '/images/kc-out.png'
      }, {
        cname: '收款',
        eventName: 'showReceiptModel',
        imageSrc: '/market/images/sale.png'
      }]
    },
    showMoreOperations: false,
    oprationsList: {
      title: '业务流程',
      detail: [{
        cname: '复制订单',
        url: '/market/pages/purchase_invoice_cancel_out/purchase_invoice_cancel_out',
        imageSrc: '/market/images/invoice_copy.png'
      }, {
        cname: '添加商品',
        url: '/market/pages/purchase_invoice_cancel_receipt/purchase_invoice_cancel_receipt',
        imageSrc: '/market/images/addGoods.png'
      }, {
        cname: '蓝牙打印',
        url: '/market/pages/purchase_invoice_cancel_out/purchase_invoice_cancel_out',
        imageSrc: '/market/images/lanyadayin.png'
      }, {
        cname: '单据图片',
        url: '/market/pages/purchase_invoice_cancel_receipt/purchase_invoice_cancel_receipt',
        imageSrc: '/market/images/invoiceImgIcon.png'
        }, {
          cname: '退款',
          url: '/market/pages/sell_invoice_refund/sell_invoice_refund',
          imageSrc: '/market/images/refund.png'
        }, {
        cname: '删除',
        url: '/market/pages/purchase_invoice_cancel_out/purchase_invoice_cancel_out',
        imageSrc: '/market/images/invoiceDelete.png'
      }]
    }
  },
  //显示优惠抹零弹窗
  showDiscountModel(){
    this.setData({
      isdiscountModel:true
    })
  },
  //隐藏优惠抹零弹窗
  hideDiscountModel() {
    this.setData({
      isdiscountModel: false
    })
  },
  //显示收款发货弹窗
  showCancelModel() {
    this.setData({
      showCancelModel: true
    })
  },
  //显示更多操作弹窗
  showMoreOperationsModel() {
    this.setData({
      showMoreOperations: true
    })
  },
  //url: '/market/pages/sell_invoice_out/sell_invoice_out',出库页面
  //显示已出库弹窗
  haveOutModel(){
    this.setData({
      showCancelModel: false,
      ishaveOutModel: true
    })
  },
  //关闭已出库弹窗
  hideHaveOutModel() {
    this.setData({
      ishaveOutModel: false,
      showCancelModel: true
    })
  },
  //修改应收页面
  toSellInvoiceModifyReceivable() {
    wx.navigateTo({
      url: '/market/pages/sell_invoice_modify_receviable/sell_invoice_modify_receviable',
    })
  },
  //发货方式页面
  toShipStyle() {
    wx.navigateTo({
      url: '/market/pages/sell_invoice_ship_style/sell_invoice_ship_style',
    })
  },
  //客户信息页面
  toViewCustomerInformation(){
    wx.navigateTo({
      url: '/market/pages/sell_invoice_view_customer_information/sell_invoice_view_customer_information',
    })
  },
  //修改备注页面
  toModifyRemark(){
    wx.navigateTo({
      url: '/market/pages/sell_invoice_modify_remarks/sell_invoice_modify_remarks',
    })
  },
  //修改物流信息页面
  toModifyWuliuInformation(){
    wx.navigateTo({
      url: '/market/pages/sell_invoice_modify_wuliu_information/sell_invoice_modify_wuliu_information',
    })
  },
  //修改其他信息页面
  toModifyOtherInformation() {
    wx.navigateTo({
      url: '/market/pages/sell_invoice_modify_other_information/sell_invoice_modify_other_information',
    })
  },
  //显示收款弹窗
  showReceiptModel(){
    this.setData({
      showCancelModel: false,
      isReceiptModel: true
    })
  },
  //隐藏收款弹窗
  hideReceiptModel(){
    this.setData({
      isReceiptModel: false,
      showCancelModel: true
    })
  },
  //获取弹窗函数
  getEventName(e) {
    var eventName = e.detail.event_name;
    if (eventName == 'showReceiptModel'){
      this.showReceiptModel();
    } else if (eventName == 'showOutModel'){
      this.haveOutModel();
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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