// market/pages/order_select/order_select.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    settingUrl: '',//修改地址
    type: '',//采购单、销售单
    mesBoxType: true,//选择商品框
    chooseDiscountList: {
      title: '选择优惠类型',
      detail: [{
        imageSrc: '/market/images/discount1.png',
        cname: '账单折扣',
        eventName: 'billDiscount'
      }, {
        imageSrc: '/market/images/discount2.png',
        cname: '优惠抹零',
        eventName: 'preferentialWipingout'
      },]
    },
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
    imageList: [],//选择图片列表
    showChooseDiscountModal: false,//选择优惠类型弹窗,
    showBillDiscountModal: false,//整单折扣弹窗
    showPreferentialWipingoutModal: false,//优惠抹零弹窗
    showChoosePhotographModal: false,//选择拍照弹窗
    optionList: [{
      account_name: '1客户',
      id: 1
    },{
      account_name: '2客户',
      name: '2客户',
      id: 2
    },{
      account_name: '3客户',
      name: '3客户',
      id: 3
    }],//选择客户
    selectUser: {
      account_name: '1客户',
      id: 1
    },//选择的客户获取供应商
    showSelectCustomerModal: false,//选择客户弹窗
    showCalculator: false,//计算器
    showCalculatorModal: true,
    goodsImage: '',//商品图片
    selectShow: false,
    calculatorShow: false,
    stockName: '',
    stockCode: '',
    //仓库列表
    selectData: [],
    goodsList: [],
    goodsListLength: 0,
    //计算器输入相关索引
    listIndex: 0,
    skuIndex: 0,
    propIndex: 0,
    //价格
    totalPrice: 0,
    comPrice: 0,
    discount: 100,
    discountPrice: 0,
    name: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type
    })
    switch(options.type){
      case 'sale':
        this.setData({
          settingUrl: '/market/pages/sales_bill_setting/sales_bill_setting',
          mesBoxType: true,
          name: '客户'
        })
      break;
      case 'saleRefund': 
        this.setData({
          settingUrl: '/market/pages/sales_bill_setting/sales_bill_setting',
          mesBoxType: true,
          name: '客户'
        })
      break;
      case 'purchaseRefund':
        this.setData({
          settingUrl: '/market/pages/purchasing_bill_setting/purchasing_bill_setting',
          mesBoxType: false,
          name: '供应商'
        })
      break;
      case 'purchase':
        this.setData({
          settingUrl: '/market/pages/purchasing_bill_setting/purchasing_bill_setting',
          mesBoxType: false,
          name: '供应商'
        }) 
      break;
    }
  },
  //去选择商品
  gotoChoosingGoods(){
    switch (this.data.type) {
      case 'sale':
        wx.setStorageSync('selectSaleList', this.data.goodsList)
        break;
      case 'saleRefund':
        wx.setStorageSync('selectSaleRefundList', this.data.goodsList)
        break;
      case 'purchaseRefund':
        wx.setStorageSync('selectPurchaseRefundList', this.data.goodsList)
        break;
      case 'purchase':
        wx.setStorageSync('selectPurchaseList', this.data.goodsList)
        break;
    }
    wx.navigateTo({
      url: '/warehouse/pages/inStorage_add_goods/inStorage_add_goods?type=' + this.data.type,
    })
  },
  //显示选择优惠类型弹窗
  showChooseDiscountModal(){
    this.setData({
      showChooseDiscountModal: true
    })
  },
  //获取事件名
  getEventName(e){
    let _this = this
    switch (e.detail.event_name){
      case "billDiscount":
        this.setData({
          showBillDiscountModal: true
        })
        break;
      case "preferentialWipingout":
        this.setData({
          showPreferentialWipingoutModal: true
        })
        break;
      case "photograph":
        wx.chooseImage({
          count: 1,
          sizeType: ['original'],
          sourceType: ['camera'],
          success(res) {
            // tempFilePath可以作为img标签的src属性显示图片
            const tempFilePaths = res.tempFilePaths
            _this.setData({
              showCalculator: true,
              goodsImage: tempFilePaths[0],
              showChoosePhotographModal: false,
            })
          }
        })
        break;
      case "album":
        wx.chooseImage({
          count: 1,
          sizeType: ['original'],
          sourceType: ['album'],
          success(res) {
            // tempFilePath可以作为img标签的src属性显示图片
            const tempFilePaths = res.tempFilePaths
            this.setData({
              showCalculator: true,
              goodsImage: tempFilePaths[0],
              showChoosePhotographModal: false,
            })
          }
        })
        break;
    }
  },
  //隐藏弹窗
  hideModal(){
    this.setData({
      showBillDiscountModal: false,//整单折扣弹窗
      showPreferentialWipingoutModal: false,//优惠抹零弹窗
    })
  },
  //拍照
  photograph(){
    this.setData({
      showChoosePhotographModal: true
    })
  },
  //结算
  settlement(){
    if(this.data.goodsList.length){
      let dicountObj = {
        totalPrice: this.data.totalPrice,
        discount: this.data.discount,
        discountPrice: this.data.discountPrice,
      }
      switch (this.data.type) {
        case 'sale':
          wx.navigateTo({
            url: '/market/pages/create_new_order/create_new_order?type=sale&userMes=' + JSON.stringify(this.data.selectUser) + '&discount=' + JSON.stringify(dicountObj),
          })
          break;
        case 'saleRefund':
          wx.navigateTo({
            url: '/market/pages/new_return/new_return?type=saleRefund&userMes=' + JSON.stringify(this.data.selectUser) + '&orderMoney=' + this.data.totalPrice,
          })
          break;
        case 'purchaseRefund':
          wx.navigateTo({
            url: '/market/pages/new_return/new_return?type=purchaseRefund&userMes=' + JSON.stringify(this.data.selectUser) + '&orderMoney=' + this.data.totalPrice,
          })
          break;
        case 'purchase':
          wx.navigateTo({
            url: '/market/pages/create_new_purchase/create_new_purchase?type=purchase&userMes=' + JSON.stringify(this.data.selectUser) + '&orderMoney=' + this.data.totalPrice,
          })
          break;
      }
    } else {
      wx.showToast({
        title: '您还没有选择商品，请选择商品后再结算',
        icon: 'none'
      })
    }
  },
  //选择客户弹窗
  showSelectCustomerModal(){
    this.setData({
      showSelectCustomerModal: true
    })
  },
  //选择类型
  selectedOption(e){
    this.setData({
      selectUser: this.data.optionList[e.detail]
    })
  },
  //取消添加排照获取商品
  cancelAdd(e){

  },
  //确认添加排照获取商品
  confirmAdd(e){
    let goods = {
      count: 1,
      pic_url: this.data.goodsImage,
      price: e.detail.res,
      product_code: new Date().getTime(),
      product_id: new Date().getTime(),
      product_name: new Date().getTime(),
      results: [{
        color: '拍单商品',
        results: [{        
          amount: 1
        }],
        sum: 1
      }],
      styleSum: 1,
      total_results: 1,
      total_stock: 100000,
    }
    this.setData({
      goodsList: [...this.data.goodsList, goods]
    })
    switch(this.data.type){
      case 'sale':
        wx.setStorageSync('selectSaleList', this.data.goodsList)
        break;
      case 'saleRefund':
        wx.setStorageSync('selectSaleRefundList', this.data.goodsList)
        break;
    }
  },
  selectStock() {
    if (!this.data.selectData.length) {
      wx.showToast({
        title: '暂无仓库，请新建',
        icon: 'none'
      })
      return
    }
    this.setData({
      selectShow: true
    })
  },
  getRadioValue(e) {
    this.setData({
      stockName: e.detail.name,
      stockCode: e.detail.value,
      selectShow: false,
    })
    this.data.selectData.forEach(item => {
      if (item.depo_id == this.data.stockCode) {
        item.checked = true
      } else {
        item.checked = false
      }
    })
    this.setData({
      selectData: this.data.selectData
    })
  },
  createOutOkPage() {
    wx.setStorageSync('selectOutStockList', this.data.goodsList)
    if (this.data.stockCode == '') {
      wx.showToast({
        title: '请添加出库仓库',
        icon: 'none'
      })
      return
    }
    if (!this.data.goodsList.length) {
      wx.showToast({
        title: '请添加出库商品',
        icon: 'none'
      })
      return
    } else {
      let flag = 0;
      this.data.goodsList.forEach(item => {
        if (item.count > 0) {
          flag = 1
        }
      })
      if (!flag) {
        wx.showToast({
          title: '请添加出库商品',
          icon: 'none'
        })
        return
      }
    }
    wx.navigateTo({
      url: `/warehouse/pages/next/next?stockId=${this.data.stockCode}`,
    })
  },
  //扫条码
  scan() {
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
      }
    })
  },
  //移除商品
  deleteGoods(e) {
    const product_id = e.currentTarget.dataset.id;
    const tempArr = this.data.goodsList.filter(item => item.product_id != product_id);
    this.setData({
      goodsList: tempArr
    })
    this.getTotalPrice();
    switch (this.data.type) {
      case 'sale':
        wx.setStorageSync('selectSaleList', this.data.goodsList)
        break;
      case 'saleRefund':
        wx.setStorageSync('selectSaleRefundList', this.data.goodsList)
        break;
      case 'purchaseRefund':
        wx.setStorageSync('selectPurchaseRefundList', this.data.goodsList)
        break;
      case 'purchase':
        wx.setStorageSync('selectPurchaseList', this.data.goodsList)
        break;
    }
  },
  //加
  addGoodsNum(e) {
    const listIndex = e.currentTarget.dataset.listIndex;
    const skuIndex = e.currentTarget.dataset.skuIndex;
    const propIndex = e.currentTarget.dataset.propIndex;
    let tempList = this.data.goodsList;
    tempList[listIndex].results[skuIndex].results[propIndex].amount++;
    tempList[listIndex].results[skuIndex].sum++;
    tempList[listIndex].count++;
    tempList[listIndex].styleSum = this.getStyleSum(tempList[listIndex].results);
    tempList[listIndex].count = this.getSum(tempList[listIndex].results);
    this.setData({
      goodsList: tempList
    })
    this.getTotalPrice();
  },
  //减
  subtractGoodsNum(e) {
    const listIndex = e.currentTarget.dataset.listIndex;
    const skuIndex = e.currentTarget.dataset.skuIndex;
    const propIndex = e.currentTarget.dataset.propIndex;
    let tempList = this.data.goodsList;
    if (tempList[listIndex].results[skuIndex].results[propIndex].amount > 0) {
      tempList[listIndex].results[skuIndex].results[propIndex].amount--;
      tempList[listIndex].results[skuIndex].sum--;
      tempList[listIndex].count--;
      tempList[listIndex].styleSum = this.getStyleSum(tempList[listIndex].results);
      tempList[listIndex].count = this.getSum(tempList[listIndex].results);
      this.setData({
        goodsList: tempList
      })
    } else {
      return
    }
    this.getTotalPrice();
  },
  //计算器输入
  inputNumber(e) {
    this.setData({
      calculatorShow: true,
      listIndex: e.currentTarget.dataset.listIndex,
      skuIndex: e.currentTarget.dataset.skuIndex,
      propIndex: e.currentTarget.dataset.propIndex
    })
  },
  getResult(e) {
    const amount = parseInt(e.detail.res);
    if (amount < 0) {
      return
    }
    let tempList = this.data.goodsList;
    const listIndex = this.data.listIndex;
    const skuIndex = this.data.skuIndex;
    const propIndex = this.data.propIndex;
    tempList[listIndex].results[skuIndex].sum -= tempList[listIndex].results[skuIndex].results[propIndex].amount;
    tempList[listIndex].results[skuIndex].results[propIndex].amount = amount;
    tempList[listIndex].results[skuIndex].sum += amount;
    tempList[listIndex].styleSum = this.getStyleSum(tempList[listIndex].results);
    tempList[listIndex].count = this.getSum(tempList[listIndex].results);
    this.setData({
      goodsList: tempList
    })
  },
  //获取款式数量
  getStyleSum(temp) {
    let styleSum = 0
    temp.forEach(item => {
      item.results.forEach(item => {
        if (item.amount > 0) {
          styleSum++
        }
      })
    })
    return styleSum;
  },
  //获取总件数
  getSum(temp) {
    let sum = 0
    temp.forEach(item => {
      sum += item.sum
    })
    return sum
  },
  //计算总价
  getTotalPrice() {
    let totalPrice = 0;
    const tempList = this.data.goodsList;
    tempList.forEach(item => {
      totalPrice += item.count * item.price
    })
    this.setData({
      totalPrice,
      comPrice: totalPrice * this.data.discount / 100,
      goodsListLength: this.data.goodsList.length
    })
    console.log(this.data.goodsListLength)
  },
  //整单折扣
  confirmDiscount1(e){
    this.setData({
      discount: e.detail.value.discount,
      comPrice: this.data.totalPrice * e.detail.value.discount / 100
    })
    this.hideModal();
  },
  //优惠金额
  confirmDiscount2(e){
    this.setData({
      discountPrice: e.detail.value.discountPrice,
      comPrice: e.detail.value.discountPrice
    })
    this.hideModal();
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
    switch (this.data.type) {
      case 'sale':
        if (wx.getStorageSync('selectSaleList')) {
          this.setData({
            goodsList: wx.getStorageSync('selectSaleList')
          })
        } else {
          this.setData({
            goodsList: []
          })
        }
        break;
      case 'saleRefund':
        if (wx.getStorageSync('selectSaleRefundList')) {
          this.setData({
            goodsList: wx.getStorageSync('selectSaleRefundList')
          })
        } else {
          this.setData({
            goodsList: []
          })
        }
        break;
      case 'purchaseRefund':
        if (wx.getStorageSync('selectPurchaseRefundList')) {
          this.setData({
            goodsList: wx.getStorageSync('selectPurchaseRefundList')
          })
        } else {
          this.setData({
            goodsList: []
          })
        }
        break;
      case 'purchase':
        if (wx.getStorageSync('selectPurchaseList')) {
          this.setData({
            goodsList: wx.getStorageSync('selectPurchaseList')
          })
        } else {
          this.setData({
            goodsList: []
          })
        }
        break;
    }
    this.getTotalPrice();
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