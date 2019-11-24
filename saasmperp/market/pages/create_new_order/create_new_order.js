// market/pages/create_new_order/create_new_order.js
const app = getApp();
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customerId: '',
    selectUser: {},//选择的用户信息
    showSelectDateModal: false,//选择时间弹窗flag
    dateObj: {},
    accountList: [],//账户类型列表
    showAccountListModal: false,//账户类型弹窗
    account: {},//选择账户
    employList: [],//销售员列表
    showEmployListModal: false,//销售员弹窗
    employ: {},//销售员信息,
    orderMoney: 0,//订单金额,
    imagesList: [],//单据图片
    delivery: {
      type: 0,
      typeName: '送货'
    },//送货方式
    type: null,//创建订单方式,
    disountObj: {},
    showWareHouseModal: false,//仓库选择
    wareHouseList: [],//仓库
    wareHouse: {},
    imagesList: [],//单据图片
    //选择单据图片
    showChoosePhotographModal: false,
    choosePhotographList: {
      title: '选择操作',
      detail: [{
        cname: '拍照',
        imageSrc: '/images/market-photo.png',
        eventName: 'photograph'
      }, {
        cname: '相册',
        imageSrc: '/market/images/album.png',
        eventName: 'album'
      }]
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let firstdate = new Date()
    let dateObj = {
      date: firstdate.getFullYear() + '/' + (firstdate.getMonth() + 1) + '/' + firstdate.getDate(),
      timeStamp: firstdate.getTime()
    } 
    console.log(options)
    this.setData({
      dateObj,
      orderMoney: options.orderMoney,
      imagesList: options.images
    })
    if(options.type){
      this.setData({
        type: options.type,
        customerId: JSON.parse(options.userMes).id,
        disountObj: JSON.parse(options.discount),
        orderMoney: JSON.parse(options.discount).totalPrice
      })
    }
    this.getCustomerDetail();
    this.getAccountList();
    this.getEmployList();
    this.getWareHouseList();
  },
  //获取选择用户的详情信息
  getCustomerDetail(){
    api.market.getCustomerDetail({

    }).then(res => {
      if(res.code == 1){
        this.setData({
          selectUser: res.datas.user
        })
      }
    })
  },
  //获取仓库列表
  getWareHouseList() {
    api.warehouse.getWareHouseList({
      page_index: 1,
      page_size: 10,
    }).then(res => {
      if (res.code == 1) {
        res.datas.results.forEach(item => {
          item.account_name = item.depo_name
        })
        this.setData({
          wareHouseList: res.datas.results,
          wareHouse: res.datas.results[0]
        })
      }
    })
  },
  //显示仓库列表
  showWareHouseModal() {
    this.setData({
      showWareHouseModal: true
    })
  },
  //选择仓库类型
  getWareHouse(e) {
    console.log(e)
    this.setData({
      wareHouse: this.data.wareHouseList[e.detail]
    })
  },
  //获取账户类型
  getAccountList(){
    api.market.getAccountList({

    }).then(res => {
      if(res.code == 1){
        this.setData({
          accountList: res.datas.accounts,
          account: res.datas.accounts[0]
        })
      }
    })
  },
  //显示账户列表
  showAccountListModal(){
    this.setData({
      showAccountListModal: true
    })
  },
  //选择账户类型
  getAccount(e){
    console.log(e)
    this.setData({
      account: this.data.accountList[e.detail]
    })
  },
  //拍照
  photograph() {
    this.setData({
      showChoosePhotographModal: true
    })
  },
  //获取事件名
  getEventName(e) {
    let _this = this
    switch (e.detail.event_name) {
      case "photograph":
        wx.chooseImage({
          count: 3,
          sizeType: ['original'],
          sourceType: ['camera'],
          success(res) {
            // tempFilePath可以作为img标签的src属性显示图片
            const tempFilePaths = res.tempFilePaths
            console.log(_this.data.imagesList, tempFilePaths)
            _this.setData({
              showCalculator: true,
              imagesList: _this.data.imagesList ? [..._this.data.imagesList, ...tempFilePaths] : tempFilePaths,
              showChoosePhotographModal: false,
            })
          }
        })
        break;
      case "album":
        wx.chooseImage({
          count: 3,
          sizeType: ['original'],
          sourceType: ['album'],
          success(res) {
            // tempFilePath可以作为img标签的src属性显示图片
            const tempFilePaths = res.tempFilePaths
            _this.setData({
              showCalculator: true,
              imagesList: _this.data.imagesList ? [..._this.data.imagesList, ...tempFilePaths] : tempFilePaths,
              showChoosePhotographModal: false,
            })
          }
        })
        break;
    }
  },
  //去修改订单
  gotoEditOrder(){
    wx.navigateTo({
      url: '/market/pages/edit_order/edit_order?user=' + JSON.stringify(this.data.selectUser),
    })
  },
  //返回
  goBack(){
    wx.navigateBack({
      detal: 1
    })
  },
  //确认订单
  createOrder(e){
    console.log(e)
    if(this.data.type){
      api.market.addSaleOrder({
        type: 0,//开单类型 0 销售单 1 销售退单
        user_id: 1,//本人id
        customer_id: this.data.customerId,//客户id
        products: JSON.stringify(wx.getStorageSync('selectSaleList')),//商品集合
        already_pay_money: this.data.disountObj.totalPrice,//总价
        discount: this.data.disountObj.discount / 100,//折扣
        preferential_money: this.data.disountObj.discountPrice,//折扣金额
        date: parseInt(this.data.dateObj.timeStamp / 1000),//时间
        saler_id: this.data.employ.user_id,//销售员id
        foreign_order_id: e.detail.value.orderNum,//外部单号
        note: e.detail.value.remark,//备注
        order_image: JSON.stringify(this.data.imagesList),//单据图片
        contact_name: this.data.selectUser.contact,//联系人
        address: this.data.selectUser.address,//送货地址
        phone: this.data.selectUser.phone,//电话
        method: this.data.delivery.type,//送货方式
        repository_type: this.data.wareHouse.depo_id,//出货仓库
      }).then(res => {
        if(res.code == 1){
          wx.removeStorageSync('selectSaleList')
          wx.redirectTo({
            url: '/market/pages/create_order_success/create_order_success?orderId=' + res.data.order_id,
          })
        }
      })
    } else {
      api.market.postSalesListEntry({
        id: this.data.selectUser.user_id,
        phone: this.data.selectUser.phone,
        address: this.data.selectUser.address,
        order_money: e.detail.value.orderMoney,
        actually_money: e.detail.value.payMoney,
        account: this.data.account.account_id,
        date: parseInt(this.data.dateObj.timeStamp / 1000),
        note: e.detail.value.remark,
        number: e.detail.value.orderNum,
        sales_man_id: this.data.employ.user_id,
        order_image: this.data.imagesList
      }).then(res => {
        if (res.code == 1) {
          wx.redirectTo({
            url: '/market/pages/create_order_success/create_order_success?orderId=' + res.data.order_id,
          })
        }
      })
    }   
  },
  //选择时间
  selectDate(){
    this.setData({
      showSelectDateModal: true
    })
  },
  //确认选择时间
  confirmDate(e){
    console.log(e)
    let timeStamp = new Date(e.detail.year + '/' + e.detail.month + '/' + e.detail.day)
    let dateObj = {
      date: e.detail.year + '/' + e.detail.month + '/' + e.detail.day,
      timeStamp: timeStamp.getTime()
    }
    this.setData({
      dateObj
    })
  },
  //获取销售员
  getEmployList(){
    api.department.getEmployList({

    }).then(res => {
      if(res.code == 1){
        res.datas.users.forEach(item => {
          item.account_name = item.user_name
        })
        this.setData({
          employList: res.datas.users,
          employ: res.datas.users[0]
        })
      }
    })
  },
  //显示销售员弹窗
  showEmployListModal(){
    this.setData({
      showEmployListModal: true
    })
  },
  //获取销售员
  getEmploy(e){
    this.setData({
      employ: this.data.employList[e.detail]
    })
  },
  //查看历史列表
  gotoHistory(){
    wx.navigateTo({
      url: '/market/pages/sell_invoice_list/sell_invoice_list',
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
    if (app.globalData.editCustomer){
      const selectUser = this.data.selectUser           
      selectUser.contact = app.globalData.editCustomer.man
      selectUser.phone = app.globalData.editCustomer.phone
      selectUser.address = app.globalData.editCustomer.address
      const delivery = app.globalData.editCustomer.delivery
      this.setData({
        selectUser,
        delivery
      })
      app.globalData.editCustomer = null
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