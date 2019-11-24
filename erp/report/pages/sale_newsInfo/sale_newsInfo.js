// report/pages/sale_newsInfo/sale_newsInfo.js
import * as echarts from "../../components/ec-canvas/echarts"
import { putComma } from "../../../utils/util.js"

var total = 0;
var sales = 0;
var lostsales = 0;
var chart = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    record:[], //记录
    echart_ring: {
      lazyLoad: true
    }
  },

  init_echart: function () {
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.setOption(chart);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },
  setOption: function (chart) {
    chart.clear();  // 清除
    chart.setOption(this.getOption());  //获取新数据
  },
  getOption: function () {
    var option = {
      backgroundColor: "#f6f6f6",
      color: ["#62AC4B", "#FDD04F"],
      series: [{
        type: 'pie',
        clockwise: false, //false- 逆时针旋转
        legendHoverLink: false,
        hoverAnimation: false,
        label: {
          show: true,
          position: 'center',
          fontSize: 16,
          align: 'center',
          // formatter: '150.00 \n 总额',
          // color: '#323232'
          formatter: [
            '{a|' + total + '}',
            '{b|总额}'
          ].join('\n'),
          rich: {
            a: {
              color: '#323232',
              lineHeight: 16,
              fontSize: 16
            },
            b: {
              color: '#323232',
              fontSize: 14
            },
          }
        },
        center: ['50%', '50%'],
        radius: ['50%', '100%'],
        data: [{
          value: sales
        }, {
          value: lostsales
        }
        ],
      }]
    }
    return option;
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 本月
    var nowDate = new Date();
    var month = nowDate.getMonth() + 1
    if(month<10){
      month = '0'+month
    }
    let data = JSON.parse(options.data)
    // console.log(data.date.split('-')[1])
    if (options.choice=='d'){
      if ((data.date.split('-')[1]) == month) {
        data.date = '本月'
      }else{
        data.date = parseInt(data.date.split('-')[1])+'月'
      }
    }else{
        data.date = '今年'
    }

    // 饼图赋值
    total = data.total_gross
    if (total > 10000) {
      total = (total / 10000).toFixed(2) + '万'
    }
    sales = data.sale_gross
    lostsales = data.outbound_gross
    // if (lostsales < 0) {
    //   lostsales = 0
    // }

    data.total_gross = putComma(data.total_gross)
    data.outbound_gross = putComma(data.outbound_gross)
    data.sale_gross = putComma(data.sale_gross)
    data.total_sale_gross = putComma(options.num)
    this.setData({
      record: data
    })

    this.echartsComponnet = this.selectComponent('#echart-ring');
    // 加载 echart
    this.init_echart()
    
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