// components/select/select.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    selectData:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    select(e) {
      let params={
        name: e.currentTarget.dataset.stockName,
        value: e.currentTarget.dataset.stockId
      }
      this.triggerEvent("setRadioValue", params)
    },
    cancal(){
      this.triggerEvent("cancel")
      this.setData({
        show:false
      })
    }
  }
})
