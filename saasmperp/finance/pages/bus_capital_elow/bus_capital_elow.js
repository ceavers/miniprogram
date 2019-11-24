// finance/pages/bus_capital_elow/bus_capital_elow.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    elowMoney:['-30.00','+300.00'],  //流水金额
    account_id:'',   //流水账户的id
    journalList:[],   //流水列表
    queryNo:'',  //查询的流水单号
    queryJournalList:[],  //查询到的流水列表
    isQuery:false,   //是否点击过查询
    
  },

  cancelQuery(){
    //取消查询  重置资金流水列表

    this.setData({
      isQuery: false,
    })
    const data = {
      account_id: this.data.account_id
    };
    this.getTourList(data);
  },

  queryElow(){
    //查询流水列表
    if (!this.data.queryNo){
      wx.showToast({
        title: '请输入搜索内容!',
        icon:'none',
        duration:1500
      })
      return
    }

    if (this.data.queryNo){
      const data = {
        account_id: this.data.account_id,
        voucher_no: this.data.queryNo
      }
      api.finance2.queryElow(data)
        .then(res => {
          console.log(res);
          //查询成功之后更新列表
          this.data.journalList = [];
          this.data.journalList.push(res.data);
          this.setData({
            journalList: this.data.journalList,
            isQuery:true
          })
        })
    }
  },

  queryNo(e){
    //监听单号的输入
    if(e.detail.value.trim().length){
      this.setData({
        queryNo: e.detail.value.trim()
      });
    }
  },

  getTourList(data){
    //获取流水列表
    api.finance2.getTourList(data)
      .then(res => {
        console.log(res);
        this.setData({
          journalList: res.datas.journals
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let account_id = options.account_id;
    this.setData({
      account_id: account_id
    });
    const data = {
      account_id: account_id
    }

    this.getTourList(data);
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