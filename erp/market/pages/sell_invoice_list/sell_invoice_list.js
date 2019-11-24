// market/pages/sell_invoice_list/sell_invoice_list.js
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sellInvoiceList:[],//销售列表
    showAddModel: false,
    addList: {
      title: '销售开单',
      detail: [{
        cname: '选商品开单',
        url: '/market/pages/order_select/order_select?type=sale',
        imageSrc: '/images/kc-goods.png'
      }, {
        cname: '拍单据录单',
          url: '/market/pages/sales_slip/sales_slip',
        imageSrc: '/images/market-photo.png'
      }]
    },
    //筛选
    filterShow: false,
    filterData: [
      {
        className: '开单人员',
        data: [ "销售员小王", "销售员小李"]
      },
      {
        className: '订单来源',
        data: ["拍照开单", "选商品开单"]
      },
      {
        className: '出库状态',
        data: ["待出库", "部分出库", "已出库"]
      },
      {
        className: '收款状态',
        data: ["待收款", "部分收款", "已收款", "已超收"]
      }
    ]
    
  },
  //显示新增弹窗
  showAddModel() {
    this.setData({
      showAddModel: true
    })
  },
  //显示筛选弹窗
  filterShow() {
    this.setData({
      filterShow: true
    })
  },
  //搜索
  searchInvoiceList(e) {
    var user_name_order_id = e.detail.value;
    var searchData = {
      user_name_order_id: user_name_order_id,
      user_id: 1
    }
    api.sellInvoice.getSellInvoiceList(searchData).then(res => {
      var data = res.datas.buy_order;
      for (let i = 0; i < data.length; i++) {
        data[i].date = data[i].date * 1000;
        let timeitem = this.transDate(data[i].date);
        data[i].date = timeitem;
      }
      var list = this.getList(data);
      this.setData({
        sellInvoiceList: list
      })
    }).catch(res => {

    })

  },
  //筛选
  filterList(){
    var filterData = {
      worker: '',
      source:'',
      outbound_type:'',
      collection_type:'',
      supplier_id: 1,
      page_index:'',
      page_size:''
      

    }
    api.sellInvoice.getSellInvoiceList( filterData ).then(res => {
      var data = res.datas.sale_order;
      for (let i = 0; i < data.length; i++) {
        data[i].date = data[i].date * 1000;
        let timeitem = this.transDate(data[i].date);
        data[i].date = timeitem;
      }
      var list = this.getList(data);
      this.setData({
        sellInvoiceList: list
      })
    }).catch(res => {

    })
  },
  //退
  cancel(){
    wx.navigateTo({
      url: '/market/pages/sell_invoice_cancel/sell_invoice_cancel',
    })
  },
  //转换时间
  transDate(n){
    var date = new Date(n);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return (Y + M + D)
  },
  //返回所需数据格式
  getList(arr){
    let newArr = [];
    arr.forEach((address, i) => {
      let index = -1;
      let alreadyExists = newArr.some((newAddress, j) => {
        if (address.date === newAddress.date) {
          index = j;
          return true;
        }
      });
      if (!alreadyExists) {
        newArr.push({
          date: address.date,
          invoiceList: [address]
        });
      } else {
        newArr[index].invoiceList.push(address);
      }
    });
    return newArr;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.sellInvoice.getSellInvoiceList({ supplier_id: 1 }).then(res => {
      var data = res.datas.sale_order;
      for (let i = 0; i < data.length; i++) {
        data[i].date = data[i].date * 1000;
        let timeitem = this.transDate(data[i].date);
        data[i].date = timeitem;  
      }
      var list = this.getList(data);
      this.setData({
        sellInvoiceList: list 
      })
      console.log(list)
    }).catch(res => {

    })
    
  },
  //订单详情
  gotoDetail(e){
    console.log(e)
    if (!e.currentTarget.dataset.type){
      wx.navigateTo({
        url: '/market/pages/sell_invoice_cancel/sell_invoice_cancel?orderId=' + e.currentTarget.dataset.id,
      })
    } else {
      wx.navigateTo({
        url: '/market/pages/sell_invoice_list_commodity/sell_invoice_list_commodity?orderId=' + e.currentTarget.dataset.id,
      })
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