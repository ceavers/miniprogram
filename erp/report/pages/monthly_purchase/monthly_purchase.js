// report/pages/monthly_purchase/monthly_purchase.js
import {api} from "../../../utils/api/api.js"
import {colorList} from "../../utils/color.js"
import { putComma } from "../../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList: [],  //记录列表
  },
  //月报详情
  toDetailPage(e){
    // console.log(e.currentTarget.dataset.index)
    let list = this.data.recordList[e.currentTarget.dataset.index]
    list.anmiate=null
    var data = JSON.stringify(list)
    console.log(data)
    wx.navigateTo({
      url: '/report/pages/monthly_purchase_detail/monthly_purchase_detail?data=' + data,
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

  // 获取入库月报列表
  getMonthlyPurchase(){
    const data ={
      type:true
    }
    wx.showLoading({
      title: '加载中...',
    })
    api.report.getMonthlyPurchase(data)
      .then(res=>{
        // console.log(res)
        let list = [...res.data.datas]
        for(let i=0;i<list.length;i++){
          list[i].color = colorList[i]
          list[i].date = list[i].date.split('-')[0] + '-' + list[i].date.split('-')[1]
          if (list[i].number>=10000){
            list[i].number = (list[i].number/10000).toFixed(2)+'万'
          }else{
            list[i].number = putComma(list[i].number)
          }
          list[i].money = putComma(list[i].money)
        }
        this.setData({
          recordList: list
        })
        setTimeout(()=>{
          for(let i =0;i<list.length;i++){
            list[i].anmiate = this.lineAni(list[i].rate,list[i].color)
          }
          this.setData({
            recordList: list
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
    this.getMonthlyPurchase()
   
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