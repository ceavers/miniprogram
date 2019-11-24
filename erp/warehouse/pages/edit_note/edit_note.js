// warehouse/pages/edit_note/edit_note.js
import {api} from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    orderId:'',
    note:''
  },
  getNote(e){
    this.setData({
      note:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type&&options.orderId){
      this.setData({
        type:options.type,
        orderId:options.orderId
      })
    }else{
      wx.showToast({
        title: '页面参数异常',
        icon:"none"
      })
    }
  },
  comfirm(){
    const data = {
      action:this.data.type,
      order_id:this.data.orderId,
      note: this.data.note
    }
    api.warehouse.editNote(data)
    .then(res=>{
      wx.showToast({
        title: '修改成功',
        success:res=>{
          const pages=getCurrentPages();
          pages[pages.length-2].setData({
            note:this.data.note
          })
          setTimeout(function(){
            wx.navigateBack({
              
            })
          },1500)
        }
      })
    })
    .catch(err=>{

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