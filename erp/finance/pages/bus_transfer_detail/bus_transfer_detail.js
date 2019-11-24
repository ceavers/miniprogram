// finance/pages/bus_transfer_detail/bus_transfer_detail.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    transfer_id:'',  //转账ID
    transferDetail:'',  //转账详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      transfer_id: options.transfer_id
    });

    this.getTransferDetail();

  },

  getTransferDetail(){
    //获取转账详情
    const data = {
      transfer_id: this.data.transfer_id
    };
    api.finance2.getTransferDetail(data)
      .then(res =>{
        console.log(res);
        if(res.code === 1){
          this.setData({
            transferDetail:res.data
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