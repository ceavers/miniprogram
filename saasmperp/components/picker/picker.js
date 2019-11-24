// warehouse/components/picker/picker.js
const date = new Date()
const years = []
const months = []
const days = []
const currYear = date.getFullYear()
const currMonth = date.getMonth()+1
const currDay = date.getDate()

for (let i = 1990; i <= date.getFullYear()+50; i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= getMonthDay(currYear, currMonth); i++) {
  days.push(i)
}
//获取一个月有多少天
function getMonthDay(year, month) {
  let num = new Date(year, month , 0).getDate()
  return num
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    years: years,
    year: currYear,
    months: months,
    month: currMonth,
    days: days,
    day: currDay,
    value: [date.getFullYear() - 1990, currMonth-1, currDay-1],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    cancel() {
      this.setData({
        show: false
      })
      this.triggerEvent('cancel')
    },
    complete(){
      this.setData({
        show: false
      })
      this.triggerEvent('setTime',{
        year:this.data.year,
        month:this.data.month,
        day:this.data.day
      })
    },
    bindChange: function (e) {
      const val = e.detail.value;
      let days=[]
      for (let i = 1; i <= getMonthDay(this.data.years[val[0]], this.data.months[val[1]]); i++) {
        days.push(i)
      }
      this.setData({
        value:val,
        year: this.data.years[val[0]],
        month: this.data.months[val[1]],
        day: this.data.days[val[2]],
        days:days
      })
    }
  }
})
