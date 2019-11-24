// warehouse/pages/storages/storages.js
import {api} from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storageList:[],
    deStriImg:'../../images/def-storage.png'
  },
  toCreateStorage(){
    wx.navigateTo({
      url: '/warehouse/pages/create_storage/create_storage',
    })
  },
  toStorageDetail(e){
    const depoId=e.currentTarget.dataset.depoId;
    wx.navigateTo({
      url: `/warehouse/pages/storage_detail/storage_detail?depoId=${depoId}`,
    })
  },
  getStroageList(){
    api.warehouse.getWareHouseList({})
    .then(res=>{
      this.setData({
        storageList:res.datas.results
      })
    })
    .catch(err=>{

    })
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
    this.getStroageList()
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