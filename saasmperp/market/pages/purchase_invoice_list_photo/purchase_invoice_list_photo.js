// market/pages/sell_invoice_list_ commodity/sell_invoice_list_ commodity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showCancelModel: false,
    cancelList: {
      title: '业务流程',
      detail: [{
        cname: '入库',
        url: '/market/pages/purchase_invoice_storage/purchase_invoice_storage',
        imageSrc: '/images/kc-in.png'
      }, {
        cname: '付款',
        url: '/market/pages/purchase_invoice_pay/purchase_invoice_pay',
        imageSrc: '/market/images/market-pay.png'
      }]
    },
    showMoreOperations: false,
    oprationsList: {
      title: '更多操作',
      detail: [{
        cname: '修改',
        url: '/market/pages/purchase_invoice_cancel_out/purchase_invoice_cancel_out',
        imageSrc: '/market/images/xiugai.png'
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
        },{
          cname: '删除',
          url: '/market/pages/purchase_invoice_cancel_out/purchase_invoice_cancel_out',
          imageSrc: '/market/images/invoiceDelete.png'
        }]
    }
  },
  //显示付款收货弹窗
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
  toPurchaseInvoiceInformation() {
    wx.navigateTo({
      url: '/market/pages/purchase_invoice_information/purchase_invoice_information',
    })
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