// finance/pages/bus_turnover_detail/bus_turnover_detail.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    journalDetail:'',    //流水详情
    journal_id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        journal_id: options.journal_id
      });
    this.getJournalDetail();
  },

  getJournalDetail(){
    //获取流水详情
    const data = {
      journal_id: this.data.journal_id
    };
    api.finance2.getJournalDeatil(data)
      .then(res => {
        console.log(res);
        if(res.code === 1){
            this.setData({
              journalDetail:res.data
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