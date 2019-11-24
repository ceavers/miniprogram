// warehouse/pages/outStorage_list/outStorage_list.js
import {api} from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:1,//1入库 0出库
    title:'入库列表',
    btnText:'创建入库单',
    //出入库列表
    stockList:[],
    filterShow: false,
    filterData: [
      {
        className: '调库状态',
        typeId: "state",
        data: [
          {
            name:'未调库',
            id:0
          },{
            name: '已调库',
            id: 1
          }
        ]
      }
    ],
  },
  filterShow() {
    this.setData({
      filterShow: true
    })
  },
  toDetailPage(e){
    const orderId=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/warehouse/pages/godown_entry/godown_entry?type=${this.data.type}&orderId=${orderId}`,
    })
  },
  toCreateInvoices(){
    if(this.data.type==1){
      wx.navigateTo({
        url: '/warehouse/pages/godown_entry_nostate/godown_entry_nostate',
      })
    }else{
      wx.navigateTo({
        url: '/warehouse/pages/stock_removal/stock_removal',
      })
    }
  },
  getFilterItem(e){
    const data = e.detail
    this.getOutStockList(data)
  },
  searchList(e){
    const data = {
      search_content: e.detail.value
    }
    this.getOutStockList(data)
  },
  //获取库存列表
  getOutStockList(data){
    data.action=this.data.type
    api.warehouse.getOutInStockList(data)
    .then(res=>{
      this.setData({
        stockList: res.datas.results
      })
    })
    .catch(err=>{

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type){
      if (options.type==0){
        this.setData({
          title: "出库列表",
          btnText: "创建出库单",
          type: options.type
        })
      } else if (options.type == 1){
        this.setData({
          title: '入库列表',
          btnText: '创建入库单',
          type: options.type
        })
      }
    }
    this.getOutStockList({})
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