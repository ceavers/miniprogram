// market/pages/create_customer/create_customer.js
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    touxiangSrc: [],//头像地址数组
    showModal: false,//弹窗flag
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //保存表单
  saveForm(e) {
    console.log(e)
    api.market.addSupplier({
      supplier_name: e.detail.value.supplierName,
      contact: e.detail.value.charge,
      phone: e.detail.value.tel,
      address: e.detail.value.address,
      head_image: this.data.touxiangSrc[0] || '',
      early_arrears: e.detail.value.arrears,
      describe: e.detail.value.remark
    }).then(res => {
      if(res.code == 1){
        wx.showToast({
          title: '创建成功',
        })
        setTimeout(() => {
          wx.navigateBack({
            detal: 1
          })
        },1000)
      }
    })
  },
  //选择客户类型弹窗显示
  showModal() {
    this.setData({
      showModal: true
    })
  },
  //选择客户类型
  chooseType(e) {
    this.setData({
      customerType: e.currentTarget.dataset.type,
      showModal: false
    })
  },
  //关闭客户类型弹窗
  closeModal() {
    this.setData({
      showModal: false
    })
  },
  //点击选择头像
  chooseImage() {
    let _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        _this.setData({
          touxiangSrc: tempFilePaths
        })
      }
    })
  },
  //添加类别
  addType() {
    this.setData({
      showAddTypeModal: true
    })
  },
  //关闭添加类别弹窗
  cancel() {
    this.setData({
      showAddTypeModal: false
    })
  },
  //确认添加类别
  confirm() {
    this.setData({
      showAddTypeModal: false
    })
  },
  //input双向绑定
  typeValue(e) {
    console.log(e)
    this.setData({
      typeValue: e.datail.value
    })
  },
  //管理类型列表
  gotoManageType() {
    wx.navigateTo({
      url: '/market/pages/manage_customer_type/manage_customer_type',
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