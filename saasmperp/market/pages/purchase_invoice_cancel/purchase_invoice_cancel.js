// market/pages/purchase_invoice_cancel/purchase_invoice_cancel.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAddImgModel:false,//添加图片弹窗
    purchaseInvoiceDetail: '',   //采购单详情
    hasTags: true,
    addImgList: {
      title: '选择操作',
      detail: [{
        cname: '拍照',
        eventName: 'showReceiptModel',
        
        imageSrc: '/images/market-photo.png'
      }, {
        cname: '相册',
        eventName: 'showReceiptModel2',
        
        imageSrc: '/market/images/album.png'
      }],
      

    },
    showCancelModel: false,//退款退货
    cancelList:{},
    
    showMoreOperations: false,
    oprationsList:{},
    modifyPhurchase:false,    //是否修改采购单
    isModify:false,
    purType:'',    //采购单类型  1为采购单   2为采购退货单
    showDelModal: false,  //是否显示删除弹框
    imageList:[],  //单据图片数组
    delBack:false,   //用来确认是不是点击创建采购单过来的
  },

  //相机获取图片
  showReceiptModel() {
    let _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        _this.setData({
          goodsImage: tempFilePaths[0],
          showAddImgModel: false,
        })
        if (_this.data.imageList.length) {
          _this.setData({
            //showCalculator: false,
            imageList: [..._this.data.imageList, tempFilePaths[0]]
          })
        } else {
          _this.setData({
            // showCalculator: true
          })
        }
        //更新改采购单的信息
        console.log(_this.data.imageList)
      }
    })
  },
  //相册获取图片
  showReceiptModel2() {
    let _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        _this.setData({
          goodsImage: tempFilePaths[0],
          showAddImgModel: false,

        })
        

        if (_this.data.imageList.length) {
          _this.setData({
            // showCalculator: false,
            imageList: [..._this.data.imageList, tempFilePaths[0]]
          })
        } else {
          _this.setData({
            // showCalculator: true
          })
        }
        //更新改采购单的信息
        
      }
    })
  },
  //预览图片
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

  delData(){
    //确认删除采购单
    this.setData({
      showDelModal: false
    })
    const data = {
      order_type:1,
      order_id: this.data.purchaseInvoiceDetail.order_id

    };
    api.market.deleteOrder(data)
      .then(res => {
        console.log(res);
        let pages = getCurrentPages();
        let prev = pages[pages.length -2];
        prev.setData({

        })
        if (this.data.delBack){
          //如果是点击创建采购单过来的话，则返回到选择商品的页面
          wx.navigateBack({
            delta: 2
          })
        }else{
          wx.navigateBack({
            delta: 1
          })
          wx.showToast({
            title: '删除成功!',
            icon: 'none',
            duration: 1500
          })
        }
        
      })
  },

  clsoeDelModal(){
    
    this.setData({
      showDelModal:false
    })
  },

  //显示退款退货弹窗
  showCancelModel() {
    this.setData({
      cancelList: {
        title: '业务流程',
        detail: [{
          cname: this.data.purType == 1 ? '入库':'出库',
          url: this.data.purType == 1 ?  '/market/pages/purchase_invoice_storage/purchase_invoice_storage':'/market/pages/purchase_invoice_cancel_out/purchase_invoice_cancel_out',
          imageSrc: '/images/kc-out.png'
        }, {
            cname: this.data.purType == 1 ? '付款':'收款',
          url: '/market/pages/purchase_invoice_cancel_receipt/purchase_invoice_cancel_receipt',
          imageSrc: '/market/images/sale.png'
        }]
      },
      showCancelModel: true
    })


    //把采购单详情存入本地

    wx.setStorageSync('purchase_details', this.data.purchaseInvoiceDetail);
    wx.setStorageSync('purType', this.data.purType);
  },
  //显示更多操作弹窗
  showMoreOperationsModel() {
    
    this.setData({
      oprationsList: {
        title: '更多操作',
        detail: [{
          cname: '修改',
          url: '/market/pages/modify_phurchase/modify_phurchase?purchaseInvoiceDetail=' + JSON.stringify(this.data.purchaseInvoiceDetail),
          imageSrc: '/market/images/xiugai.png'
        }, {
          cname: '添加商品',
            url: '/warehouse/pages/inStorage_add_goods/inStorage_add_goods?isPurchase =' + true,
          imageSrc: '/market/images/addGoods.png'
        }, {
          cname: '蓝牙打印',
          // url: '/market/pages/purchase_invoice_cancel_out/purchase_invoice_cancel_out',
            eventName: 'bluetoothPrint',
          imageSrc: '/market/images/lanyadayin.png'
        }, {
          cname: '单据图片',
          eventName: 'showAddImgModel',
          imageSrc: '/market/images/invoiceImgIcon.png'
        }, {
          cname: '删除',
          eventName:'showDelModal',
          imageSrc: '/market/images/invoiceDelete.png',

        }]
      },
      showMoreOperations: true,
      
    })
  },
  toPurchaseOrderInformation(e) {
    //去往商品明细
    let index = e.currentTarget.dataset.index;
    let productDetail = this.data.purchaseInvoiceDetail.product_img_list[index];
    let order_id = this.data.purchaseInvoiceDetail.order_id;
    //console.log(productDetail)
    wx.navigateTo({
      url: '/market/pages/purchase_order_information/purchase_order_information?productDetail=' + JSON.stringify(productDetail) + '&order_id=' + order_id + '&type=' + this.data.purType,
    })
  },
  //添加图片弹窗
  showAddImgModel(){
    this.setData({
      showMoreOperations: false,
      showAddImgModel:true
    })
  },


  //获取弹窗函数
  getEventName(e) {
    var eventName = e.detail.event_name;
    if (eventName == 'showAddImgModel') {
      this.showAddImgModel();
    } else if (eventName == 'showDelModal'){
      //显示删除弹框
      this.setData({
        showDelModal:true,
        showMoreOperations:false
      })
    } else if (eventName == 'modifyPhurchase'){
      //开始修改采购单
      this.setData({
        modifyPhurchase:true
      })
    }
    else if (e.detail.event_name == 'showReceiptModel'){
      this.showReceiptModel();
    }

    else if (e.detail.event_name == 'showReceiptModel2') {
      this.showReceiptModel2();
    }

    else if (e.detail.event_name == 'bluetoothPrint'){
      //蓝牙打印
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.data.purchaseInvoiceList[0].invoiceList[index]
    
    if (options.orderId) {
      this.getPurchaseOrdersList();
      //let purchaseInvoiceDetail = JSON.parse(wx.getStorageSync('purchaseInvoiceDetail2'));
      // this.setData({
      //   purchaseInvoiceDetail: purchaseInvoiceDetail,
      //   purType: purchaseInvoiceDetail.order_is_return == 0 ? 1:2,
      //   delBack:true
      // })
      
    }else{
      let types = options.type;
      let purchaseInvoiceDetail = JSON.parse(options.purchaseInvoiceDetail);

      if (purchaseInvoiceDetail.order_images){
        purchaseInvoiceDetail.order_images.forEach(item => {
          this.data.imageList.push(item.order_image);
        });

        this.setData({
          purchaseInvoiceDetail: purchaseInvoiceDetail,
          purType: types,
          imageList: this.data.imageList
        })
      }else{
        this.setData({
          purchaseInvoiceDetail: purchaseInvoiceDetail,
          purType: types
          
        })
      }
      
      console.log(purchaseInvoiceDetail);

      if (wx.getStorageSync('selectPurchaseList2')) {
        let selectPurchaseList = wx.getStorageSync('selectPurchaseList2');
        selectPurchaseList.forEach(item => {
          this.data.purchaseInvoiceDetail.product_img_list.push({
            product_img: item.pic_url,
            product_id: item.product_id,
            product_count: item.count,
            product_name: item.product_name,
            product_price: item.price,
            product_note: item.product_code
          });
        });
        this.setData({
          purchaseInvoiceDetail: this.data.purchaseInvoiceDetail
        })
      }

      if (wx.getStorageSync('orderImgLists')) {
        //修改图片列表
        let imgList = wx.getStorageSync('orderImgLists');
        if (purchaseInvoiceDetail.order_images) {
          imgList.forEach(item => {
            this.data.purchaseInvoiceDetail.order_images.push({
              order_image: item
            })
          })
          this.setData({
            purchaseInvoiceDetail: this.data.purchaseInvoiceDetail
          })
        }
        
      }
    }

    //wx.removeStorageSync('orderImgLists');
    //wx.removeStorageSync('selectPurchaseList2');
    
  },
  

  getPurchaseOrdersList(){
    api.market.getPurchaseOrdersList()
      .then(res => {
        console.log(res);

        this.setData({
          purchaseInvoiceDetail: res.datas.buy_order[0],
          purType: res.datas.buy_order[0].order_is_return == 0 ? 1 : 2,
          delBack: true
        })
      })

  },

  getProductDetail(data){
    //获取商品明细
    api.market.getProductDetail(data)
      .then(res => {
          console.log(res);
        })
  },

  getPurchaseDeatil(data){
    //获取采购单详情
    api.market.getPurchaseDeatil(data)
      .then(res => {
        console.log(res);
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
    //添加商品返回回来再刷新信息
    
    //如果修改过商品，则更新采购信息
    // if(this.data.isModify){
    //   const data = {

    //   }
    //   this.getPurchaseDeatil(data);
    // }
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