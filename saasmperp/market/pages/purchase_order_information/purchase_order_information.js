// market/pages/purchase_order_information/purchase_order_information.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productDetail:'', //商品明细
    shadow:false,  //控制删除弹框的显示
    user_id:'',   //用户id
    modifyPrice:'none',//修改过的价格
    modifyNum:'none',  //修改的数量
    modifyNote:'none',   //修改的备注
    order_id:'',  //采购单id
  },

  updatePrice(e){
    //修改价格 
    //console.log(e.detail.value)
    if (e.detail.value != this.data.productDetail.product_price){
      this.setData({
        modifyPrice: e.detail.value
      })
    }
  },

  updateNum(e){
    //修改商品数量
    if (e.detail.value != this.data.productDetail.product_count) {
      this.setData({
        modifyNum: e.detail.value
      })
    }
  },

  updateNote(e){
    //修改备注
    if (e.detail.value != this.data.productDetail.product_note) {
      this.setData({
        modifyNote: e.detail.value
      })
    }
  },

  closeDelModal(){
    this.setData({
      shadow: false
    })
   
  },

  deleteproduct(){
    //显示删除弹框
    this.setData({
      shadow: true
    })
  },

  modifyProduct(){
    
    //修改商品

    if (this.data.modifyPrice <= 0 && this.data.modifyPrice != 'none'){
      wx.showToast({
        title: '价格应该大于0!',
        icon:'none',
        duration:1500
      })
      return
    }
   
    //console.log(this.data.modifyNum);
    if ((this.data.modifyNum.indexOf('.') > -1 && this.data.modifyNum != 'none' && this.data.modifyNum != '') || (this.data.modifyNum <= 0) && this.data.modifyNum != 'none' && this.data.modifyNum != '') {
      wx.showToast({
        title: '数量应该是大于0的整数!',
        icon: 'none',
        duration: 1500
      })
      return
    }
    const data = {
      order_id: this.data.order_id,
      user_id: this.data.user_id,
      order_type:1,
      product_img_list: [],
    };

    
    //product_id
    data['product_img_list'].push({ 'product_id': this.data.productDetail.product_id});
    (this.data.modifyPrice != 'none' && this.data.modifyPrice != '')? data['product_img_list'].push({ 'product_price': this.data.modifyPrice}):'';
    (this.data.modifyNum != 'none' && this.data.modifyNum != '')? data['product_img_list'].push({ 'product_count': this.data.modifyNum}) :'';
    this.data.modifyNote != 'none' ? data['product_img_list'].push({ 'product_note': this.data.modifyNote }) : '';
    //product_note
    
    api.market.modifyOrder(data)
      .then(res => {
        console.log(res);
        //返回上个页面 刷新数据
        let pages = getCurrentPages();
        let prev = pages[pages.length -2];
        prev.setData({
          isModify:true
        })
        wx.navigateBack({
          delta:1
        })
        wx.showToast({
          title: '修改成功!',
          icon:'none',
          duration:1500
        })
      })

  },

  delData(){
    //删除商品
    this.setData({
      shadow: false
    })
    const data = {
      product_id: this.data.productDetail.product_id,
      user_id: this.data.user_id,
     
    }

    console.log(data);
    api.market.deleteOrder(data)
      .then(res => {
        console.log(res);
        //刷新采购单详情
        let pages  = getCurrentPages();
        let prev  = pages[pages.length -2];
        prev.setData({
          isModify:true
        })
        wx.navigateBack({
          delta:1
        })
        wx.showToast({
          title: '操作成功!',
          icon:'none',
          duration:1500
        })
        
      })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMemberInfo();
    
    let productDetail = JSON.parse(options.productDetail);
    this.setData({
      productDetail: productDetail,
      order_id: options.order_id
    });

    console.log(productDetail)
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

  getMemberInfo(){
    //获取个人信息
    api.finance2.getMemberInfo()
      .then(res => {
        console.log(res);
        this.setData({
            user_id:res.data.id
        })
      })
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