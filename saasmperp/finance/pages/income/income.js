import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shadow: false,
    listData_02: [],
    items: [],
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
    zero: "0",
    dian: ".",
    zero1:"",
    sum:"",
    sum1:"",
    shadow1:false,
    starttime: "今天",
    list:"",
    datalist:"",
    shadow2:false,
    xl_title:"",
  },
  add() {
    wx.navigateTo({
      url: '../bus_record_history/bus_record_history',
    })
  },
  seven(e) {
    let that = this
    that.setData({
      sum: sum + that.data.seven
    })
  },
  four(e) {
    let that = this
    that.setData({
      sum: sum + that.data.four
    })
  },
  one(e) {
    let that = this
    console.log(that.data.one)
    that.setData({
      sum: sum + that.data.one
    })
  },
  two(e) {
    let that = this
    console.log(that.data.two)
    let sum = that.data.sum
    that.setData({
      sum: sum + that.data.two
    })
  },
  three(e) {
    let that = this
    let sum = that.data.sum
    that.setData({
      sum: sum + that.data.three
    })
  },
  five(e) {
    let that = this
    let sum = that.data.sum
    that.setData({
      sum: sum + that.data.five
    })
  },
  six(e) {
    let that = this
    let sum = that.data.sum
    that.setData({
      sum: sum + that.data.six
    })
  },
  nine(e) {
    let that = this
    let sum = that.data.sum
    that.setData({
      sum: sum + that.data.nine
    })
  },
  eight(e) {
    let that = this
    let sum = that.data.sum
    that.setData({
      sum: sum + that.data.eight
    })
  },
  zero(e) {
    let that = this
    let sum = that.data.sum;
    console.log(that.data.sum)
    if (that.data.sum !== "") {
      that.setData({
        sum: sum + that.data.zero
      })
    }
  },
  dian(e) {
    let that = this
    let sum = that.data.sum
    console.log(typeof(that.data.sum))
    if (that.data.sum.indexOf('.') == -1 && that.data.sum != "") {
      that.setData({
        sum: sum + that.data.dian
      })
    }
  },
  remove() {
    let that = this
    var sum_
    sum_ = that.data.sum.substring(0, that.data.sum.length - 1)
    that.setData({
      sum: sum_
    })
  },
  remove1() {
    let that = this
    that.setData({
      sum: "",
    })
  },
  remove2(){
    let that = this
    that.setData({
      shadow2: false
    })
  },
  shadow1(e){
    let that =this 
    console.log(e)
    let data = {
      token: wx.getStorage({
        key: "token"
      })  
    }
    api.finance.getXlList(data)
      .then(res => {
        if (res.code == 1) {
          that.setData({
            datalist: res.datas.sub_classes,
          })
          if(that.data.datalist!=""){
            console.log(1234)
            that.setData({
              shadow2:true,
              xl_title:e.currentTarget.dataset.name,
            })
          }else{
            that.setData({
              shadow1:true
            })
          }
        }
      })
    .catch(err => {
        
  })
  },
  dateSelectAction: function(e) {
    var cur_day = e.currentTarget.dataset.idx;
    this.setData({
      todayIndex: cur_day
    })
    console.log(`点击的日期:${this.data.cur_year}年${this.data.cur_month}月${cur_day + 1}日`);
  },

  setNowDate: function() {
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const todayIndex = date.getDate() - 1;
    console.log(`日期：${todayIndex}`)
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    this.setData({
      cur_year: cur_year,
      cur_month: cur_month,
      weeks_ch,
      todayIndex,
    })
  },

  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        hasEmptyGrid: true,
        empytGrids
      });
    } else {
      this.setData({
        hasEmptyGrid: false,
        empytGrids: []
      });
    }
  },
  calculateDays(year, month) {
    let days = [];

    const thisMonthDays = this.getThisMonthDays(year, month);

    for (let i = 1; i <= thisMonthDays; i++) {
      days.push(i);
    }

    this.setData({
      days
    });
  },
  handleCalendar(e) {
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })

    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
    }
  },
  FillYear() {
    let b = new Date();
    let year = parseInt(b.getFullYear());
  },
  day() {
    let that = this
    that.setData({
      show: true
    }) 
  },
  comit() {
    let that = this
    that.setData({
      shadow1: false
    })
  },
  setTime(e) {
    console.log(e)
    let that = this
    let time = e.detail.year + "." + e.detail.month + "." + e.detail.day
    that.setData({
      starttime: time
    })
  },
  dataInfo(){
    let that =this
    that.setData({
      shadow1: true,
      shadow2:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let data = {
      token: wx.getStorage({
        key:"token"
      })
    }
    api.finance.getIncomeList(data)
      .then(res => {
        if (res.code == 1) {
          console.log(res.datas.incomes)
          that.setData({
            list: res.datas.incomes,

          })
        }
      })
      .catch(err => {

      })
    let confige = this.selectComponent('#confige');
    let that = this
    that.setNowDate();
    that.FillYear();
  },
  showModal() {
    this.setData({
      shadow: true,
      items: [
        ['现金账户'],
        ['银行卡1'],
        ['银行卡2']
      ]


    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})