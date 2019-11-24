// market/pages/sales_bill_setting/sales_bill_setting.js
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    setting: false,//是否开启税率
    tax: '',//税率
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTaxRevenue();
  },
  //获取税率信息
  getTaxRevenue(){
    api.market.getTaxRevenue({
      user_id: 1
    }).then(res => {
      if(res.code == 1){
        this.setData({
          setting: res.data.is_open,
          tax: res.data.tax * 100
        })
      }
    })
  },
  //开启税率
  setting(e){
    this.setData({
      setting: e.detail.value
    })
  },
  //保存修改
  saveSetting(e){
    console.log(e)
    api.market.editTaxRevenue({
      user_id: 1,
      tax: e.detail.value.tax / 100,
      is_open: this.data.setting
    }).then(res => {
      if(res.code == 1){
        wx.showToast({
          title: '修改成功',
        })
        setTimeout(() => {
          wx.navigateBack({
            detal: 1
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