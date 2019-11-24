//预付款详情
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    pagesIndex: 1,
    premoneyObj: {},//预付款列表    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId: options.userId
    })
    this.getPreMoneyList();
  },
  //获取流水列表
  getPreMoneyList(){
    api.market.getPreMoneyList({
      user_id: this.data.userId,
      page_index: this.data.pagesIndex,
      page_size: 10,
    }).then(res => {
      if(res.code == 1){
        let premoneyObj = {}
        res.datas.order.forEach(item => {
          let today = new Date().toLocaleDateString().replace(/\//g, "-");
          let date = new Date(item.date * 1000).toLocaleDateString().replace(/\//g, "-");
          if(today == date){
            date = '今天'
          }
          item.cdate = date
          if (premoneyObj[date]){
            premoneyObj[date].push(item)
          } else {
            premoneyObj[date] = [item]
          }
        })
        this.setData({
          premoneyObj
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