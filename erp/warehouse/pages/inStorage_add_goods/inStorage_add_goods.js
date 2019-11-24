// warehouse/pages/inStorage_add_goods/inStorage_add_goods.js
import {api} from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    //类别
    categoryShow: false,
    categoryData: [],
    categoryName: '类别',
    categoryId: '',
    goodsData:[],
    inStorageShow: false,
    //单品信息
    goodsStock: null,
    //总数
    total:0,
    //出入库总价
    totalPrice:0,
    selectData:[],
    navgate:0 ,  //用来确认点击选好了跳转到那个页面
  },
  createGoods() {
    wx.navigateTo({
      url: '/warehouse/pages/addgoods/addgoods',
    })
  },
  categoryShow() {
    this.setData({
      categoryShow: true
    })
  },
  storageShow(e){
    const data = {
      product_id: e.currentTarget.dataset.goodsId
    }
    this.getGoodsStock(data)
    this.setData({
      inStorageShow: true
    })
  },
  //获取单品库存
  getGoodsStock(data) {
    api.warehouse.getGoodsStock(data)
      .then(res => {
        res.datas.product_id = data.product_id
        res.datas.results.forEach(item => {
          item.sum = 0;
          item.results.forEach(item => {
            item.amount = 0;
          })
        })
        this.setData({
          goodsStock: res.datas
        })
      })
      .catch(err => {

      })
  },
  //扫码
  scan() {
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
      }
    })
  },
  addGoodsComplete(e){
    this.setData({
      inStorageShow: false
    })
    this.setInStorage(e.detail.selectDeatil);
    this.selectGou();
  },
  setInStorage(data) {
    const tempStr = JSON.stringify(data);
    const tempObj = JSON.parse(tempStr);
    let tempList = this.data.selectData;
    let flag = 1;
    for (let i = 0; i < tempList.length; i++) {
      if (tempList[i].product_id === tempObj.product_id) {
        flag = 0;
        for (let j = 0; j < tempObj.results.length; j++) {
          let sum = 0
          for (let z = 0; z < tempObj.results[j].results.length; z++) {
            if (tempObj.results[j].results[z].amount > 0) {
              tempList[i].results[j].results[z].amount = tempObj.results[j].results[z].amount
            }
            sum += tempList[i].results[j].results[z].amount;
          }
          tempList[i].results[j].sum = sum;
        }
        tempList[i].styleSum = this.getStyleSum(tempList[i].results);
        tempList[i].count = this.getSum(tempList[i].results);
      }
    }
    flag && tempList.push(data);
    this.setData({
      selectData: tempList
    })
  },
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
  getSum(temp) {
    let sum = 0
    temp.forEach(item => {
      sum += item.sum
    })
    return sum
  },
  complete(){

    if (this.data.add && this.data.navgate == 0){
      //只添加 不存本地 接口暂无
      wx.navigateBack({
        delta: 1,
      })
      return
    }
    if (this.data.navgate == 1){
      wx.setStorageSync('selectPurchaseList2', this.data.selectData)
      wx.navigateBack({
        delta:1
      })
      wx.showToast({
        title: '添加成功!',
        icon:'none',
        duration:1500
      })
    }
    
    switch (this.data.type) {
      case '0':
        //出库
        wx.setStorageSync('selectOutStockList', this.data.selectData)
        break;
      case '1':
        //入库
        wx.setStorageSync('selectInStockList', this.data.selectData)
        break;
      case '2':
        //调拨
        wx.setStorageSync('selectAllotList', this.data.selectData)
        break;
      case '3':
        //盘点
        wx.setStorageSync('selectCheckList', this.data.selectData)
        break;
      case 'sale':
        //销售
        wx.setStorageSync('selectSaleList', this.data.selectData)
        break;
      case 'saleRefund':
        //销售退单
        wx.setStorageSync('selectSaleRefundList', this.data.selectData)
        break;
      case 'purchaseRefund':
        //采购退单
        wx.setStorageSync('selectPurchaseRefundList', this.data.selectData)
        break;
      case 'purchase':
        //采购
        wx.setStorageSync('selectPurchaseList', this.data.selectData)
        break;
    }
    wx.navigateBack({
      delta: 1,
    })
  },
  //获取类别 大类
  getCategory() {
    api.warehouse.getCategory({})
      .then(res => {
        const data = res.datas.categorys;
        const category = data.map(item => {
          return {
            category_id: item.category_id,
            category_name: item.category_name
          }
        })
        this.setData({
          categoryData: category
        })
      })
      .catch(err => {

      })
  },
  getType(e) {
    const data = e.detail
    this.data.categoryData.forEach(item => {
      if (item.category_id == data.category_id) {
        this.setData({
          categoryName: item.category_name,
          categoryId: item.category_id
        })
      }
    })
    this.getRepertoryList(data)
  },
  searchRepertory(e) {
    const data = {
      search_content: e.detail.value
    }
    this.getRepertoryList(data)
  },
  getRepertoryList(data) {
    if (this.data.categoryId && !data.category_id) {
      data.category_id = this.data.categoryId
    }
    api.warehouse.getRepertoryList(data)
      .then(res => {
        const resData = res.datas.results;
        let tempArray = []
        resData.forEach(item => {
          let flag = 0;
          for (let i = 0; i < tempArray.length; i++) {
            if (item.category_id == tempArray[i].category_id) {
              //存在
              flag = 1;
              tempArray[i].data.push({
                price: item.price,
                product_id: item.product_id,
                product_code: item.product_code,
                product_name: item.product_name,
                stock: item.stock,
                pic_url: item.pic_url
              })
              break
            }
          }
          if (flag == 0) {
            tempArray.push({
              category_id: item.category_id,
              category_name: item.category_name,
              data: [
                {
                  price: item.price,
                  product_id: item.product_id,
                  product_code: item.product_code,
                  product_name: item.product_name,
                  stock: item.stock,
                  pic_url: item.pic_url
                }
              ]
            })
          }
        })
        this.setData({
          goodsData: tempArray
        })
        //显示勾
        this.selectGou()
      })
      .catch(err => {

      })
  },
  selectGou(){
    if (this.data.selectData.length>0){
      const tempList = this.data.selectData;
      this.data.goodsData.forEach(item => {
        item.data.forEach(goodsItem => {
          let flag = 0;
          tempList.forEach(selectItem => {
            if (goodsItem.product_id == selectItem.product_id && selectItem.count > 0) {
              flag=1;
            } 
          })
          if(flag){
            goodsItem.checked = true
          }else{
            goodsItem.checked = false
          }
        })
      })
    }else{
      this.data.goodsData.forEach(item => {
        item.data.forEach(goodsItem => {
          goodsItem.checked = false
        })
      })
    }
    this.setData({
      goodsData: this.data.goodsData
    })
    this.getTotal()
    this.getTotalPrice()
  },
  //计算总数
  getTotal(){
    if (this.data.selectData.length>0){
      let total=0;
      const tempList = this.data.selectData;
      tempList.forEach(item=>{
        total+=item.count
      })
      this.setData({
        total:total
      })
    }
  },
  //计算总价
  getTotalPrice(){
    if (this.data.selectData.length > 0) {
      let totalPrice = 0;
      const tempList = this.data.selectData;
      tempList.forEach(item => {
        totalPrice += item.count*item.price
      })
      this.setData({
        totalPrice: totalPrice
      })
    }
  },
  getSelectData(){
    let key = '';
    switch (this.data.type) {
      case '0':
        key = "selectOutStockList"
        break;
      case '1':
        key = "selectInStockList"
        break;
      case '2':
        key = "selectAllotList"
        break;
      case '3':
        key = "selectCheckList"
        break;
      case 'sale':
        //销售
        key = 'selectSaleList'
        break;
      case 'saleRefund':
        //销售退单
        key = 'selectSaleRefundList'
        break;
      case 'purchaseRefund':
        //采购退单
        key = 'selectPurchaseRefundList'
        break;
      case 'purchase':
        //采购
        key = 'selectPurchaseList'
        break;
    }
    if (key) {
      if (wx.getStorageSync(key) && wx.getStorageSync(key).length > 0) {
        this.setData({
          selectData: wx.getStorageSync(key)
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.isPurchase){
      this.setData({
        navgate:1
      })
    }
    if (options.type){
      this.setData({
        type: options.type
      })
      this.getSelectData()
    }
    if(options.add){
      this.setData({
        add: options.add
      })
    }
    this.getCategory()

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
    this.getRepertoryList({})
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