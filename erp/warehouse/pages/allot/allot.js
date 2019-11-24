// warehouse/pages/allot/allot.js
import {api} from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectShow: false,
    stockName: '',
    stockCode: '',
    selectData: [],
    selectShowIn: false,
    stockNameIn: '',
    stockCodeIn: '',
    selectDataIn: [],
    note:'',
    goodsList: [],
    //计算器输入相关索引
    listIndex: 0,
    skuIndex: 0,
    propIndex: 0,
    //层级穿透
    penetrateShow: false,
  },
  toAddGoods() {
    wx.setStorageSync('selectAllotList', this.data.goodsList)
    wx.navigateTo({
      url: '/warehouse/pages/inStorage_add_goods/inStorage_add_goods?type=2',
    })
  },
  getNote(e) {
    this.setData({
      note: e.detail.value
    })
  },
  selectCancel(){
    this.setData({
      penetrateShow:false
    })
  },
  //历史
  toHistoryList(){
    const pages = getCurrentPages();
    if (pages[pages.length - 2].route =='warehouse/pages/allot_list/allot_list'){
      wx.navigateBack({
        
      })
    }else{
      wx.navigateTo({
        url: '/warehouse/pages/allot_list/allot_list',
      })
    }
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
  getRadioValue(e) {
    this.setData({
      stockName: e.detail.name,
      stockCode: e.detail.value,
      selectShow: false,
      penetrateShow:false
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
    if(this.data.stockCode == this.data.stockCodeIn){
      let selectDataIn = this.data.selectData.filter(item => item.depo_id != this.data.stockCode)
      selectDataIn[0].checked = true
      this.setData({
        selectDataIn: selectDataIn,
        stockNameIn: selectDataIn[0].depo_name,
        stockCodeIn: selectDataIn[0].depo_id,
      })
    }else{
      let selectDataIn = this.data.selectData.filter(item => item.depo_id != this.data.stockCode)
      if (selectDataIn.length){
        selectDataIn.forEach(item=>{
          if (item.depo_id==this.data.stockCodeIn){
            item.checked = true;
          }
        })
        this.setData({
          selectDataIn: selectDataIn
        })
      }
    }
  },
  getRadioValueIn(e) {
    this.setData({
      stockNameIn: e.detail.name,
      stockCodeIn: e.detail.value,
      selectShowIn: false,
      penetrateShow:false
    })
    this.data.selectDataIn.forEach(item => {
      if (item.depo_id == this.data.stockCodeIn) {
        item.checked = true
      } else {
        item.checked = false
      }
    })
    this.setData({
      selectDataIn: this.data.selectDataIn
    })
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
      selectShow: true,
      penetrateShow: true
    })
  },
  selectStockIn(){
    if (!this.data.selectDataIn.length) {
      wx.showToast({
        title: '暂无其他仓库，请新建',
        icon: 'none'
      })
      return
    }
    this.setData({
      selectShowIn: true,
      penetrateShow: true
    })
  },
  createInOkPage(){
    if (this.data.stockCode == ''||this.data.stockCodeIn=='') {
      wx.showToast({
        title: '请选择调拨仓库',
        icon: 'none'
      })
      return
    }
    if (!this.data.goodsList.length) {
      wx.showToast({
        title: '请添加调拨商品',
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
          title: '请添加调拨商品',
          icon: 'none'
        })
        return
      }
    }
    const data = this.createAllotParams();
    console.log(data)
    api.warehouse.createAllotBill(data)
    .then(res=>{
      const billId = res.data.order_id;
      wx.navigateTo({
        url: `/warehouse/pages/create_inStorage_res/create_inStorage_res?type=2&id=${billId}`,
      })
      wx.removeStorage({
        key: 'selectAllotList',
        success: function (res) { },
      })
    })
    .catch(err=>{

    })
  },
  //创建调拨单参数
  createAllotParams(){
    let data = {
      from_depo_id: this.data.stockCode,
      to_depo_id: this.data.stockCodeIn,
      content: this.data.note,
    }
    const tempList = this.data.goodsList;
    let units = [];
    tempList.forEach(item => {
      item.results.forEach(skuItem => {
        skuItem.results.forEach(propItem => {
          if (propItem.amount > 0) {
            let tempObj = {};
            tempObj.product_id = item.product_id;
            tempObj.sku_code = propItem.sku_code;
            tempObj.amount = propItem.amount;
            units.push(tempObj);
          }
        })
      })
    })
    data.units = units;
    return data;
  },
  //移除商品
  deleteGoods(e) {
    const product_id = e.currentTarget.dataset.id;
    const tempArr = this.data.goodsList.filter(item => item.product_id != product_id);
    this.setData({
      goodsList: tempArr
    })
    wx.setStorageSync("selectAllotList", tempArr)
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
  },
  //计算器输入
  inputNumber(e) {
    this.setData({
      calculatorShow: true,
      penetrateShow: true,
      listIndex: e.currentTarget.dataset.listIndex,
      skuIndex: e.currentTarget.dataset.skuIndex,
      propIndex: e.currentTarget.dataset.propIndex
    })
  },
  getResult(e) {
    const amount = parseInt(e.detail.res);
    this.setData({
      penetrateShow: false
    })
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
  //获取仓库列表
  getWareList() {
    api.warehouse.getWareHouseList({})
      .then(res => {
        const resData = res.datas.results;
        if (resData.length) {
          resData.forEach((item, index) => {
            if (index == 0) {
              item.checked = true
            } else {
              item.checked = false
            }
          })
          this.setData({
            selectData: resData,
            stockName: resData[0].depo_name,
            stockCode: resData[0].depo_id,
          })
          let selectDataIn = this.data.selectData.filter(item => item.depo_id != this.data.stockCode)
          if (selectDataIn.length){
            selectDataIn[0].checked = true
            this.setData({
              selectDataIn: selectDataIn,
              stockNameIn: selectDataIn[0].depo_name,
              stockCodeIn: selectDataIn[0].depo_id,
            })
          }
        }
      })
      .catch(err => {

      })
  },
  //穿透替代取消
  cancel() {
    this.setData({
      penetrateShow: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWareList()
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
    if (wx.getStorageSync('selectAllotList')) {
      this.setData({
        goodsList: wx.getStorageSync('selectAllotList')
      })
    } else {
      this.setData({
        goodsList: [],
        note: '',
      })
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
    wx.setStorageSync('selectAllotList', this.data.goodsList)
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