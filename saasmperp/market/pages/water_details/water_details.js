//流水详情
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',//用户id
    waterId: '',//流水id
    waterDetail: {},//流水详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId: options.userId,
      waterId: options.waterId
    })
    this.getCashFlowList();
  },
  //获取流水详情信息
  getCashFlowList(){
    api.market.getCashFlowList({
      user_id: this.data.userId,
      water_id: this.data.waterId
    }).then(res => {
      if(res.code == 1){
        let waterDetail = res.datas.water[0]
        waterDetail.date = new Date(waterDetail.date * 1000).toLocaleDateString().replace(/\//g, "-");
        console.log(waterDetail)
        this.setData({
          waterDetail
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