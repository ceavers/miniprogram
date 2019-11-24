// report/pages/supplier_report/supplier_report.js
import {api} from "../../../utils/api/api.js"
import { putComma } from "../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //默认本月
    index: 0,
    recordList:[],  //记录列表
    total_purchase_gross:0, //总金额
  },
  chooseMouth(e) {
    // this.setData({
    //   index: e.currentTarget.dataset.index
    // })
    if (this.data.index != e.currentTarget.dataset.index){
      var index = e.currentTarget.dataset.index
      this.setData({
        index: e.currentTarget.dataset.index
      })
      this.getSupplierReport(index);
    }
  },

  // 获取报表 -接口
  getSupplierReport(index){
    console.log(index)
    let data = {}
    const month = new Date().getMonth() + 1
    if(index == 0){
      data.monthly = month
    }else if(index == 1){
      data.monthly = month -1
      if (month == 1){
        data.monthly = 12
        data.year = new Date().getFullYear()-1
      }
    }
    api.report.getSupplierReport(data)
      .then(res=>{
        let list = res.datas.suppliers
        for(let i=0;i<list.length;i++){
          list[i].purchase_gross = putComma(list[i].purchase_gross)
        }
        this.setData({
          recordList: list,
          total_purchase_gross: putComma(res.datas.total_purchase_gross)
        })
      })
      .catch(err=>{

      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSupplierReport(0)
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