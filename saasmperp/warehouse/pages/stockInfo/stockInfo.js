// warehouse/pages/stockInfo/stockInfo.js
import {api} from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product_id:0, //商品id
    state:false,
    calculatorShow:false,  //计算器 弹窗
    depo_pic_url:'',//商品图片
    product_name:'',//商品名
    product_code:'', //商品编号
    total_stock:0,//总库存
    stockList:[],  //库存信息列表

    listId:0,     //仓库id
    listIndex:0,  //库存下标
    colorIndex:0, //颜色下标
    sizeIndex:0,  //尺码下标
    sku_code: "",  //单品对应sku编码

    totalStockList:[] //总库存
  },

  //计算器 弹窗
  calculatorShow(e){
    console.log(e.currentTarget.dataset)
    this.setData({
      listId: e.currentTarget.dataset.listId,
      listIndex: e.currentTarget.dataset.listIndex,
      colorIndex: e.currentTarget.dataset.colorIndex,
      sizeIndex:e.currentTarget.dataset.sizeIndex,
      sku_code: e.currentTarget.dataset.code,
      calculatorShow:true
    })
  },

  //获取计算器结果
  getResult(e){
    var _this = this;
    var value = e.detail.res  //计算器结果

    let jsonStr = JSON.stringify(this.data.stockList)
    var list = JSON.parse(jsonStr)

    var listIndex = this.data.listIndex;
    var colorIndex = this.data.colorIndex;
    var sizeIndex = this.data.sizeIndex;
    list[listIndex].results[colorIndex].results[sizeIndex].stock = value

    const data = {
      depo_id: this.data.listId,
      stock: value,
      sku_code: this.data.sku_code
    }
    api.warehouse.editGoodsStock(data)
      .then(res=>{
        _this.setData({
          stockList: list
        })
      })
      .catch(err=>{

      })
  },

  switchChange:function(e){
    var _this = this
    if (e.detail.value){
      api.warehouse.getGoodsStock({ product_id: this.data.product_id })
        .then(res => {
          var date = res.datas
          _this.setData({
            total_stock: date.total_stock,  //总库存
            totalStockList: date.results    //总库存列表
          })
        })
        .catch(res => {

        })
    }
    this.setData({
      state: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    this.setData({ product_id: options.goodsId})
    wx.showLoading({
      title: '加载中..',
    })
    api.warehouse.getStockInfo({ product_id: this.data.product_id})
      .then(res=>{
        console.log(res)
        _this.setData({
          depo_pic_url: res.datas.depo_pic_url,
          product_name: res.datas.product_name,
          product_code: res.datas.product_code,
          total_stock: res.datas.total_stock,
          stockList: res.datas.depos
        })
        wx.hideLoading()
      })
      .catch(err=>{
        wx.hideLoading()
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