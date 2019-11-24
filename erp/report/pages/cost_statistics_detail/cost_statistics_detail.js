// report/pages/cost_statistics_detail/cost_statistics_detail.js
import {api} from '../../../utils/api/api.js'
import * as echarts from '../../components/ec-canvas/echarts.js';
import { colorList, randomColor } from '../../utils/color.js'
import { putComma } from '../../../utils/util.js'
var Chart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
    ec: {
      lazyLoad: true // 延迟加载
    }
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
    const tempList = this.data.dataList;
    let data = tempList.map(item => {
      return {
        value: item.gross,
        name: item.name
      }
    })
    if (colorList.length >= data.length) {
      var color = colorList.slice(0, data.length)
    } else {
      var color = []
      data.forEach((item, index) => {
        color[index] = colorList[index] || randomColor()
      })
    }
    let total = 0;
    data.forEach(item => {
      total += item.value
    })
    total = total.toFixed(2)
    var option = {
      color: color,
      tooltip: {
        trigger: 'item',
        formatter: "{b}\n{d}%",
        triggerOn: 'click'
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '80%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: false,
          hoverAnimation: false,
          label: {
            show: true,
            position: 'center',
            fontSize: 16,
            align: 'center',
            formatter: [
              '{a|' + total + '}',
              '{b|总额}'
            ].join('\n'),
            rich: {
              a: {
                color: '#323232',
                lineHeight: 20,
                fontSize: 14,
              },
              b: {
                color: '#323232',
                fontSize: 12,
              },
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: data
        }
      ]
    };
    return option;
  },
  getStatisticsDetail(data){
    api.report.getStatisticsDetail(data)
    .then(res=>{
      res.datas.items.forEach(item=>{
        item.gross_p = putComma(item.gross)
      })
      this.setData({
        dataList: res.datas.items
      })
      this.echartsComponnet = this.selectComponent('#chart-pie');
      this.init_echarts()
    })
    .catch(err=>{

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const data = {}
    if(options.index){
      data.monthly = options.index
      this.setData({
        month: options.index
      })
    }
    this.getStatisticsDetail(data)
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