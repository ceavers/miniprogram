// report/pages/amount_inventory/amount_inventory.js
import { api } from '../../../utils/api/api.js'
import { colorList, randomColor } from '../../utils/color.js'
import { putComma } from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //默认入库日报
    index: 0,
    billData: []
  },
  chooseTpye(e) {
    if (e.currentTarget.dataset.index == this.data.index) {
      return
    }
    this.setData({
      index: e.currentTarget.dataset.index
    })
    const data = {
      type: true
    }
    data.dmq = this.data.index == 0 ? 'd' : 'm'
    this.getOutInMoney(data)
  },
  toDetailPage(e){
    const data = {
      date: e.currentTarget.dataset.time,
      type: true
    }
    data.dmq = this.data.index == 0 ? 'd' : 'm'
    const tempStr = JSON.stringify(data)
    wx.navigateTo({
      url: `/report/pages/amount_inventory_detail/amount_inventory_detail?params=${tempStr}`,
    })
  },
  getOutInMoney(data) {
    api.report.getOutInMoney(data)
      .then(res => {
        res.datas.bill_items.forEach((item, index) => {
          item.gross = putComma(item.gross)
          item.color = colorList[index] || randomColor()
        })
        this.setData({
          billData: res.datas.bill_items
        })
        if (this.data.billData.length) {
          setTimeout(() => {
            let list = this.data.billData
            for (let i = 0; i < list.length; i++) {
              let width = list[i].rate
              if (width > 100) {
                width = 100 + "%"
              } else {
                width = width + '%'
              }
              list[i].anmiate = this.lineAni(width, list[i].color)
            }
            this.setData({
              billData: this.data.billData
            })
          }, 50)
        }
      })
      .catch(err => {

      })
  },
  // 进度条
  lineAni(width, color) {
    let lineAni = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
      delay: 50
    })
    lineAni.backgroundColor(color).width(width).step();//step每个步骤结束必写
    return lineAni.export()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const data = {
      dmq: 'd',
      type: true
    }
    this.getOutInMoney(data)
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