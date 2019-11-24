// warehouse/pages/next/next.js
import {api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgShow: false,
    selectTimeShow:false,
    //层级穿透
    penetrateShow: false,
    imgList:[],
    time: '',
    //收货单位
    target: '',
    //备注
    note: '',
    stockId:''
  },
  selectCamera(){
    this.setData({
      imgShow:true,
      penetrateShow:true
    })
  },
  selectTime() {
    this.setData({
      selectTimeShow: true,
      penetrateShow: true
    })
  },
  closeCameraPopup(){
    this.setData({
      imgShow: false,
      penetrateShow:false
    })
  },
  back(){
    wx.navigateBack({
      
    })
  },
  confirmCreate(){
    const data = this.createOutStockBill();
    if(!data){
      wx.showToast({
        title: '请添加商品',
        icon:'none'
      })
      return 
    }
    api.warehouse.createOutInBill(data)
    .then(res=>{
      const billId = res.data.order_id;
      wx.navigateTo({
        url: `/warehouse/pages/create_inStorage_res/create_inStorage_res?type=${this.data.type}&id=${billId}`,
      })
      this.clearData()
      if(this.data.type==1){
        wx.removeStorage({
          key: 'selectInStockList',
          success: function (res) { },
        })
      }else{
        wx.removeStorage({
          key: 'selectOutStockList',
          success: function (res) { },
        })
      }
    })
    .catch(err=>{

    })
  },
  //穿透替代取消
  cancel() {
    this.setData({
      penetrateShow: false
    })
  },
  //获取时间
  getTime(e) {
    const time = e.detail.year + '/' + e.detail.month + '/' + e.detail.day
    this.setData({
      time: time,
      penetrateShow: false
    })
  },
  getInputValue(e) {
    this.setData({
      target: e.detail.value
    })
  },
  getNote(e) {
    this.setData({
      note: e.detail.value
    })
  },
  //拍照
  selectImgByPhoto(){
    this.selectImg('camera')
  },
  //相册
  selectImgByAlbum(){
    this.selectImg('album')
  },
  //选择图片
  selectImg(type){
    const _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: [type], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var size = res.tempFiles[0].size
        var path = res.tempFilePaths[0]
        var pictype = path.slice(-3)
        if (size > 1024 * 1024) {
          wx.showModal({
            title: '提示',
            content: '图片太大',
          })
          return false
        }
        if (pictype != 'png' && pictype != 'jpeg' && pictype != 'jpg' && pictype != 'bmp') {
          wx.showModal({
            title: '提示',
            content: '图片格式错误',
          })
          return false
        }
        //上传图片
        _this.uploadImg(res.tempFilePaths, _this);
      }
    })
  },
  //上传图片
  uploadImg(tempFilePaths, that) {
    wx.uploadFile({
      url: 'https://easydoc.xyz/mock/2xukn3Iw',
      filePath: tempFilePaths[0],
      name: 'files',
      formData: {
      },
      success: function (res) {
        const resData = JSON.parse(res.data);
        that.data.imgList.push(resData.data.path)
        that.setData({
          imgList: that.data.imgList,
          imgShow:false,
          penetrateShow:false
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //预览图片 
  previewImage(e) {
    var imgList = this.data.imgList;
    var url = e.currentTarget.dataset.url;
    this.setData({
      previewModal: true,
      penetrateShow:true,
      isRoll: true,
      currentID: e.currentTarget.dataset.index
    })
  },
  //删除图片
  delImg() {
    var list = this.data.imgList
    var currentID = this.data.currentID;
    if (currentID != list.length - 1) {
      this.setData({
        currentID: this.data.currentID
      })
      list.splice(this.data.currentID, 1)
    } else {
      if (currentID != 0) {
        this.setData({
          currentID: this.data.currentID - 1
        })
        list.splice(this.data.currentID + 1, 1)
      } else {//只剩一张 
        this.setData({
          currentID: 0
        })
        list.splice(this.data.currentID, 1)
      }
    }
    if (list.length > 0) {
      this.setData({
        imgList: list,
        delPop: false,
      })
    } else {
      this.setData({
        imgList: [],
        havaPic: true,
        previewModal: false,
        penetrateShow:false,
        delPop: false,
      })
    }
  },
  //点击取消
  cancelPreview() {
    this.setData({
      delPop: false
    })
  },
  //删除图片弹窗
  openDelPop() {
    this.setData({
      delPop: true
    })
  },
  // 关闭预览 弹窗
  closeModal() {
    this.setData({
      previewModal: false,
      penetrateShow:false,
      isRoll: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.stockId && options.type){
      this.setData({
        stockId: options.stockId,
        type: options.type
      })
    }else{
      wx.showToast({
        title: '页面参数异常',
        icon:'none'
      })
    }
    this.clearData()
  },
  //创建出入库单参数
  createOutStockBill() {
    let data = {
      depo_id: this.data.stockId,
      time: this.data.time,
      sup_unit: this.data.target,
      content: this.data.note,
      action: this.data.type,
      order_pic_url:this.data.imgList
    }
    const tempList = this.data.type == 1 ? wx.getStorageSync('selectInStockList'):wx.getStorageSync('selectOutStockList');
    if (!tempList){
      return
    }
    let units = [];
    tempList.forEach(item => {
      item.results.forEach(skuItem => {
        skuItem.results.forEach(propItem => {
          if (propItem.amount > 0) {
            let tempObj = {};
            tempObj.product_id = item.product_id;
            tempObj.sku_code = propItem.sku_code;
            tempObj.amount = propItem.amount;
            units.push(tempObj);
          }
        })
      })
    })
    data.units = units;
    return data;
  },
  clearData(){
    const date = new Date();
    let time = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
    this.setData({
      time: time,
      target: '',
      note: '',
      imgList: []
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