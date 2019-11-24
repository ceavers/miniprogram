// market/pages/new_return/new_return.js\
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectUser: {},
    showSelectDateModal: false,//业务时间选择
    showAccountListModal: false,//账户选择
    showEmployListModal: false,//销售员选择
    showWareHouseModal: false,//仓库选择
    accountList: [],//账户
    account: {},
    userMes:{},
    employList: [],//销售员
    employ: {},
    wareHouseList: [],//仓库
    wareHouse: {},
    dateObj: {},//业务时间
    orderMoney: '',//退货金额
    imagesList: [],//单据图片
    already_refund_money:"",
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
  already_refund_money(e){
   console.log(e)
   let that =this 
   that.setData({
     already_refund_money:e.detail.value
   })
  },
  submit(){
    let that =this
    console.log(wx.getStorageSync('selectSaleRefundList'))
    let data={
      refund_money: that.data.orderMoney,
      already_refund_money: that.data.already_refund_money,
      products: wx.getStorageSync('selectSaleRefundList'),
      get_account:"",
      date: that.data.dateObj.date,
      repository_type: that.data.wareHouse.depo_name,
      type:1,
      customer_id:that.data.userMes.id,
      order_image: wx.getStorageSync('selectSaleRefundList')[0].pic_url
    }  
    api.market.addSaleOrder(data)
      .then(res => {
        if (res.code == 1) {
           console.log(res)
           wx.setStorage({
             key: 'orderMoney',
             data: that.data.orderMoney
           })
          wx.setStorage({
            key: 'refund_money',
            data: that.data.already_refund_money
          })
          wx.setStorage({
            key: 'user_name',
            data: that.data.employ.user_name
          })
          wx.setStorage({
            key: 'depo_name',
            data: that.data.wareHouse.depo_name
          })
          wx.setStorage({
            key: 'account_name',
            data: that.data.account.account_name
          })
        }
      })
      .catch(err => {

      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that =this
    let firstdate = new Date()
    let dateObj = {
      date: firstdate.getFullYear() + '/' + (firstdate.getMonth() + 1) + '/' + firstdate.getDate(),
      timeStamp: firstdate.getTime()
    }
    console.log(options)
    that.setData({
      type: options.type,
      selectUser: JSON.parse(options.userMes),
      dateObj,
      orderMoney: options.orderMoney,
    })
    this.getAccountList();
    this.getEmployList();
    this.getWareHouseList();
  },
  //获取仓库列表
  getWareHouseList(){
    api.warehouse.getWareHouseList({
      page_index: 1,
      page_size: 10,
    }).then(res => {
      if(res.code == 1){
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
  getAccountList() {
    api.market.getAccountList({

    }).then(res => {
      if (res.code == 1) {
        this.setData({
          accountList: res.datas.accounts,
          account: res.datas.accounts[0]
        })
      }
    })
  },
  //显示账户列表
  showAccountListModal() {
    this.setData({
      showAccountListModal: true
    })
  },
  //选择账户类型
  getAccount(e) {
    console.log(e)
    this.setData({
      account: this.data.accountList[e.detail]
    })
  },
  //选择时间
  selectDate() {
    this.setData({
      showSelectDateModal: true
    })
  },
  //确认选择时间
  confirmDate(e) {
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
  getEmployList() {
    api.department.getEmployList({

    }).then(res => {
      if (res.code == 1) {
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
  showEmployListModal() {
    this.setData({
      showEmployListModal: true
    })
  },
  //获取销售员
  getEmploy(e) {
    this.setData({
      employ: this.data.employList[e.detail]
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
            console.log(_this.data.imagesList,tempFilePaths)
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
  confirmOrder(e){
    switch(this.data.type){
      case 'saleRefund': 
        api.market.addSaleOrder({
          type: 1,//类型 0 销售 1 销售退货
          user_id: 1,//本人id
          customer_id: this.data.selectUser.id,//客户id
          refund_money: this.data.orderMoney,//订单退货总价
          already_refund_money: e.detail.value.returnMoney,//退款金额
          products: JSON.stringify(wx.getStorageSync('selectSaleRefundList')),//商品
          date: parseInt(this.data.dateObj.timeStamp / 1000),//时间
          note: e.detail.value.remark,//备注
          order_image: JSON.stringify(this.data.imagesList),//单据图片
          get_account: this.data.account.account_id,//账户类型
          repository_type: this.data.wareHouse.depo_id,//退货仓库
          foreign_order_id: e.detail.value.orderNum,//外部单号
          saler_id: this.data.employ.user_id,//销售员
        }).then(res => {        
          if(res.code == 1){
            wx.removeStorageSync('selectSaleRefundList')
            wx.redirectTo({
              url: '/market/pages/sell_invoice_cancel/sell_invoice_cancel??orderId=' + res.data.order_id,
            })
          }
        })
        break;
      case 'purchaseRefund':
        api.market.addPurchaseOrder({
          type: 1,
          user_id: 1,
          supplier_id: this.data.selectUser.id,
          date: parseInt(this.data.dateObj.timeStamp / 1000),//时间
          note: e.detail.value.remark,//备注
          order_image: JSON.stringify(this.data.imagesList),//单据图片
          refund_money: this.data.orderMoney,//退款总金额
          already_refund_money: e.detail.value.returnMoney,//退款金额
          products: JSON.stringify(wx.getStorageSync('selectPurchaseRefundList')),//商品
          repository_type: this.data.wareHouse.depo_id,//退货仓库
          foreign_order_id: e.detail.value.orderNum,//外部单号
          account: this.data.account.account_id,//账户类型
        }).then(res => {
          if (res.code == 1) {
            wx.removeStorageSync('selectPurchaseRefundList')
            wx.redirectTo({
              url: '/market/pages/purchase_invoice_cancel/purchase_invoice_cancel??orderId=' + res.data.order_id,
            })
          }
        })
        break;
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