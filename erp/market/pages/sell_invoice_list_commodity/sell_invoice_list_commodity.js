// market/pages/sell_invoice_list_ commodity/sell_invoice_list_ commodity.js
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ishaveOutModel: false,//已出库弹窗
    isdiscountModel: false,//优惠
    isReceiptModel: false,//收款
    showCancelModel: false,
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
        eventName: 'copyOrder',
        imageSrc: '/market/images/invoice_copy.png'
      }, {
        cname: '添加商品',
        url: '/warehouse/pages/inStorage_add_goods/inStorage_add_goods?type=sale&add=1',
        imageSrc: '/market/images/addGoods.png'
      }, {
        cname: '蓝牙打印',
        eventName: '',
        imageSrc: '/market/images/lanyadayin.png'
      }, {
        cname: '单据图片',
        eventName: 'orderImage',
        imageSrc: '/market/images/invoiceImgIcon.png'
      }, {
        cname: '退款',
        eventName: 'refund',
        imageSrc: '/market/images/refund.png'
      }, {
        cname: '删除',
        eventName: 'del',
        imageSrc: '/market/images/invoiceDelete.png'
      }]
    },
    orderId: '',//订单号
    orderMes: {},//订单信息
    photoModalList: {
      title: '选择操作',
      detail: [{
        cname: '拍照',
        imageSrc: '/images/market-photo.png',
        eventName: 'photograph'
      }, {
        cname: '相册',
        imageSrc: '/market/images/album.png',
        eventName: 'album'
      }]
    },
    imageList: [],//选择图片列表
    goodsImage: '',//
    previewImage: false,//显示图片预览flag
    previewImageIndex: 0,//图片预览index
    delImageFlag: false,//删除图片flag 
    swiperIndex: 0,//当前操作的预览图swiper index
    showPhotoModal: false,
  },
  //显示收款发货弹窗
  showCancelModel() {
    this.setData({
      showCancelModel: true
    })
  },
  //显示优惠抹零弹窗
  showDiscountModel() {
    this.setData({
      isdiscountModel: true
    })
  },
  //隐藏优惠抹零弹窗
  hideDiscountModel() {
    this.setData({
      isdiscountModel: false
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
  haveOutModel() {
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
  //商品详细页面
  toSellInvoiceOrderInformation(e) {
    console.log(e)
    wx.navigateTo({
      url: '/market/pages/sell_invoice_order_information/sell_invoice_order_information?orderId=' + this.data.orderId + '&goods=' + JSON.stringify(this.data.orderMes.product_img_list) + '&index=' + e.currentTarget.dataset.index,
    })
  },
  //发货方式页面
  toShipStyle(){
    wx.navigateTo({
      url: '/market/pages/sell_invoice_ship_style/sell_invoice_ship_style?orderMes=' + JSON.stringify(this.data.orderMes),
    })
  },
  //客户信息页面
  toViewCustomerInformation() {
    wx.navigateTo({
      url: '/market/pages/sell_invoice_view_customer_information/sell_invoice_view_customer_information?orderMes=' + JSON.stringify(this.data.orderMes),
    })
  },
  //修改时间
  toEditTime(){
    wx.navigateTo({
      url: '/market/pages/select_time/select_time?orderId=' + this.data.orderId + '&date=' + this.data.orderMes.date,
    })  
  },
  //修改备注页面
  toModifyRemark() {
    wx.navigateTo({
      url: '/market/pages/sell_invoice_modify_remarks/sell_invoice_modify_remarks?remark=' + this.data.orderMes.note + '&orderId=' + this.data.orderId,
    })
  },
  //修改物流信息页面
  toModifyWuliuInformation() {
    wx.navigateTo({
      url: '/market/pages/sell_invoice_modify_wuliu_information/sell_invoice_modify_wuliu_information?orderId=' + this.data.orderId,
    })
  },
  //修改其他信息页面
  toModifyOtherInformation(){
    let otherMes = JSON.stringify({
      order_method: this.data.orderMes.order_method,
      order_worker: this.data.orderMes.order_worker,
      foreign_order_id: this.data.orderMes.foreign_order_id,
      order_worker_id: this.data.orderMes.order_worker_id,
      sale_dept_id: this.data.orderMes.sale_dept_id,
      sale_dept_name: this.data.orderMes.sale_dept_name
    })
    wx.navigateTo({
      url: '/market/pages/sell_invoice_modify_other_information/sell_invoice_modify_other_information?orderId=' + this.data.orderId + '&otherMes=' + otherMes,
    })
  },
  //显示收款弹窗
  showReceiptModel() {
    this.setData({
      showCancelModel: false,
      isReceiptModel: true
    })
  },
  //隐藏收款弹窗
  hideReceiptModel() {
    this.setData({
      isReceiptModel: false,
      showCancelModel: true
    })
  },
  //获取弹窗函数
  getEventName(e) {
    var eventName = e.detail.event_name;
    if (eventName == 'showReceiptModel') {
      this.showReceiptModel();
    } else if (eventName == 'showOutModel') {
      if (this.data.orderMes.delivery_all){
        this.haveOutModel();
      } else {
        wx.navigateTo({
          url: '/market/pages/sell_invoice_out/sell_invoice_out?orderId=' + this.data.orderId,
        })
      }
    }
  },
  //获取事件名
  getMoreEventName(e){
    switch (e.detail.event_name){
      case 'del':
        this.delOrder();
        break;
      case 'copyOrder':
        let goodsList = [{
          count: 1,
          pic_url: '/images/goods2.png',
          price: 66,
          product_code: new Date().getTime(),
          product_id: new Date().getTime(),
          product_name: new Date().getTime(),
          results: [{
            color: '白色',
            results: [{
              amount: 1
            }],
            sum: 1
          }],
          styleSum: 1,
          total_results: 1,
          total_stock: 100000,
        }]
        wx.setStorageSync('selectSaleList', goodsList)
        wx.navigateTo({
          url: '/market/pages/order_select/order_select?type=sale',
        })
        break;
      case 'refund': 
        wx.showModal({
          title: '退款提示',
          content: '你确定要退款吗',
          success: (res) => {
            if(res.confirm){
              wx.showToast({
                title: '退款成功',
              })
            }
          }
        })
        break;
      case 'orderImage':
        this.setData({
          showPhotoModal: true
        })
        break;
    }
  },
  //图片预览
  showPhotoModal(){
    this.setData({
      showPhotoModal: true
    })
  },
  //获取照片方式
  getPhotoMethod(e){
    let method = ''
    switch (e.detail.event_name) {
      case 'photograph':
        method = 'camera'
        break;
      case 'album': 
        method = 'album'
        break;
    }
    if(method){
      let _this = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original'],
        sourceType: [method],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          _this.setData({
            goodsImage: tempFilePaths[0],
            showPhotoModal: false,
          })
          _this.setData({
            showCalculator: false,
            imageList: [..._this.data.imageList, tempFilePaths[0]]
          })
        }
      })
    }
  },
  /*
  *图片预览
  */
  previewImage(e) {
    console.log(e)
    let imageList = this.data.imageList,
      index = e.currentTarget.dataset.index;
    this.setData({
      previewImage: true,
      previewImageIndex: index,
      swiperIndex: index
    })
  },
  //取消预览
  closePreview() {
    this.setData({
      previewImage: false
    })
  },
  //删除图片弹窗
  delImage() {
    this.setData({
      delImageFlag: true
    })
  },
  //取消删除图片
  delImageCancel() {
    this.setData({
      delImageFlag: false
    })
  },
  //确认删除图片
  delImageConfirm() {
    let imageList = this.data.imageList,
      money = this.data.imageList[this.data.swiperIndex].money;
    let newImageList = imageList.filter((item, index) => {
      if (index != this.data.swiperIndex) {
        return item
      }
    })
    if (!newImageList.length) {
      this.setData({
        previewImage: false
      })
    }
    if (this.data.previewImageIndex >= newImageList.length) {
      this.setData({
        previewImageIndex: newImageList.length - 1
      })
    }
    if (!newImageList.length) {
      this.setData({
        showCalculatorModal: true,
        totalMoney: 0
      })
    }
    this.setData({
      imageList: newImageList,
      delImageFlag: false
    })
  },
  //图片预览操作的index
  selectSwiperImageIndex(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  },
  /*
  *图片预览
  */

  
  //删除订单
  delOrder(){
    wx.showModal({
      title: '确认删除',
      content: '删除后数据将不能恢复，请确认是否继续？',
      success: (res) => {
        if (res.confirm) {
          api.market.delOrder({
            order_type: 0,
            order_id: this.data.orderId,
          }).then(res => {
            if (res.code == 1) {
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
        }
      }
    })
  },
  //去收款
  gotoReceipt(){
    wx.navigateTo({
      url: '/market/pages/sell_invoice_receipt/sell_invoice_receipt?orderId=' + this.data.orderId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId: options.orderId,
      oprationsList: {
        title: '业务流程',
        detail: [{
          cname: '复制订单',
          eventName: 'copyOrder',
          imageSrc: '/market/images/invoice_copy.png'
        }, {
          cname: '添加商品',
          url: '/warehouse/pages/inStorage_add_goods/inStorage_add_goods?type=sale&add=1',
          imageSrc: '/market/images/addGoods.png'
        }, {
          cname: '蓝牙打印',
          eventName: '',
          imageSrc: '/market/images/lanyadayin.png'
        }, {
          cname: '单据图片',
          eventName: 'orderImage',
          imageSrc: '/market/images/invoiceImgIcon.png'
        }, {
          cname: '退款',
          eventName: 'refund',
          imageSrc: '/market/images/refund.png'
        }, {
          cname: '删除',
          eventName: 'del',
          imageSrc: '/market/images/invoiceDelete.png'
        }]
      },
    })
  },
  //获取销售单
  getSellInvoiceList(){
    api.sellInvoice.getSellInvoiceList({
      user_id: 1,//本人id
      user_name_order_id: this.data.orderId,
    }).then(res => {
      if(res.code == 1){
        let orderMes = res.datas.sale_order[0]
        orderMes.cdate = new Date(orderMes.date * 1000).toLocaleDateString().replace(/\//g, "-");
        this.setData({
          orderMes,
        })
      }
    })
  },
  //优惠抹零
  editOrderMoney(e){
    api.market.editOrder({
      order_id: this.data.orderId,
      order_type: 0,
      preferential_money: this.data.orderMes.total_money - e.detail.value.discount
    }).then(res => {
      if(res.code == 1){
        wx.showToast({
          title: '修改成功',
        })
        this.setData({
          isdiscountModel: false,
        })
        this.getSellInvoiceList();
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
    this.setData({
      showCancelModel: false,
      showMoreOperations: false,
    })
    this.getSellInvoiceList();
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