// warehouse/pages/warehouse_deatil/warehouse_deatil.js
import {api} from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalShow:false,
    depoId:'',
    warehouseDetail:null
  },
  deleteStorage(){
    this.setData({
      modalShow:true
    })
  },
  cancel(){
    this.setData({
      modalShow: false
    })
  },
  comfirm(){
    const data={
      depo_id: this.data.depoId
    }
    this.setData({
      modalShow: false
    })
    api.warehouse.deleteStorage(data)
    .then(res=>{
      wx.showToast({
        title: '删除成功',
      })
      setTimeout(()=>{
        wx.navigateBack({
          delta:2
        })
      },1000)
    })
    .catch(err=>{

    })
  },
  toEditStoragePage(){
    wx.navigateTo({
      url:`/warehouse/pages/edit_storage/edit_storage?depoId=${this.data.depoId}`,
    })
  },
  //获取仓库详情
  getStorageDetail() {
    const data = {
      depo_id: this.data.depoId
    }
    api.warehouse.getStorageDetail(data)
      .then(res => {
        this.setData({
          warehouseDetail: res.data
        })
      })
      .catch(err => {

      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.depoId){
      this.setData({
        depoId:options.depoId
      })
      this.getStorageDetail()
    }else{
      wx.showToast({
        title: '页面参数异常',
        icon:'none'
      })
    }
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
    if (getApp().globalData.flag){
      this.onLoad({ depoId: this.data.depoId})
      getApp().globalData.flag=0
    }
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