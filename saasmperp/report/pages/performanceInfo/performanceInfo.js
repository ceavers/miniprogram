// report/pages/performanceInfo/performanceInfo.js
import { api } from "../../../utils/api/api.js"
import * as echarts from '../../components/ec-canvas/echarts.js';
import {putComma} from "../../../utils/util.js"
var Chart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //customer_id: 0,  //客户
    recordList: [],  //记录列表
    ec: {
      lazyLoad: true // 延迟加载
    }
  },


  // 绩效详情
  getPerformanceInfo(id) {
    api.report.getPerformanceInfo({ customer_id: id })
      .then(res => {
        // console.log(res)
        let list = [...res.datas.sales]
        for (let i = 0; i < list.length; i++) {
          if (this.data.year == list[i].date.split('-')[0]) {
            if (this.data.nowMonth == parseInt(list[i].date.split('-')[1])) {
              list[i].date = '本月'
            }
            if (this.data.lastMonth == parseInt(list[i].date.split('-')[1])) {
              list[i].date = '上月'
            }
          }
          else {
            list[i].date = list[i].date.split('-')[0] + '-' + list[i].date.split('-')[1]
          }
          list[i].gross1 = putComma(list[i].gross)
        }
        this.setData({
          recordList: list
        })
        this.echartsComponnet = this.selectComponent('#chart-line');
        this.init_echarts()
      })
      .catch(err => {

      })
  },

  //初始化图表
  init_echarts: function () {
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.setOption(Chart);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
  setOption: function (Chart) {
    Chart.clear();  // 清除
    Chart.setOption(this.getOption());  //获取新数据
  },
  getOption: function () {
    // 指定图表的配置项和数据
    const tempList = this.data.recordList;
    let xData = tempList.map(item=>{
      return item.date
    })
    let yData = tempList.map(item=>{
      return item.gross
    })
    let end=this.getPercent(xData.length)
    var option = {
      xAxis: {
        type: 'category',
        data: xData,
        axisLine: {
          lineStyle: {
            color: '#62AC4B', 
            width: 0.5
          }
        },
        axisLabel: {
          color: "#323232",
          interval: 0
        },
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#62AC4B',
            width:0.5
          }
        },
        axisLabel: {
          color: "#323232"
        },
        splitLine: {
          lineStyle: {
            color: "#62AC4B",
            width: 0.5
          }
        }
      },
      dataZoom: {
        type: "inside",
        show: false,
        start: 0,
        end: end
      },
      grid: {
        top: 40,
        left:50,
        right: 24,
        bottom: 60,
      },
      series: [{
        data: yData,
        type: 'line',
        lineStyle: {
          color: "#62AC4B",
          width: 0.5
        },
        itemStyle: {
          color: "#62AC4B"
        },
        symbol: "circle",
        areaStyle: {
          color: "#62AC4B",
          opacity: 0.2
        }
      }]
    };
    return option;
  },
  getPercent(length){
    if (length<=7){
      return 100
    }else{
      return parseInt(700 / length)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPerformanceInfo(options.id)
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