//收款流水
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',//用户id
    cashFlowList: {},//收款流水列表
    pageIndex: 1,//页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId: options.userId
    })
    this.getCashFlowList();
  },
  //获取收款流水
  getCashFlowList(){
    api.market.getCashFlowList({
      user_id: this.data.userId,
      page_index: this.data.pageIndex,
      page_size: 10
    }).then(res => {
      let cashFlowList = {}
      res.datas.water.forEach(item => {
        let today = new Date().toLocaleDateString().replace(/\//g, "-");
        let date = new Date(item.date * 1000).toLocaleDateString().replace(/\//g, "-");
        if (today == date) {
          date = '今天'
        }
        item.cdate = date
        if (cashFlowList[date]) {
          cashFlowList[date].push(item)
        } else {
          cashFlowList[date] = [item]
        }
      })
      this.setData({
        cashFlowList
      })
      console.log(cashFlowList)
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