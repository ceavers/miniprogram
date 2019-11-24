// 创建客户
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    touxiangSrc: [],//头像地址数组
    showModal: false,//弹窗flag
    showAddTypeModal: false,//添加类别弹窗flag
    customerType: '',//客户类型
    customerTypeId: '',//客户类型id
    typeList: [],//类型列表
    typeValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCustomerTypeList()
  },
  //获取用户类别
  getCustomerTypeList(){
    api.market.getCustomerTypeList({
      page_index: 1,
      page_size: 20
    }).then(res => {
      console.log(res)
      this.setData({
        typeList: res.datas.category
      })
    })
  },
  //添加用户类型
  addCustomerType(){
    api.market.addCustomerType({
      category_name: this.data.typeValue
    }).then(res => {
      if(res.code == 1){
        this.setData({
          showAddTypeModal: false
        })
        this.getCustomerTypeList();
        wx.showToast({
          title: '添加成功',
        })
      }
    })
  },
  //选择客户类型弹窗显示
  showModal(){
    this.setData({
      showModal: true
    })
  },
  //选择客户类型
  chooseType(e){
    this.setData({
      customerType: e.currentTarget.dataset.type,
      customerTypeId: e.currentTarget.dataset.id,
      showModal: false
    })
  },
  //关闭客户类型弹窗
  closeModal(){
    this.setData({
      showModal: false
    })
  },
  //点击选择头像
  chooseImage(){
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
  addType(){
    this.setData({
      showAddTypeModal: true
    })
  },
  //关闭添加类别弹窗
  cancel(){
    this.setData({
      showAddTypeModal: false
    })
  },
  //input双向绑定
  typeValue(e){
    console.log(e)
    this.setData({
      typeValue: e.detail.value
    })
  },
  //管理类型列表
  gotoManageType(){
    wx.navigateTo({
      url: '/market/pages/manage_customer_type/manage_customer_type',
    })
  },
  //提交表单
  saveForm(e){
    let user_type = this.data.customerTypeId,
      head_image = this.data.touxiangSrc[0];
    console.log(e)
    api.market.addCustomer({
      user_name: e.detail.value.customerName,
      contact: e.detail.value.charge,
      phone: e.detail.value.tel,
      user_type,
      head_image,
      early_arrears: e.detail.value.arrears,
      address: e.detail.value.address,
      note: e.detail.value.remark,
    }).then(res => {
      if(res.code == 1){
        wx.showToast({
          title: '创建完成',
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        },1000)
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