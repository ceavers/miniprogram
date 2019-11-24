// market/pages/purchase_invoice_storage/purchase_invoice_storage.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSelectAll: false,
    purchaseDetail: '',  //入库详情
    shadow: false,
    items: [],
    choiceWarehouseName: '',

    choiceWarehouseId: '',
    inputNote: '',
    productArr: [],   //商品数量数组 
    productArr2: [],   //原始的商品数量数组，用来做比较
    purchaseDetail2: '',
  },

  lowNum(e) {
    //减少商品数量
    let index = e.currentTarget.dataset.index;
    if (this.data.purchaseDetail.product_img_list[index].product_count > 0) {
      this.data.purchaseDetail.product_img_list[index].product_count -= 1;
      this.setData({
        purchaseDetail: this.data.purchaseDetail
      })
      console.log(this.data.purchaseDetail2);
    } else {
      wx.showToast({
        title: '商品数量不能少于0!',
        icon: 'none',
        duration: 1500
      })
    }

  },

  upNum(e) {
    //增加商品数量
    let index = e.currentTarget.dataset.index;

    if (this.data.purchaseDetail.product_img_list[index].product_count < this.data.purchaseDetail2.product_img_list[index].product_count) {
      this.data.purchaseDetail.product_img_list[index].product_count += 1;
      this.setData({
        purchaseDetail: this.data.purchaseDetail
      })
    } else {
      wx.showToast({
        title: '商品数量超过待入库数量!',
        icon: 'none',
        duration: 1500
      })
    }
  },

  confirmWarehouse() {
    //确认入库

    if (!this.data.isSelectAll) {
      //全部入库 全部入库之后更新为全部入库
      const data = {
        repository_type: this.data.choiceWarehouseName,
        buy_order_id: this.data.purchaseDetail.order_id,
        type: 1

      }

      this.data.inputNote ? data['note'] = this.data.inputNote : '';
      console.log(data);
      api.market.allInStorage(data)
        .then(res => {
          console.log(res);
          let pages = getCurrentPages();
          let prev = pages[pages.length - 2];
          prev.setData({

          })
          wx.navigateBack({
            delta: 1
          })
          wx.showToast({
            title: '操作成功!',
            icon: 'none',
            duration: 1500
          })
        })
    }
    else {
      //部分入库
      let products = [];
      this.data.purchaseDetail.product_img_list.forEach(item => {
        if (item.product_count > 0) {
          products.push({ name: item.product_name, color: item.product_note, count: item.product_count })
        }

      })
      const data = {
        repository_type: this.data.choiceWarehouseName,
        type: 1,
        products: products,

      }

      this.data.inputNote ? data['note'] = this.data.inputNote : '';
      console.log(data);
      api.market.partialStorage(data)
        .then(res => {
          console.log(res);
          //部分出库之后改为部分出库
          let pages = getCurrentPages();
          let prev = pages[pages.length - 2];
          prev.setData({

          })
          wx.navigateBack({
            delta: 1
          })
          wx.showToast({
            title: '操作成功!',
            icon: 'none',
            duration: 1500
          })
        })
    }
  },


  inputNote(e) {
    //出库的备注
    if (e.detail.value.trim().length) {
      this.setData({
        inputNote: e.detail.value.trim()
      })
    }
  },
  showModal() {
    //显示选择仓库弹框
    this.setData({
      shadow: true
    })

  },

  closeModal() {
    this.setData({
      shadow: false
    })
  },

  radioChange(e) {
    //选择相应的仓库
    let items = [];
    this.data.items.forEach(item => {
      if (e.detail == item.value) {
        items.push({ value: item.value, checked: true, depo_id: item.depo_id });
        this.setData({
          choiceWarehouseName: item.value,
          choiceWarehouseId: item.depo_id
        })
      } else {
        items.push({ value: item.value, checked: false, depo_id: item.depo_id });
      }
    })

    this.setData({
      shadow: false,
      items: items,

    })
  },

  getWareHouseList() {
    //获取仓库列表
    api.market.getWareHouseList()
      .then(res => {
        console.log(res);
        this.setData({
          depoList: res.datas.results
        })

        res.datas.results.forEach((item, index) => {
          if (index == 0) {
            this.data.items.push({ value: item.depo_name, checked: true, depo_id: item.depo_id });
            this.setData({
              choiceWarehouseName: item.depo_name,
              choiceWarehouseId: item.depo_id
            })
          } else {
            this.data.items.push({ value: item.depo_name, checked: false, depo_id: item.depo_id });
          }
        })

        this.setData({
          items: this.data.items
        })
      })
  },
  selectAll() {
    this.setData({
      isSelectAll: !this.data.isSelectAll
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWareHouseList();
    var purchaseDetail = wx.getStorageSync('purchase_details');
    var purchaseDetail2 = JSON.parse(JSON.stringify(purchaseDetail))

    this.setData({
      purchaseDetail: purchaseDetail,
      productArr: purchaseDetail.product_img_list,
      productArr2: purchaseDetail.product_img_list,
      purchaseDetail2: purchaseDetail2
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
   * 生命周   期函数--监听页面卸载
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