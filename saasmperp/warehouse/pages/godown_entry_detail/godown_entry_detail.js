// warehouse/pages/godown_entry_detail/godown_entry_detail.js
import {api} from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //0出库 1入库 2库存调拨 3盘点
    type:1,
    orderId:'',
    skuCode:'',
    outInSingleInfo:null,
    allotSingleInfo:null,
    checkSingleInfo:null,
    goodsInfo:null
  },
  toGoodsDetailPage(e){
    wx.navigateTo({
      url: `/warehouse/pages/goodsInfo/goodsInfo?goodsId=${e.currentTarget.dataset.goodsId}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type && options.code && options.orderId){
      this.setData({
        type: options.type,
        skuCode: options.code,
        orderId: options.orderId
      })
      this.setNavTitle()
    }else{
      wx.showToast({
        title: '页面参数异常',
        icon:'none'
      })
    }
    if(options.state){
      this.setData({
        state:options.state
      })
    }
  },
  setNavTitle() {
    switch (this.data.type) {
      case '0':
        wx.setNavigationBarTitle({
          title: '出库信息',
        })
        this.getOutInSingle()
        break;
      case '1':
        wx.setNavigationBarTitle({
          title: '入库信息',
        })
        this.getOutInSingle()
        break;
      case '2':
        wx.setNavigationBarTitle({
          title: '调拨单信息',
        })
        this.getAllotSingle()
        break;
      case '3':
        wx.setNavigationBarTitle({
          title: '盘点单信息',
        })
        this.getCheckSingle()
        break;
    }
  },
  //出/入库单单品信息
  getOutInSingle(){
    const data={
      order_id:this.data.orderId,
      sku_code:this.data.skuCode,
      action:this.data.type
    }
    api.warehouse.getOutInSingle(data)
    .then(res=>{
      let goodsInfo={}
      goodsInfo.pic_url = res.data.pic_url;
      goodsInfo.product_name = res.data.product_name;
      goodsInfo.product_code = res.data.product_code;
      goodsInfo.sku_detail = res.data.sku_detail;
      goodsInfo.product_id = res.data.product_id;
      this.setData({
        outInSingleInfo:res.data,
        goodsInfo: goodsInfo
      })
    })
    .catch(err=>{

    })
  },
  //调拨单品信息
  getAllotSingle(){
    const data ={
      order_id: this.data.orderId,
      sku_code: this.data.skuCode,
    }
    api.warehouse.getAllotSingle(data)
    .then(res=>{
      let goodsInfo = {}
      goodsInfo.pic_url = res.data.pic_url;
      goodsInfo.product_name = res.data.product_name;
      goodsInfo.product_code = res.data.product_code;
      goodsInfo.sku_detail = res.data.sku_detail;
      goodsInfo.product_id = res.data.product_id;
      this.setData({
        allotSingleInfo: res.data,
        goodsInfo: goodsInfo
      })
    })
    .catch(err=>{

    })
  },
  //盘点单品信息
  getCheckSingle(){
    const data = {
      order_id:this.data.orderId,
      sku_code:this.data.skuCode
    }
    api.warehouse.getCheckSingle(data)
    .then(res=>{
      let goodsInfo = {}
      goodsInfo.pic_url = res.data.pic_url;
      goodsInfo.product_name = res.data.product_name;
      goodsInfo.product_code = res.data.product_code;
      goodsInfo.sku_detail = res.data.sku_detail;
      goodsInfo.product_id = res.data.product_id;
      this.setData({
        checkSingleInfo: res.data,
        goodsInfo: goodsInfo
      })
    })
    .catch(err=>{

    })
  },
  getDepoAmount(e){
    this.data.checkSingleInfo.depo_amount=e.detail.value
    this.setData({
      checkSingleInfo: this.data.checkSingleInfo
    })
  },
  getOrderAmount(e){
    this.data.checkSingleInfo.order_amount = e.detail.value
    this.setData({
      checkSingleInfo: this.data.checkSingleInfo
    })
  },
  getNote(e){
    this.data.checkSingleInfo.note = e.detail.value
    this.setData({
      checkSingleInfo: this.data.checkSingleInfo 
    })
  },
  delete(){
    if(this.data.type==2){
      wx.showToast({
        title: '调拨单已执行调库，不能删除',
        icon:'none'
      })
    }
    if(this.data.type==3){
      if(this.data.state==1){
        wx.showToast({
          title: '盘点单已执行调库，不能删除',
          icon: 'none'
        })
      }else if(this.data.state==0){
        const data = {
          order_id: this.data.orderId,
          sku_code: this.data.skuCode
        }
        api.warehouse.deleteCheckSingle(data)
          .then(res => {
            wx.showToast({
              title: '删除成功',
            })
            //返回上一个页面数据刷新
            getApp().globalData.flag=1;
            setTimeout(() => {
              wx.navigateBack({

              })
            }, 1000)
          })
          .catch(err => {

          })
      }
    }
  },
  save(){
    if (this.data.type == 2) {
      wx.showToast({
        title: '调拨单已执行调库，不能修改',
        icon: 'none'
      })
    }
    if(this.data.type==3){
      if(this.data.state==1){
        wx.showToast({
          title: '盘点单已执行调库，不能修改',
          icon: 'none'
        })
      }else if(this.data.state==0){
        if (this.data.checkSingleInfo.depo_amount > 0 && this.data.checkSingleInfo.order_amount > 0){
          const data={
            order_id:this.data.orderId,
            sku_code:this.data.skuCode,
            stocktaking_amount: this.data.checkSingleInfo.order_amount,
            depo_amount: this.data.checkSingleInfo.depo_amount,
            note:this.data.checkSingleInfo.note,
            product_id: this.data.checkSingleInfo.product_id
          }
          api.warehouse.editCheckSingle(data)
          .then(res=>{
            wx.showToast({
              title: '修改成功',
            })
            getApp().globalData.flag = 1;
            setTimeout(() => {
              wx.navigateBack({

              })
            }, 1000)
          })
          .catch(err=>{

          })
        }else{
          wx.showToast({
            title: '数量不能小于0',
            icon:'none'
          })
        }
      }
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