// market/pages/sell_invoice_ship_style/sell_invoice_ship_style.js
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderMes: {},//
    isShooseStyleModel: false, //发货方式选择弹窗
    shipStyleList: [{
      name: 'A',
      value: '送货',
      checked: 'checked'
    }, {
      name: 'B',
      value: '自提',
      checked: ''
    }, {
      name: 'C',
      value: '代发',
      checked: ''
    }],
    shipStyle: {
      name: 'A',
      value: '送货',
      checked: 'checked'
    }
  },
  chooseShipStyle() {
    this.setData({
      isShooseStyleModel: !this.data.isShooseStyleModel
    })
  },
  chooseStyle(e) {
    var styleValue = e.detail.value
    this.data.shipStyleList.forEach((items, i) => {
      if (items.value == styleValue){
        items.checked = 'checked'
      }else{
        items.checked = ''
      }
    })
    this.setData({
      shipStyle: this.data.shipStyleList[styleValue]
    })
    var set = setTimeout(this.chooseShipStyle, 200)
    this.chooseStyle;
  },
  //确认修改
  confirmEdit(e){
    api.market.editOrder({
      order_id: this.data.orderMes.order_id,
      contact: e.detail.value.contact,
      phone: e.detail.value.phone,
      address: e.detail.value.address
    }).then(res => {
      if(res.code == 1){
        wx.navigateBack({
          detal: 1
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      orderMes: JSON.parse(options.orderMes)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})