// finance/pages/caigou_page/caigou_pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cp_type:'',
    shadow:false,
    items: [
      { value: '支付宝' },
      { value: '微信支付', },
      { value: '现金支付', },
    ]
  },
  pay_type:function(e){
     let that =this
     that.setData({
       shadow:true
     })
  },
  caigou_button:function(){
    let that =this
    wx.navigateBack({
      delta:1 
    })
  },
  radioChange(e) {
    let that =this
    console.log(e)
    that.setData({
      shadow:false,
      cp_type:e.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pt = this.selectComponent('#pay_type'); // 页面获取自定义组件实例
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