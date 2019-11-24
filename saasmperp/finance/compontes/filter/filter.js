// components/filter/filter.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: true
    },
    filterData:{
      type:Array,
      value: [{ className: "借贷类型", data: ["借入", "借出"] }, { className: "资金账户", data: ["现金账户", "支付宝", "微信"] },]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    classIndex:0,
    itemIndex:-2,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    cancle() {
      this.setData({
        show: false
      })
    },
    selectFilterClass(e){
      console.log(e)
      this.setData({
        classIndex:e.currentTarget.dataset.index,
        itemIndex: -2
      })
      this.triggerEvent('selectFilterClass', e.currentTarget.dataset.index)
    },
    selectFilterItem(e){
      console.log(e)
      this.setData({
        itemIndex: e.currentTarget.dataset.index
      })
      this.triggerEvent('selectFilterItem',e.currentTarget.dataset.index)
    },
    selectFilterNoItem(){
      this.setData({
        itemIndex:-1
      })
    },
    comfirm(e){
      console.log(e)
      this.setData({
        show: false
      })
      this.triggerEvent('comfirm')
    }
  }
})
