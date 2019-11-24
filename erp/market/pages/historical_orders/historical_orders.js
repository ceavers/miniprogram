// 历史订单
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenInput: '',//input筛选信息
    showScreen: false,//筛选弹窗flag
    firstClassificationList: [],//一级分类列表
    selectedScreenList: [],//选中二级筛选列表
    userId: '',//用户id
    pagesIndex: 1,//页数
    showBottomModal: false,//下弹窗flag
    bottomModalList: {
      title: '订单操作',
      detail: [{
        cname: '复制订单',
        imageSrc: '/market/images/copy.png',
        eventName: '123'
      }, {
        cname: '发送订单',
        imageSrc: '/images/common-share.png',
        eventName: '321'
      }]
    },
    historicalOrderList: {},//历史订单列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId: options.userId
    })
    this.getHistoricalOrder();
    this.getHistoricalOrderScreenList();
  },
  //获取历史订单
  getHistoricalOrder(){
    let data = {
      page_index: this.data.pagesIndex,
      page_size: 10,
      user_name_phone: this.data.screenInput
    }
    if (this.data.selectedScreenList.length) {
      data.select_type = JSON.stringify(this.data.selectedScreenList)
    }
    api.market.getHistoricalOrder(data).then(res => {
      if(res.code == 1){
        let historicalOrderList = {}
        res.datas.order.forEach(item => {
          let today = new Date().toLocaleDateString().replace(/\//g, "-");
          let date = new Date(item.date * 1000).toLocaleDateString().replace(/\//g, "-");
          if (today == date) {
            date = '今天'
          }
          item.cdate = date
          if (historicalOrderList[date]) {
            historicalOrderList[date].push(item)
          } else {
            historicalOrderList[date] = [item]
          }
        })
        this.setData({
          historicalOrderList
        })
        console.log(historicalOrderList)
      }
    })
  },
  //显示下弹窗
  showBottomModal(){
    this.setData({
      showBottomModal: true
    })
  },
  //获取事件名
  getEventName(e){
    console.log(e)
  },
  //筛选框值双向绑定
  screenInput(e) {
    this.setData({
      screenInput: e.detail.value
    })
  },
  //筛选客户弹窗显示
  showScreen() {
    this.setData({
      showScreen: true
    })
  },
  //获取历史订单筛选列表
  getHistoricalOrderScreenList(){
    api.market.getHistoricalOrderScreenList({

    }).then(res => {
      if (res.code == 1) {
        let selectedScreenList = []
        res.datas.select_condition.forEach(item => {
          item.condition.condition_second.unshift({
            condition_second_id: '',
            condition_second_name: '不限'
          })
          selectedScreenList.push({
            select_type_id: item.condition_id,
            select_second_type_id: '',
          })
        })
        this.setData({
          firstClassificationList: res.datas.select_condition,
          selectedScreenList
        })
      }
    })
  },
  //获取筛选信息
  getScreenMes(e) {
    this.setData({
      selectedScreenList: e.detail
    })
    this.getHistoricalOrder();
  },
  //查看订单详情
  gotoDetail(e){
    wx.navigateTo({
      url: '/market/pages/sell_invoice_list_commodity/sell_invoice_list_commodity?orderId=' + e.currentTarget.dataset.id,
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