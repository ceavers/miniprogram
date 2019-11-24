// report/pages/month_ news/month_ news.js
import {api} from "../../../utils/api/api.js"
import * as echarts from "../../components/ec-canvas/echarts"
import { putComma} from "../../../utils/util.js"

var total = 0;
var sales = 0;
var lostsales = 100 - 0;
var chart = null;

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    no_data:false, //有无数据 true-有 false-无
    lineAni:'',
    nowMonth:0,//本月
    monthly:0, //请求的月份
    newsList:[],  //请求的月报信息
    selectTimeShow:false,
    echart_ring: {
      lazyLoad:true
    }
  },


  init_echart:function(){
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.setOption(chart);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart ;
    });
  },
  setOption: function (chart) {
    chart.clear();  // 清除
    chart.setOption(this.getOption());  //获取新数据
  },
  getOption: function () {
    var option = {
      // backgroundColor: "#f6f6f6",
      color: ["#62AC4B", "#FDD04F"],
      tooltip: {
        trigger: 'item',
        formatter: "{b}\n{d}%",
        triggerOn: 'click'
      },
      series: [{
        type: 'pie',
        clockwise: false, //false- 逆时针旋转
        legendHoverLink:false,
        hoverAnimation:false,
        label: {
          show: true,
          position: 'center',
          fontSize: 16,
          align: 'center',
          formatter:[
            '{a|' + total +'}',
            '{b|总额}'
          ].join('\n'),
          rich:{
            a:{
              color: '#323232',
              lineHeight: 20,
              fontSize: 14
            },
            b: {
              color: '#323232',
              fontSize: 12
            },
          }
        },
        center: ['50%', '50%'],
        radius: ['50%', '100%'],
        data: [{
          value: sales,
          name:'销售总额'
        }, {
            value: lostsales,
            name:'出库金额'
        }
        ],
      }]
    }
    return option;
  },

  


  // 进度条
  lineAni(sale_scale) {
    let lineAni = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
      delay: 50
    })
    lineAni.width(sale_scale).step();//step每个步骤结束必写
    this.setData({
      lineAni: lineAni.export()
    })
  },

  // 获取月报 请求
  getMonthNews(){
    
    wx.showLoading({
      title: '加载中...',
    })
    api.report.getMonthNews({ monthly: this.data.monthly})
      .then(res => {
        let list = res.data.purchase_monthly
        //销售比例
        let sale_scale = Math.round((list.sales_gross / list.total_gross) * 100) 
        //出库比例
        let outStock_scale = Math.round((list.outbound_gross / list.total_gross) * 100) 
        
        list.sale_scale = sale_scale + "%" 
        list.outStock_scale = outStock_scale + "%" 

        //饼图赋值
        total = list.total_gross
        if (total > 10000) {
          total = (total / 10000).toFixed(2) + '万'
        }
        sales = list.sales_gross
        lostsales = list.outbound_gross
        // if (lostsales<0){
        //   lostsales =0
        // }

        //数据加逗号
        list.total_gross = putComma(list.total_gross)
        list.sales_gross = putComma(list.sales_gross)
        list.outbound_gross = putComma(list.outbound_gross)

        this.setData({
          no_data:true,
          newsList: list
        })

        //绘制饼图
        this.echartsComponnet = this.selectComponent('#echart-ring');
        // 加载 echart
        if (!chart) {
          this.init_echart()
        } else {
          this.setOption(chart)
        }

        //绘制进度条
        if (sale_scale > 100){
          sale_scale = 100
        }
        setTimeout(() => {
          this.lineAni(sale_scale+"%")
        }, 100)
        wx.hideLoading()
      })
      .catch(err => {
        wx.hideLoading()
      })
  },


  //获取当前月份 
  getNowDate() {
    // 本月
    var nowDate = new Date();
    var month = nowDate.getMonth() + 1

    this.setData({
      nowMonth: month,
      monthly: month,
    })
    this.getMonthNews()
  },
  //选取月份
  selectMouth(){
    this.setData({
      selectTimeShow:true
    })
  },
  getTime(e){
    this.setData({ monthly: e.detail.month})
    this.getMonthNews()
  },


  // 无数据 跳转
  toAddPurchase(){
    wx.navigateTo({
      url: '/market/pages/order_select/order_select',
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (chart) {
      chart = null;
    }
    this.getNowDate();
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
    if (chart) {
      chart = null;
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