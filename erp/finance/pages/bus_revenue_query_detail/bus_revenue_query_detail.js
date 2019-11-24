// finance/pages/bus_revenue_query_detail/bus_revenue_query_detail.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderFee:[30.00,-300.00],  //订单费用
    showmodal:false,
    modalContent:[],
    modalTitle:'',
    inoutList:[],   //查询后的收支列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
      this.setData({
        inoutList:JSON.parse(options.inoutList)
      });
  },
  backToRevenue(){
    wx.redirectTo({
      url: '/finance/pages/bus_revenue/bus_revenue',
    })
  },

  closeAddModal(){
    this.setData({
      showmodal:false
    });
  },

  showmodal(){
    this.setData({
      showmodal:true,
      modalTitle:'收支记账',
      modalContent:[
        { src: '/finance/images/add-modal1.png', content: '费用支出' },
        { src: '/finance/images/add-modal2.png', content: '其他收入' },
      ]
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