// components/category/category.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    goodsData:{
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
    cancle() {
      this.setData({
        show: false
      })
    },
    selectType(e){
      this.setData({
        selectIndex:e.currentTarget.dataset.index,
        show: false
      })
      this.triggerEvent("setType", { category_id: e.currentTarget.dataset.id })
    }
  }
})
