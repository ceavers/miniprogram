// report/pages/cost_statistics/cost_statistics.js
import {api} from '../../../utils/api/api.js'
import * as echarts from '../../components/ec-canvas/echarts.js';
import { colorList, randomColor} from '../../utils/color.js'
import { putComma } from '../../../utils/util.js'
var Chart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //默认本月
    index: 0,
    feeData:[],
    monthlyData:null,
    ec: {
      lazyLoad: true // 延迟加载
    }
  },
  chooseMouth(e) {
    if (e.currentTarget.dataset.index == this.data.index) {
      return
    }
    this.setData({
      index: e.currentTarget.dataset.index
    })
    if (e.currentTarget.dataset.index == 0 || e.currentTarget.dataset.index==1){
      //本月 上月
      const month = new Date().getMonth() + 1
      if (e.currentTarget.dataset.index == 0){
        const data = {
          monthly: month
        }
        this.getStatisticsData(data)
      }else{
        const data={}
        if (month==1){
          const year = new Date().getFullYear()-1
          data.monthly=12;
          data.year = year
        }else{
          data.monthly = month-1;
        }
        this.getStatisticsData(data);
      }
    }else{
      api.report.getStatisticsDataByYear()
      .then(res=>{
        res.data.month_list.forEach((item,index)=>{
          item.color = colorList[index] || randomColor()
          item.money = putComma(item.money)
        })
        res.data.this_year_cost = putComma(res.data.this_year_cost)
        this.setData({
          monthlyData:res.data
        })
        if (this.data.monthlyData.month_list.length){
          setTimeout(() => {
            let list = this.data.monthlyData.month_list
            for (let i = 0; i < list.length; i++) {
              let width = list[i].rate
              if (width > 100) {
                width = 100 + "%"
              } else {
                width = width + '%'
              }
              list[i].anmiate = this.lineAni(width, list[i].color)
            }
            this.setData({
              monthlyData: this.data.monthlyData
            })
          },50)
        }
      })
      .catch(err=>{

      })
    }
  },
  // 进度条
  lineAni(width,color) {
    let lineAni = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
      delay: 50
    })
    lineAni.backgroundColor(color).width(width).step();//step每个步骤结束必写
    return lineAni.export()
  },
  toDeatil(e){
    const index = e.currentTarget.dataset.index
    let month;
    let year;
    const date=new Date();
    month = date.getMonth() + 1;
    year = date.getFullYear();
    if (this.data.index == 1 && month==1){
      year = year-1;
      month=12
    }
    wx.navigateTo({
      url: `/report/pages/cost_statistics_item_detail/cost_statistics_item_detail?index=${index}&month=${month}&year=${year}`,
    })
  },
  toDetailTotal(e){
    if(e.currentTarget.dataset.index){
      wx.navigateTo({
        url: `/report/pages/cost_statistics_detail/cost_statistics_detail?index=${e.currentTarget.dataset.index}`,
      })
    }else{
      wx.navigateTo({
        url: '/report/pages/cost_statistics_detail/cost_statistics_detail',
      })
    }
  },
  getStatisticsData(data){
    api.report.getStatisticsData(data)
    .then(res=>{
      res.datas.cost_items.forEach(item=>{
        item.cast_gross_p = putComma(item.cast_gross)
      })
      this.setData({
        feeData: res.datas.cost_items
      })
      this.echartsComponnet = this.selectComponent('#chart-pie');
      this.init_echarts()
    })
    .catch(err=>{

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
    const tempList = this.data.feeData;
    let data = tempList.map(item => {
      return {
        value: item.cast_gross,
        name: item.cast_item_name
      }
    })
    if (colorList.length>=data.length){
      var color = colorList.slice(0, data.length)
    }else{
      var color = []
      data.forEach((item,index)=>{
        color[index] = colorList[index] || randomColor()
      })
    }
    let total = 0;
    data.forEach(item=>{
      total+=item.value
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
          hoverAnimation:false,
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const month = new Date().getMonth()+1
    const data={
      monthly: month
    }
    this.getStatisticsData(data)
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