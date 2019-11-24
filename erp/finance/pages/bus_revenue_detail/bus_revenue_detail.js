// finance/pages/bus_revenue_detail/bus_revenue_detail.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inout_id:'',  //收支账户的ID
    inoutDeatil:{},   //收支记账详情
    shadow:false,
  },

  delData(){
    //删除数据
    const data = {
      inout_id: this.data.inoutDeatil.inout_id
    };
    api.finance2.delRevenueList(data)
      .then(res => {
        console.log(res);
        if(res.code == 1){
          this.setData({
            shadow: false,
          });
          //跳转到收支列表页面
          wx.navigateTo({
            url: '/finance/pages/bus_revenue/bus_revenue',
          })
        }
      })
  },

  showDelModal(){
    //显示删除弹框
    this.setData({
      shadow:true
    });
  },

  closeDelModal(){
    this.setData({
      shadow: false
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.inout_id);
    this.setData({
      inout_id: options.inout_id
    });

    this.getInoutDeatil();
  },

  getInoutDeatil(){
    //获取收支记账详情
    const data = {
      inout_id: this.data.inout_id
    };
    api.finance2.getInoutDetail(data).
      then(res => {
        console.log(res);
        if(res.code === 1){
          this.setData({
            inoutDeatil:res.data
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