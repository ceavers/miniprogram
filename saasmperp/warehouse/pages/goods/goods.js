// warehouse/pages/goods/goods.js
import {api} from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    no_goods:false,// false-无商品 true-有

    modulesId:0,  //模块id
    //类别
    categoryShow:false,
    categoryData: [],
    categoryName:'类别',
    categoryId:'',
    //筛选
    filterShow:false,
    filterData: [
      { 
        className:'商品类别',
        typeId:"subclass_id",
        data: [
          {
            name:'不限',
            id:-1,
            checked:true
          }
        ]
      },
      { 
        className:'商品小类',
        typeId:"category_id",
        data: [
          {
            name: '不限',
            id: -1,
            checked: true
          }
        ]
      },
      { 
        className:'商品品牌',
        typeId: 'brand_id',
        data: [
          {
            name: '不限',
            id: -1,
            checked: true
          }
        ]
      },
      { 
        className:'仓库',
        typeId:"depo_id",
        data: [
          {
            name: '不限',
            id: -1,
            checked: true
          }
        ]
      },
      { 
        className:'有无库存',
        typeId:'is_stock',
        data: [
          {
            name: '不限',
            id: -1,
            checked: true
          },
          {
            id:1,
            name:"有库存",
            checked: false
          },
          {
            id:0,
            name: "无库存", 
            checked: false
          }
        ]
      }
    ],
    //商品详情
    detailShow:false,
    goodsDetail:null,
    //单品信息
    goodsStock:null,
    inStorageShow:false,
    //0出库 1入库
    type:0,
    //库存列表
    goodsData: []
  },
  categoryShow(){
    this.setData({
      categoryShow:true
    })
  },
  filterShow(){
    this.setData({
      filterShow: true
    })
  },
  detailShow(e){
    const data={
      product_id:e.currentTarget.dataset.goodsId
    }
    this.getGoodsDetail(data)
    this.getGoodsStock(data)
    this.setData({
      detailShow: true
    })
  },
  detailClose() {
    this.setData({
      detailShow: false
    })
  },
  putInStorage(){
    this.setData({
      detailShow: false,
      inStorageShow:true,
      type:1
    })
  },
  outputStorage(){
    this.setData({
      detailShow: false,
      inStorageShow: true,
      type: 0
    })
  },
  toSale(){
    this.setData({
      detailShow:false,
      inStorageShow:true,
      type: 'sale'
    })
  },
  toPurchase(){
    this.setData({
      detailShow: false,
      inStorageShow: true,
      type: 'purchase'
    })
  },
  addGoodsComplete(e){
    this.setData({
      inStorageShow:false
    })
    switch(this.data.type){
      case 0:
        //出库
        this.setInStorage(e.detail.selectDeatil, 'selectOutStockList')
        wx.navigateTo({
          url: '/warehouse/pages/stock_removal/stock_removal',
        })
        break;
      case 1:
        //入库
        this.setInStorage(e.detail.selectDeatil, 'selectInStockList')
        wx.navigateTo({
          url: '/warehouse/pages/godown_entry_nostate/godown_entry_nostate',
        })
        break;
      case 'sale':
        //销售
        this.setInStorage(e.detail.selectDeatil, 'selectSaleList')
        wx.navigateTo({
          url: '/market/pages/order_select/order_select?type=sale',
        })
        break;
      case 'purchase':
        //采购
        this.setInStorage(e.detail.selectDeatil, 'selectPurchaseList')
        wx.navigateTo({
          url: '/market/pages/order_select/order_select?type=purchase',
        })
        break;
    }
  },
  //选取商品存入缓存
  setInStorage(data,key){
    const tempStr = JSON.stringify(data);
    const tempObj = JSON.parse(tempStr);
    if (wx.getStorageSync(key)) {
      let tempList = wx.getStorageSync(key);
      let flag = 1;
      for (let i = 0; i<tempList.length;i++){
        if (tempList[i].product_id === tempObj.product_id){
          flag=0;
          for (let j = 0; j < tempObj.results.length;j++){
            let sum = 0
            for (let z = 0; z < tempObj.results[j].results.length;z++){
              if (tempObj.results[j].results[z].amount>0){
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
      console.log(tempList);
      flag && tempList.push(data);
      wx.setStorageSync(key, tempList)
    } else {
      let temp = [];
      temp.push(data)
      wx.setStorageSync(key, temp)
    }
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
  toStockDetailPage(){
    wx.navigateTo({
      url: '/warehouse/pages/stockInfo/stockInfo',
    })
  },
  createGoods(){
    wx.navigateTo({
      url: '/warehouse/pages/addgoods/addgoods',
    })
  },
  //获取类别 大类
  getCategory(){
    api.warehouse.getCategory({})
    .then(res=>{
      const data = res.datas.categorys;
      const category = data.map(item=>{
        return {
          category_id: item.category_id,
          category_name:item.category_name
          }
      })
      this.setData({
        categoryData: category
      })
    })
    .catch(err=>{

    })
  },
  //获取筛选数据
  getFilterData(){
    api.warehouse.getFilterData()
    .then(res=>{
      const resData = res.datas;
      for (let prop in resData){
        if(prop =='brands'){
          resData[prop].forEach(item=>{
            this.data.filterData[2].data.push({
              id:item.brand_id,
              name: item.brand_name,
              checked:false
            })
          })
        } else if (prop =='categories'){
          resData[prop].forEach(item => {
            this.data.filterData[1].data.push({
              id: item.category_id,
              name: item.category_name,
              checked: false
            })
          })
        } else if (prop == 'depos'){
          resData[prop].forEach(item => {
            this.data.filterData[3].data.push({
              id: item.depo_id,
              name: item.depo_name,
              checked: false
            })
          })
        } else if (prop == 'subclasses'){
          resData[prop].forEach(item => {
            this.data.filterData[0].data.push({
              id: item.subclass_id,
              name: item.subclass_name,
              checked: false
            })
          })
        }
      }
      this.setData({
        filterData:this.data.filterData
      })
    })
    .catch(err=>{

    })
  },
  getType(e){
    const data = e.detail;
    this.data.categoryData.forEach(item=>{
      if (item.category_id == data.category_id){
        this.setData({
          categoryName: item.category_name,
          categoryId: item.category_id
        })
      }
    })
    this.getRepertoryList(data)
  },
  getFilterItem(e){
    const data = e.detail;
    this.getRepertoryList(data)
  },
  searchRepertory(e){
    const data ={
      search_content:e.detail.value
    }
    this.getRepertoryList(data)
  },
  getRepertoryList(data){
    wx.showLoading({
      title: '加载中...',
    })
    if (this.data.categoryId && !data.category_id){
      data.category_id = this.data.categoryId
    }
    api.warehouse.getRepertoryList(data)
    .then(res=>{
      const resData = res.datas.results;
      if(resData.length>0){
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
          no_goods:true,
          goodsData: tempArray
        })
      }else{
        this.setData({
          no_goods:false
        })
      }
      wx.hideLoading()
    })
    .catch(err=>{
      wx.hideLoading()
    })
  },
  //扫码
  scan(){
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
      }
    })
  },
  //获取商品详细信息
  getGoodsDetail(data){
    api.warehouse.getGoodsDetail(data)
    .then(res=>{
      this.setData({
        goodsDetail: res.data.product
      })
    })
    .catch(err=>{

    })
  },
  toGoodsDetailPage(e){
    wx.navigateTo({
      url: `/warehouse/pages/goodsInfo/goodsInfo?goodsId=${e.currentTarget.dataset.goodsId}`,
    })
  },
  //获取单品库存
  getGoodsStock(data){
    api.warehouse.getGoodsStock(data)
    .then(res=>{
      res.datas.product_id = data.product_id
      res.datas.results.forEach(item=>{
        item.sum = 0;
        item.results.forEach(item=>{
          item.amount = 0;
        })
      })
      this.setData({
        goodsStock:res.datas
      })
    })
    .catch(err=>{

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ modulesId: options.modulesId})
    this.getCategory()
    this.getFilterData()
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