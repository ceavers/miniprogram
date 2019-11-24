// warehouse/pages/goodsInfo/goodsInfo.js
import {api} from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //3d轮播器的数据
    source: [
      //img参数（属性）为必选，也可以自定义添加其他参数，这些参数都会在轮播器touch事件回调中传递
      //{ img: "../../images/goods.png", key1: "自定义参数1", key2: "自定义参数2", key_more: "自定义参数X" },
      //{ img: "../../images/goods.png" },
      // { img: "../../images/goods.png" },
    ],
    sourceState:false,  //是否有图片

    datajsonStr:'', //商品信息 -json字符串 跳转传值
    product_id:0,//商品id
    //product_imgs:[],//图片信息
    product_name:'',//商品名
    product_code:'',//商品编码
    selling_price: 0,//售卖价
    note:'',//描述
    barcode:'',//商品条码
    colors: [],//颜色列表
    colorStr:'',//颜色
    sizes: [],//尺码列表
    sizeStr:'',//尺码
    category_id:0,//大类id
    subclass_id:0,//小类id
    category_detail: '',//类名 示例：裙装-连衣裙
    buying_price:0,//进价
    stock:0,//库存
  },

  //轮播点击事件回调
  touch({ detail: data }) {
    console.log("我是轮播组件touch事件传递过来的数据：");
    console.log(data);
  },

  // 历史销售
  toSalesHistory(){
    wx.navigateTo({
      url: '../goods_detail/goods_detail?goodsId=' + this.data.product_id,
    })
  },

  //月度销售 
  toMonthlySales(){
    wx.navigateTo({
      url: '../monthly_sales/monthly_sales?goodsId=' + this.data.product_id,
    })
  },

  // 客户销售
  toClientSales(){
    wx.navigateTo({
      url: '../client_sales/client_sales?goodsId=' + this.data.product_id,
    })
  },

  // 修改 产品
  toEdit(){
    wx.navigateTo({
      url: '../addgoods/addgoods?state=' + 3 + '&goodsId=' + this.data.product_id + '&goodsInfo='+this.data.datajsonStr,
    })
  },

  // 库存数量
  toStockInfo(){
    wx.navigateTo({
      url: '../stockInfo/stockInfo?goodsId=' + this.data.product_id,
    })
  },

  //删除商品
  deleteGoods(){
    var _this = this
    wx.showModal({
      title: '确认删除此商品？',
      success(res){
        if(res.confirm){
          api.warehouse.deleteGoods({ product_id: _this.data.product_id })
            .then(rea => {
              wx.showToast({
                title: '删除成功！',
                icon: 'none'
              })
            })
            .catch(err => { })
        }
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this =this
    this.setData({ product_id: options.goodsId})
    wx.showLoading({
      title: '加载中..',
    })
    api.warehouse.getGoodsDetail({ product_id: this.data.product_id})
      .then(rea=>{
        var data = rea.data.product
        let datajsonStr = JSON.stringify(data)  //跳转 使用
        let colorStr=''
        for (var i = 0; i < data.colors.length; i++) {
          var value = data.colors[i].color_name
          if (i == 0) {
            colorStr = colorStr + value
          } else {
            colorStr = colorStr + '、' + value
          }
        }
        let sizeStr = ''
        for (var i = 0; i < data.sizes.length; i++) {
          var value = data.sizes[i].size_name
          if (i == 0) {
            sizeStr = sizeStr + value
          } else {
            sizeStr = sizeStr + '、' + value
          }
        }
        let imglist =[]
        let getimglist = data.product_imgs
        if(getimglist.length>0){
          if (getimglist.length > 3) {
            for (var i = 0; i < getimglist.length; i++) {
              imglist.push({ img_id: getimglist[i].img_id, img: getimglist[i].pic_url })
            }
          } else if (getimglist.length === 1) {
            for (var j = 0; j < 3; j++) {
              imglist.push({ img_id: getimglist[0].img_id, img: getimglist[0].pic_url })
            }
          } else if (getimglist.length === 2) {
            imglist.push({ img_id: getimglist[0].img_id, img: getimglist[0].pic_url })
            imglist.push({ img_id: getimglist[1].img_id, img: getimglist[1].pic_url })
            imglist.push({ img_id: getimglist[0].img_id, img: getimglist[0].pic_url })
          }
          _this.setData({ sourceState:true})
        }else{
          _this.setData({ sourceState: false })
        }
        _this.setData({
          datajsonStr:datajsonStr,//商品总信息 json字符串
          product_id: data.product_id,//商品id
          source: imglist,//图片信息
          product_name: data.product_name,//商品名
          product_code: data.product_code,//商品编码
          selling_price: data.buying_price,//售卖价
          note: data.note,//描述
          barcode: data.barcode,//商品条码
          colors: data.colors,//颜色列表
          colorStr: colorStr,//尺码
          sizes: data.sizes,//尺码列表
          sizeStr: sizeStr,//尺码
          category_id: data.category_id,//大类id
          subclass_id: data.subclass_id,//小类id
          category_detail: data.category_detail,//类名 示例：裙装-连衣裙
          buying_price: data.buying_price,//进价
          stock: data.stock,//库存
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
    if (this.data.source.length > 0) {
      this.setData({ sourceState: true })
    } else {
      this.setData({ sourceState: false })
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