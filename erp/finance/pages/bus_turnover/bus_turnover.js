// finance/pages/bus_turnover/bus_turnover.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    journalList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      account_id: options.account_id
    });
    this.getJournalList();
  },

  getJournalList(){
    //获取流水列表
    const data = {
      account_id: this.data.account_id
    };
    api.finance2.getJournalList(data)
      .then(res => {
        console.log(res);
        if(res.code === 1){
          this.setData({
            journalList: res.datas.journals
          });
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