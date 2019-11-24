// market/pages/modify_phurchase/modify_phurchase.js
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    purType:1,   //采购单类型
    purchaseInvoiceDetail:'',   //采购单详情
    modifyAddress:'none', 
    modifyPhone:'none',  
    modifyNote:'none',
    showAddCateModal:false,  //用来控制修改采购金额的弹框
    modifyPrice:'', 
    refundMoney:'',   //采购原价

    imgs: [],//本地图片地址数组
    picPaths: [],//网络路径
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
    showAddImgModel:false,
    imageList:[],   //图片数组
  },

  getEventName(e){
    switch (e.detail.event_name) {
      case 'showReceiptModel':
        this.showReceiptModel();
        break;
      case 'showReceiptModel2':
        this.showReceiptModel2();
        break;
    }
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

  //添加图片弹窗
  showAddImgModel() {
    this.setData({
      
      showAddImgModel: true
    })
  },

  

  //添加上传图片
  chooseImageTap: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['拍照','相册'],
      itemColor: "#00000",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 1) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 0) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
  // 图片本地路径
  chooseWxImage: function (type) {
    var that = this;
    var imgsPaths = that.data.imgs;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res.tempFilePaths);
        console.log(res.tempFilePaths[0]);
        that.upImgs(res.tempFilePaths[0], 0)   //调用上传方法
      }
    })
  },
  //上传服务器
  upImgs: function (imgurl, index) {
    var that = this;
    wx.uploadFile({
      url: 'https://easydoc.xyz/#/s/79441173/sfFcllV1/2xukn3Iw',  
      filePath: imgurl,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data'

      },
      formData: {
        "token":wx.getStorageSync('token'),
        
      },
      success: function (res) {
        console.log(res) //接口返回网络路径
        //var data = JSON.parse(res.data)
        var data = res.data;
        console.log(data)
        that.data.picPaths.push(data['msg'])
        that.setData({
          picPaths: that.data.picPaths
        })
        console.log(that.data.picPaths)
      }
    })
  },


  showAddCateModal(){
    this.setData({
      showAddCateModal: true
    })
  },

  closeCateModal2(){
    this.setData({
      showAddCateModal: false
    })
  },

  updatePrice(e){
    //修改采购价
    if(e.detail.value.trim().length){
      this.setData({
        modifyPrice: e.detail.value.trim()
      })
    }
  },

  modifyPurPrice(){
    //确认修改采购单原价
    if (this.data.modifyPrice){
      this.setData({
        refundMoney: this.data.modifyPrice
      })
    }
    this.setData({
      showAddCateModal: false
    })
  },

  modifyAddress(e){
    //监听地址的修改
    if (e.detail.value != this.data.purchaseInvoiceDetail.adress){
      this.setData({
        modifyAddress: e.detail.value
      })
    }
  },

  modifyPhone(e){
    //监听联系人的修改
    if (e.detail.value != this.data.purchaseInvoiceDetail.phone) {
      this.setData({
        modifyPhone: e.detail.value
      })
    }
  },

  modifyNote(e){
    //监听备注的修改
    if (e.detail.value != this.data.purchaseInvoiceDetail.note) {
      this.setData({
        modifyNote: e.detail.value
      })
    }
  },

  confirmModify(){
    //确认修改采购单
    const data = {
      order_id: this.data.purchaseInvoiceDetail.order_id,
      order_type:1,

    };

    this.data.modifyPhone != 'none' ? data['contact'] = this.data.modifyPhone :'';
    this.data.modifyAddress != 'none' ? data['address'] = this.data.modifyAddress :'';
    this.data.modifyNote != 'none' ? data['note'] = this.data.modifyNote: '';
    this.data.modifyPrice ? data['refund_money'] = this.data.modifyPrice : '';

    //少个单据图片数组data
    wx.setStorageSync('orderImgLists', this.data.imageList);
    console.log(data);
    api.market.modifyOrder(data)
      .then(res => {
        console.log(res);
        //最后删除掉本地采购单数据
        //wx.removeStorageSync('selectPurchaseList2');
        let pages = getCurrentPages();
        let prev = pages[pages.length - 2];
        prev.setData({
          isModify: true,
          purchaseInvoiceDetail: this.data.purchaseInvoiceDetail
        })
        wx.navigateBack({
          delta: 1
        })
        wx.showToast({
          title: '操作成功!',
          icon:'none',
          duration:1500
        })
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

  toAddGood(){
    //去往添加商品页面
    wx.navigateTo({
      url: '/warehouse/pages/inStorage_add_goods/inStorage_add_goods?isPurchase='+true,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let purchaseInvoiceDetail = JSON.parse(options.purchaseInvoiceDetail);
    console.log(purchaseInvoiceDetail);
    purchaseInvoiceDetail.order_images.forEach(item => {
      this.data.imageList.push(item.order_image);
    });
    
    this.setData({
      purchaseInvoiceDetail: purchaseInvoiceDetail,
      refundMoney: purchaseInvoiceDetail.refund_money,
      imageList: this.data.imageList
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