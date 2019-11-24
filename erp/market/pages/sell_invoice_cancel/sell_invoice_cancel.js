// market/pages/sell_invoice_canael/sell_invoice_cancel.js
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    showCancelModel:false,
    order_method:"",
    show:false,
    userMer_name:"",
    user_phone:"",
    order_worker:"",
    user_name:"",
    orderMes: {},
    imagetext:"",
    goods_number:"",
    product_color:"",
    courier_name:"",
    product_size:"",
    sttime:"",
    product_count:"",
    product_price:"",
    imagetext:"",
    imageUrl:"",
    orderMoney:"",
    refund_money:"",
    product_id:"",
    orderId: '',//订单号
    starttime:"2019-9-24",
    cancelList:{
      title:'业务流程',
      detail:[{
        cname:'入库',
        url:'/market/pages/sell_invoice_cancel_storage/sell_invoice_cancel_storage',
        imageSrc:'/images/kc-in.png'
      },{
          cname: '退款',
          url: '/market/pages/sell_invoice_cancel_refund/sell_invoice_cancel_refund',
          imageSrc: '/images/cancel.png'
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
  toEditTime() {
    wx.navigateTo({
      url: '/market/pages/select_time/select_time?orderId=' + this.data.orderId + '&date=' + this.data.orderMes.date,
    })
  },
  toProductDetail(){
    wx.navigateTo({
      url: '/market/pages/product_detail/product_detail',
    })
  },
  timeInfotaion(){
    let that =this
    that.setData({
      show:true
    })
  },
  setTime(e) {
    console.log(e)
    let that = this
    let time = e.detail.year + "-" + e.detail.month + "-" + e.detail.day
    that.setData({
      starttime: time
    })
  },
  //显示退款退货弹窗
  showCancelModel(){
    this.setData({
      showCancelModel:true
    })
  },
  //获取销售单
  getSellInvoiceList() {
    api.sellInvoice.getSellInvoiceList({
      user_id: 1,//本人id
      user_name_order_id: this.data.orderId,
    }).then(res => {
      if (res.code == 1) {
        let orderMes = res.datas.sale_order[0]
        orderMes.cdate = new Date(orderMes.date * 1000).toLocaleDateString().replace(/\//g, "-");
        this.setData({
          orderMes,
          orderMoney: wx.getStorageSync('orderMoney'),
          refund_money: wx.getStorageSync('refund_money'),
        })
      }
    })
  },
  toViewCustomerInformation() {
    wx.navigateTo({
      url: '/market/pages/sell_invoice_view_customer_information/sell_invoice_view_customer_information?orderMes=' + JSON.stringify(this.data.orderMes),
    })
  },
  //商品详细页面
  toSellInvoiceOrderInformation(e) {
    console.log(e)
    wx.navigateTo({
      url: '/market/pages/sell_invoice_order_information/sell_invoice_order_information?orderId=' + this.data.orderId + '&goods=' + JSON.stringify(this.data.orderMes.product_img_list) + '&index=' + e.currentTarget.dataset.index,
    })
  },
  //修改物流信息页面
  toModifyWuliuInformation() {
    wx.navigateTo({
      url: '/market/pages/sell_invoice_modify_wuliu_information/sell_invoice_modify_wuliu_information?orderId=' + this.data.orderId,
    })
  },
  toModifyOtherInformation() {
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
  //获取事件名
  getMoreEventName(e) {
    switch (e.detail.event_name) {
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
        wx.setStorageSync('selectSaleRefundList', goodsList)
        wx.navigateTo({
          url: '/market/pages/order_select/order_select?type=saleRefund',
        })
        break;
      case 'refund':
        wx.showModal({
          title: '退款提示',
          content: '你确定要退款吗',
          success: (res) => {
            if (res.confirm) {
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
  showPhotoModal() {
    this.setData({
      showPhotoModal: true
    })
  },
  //获取照片方式
  getPhotoMethod(e) {
    let method = ''
    switch (e.detail.event_name) {
      case 'photograph':
        method = 'camera'
        break;
      case 'album':
        method = 'album'
        break;
    }
    if (method) {
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
  //显示更多操作弹窗
  showMoreOperationsModel() {
    this.setData({
      showMoreOperations: true
    })
  },
  //获取事件名
  getMoreEventName(e) {
    switch (e.detail.event_name) {
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
        wx.setStorageSync('selectSaleRefundList', goodsList)
        wx.navigateTo({
          url: '/market/pages/order_select/order_select?type=saleRefund',
        })
        break;
      case 'refund':
        wx.showModal({
          title: '退款提示',
          content: '你确定要退款吗',
          success: (res) => {
            if (res.confirm) {
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     let that =this
     console.log(options)
    that.getSellInvoiceList();
     let data={
       user_id:1,
       user_name_order_id: wx.getStorageSync('order_id'),
     }
     that.setData({
       oprationsList: {
         title: '业务流程',
         detail: [{
           cname: '复制订单',
           eventName: 'copyOrder',
           imageSrc: '/market/images/invoice_copy.png'
         }, {
           cname: '添加商品',
             url: '/warehouse/pages/inStorage_add_goods/inStorage_add_goods?type=saleRefund&add=1',
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
    api.sellInvoice.getSellInvoiceList(data)
      .then(res => {
        if (res.code == 1) {
          console.log(res)
          that.setData({
            userMer_name:res.datas.sale_order[0].user_name,
            user_phone: res.datas.sale_order[0].phone,
            sttime: format(res.datas.sale_order[0].date),
            courier_name: res.datas.sale_order[0].courier_name,
            order_worker: res.datas.sale_order[0].order_worker,
            order_method: res.datas.sale_order[0].order_method,
          })
          wx.setStorage({
            key: 'sttime',
            data: that.data.sttime,
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