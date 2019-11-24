// market/pages/create_customer/create_customer.js
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    supplierMes: {},
    touxiangSrc: [],//头像地址数组
    showModal: false,//弹窗flag
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      supplierMes: JSON.parse(options.mes),
      touxiangSrc: [JSON.parse(options.mes).head_image]
    })
  },
  //保存表单
  saveForm(e) {
    console.log(e)
    api.market.editSupplier({
      supplier_name: e.detail.value.supplierName,
      contact: e.detail.value.charge,
      phone: e.detail.value.tel,
      address: e.detail.value.address,
      head_image: this.data.touxiangSrc[0] || '',
      early_arrears: e.detail.value.arrears,
      describe: e.detail.value.remark,
      supplier_id: this.data.supplierMes.supplier_id,
    }).then(res => {
      if (res.code == 1) {
        wx.showToast({
          title: '创建成功',
        })
        setTimeout(() => {
          wx.navigateBack({
            detal: 1
          })
        }, 1000)
      }
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