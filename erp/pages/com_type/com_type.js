// pages/com_type/con_type.js
Page({
  ck_type:function(e){
    let cm_type = e.currentTarget.dataset.text
    let industry_id = e.currentTarget.dataset.id
    console.log(e)
    console.log(cm_type)
    wx.setStorageSync('cm_type', cm_type);
    wx.setStorageSync('industry_id', industry_id );
    wx.redirectTo({
      url: '../chose_com/chose_com'
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    item:["电脑办公","数码家电","家装建材","服装鞋帽","食品饮料","日用百货","珠宝配饰","美妆护肤","母婴玩具","箱包钟表","运动户外","生鲜水果","汽车配件","五金机械","米面粮油"],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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