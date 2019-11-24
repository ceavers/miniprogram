// warehouse/pages/godown_entry_nostate/godown_entry_nostate.js
import {api} from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectShow: false,
    selectTimeShow:false,
    calculatorShow:false,
    //层级穿透
    penetrateShow:false,
    //计算器输入相关索引
    listIndex:0,
    skuIndex:0,
    propIndex:0,
    time:'',
    //来货单位
    source:'',
    //备注
    note:'',
    stockName: '',
    stockCode: '',
    //仓库列表
    selectData: [],
    goodsList:[],
  },
  toAddGoods(){
    wx.setStorageSync('selectInStockList', this.data.goodsList)
    wx.navigateTo({
      url: '/warehouse/pages/inStorage_add_goods/inStorage_add_goods?type=1',
    })
  },
  createInOkPage() {
    wx.setStorageSync('selectInStockList', this.data.goodsList)
    if (this.data.stockCode == '') {
      wx.showToast({
        title: '请添加入库仓库',
        icon: 'none'
      })
      return
    }
    if (!this.data.goodsList.length) {
      wx.showToast({
        title: '请添加入库商品',
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
          title: '请添加入库商品',
          icon: 'none'
        })
        return
      }
    }
    wx.navigateTo({
      url: `/warehouse/pages/next/next?stockId=${this.data.stockCode}&type=1`,
    })
  },
  selectStock() {
    if(!this.data.selectData.length){
      wx.showToast({
        title: '暂无仓库，请新建',
        icon: 'none'
      })
      return
    }
    this.setData({
      selectShow: true,
      penetrateShow:true
    })
  },
  selectTime(){
    this.setData({
      selectTimeShow: true,
      penetrateShow:true
    })
  },
  getRadioValue(e) {
    this.setData({
      stockName: e.detail.name,
      stockCode: e.detail.value,
      selectShow: false,
      penetrateShow:false
    })
    this.data.selectData.forEach(item=>{
      if (item.depo_id == this.data.stockCode){
        item.checked = true
      }else{
        item.checked =false
      }
    })
    this.setData({
      selectData:this.data.selectData
    })
  },
  //穿透替代取消
  cancel(){
    this.setData({
      penetrateShow:false
    })
  },
  //获取时间
  getTime(e){
    const time = e.detail.year+'/'+e.detail.month+'/'+e.detail.day
    this.setData({
      time: time,
      penetrateShow:false
    })
  },
  getInputValue(e){
    this.setData({
      source:e.detail.value
    })
  },
  getNote(e){
    this.setData({
      note:e.detail.value
    })
  },
  //扫条码
  scan(){
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
      }
    })
  },
  //移除商品
  deleteGoods(e){
    const product_id = e.currentTarget.dataset.id;
    const tempArr=this.data.goodsList.filter(item => item.product_id != product_id);
    this.setData({
      goodsList: tempArr
    })
    wx.setStorageSync("selectInStockList", tempArr)
  },
  //加
  addGoodsNum(e){
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
  subtractGoodsNum(e){
    const listIndex = e.currentTarget.dataset.listIndex;
    const skuIndex = e.currentTarget.dataset.skuIndex;
    const propIndex = e.currentTarget.dataset.propIndex;
    let tempList = this.data.goodsList;
    if (tempList[listIndex].results[skuIndex].results[propIndex].amount>0){
      tempList[listIndex].results[skuIndex].results[propIndex].amount--;
      tempList[listIndex].results[skuIndex].sum--;
      tempList[listIndex].count--;
      tempList[listIndex].styleSum = this.getStyleSum(tempList[listIndex].results);
      tempList[listIndex].count = this.getSum(tempList[listIndex].results);
      this.setData({
        goodsList: tempList
      })
    }else{
      return
    }
  },
  //计算器输入
  inputNumber(e){
    this.setData({
      calculatorShow:true,
      penetrateShow:true,
      listIndex:e.currentTarget.dataset.listIndex,
      skuIndex:e.currentTarget.dataset.skuIndex,
      propIndex:e.currentTarget.dataset.propIndex
    })
  },
  getResult(e){
    const amount = parseInt(e.detail.res);
    this.setData({
      penetrateShow:false
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
      goodsList:tempList
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
  getWareList(){
    api.warehouse.getWareHouseList({})
    .then(res=>{
      const resData = res.datas.results;
      if(resData.length){
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
          stockCode: resData[0].depo_id
        })
      }
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
    this.getWareList();
    const date = new Date();
    let time = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
    this.setData({
      time: time
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.getStorageSync('selectInStockList')) {
      this.setData({
        goodsList: wx.getStorageSync('selectInStockList')
      })
    }else{
      this.setData({
        goodsList: [],
        source: '',
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
    wx.setStorageSync('selectInStockList', this.data.goodsList)
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