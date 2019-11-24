// warehouse/pages/allot_list/allot_list.js
import {api} from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filterShow: false,
    filterData: [
      {
        className: '调库状态',
        typeId: "state",
        data: [
          {
            name: '未调库',
            id: 0
          }, {
            name: '已调库',
            id: 1
          }
        ]
      }
    ],
    allotList:[]
  },
  filterShow() {
    this.setData({
      filterShow: true
    })
  },
  toDetailPage(e){
    const orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/warehouse/pages/godown_entry/godown_entry?type=2&orderId=${orderId}`,//2 库存调拨
    })
  },
  toCreateInvoices(){
    wx.navigateTo({
      url: '/warehouse/pages/allot/allot',
    })
  },
  getFilterItem(e) {
    const data = e.detail
    this.getAllotList(data)
  },
  searchList(e) {
    const data = {
      search_content: e.detail.value
    }
    this.getAllotList(data)
  },
  getAllotList(data){
    api.warehouse.getAllotList(data)
    .then(res=>{
      this.setData({
        allotList: res.datas.results
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
    this.getAllotList({})
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