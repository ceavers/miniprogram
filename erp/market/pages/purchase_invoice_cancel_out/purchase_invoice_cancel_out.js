// market/pages/purchase_invoice_cancel_out/purchase_invoice_cancel_out.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shadow:false,  //控制选择弹框的显示
    items:[],  //仓库列表数据
    choiceWarehouseName:'',   //选中的仓库名称
    choiceWarehouseId: '',  //选中的仓库id
    depoList:[],  //仓库列表
    purchaseDetails:'',  //采购单详情
    warehouseNote:'',  //采购入库备注
    purType:'',  //采购单类型
  },

  warehouseNote(e){
    if(e.detail.value.trim().length){
      //输入入库的备注
      this.setData({
        warehouseNote: e.detail.value.trim()
      })
    }
  },

  confirmRetrieval(){
    //确认出库
    if (this.data.purType == 2){
      const data = {
        repository_type: this.data.choiceWarehouseName,
        buy_order_id: this.data.purchaseDetails.order_id,
        type: 0
      };

      this.data.warehouseNote ? data['note'] = this.data.warehouseNote : '';
      console.log(data);
      api.market.allInStorage(data)
        .then(res => {
          console.log(res);
          //清除本地的采购详情
          //wx.removeStorageSync('purchase_details');
          wx.navigateBack({
            delta: 1
          })

          //并刷新采购详情
          wx.showToast({
            title: '出库成功!',
            icon: 'none',
            duration: 1500
          })
        })
    }else{
      const data = {
        repository_type: this.data.choiceWarehouseName,
        buy_order_id: this.data.purchaseDetails.order_id,
        type: 1
      };

      this.data.warehouseNote ? data['note'] = this.data.warehouseNote : '';
      console.log(data);
      api.market.allInStorage(data)
        .then(res => {
          console.log(res);
          //清除本地的采购详情
          //wx.removeStorageSync('purchase_details');
          wx.navigateBack({
            delta: 1
          })

          //并刷新采购详情
          wx.showToast({
            title: '入库成功!',
            icon: 'none',
            duration: 1500
          })
        })
    }
    
  },

  showModal(){
    //显示选择仓库弹框
    this.setData({
      shadow: true
    })
    
  },

  closeModal(){
    this.setData({
      shadow: false
    })
  },

  radioChange(e){
    //选择相应的仓库
    let items = [];
    this.data.items.forEach(item => {
      if (e.detail == item.value){
        items.push({ value: item.value, checked: true, depo_id: item.depo_id});
        this.setData({
          choiceWarehouseName: item.value,
          choiceWarehouseId: item.depo_id
        })
      }else{
        items.push({ value: item.value, checked: false, depo_id: item.depo_id });
      }
    })

    this.setData({
      shadow:false,
      items: items,
      
    })
  },

  getWareHouseList(){
    //获取仓库列表
    api.market.getWareHouseList()
      .then(res => {
        console.log(res);
        this.setData({
          depoList:res.datas.results
        })

        res.datas.results.forEach((item,index) => {
            if(index == 0 ){
              this.data.items.push({ value: item.depo_name, checked: true, depo_id: item.depo_id});
              this.setData({
                choiceWarehouseName: item.depo_name,
                choiceWarehouseId: item.depo_id
              })
            }else{
              this.data.items.push({ value: item.depo_name, checked: false, depo_id: item.depo_id });
            }
        })

        this.setData({
          items: this.data.items
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //取出采购单详情
    let purchaseDetails = wx.getStorageSync('purchase_details');
    let purType = wx.getStorageSync('purType');
    this.setData({
      purchaseDetails: purchaseDetails,
      purType: purType
    })
    console.log(purchaseDetails);
    this.getWareHouseList()
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

  allInStorage(data){
    //全部出库
    api.market.allInStorage(data)
      .then(res => {
        console.log(res)
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