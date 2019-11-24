// market/pages/sell_invoice_order_information/sell_invoice_order_information.js
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    goods: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId: options.orderId,
      index: options.index,
      goodsList: JSON.parse(options.goods),
      goods: JSON.parse(options.goods)[options.index]
    })
  },
  //删除商品
  del(){
    let _this = this
    wx.showModal({
      title: '提示',
      content: '确认删除该商品吗',
      success(res){
        if(res.confirm){
          api.market.delOrder({
            order_type: 0,
            order_id: _this.data.orderId,
            product_id: _this.data.goods.product_id
          }).then(res => {
            if(res.code == 1){
              wx.navigateBack({
                detal: 1
              })
            }
          })
        }
      }
    })
  },
  //确认修改
  confirmEdit(e){
    let goodsList = this.data.goodsList,
        goods = this.data.goods;
    goods = Object.assign(goods, {
      product_price: e.detail.value.price,
      product_count: e.detail.value.count,
    })
    goodsList[this.data.index] = goods
    api.market.editOrder({
      order_id: this.data.orderId,
      order_type: 0,
      product_img_list: JSON.stringify(goodsList),
    }).then(res => {
      if (res.code == 1) {
        wx.navigateBack({
          detal: 1
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