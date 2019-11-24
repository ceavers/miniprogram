// pages/chose_com/chose_com.js
Page({
 //点击选择行业
  chose_type:function(){
    wx.redirectTo({
      url:'../com_type/com_type'
    })
  },
  next:function(){
    wx.navigateTo({
      url:'../register/register'
    })
  },
  business_name:function(e){
     let that =this
     that.setData({
       business_name: e.detail.value
     })
    if (that.data.com_type != "" && that.data.business_name != "") {
      that.setData({
        disabled: false
      })
    }
    wx.setStorageSync("business_name", that.data.business_name)
  },
  /**
   * 页面的初始数据
   */
  data: {
    com_type:"",
    business_name:"",
    disabled:true,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    var com_type = wx.getStorageSync('cm_type');
    console.log(com_type)
    that.setData({ com_type: com_type });
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