// market/pages/purchase_invoice_list/purchase_invoice_list.js
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    purchaseInvoiceList:'',//采购单列表
    purType:'',   //采购单类型
    purchaseInvoiceDetail: '',   //采购单详情
    showAddModel: false,
    isSearch:false,
    isSelect:false,
    choiceSearch:'',   //搜索的内容
    addList: {
      title: '采购开单',
      detail: [{
        cname: '选商品开单',
        url: '/market/pages/purchase_invoice_list_commodity/purchase_invoice_list_commodity',
        imageSrc: '/images/kc-goods.png'
      }, {
        cname: '拍单据录单',
          url: '/market/pages/purchase_invoice_list_photo/purchase_invoice_list_photo',
        imageSrc: '/images/market-photo.png'
      }],
      
    },

    //筛选
    filterShow: false,
    user_id:'',  //当前用户id
    choiceFilter:'',  //选中的单个条件
    filterData: [
      {
        className: '开单人员',
        data: ["采购员小王", "采购员小李", "采购员小李2", "采购员小李3", "采购员小李4"]
      },
      {
        className: '订单来源',
        data: ["拍单据录单", "选商品开单"]
      },
      {
        className: '入库状态',
        data: ["待入库", "部分入库", "已入库"]
      },
      {
        className: '付款状态',
        data: ["待付款", "部分付款", "已付款"]
      }
    ]
  },


  cancelSearch() {
    //取消搜索
    this.setData({
      isSearch:false,
      choiceSearch: ''
    })
    var searchData = {
      
      user_id: this.data.user_id
    }
    api.purchaseInvoice.getPurchaseInvoiceList(searchData).then(res => {
      var data = res.datas.buy_order;
      for (let i = 0; i < data.length; i++) {
        data[i].date = data[i].date * 1000;
        let timeitem = this.transDate(data[i].date);
        data[i].date = timeitem;
      }
      var list = this.getList(data);
      this.setData({
        purchaseInvoiceList: list
      })
    }).catch(res => {

    })
  },
  cancelSelect() {
    //取消筛选 重置列表信息
    
    this.setData({
      isSelect: false,
    })
    
    var searchData = {
      
      user_id: this.data.user_id
    }
    api.purchaseInvoice.getPurchaseInvoiceList(searchData).then(res => {
      var data = res.datas.buy_order;
      for (let i = 0; i < data.length; i++) {
        data[i].date = data[i].date * 1000;
        let timeitem = this.transDate(data[i].date);
        data[i].date = timeitem;
      }
      var list = this.getList(data);
      this.setData({
        purchaseInvoiceList: list
      })
    }).catch(res => {

    })

    //this.getPurchaseOrdersList(data);

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
  confirmfilter(e){
    //确认筛选
    if (e.detail.choiceFilter){
      //如果选择了条件  则开始筛选
      this.setData({
        choiceFilter: e.detail.choiceFilter,
        isSelect:true
      })
      const data = {
        user_id: this.data.user_id,
        handlers: e.detail.choiceFilter
      }
      this.getPurchaseOrdersList(data);
    }

    

  },
  searchInvoiceList(e){
    //监听搜索内容的输入
    if(e.detail.value.trim().length){
      this.setData({
        choiceSearch: e.detail.value.trim()
      })
    }
  },

  //搜索
  searchInvoiceLists() {
    if (this.data.choiceSearch){
      this.setData({
        isSearch:true
      })
      var searchData = {
        supplier_name_order_id: this.data.choiceSearch,
        user_id: this.data.user_id
      }
      api.purchaseInvoice.getPurchaseInvoiceList(searchData).then(res => {
        var data = res.datas.buy_order;
        for (let i = 0; i < data.length; i++) {
          data[i].date = data[i].date * 1000;
          let timeitem = this.transDate(data[i].date);
          data[i].date = timeitem;
        }
        var list = this.getList(data);
        this.setData({
          purchaseInvoiceList: list,
          
        })
      }).catch(res => {

      })
    }else{
      wx.showToast({
        title: '请输入搜索内容!',
        icon:'none',
        duration:1500
      })
    }
    

  },

  getPurchaseOrdersList(data){
    api.market.getPurchaseOrdersList(data)
      .then(res => {
        console.log(res)
      })
  },
  //筛选
  filterList() {
    var filterData = {
      worker: '',
      source: '',
      outbound_type: '',
      collection_type: '',
      supplier_id: 1,
      page_index: '',
      page_size: ''


    }
    api.purchaseInvoice.getPurchaseInvoiceList({ user_id: 1 }).then(res => {
      var data = res.datas.buy_order;
      for (let i = 0; i < data.length; i++) {
        data[i].date = data[i].date * 1000;
        let timeitem = this.transDate(data[i].date);
        data[i].date = timeitem;
      }
      var list = this.getList(data);
      this.setData({
        purchaseInvoiceList: list
      })
      console.log(list)
    }).catch(res => {

    })
  },
  //退  将数据传递过去
  cancel(e) {
    let types = e.currentTarget.dataset.type == 0 ? 1:2;
    let index = e.currentTarget.dataset.index;
    let invoiceList; 
    //console.log(invoiceList);
    
  
    let purchaseInvoiceDetail = JSON.stringify(this.data.purchaseInvoiceList[0].invoiceList[index]);
    this.setData({
      purchaseInvoiceDetail: purchaseInvoiceDetail,
      purType: types
    })
    //为测试而用 
    wx.setStorageSync('purchaseInvoiceDetail2', purchaseInvoiceDetail)
    wx.navigateTo({
      url: "/market/pages/purchase_invoice_cancel/purchase_invoice_cancel?purchaseInvoiceDetail=" + purchaseInvoiceDetail + '&type=' + types,
    })
  },
  //转换时间
  transDate(n) {
    var date = new Date(n);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return (Y + M + D)
  },
  //返回所需数据格式
  getList(arr) {
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
    //获取个人信息
    api.finance2.getMemberInfo()
      .then(res => {
        console.log(res);
        this.setData({
          user_id: res.data.id
        })
      })
      const data = {
        user_id: this.data.user_id
        }
    //this.getPurchaseOrdersList(data);

    api.purchaseInvoice.getPurchaseInvoiceList({ user_id: this.data.user_id }).then(res => {
      var data = res.datas.buy_order;
      for (let i = 0; i < data.length; i++) {
        data[i].date = data[i].date * 1000;
        let timeitem = this.transDate(data[i].date);
        data[i].date = timeitem;
      }
      var list = this.getList(data);
      this.setData({
        purchaseInvoiceList: list
      })
      console.log(list)
    }).catch(res => {

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