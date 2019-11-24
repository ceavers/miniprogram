// market/pages/customer/customer.js
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cutomerName: '',//当前操作的客户名
    userId: '',//当前操作的客户id
    screenInput: '',//input筛选信息
    showScreen: false,//筛选弹窗flag
    firstClassificationList: [],//一级分类列表
    selectedScreenList: [],//选中二级筛选列表
    selectClassificationI: 0,//选择一级分类
    selectClassificationII: 0,//选择二级分类
    showList: true,//显示用户列表
    customerList: {},//客户列表
    showCustomerMes: false,//显示客户详情flag
    showSaleModal: false,//显示销售弹窗flag
    showReceivablesModal: false,//显示收款弹窗flag
    customerReceiptList:{},
    salesBillList: {
      title: '销售开单',
      detail: [{
        cname: '选商品开单',
        url: '/market/pages/order_select/order_select?type=sale',
        imageSrc: '/images/kc-goods.png'
      },{
        cname: '拍单据录单',
          url: '/market/pages/sales_slip/sales_slip',
        imageSrc: '/images/market-photo.png'
      }]
    },//销售开单
    customerListIndex: 1,//客户列表index页数
    customerDetailMes: {},//客户详情信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.getFirstClassificationList();
  },
  //获取用户列表
  getCustomerList(){
    let data = {
      page_index: this.data.customerListIndex,
      page_size: 10,
      user_name_phone: this.data.screenInput
    }
    if(this.data.selectedScreenList.length){
      data.select_type = JSON.stringify(this.data.selectedScreenList)
    }
    api.market.getCustomerList(data).then(res => {
      if(res.code == 1){
        if (!res.datas.total_result && this.data.customerListIndex == 1) {
          this.setData({
            showList: false
          })
        } else {
          let customerList = {}
          res.datas.user.forEach(item => {
            if (customerList[item.user_category_id]){
              customerList[item.user_category_id].push(item)
            } else {
              customerList[item.user_category_id] = [item]
            }
          })
          console.log(customerList)
          this.setData({
            customerList
          })
        }
      }
    })
  },
  //创建客户页面
  gotoCreateCustomer(){
    wx.navigateTo({
      url: '/market/pages/create_customer/create_customer',
    })
  },
  //获取筛选分类
  getFirstClassificationList(){
    api.market.getFirstClassificationList({

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
  //筛选客户弹窗显示
  showScreen() {
    this.setData({
      showScreen: true
    })
  },
  //筛选框值双向绑定
  screenInput(e){
    this.setData({
      screenInput: e.detail.value
    })
  },
  //确认筛选
  confirmScreen() {
    this.setData({
      showScreen: false,
      showList: true
    })
  },
  //显示客户详情信息
  showCustomerMes(e){
    this.setData({
      showCustomerMes: true,
      customerReceiptList: {
        title: '客户收款',
        detail: [{
          cname: '销售应收',
          url: '/market/pages/sales_receivables/sales_receivables?name=' + e.currentTarget.dataset.name + '&userId=' + e.currentTarget.dataset.id + '&money=' + e.currentTarget.dataset.money,
          imageSrc: '/market/images/sale.png'
        }, {
          cname: '预付款',
          url: '/market/pages/payment_in_advance/payment_in_advance?name=' + e.currentTarget.dataset.name + '&userId=' + e.currentTarget.dataset.id,
          imageSrc: '/images/market-ticket.png'
        },]
      },//客户收款
    })
    api.market.getCustomerDetail({
      user_id: e.currentTarget.dataset.id
    }).then(res => {
      this.setData({
        customerDetailMes: res.datas.user
      })
    })
  },
  //关闭客户详情信息
  closeCustomerMes(){
    this.setData({
      showCustomerMes: false
    })
  },
  //销售弹窗
  showSaleModal(){
    this.setData({
      showSaleModal: true
    })
  },
  //收款弹窗
  showReceivablesModal(){
    this.setData({
      showReceivablesModal: true
    })
  },
  //获取筛选信息
  getScreenMes(e){
    this.setData({
      selectedScreenList: e.detail
    })
    this.getCustomerList();
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
    this.setData({
      showCustomerMes: false,//显示客户详情flag
      showSaleModal: false,//显示销售弹窗flag
      showReceivablesModal: false,//显示收款弹窗flag
    })
    this.getCustomerList();
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