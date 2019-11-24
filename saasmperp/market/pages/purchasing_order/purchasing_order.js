// market/pages/sales_slip/sales_slip.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPhotoModal: false,
    showCalculator: false,//计算器
    showCalculatorModal: true,//计算器modal
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
    totalMoney: 0,//总金额
    customerId: '',//选择客户信息
    customerName: '',//客户名字
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  },
  //显示拍照相册弹窗
  showPhotoModal() {
    this.setData({
      showPhotoModal: true
    })
  },
  //获取子组件事件名
  getEventName(e) {
    switch (e.detail.event_name) {
      case 'photograph':
        this.photograph();
        break;
      case 'album':
        this.album();
        break;
    }
  },
  //相机获取图片
  photograph() {
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
          showPhotoModal: false,
        })
        if (_this.data.imageList.length) {
          _this.setData({
            showCalculator: false,
            imageList: [..._this.data.imageList, tempFilePaths[0]]
          })
        } else {
          _this.setData({
            showCalculator: true
          })
        }
        console.log(_this.data.imageList)
      }
    })
  },
  //相册获取图片
  album() {
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
          showPhotoModal: false,
        })
        if (_this.data.imageList.length) {
          _this.setData({
            showCalculator: false,
            imageList: [..._this.data.imageList, tempFilePaths[0]]
          })
        } else {
          _this.setData({
            showCalculator: true
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
  //显示计算器
  showCalculator() {
    this.setData({
      showCalculator: true
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
  //取消商品计算
  cancelAdd(e) {
    console.log(e)
  },
  //确认添加商品
  confirmAdd(e) {
    if (!this.data.imageList.length) {
      this.setData({
        imageList: [...this.data.imageList, this.data.goodsImage],
      })
    }
    this.setData({
      totalMoney: e.detail.res,
      showCalculatorModal: false
    })
  },
  //阻止冒泡
  returnFalse() {

  },
  //下一步
  nextStep() {
    if (!this.data.customerId) {
      wx.showToast({
        title: '请选择客户',
        icon: 'none'
      })
    } else if (this.data.imageList.length) {
      wx.navigateTo({
        url: '/market/pages/create_new_purchase/create_new_purchase?orderMoney=' + this.data.totalMoney + '&images=' + JSON.stringify(this.data.imageList),
      })
    } else {
      wx.showToast({
        title: '您还没有选择业务单据,请选择后再进行下一步',
        icon: 'none'
      })
    }
  },
  //选择供应商
  gotoSelectUser() {
    wx.navigateTo({
      url: '/market/pages/select_user/select_user?type=supplier',
    })
  },
  //查看历史
  gotoHistory(){
    wx.navigateTo({
      url: '/market/pages/purchase_invoice_list/purchase_invoice_list',
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
    console.log(app.globalData)
    if (app.globalData.selectUser) {
      this.setData({
        customerId: app.globalData.selectUser.userId,//选择客户信息
        customerName: app.globalData.selectUser.userName,//客户名字
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