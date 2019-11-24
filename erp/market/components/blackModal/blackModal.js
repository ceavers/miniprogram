// market/components/blackModal/blackModal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      value: false,
      type: Boolean
    },
    optionList: {
      value: [],
      type: Array
    },
    selectedOption: {
      value: 0,
      type: Number
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
    selectedOption(e){
      this.setData({
        selectedOption: e.currentTarget.dataset.index,
        show: false
      })
      this.triggerEvent('tap', e.currentTarget.dataset.index)
    }
  }
})
