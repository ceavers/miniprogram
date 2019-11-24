// warehouse/pages/edit_Initial_Stock/edit_Initial_Stock.js
import {api} from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    warehouseList:[],//仓库列表 --请求获取
    colorList:[],//颜色列表
    sizeList:[],//尺码列表
    tempList: [],//临时列表
    units_stock: [],//分库单品库存信息
  },

  //获取输入内容
  getInput(e){
    var value = e.detail.value;
    var id = e.currentTarget.dataset.depo_id;
    var color = e.currentTarget.dataset.color;
    var size = e.currentTarget.dataset.size;

    var list = [...this.data.units_stock];
    list.forEach((item)=>{
      if (item.depo_id === id){
        item.results.forEach((ite)=>{
          if(ite.color_id===color){
            if(ite.size_id===size){
              ite.amount=value
            }
          }
        })
      }
    })

    this.setData({
      units_stock:list
    })
  },


  //  设置库存列表
  setUpwarehouseList(){
    var colorlist = this.data.colorList;
    var sizelist = this.data.sizeList;
    var list = []
    for (var i = 0; i < colorlist.length; i++) {
      for (var j = 0; j < sizelist.length; j++) {
        const subitem = { color_id: colorlist[i].color_id, size_id: sizelist[j].size_id }
        list.push(subitem)
      }
    }
    for (var i = 0; i < list.length; i++) {
      list[i].amount = ""
    }

    var warehouseList = this.data.warehouseList
    var units_stock = []
    for(var i = 0; i<warehouseList.length;i++){
      units_stock.push({ depo_id: warehouseList[i].depo_id, results: this.deepClone(list)})//每次push 进行深度克隆
    }

    this.setData({
      units_stock: units_stock 
    })
  },

  // 深度克隆 数组为引用值 赋值时 赋值的是其地址 通过深度克隆 克隆出一个新数组 新旧互不影响
  deepClone:function(obj){
     let newObj = Array.isArray(obj)?[]:{}
     if(obj&&typeof obj ==="object"){
       for(let key in obj){
         if (obj.hasOwnProperty(key)){
           newObj[key] = (obj && typeof obj[key] === 'object') ? this.deepClone(obj[key]) : obj[key];
         }
       }
     }
     return newObj;
  },

  // 提交
  submit(){
    var list = this.data.units_stock
    list.forEach((item)=>{
      item.results.forEach((ite)=>{
        if (!ite.amount.trim().length){
          ite.amount=0
        }
      })
    })
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];//当前页面
    var prevPage = pages[pages.length - 2];//上一个页面
    prevPage.setData({
      units_stock:list
    })
    wx.navigateBack({
      delta: 1
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var _this = this
    api.warehouse.getWareHouseList({}) //请求需要token
      .then(res => {
        console.log(res)
        _this.setData({ warehouseList: res.datas.results})
        _this.setUpwarehouseList();
      })
      .catch(err => {

      })

    var colorlist = JSON.parse(options.colorCheckedList)
    var sizelist = JSON.parse(options.sizeCheckedList)
    
    this.setData({
      colorList: colorlist,
      sizeList: sizelist
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