// report/components/picker/picker.js
const date = new Date()
const currMonth = date.getMonth() + 1
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
    months:[1,2,3,4,5,6,7,8,9,10,11,12],
    mouth: currMonth,
    value: [currMonth - 1]
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
    complete() {
      this.setData({
        show: false
      })
      this.triggerEvent('setTime', {
        month: this.data.month,
      })
    },
    bindChange: function (e) {
      const val = e.detail.value;
      this.setData({
        value: val,
        month: this.data.months[val[0]],
      })
    }
  }
})
