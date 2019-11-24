// report/pages/warehouse_statistics/warehouse_statistics.js
import {api} from "../../../utils/api/api.js"
import { putComma} from "../../../utils/util.js"
import {colorList} from "../../utils/color.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList:[],  //记录数组
    total_stock:0,  //库存总额
  },
  toDetailPage(e){
    let id = this.data.recordList[e.currentTarget.dataset.index].depo_id
    wx.navigateTo({
      url: '/report/pages/warehouse_statistics_detail/warehouse_statistics_detail?id='+id,
    })
  },

  // 绘画进度条
  lineAni(width,color) {
    let lineAni = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
      delay: 50
    })
    lineAni.backgroundColor(color).width(width).step();//step每个步骤结束必写
    return lineAni.export()
  },

  //获取仓库统计列表
  getWarehouseStatisticsList(){
    wx.showLoading({
      title: '加载中...',
    })
    api.report.getWarehouseStatisticsList()
      .then(res=>{
        // console.log(res)
        let list = res.datas.depo_stock
        for(let i=0;i<list.length;i++){
          if (list[i].stock_gross<10000){
            list[i].stock_gross = putComma(list[i].stock_gross)
          }else{
            list[i].stock_gross = (list[i].stock_gross/10000).toFixed(2)+'万'
          }
          if (list[i].stock_gross>10000){
            list[i].stock_gross = (list[i].stock_gross / 10000).toFixed(2)+'万'
          }
          list[i].color = colorList[i]
        }
        this.setData({
          recordList: list,
          total_stock: putComma(res.datas.total_stock) 
        })
        setTimeout(()=>{
          for(let i =0;i<list.length;i++){
            if (list[i].gross_rate<100){
              list[i].anmiate = this.lineAni(list[i].gross_rate + '%',list[i].color)
            }else{
              list[i].anmiate = this.lineAni('100%', list[i].color)
            }
          }
          this.setData({
            recordList: list,
          })
        },100)
        wx.hideLoading()
      })
      .catch(err=>{
        wx.hideLoading()
      })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWarehouseStatisticsList()
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
    console.log(111)
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