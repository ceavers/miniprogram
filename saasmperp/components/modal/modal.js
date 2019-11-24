/**
 * 自定义弹窗  样式由插槽内容样式确定
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //是否显示modal弹窗
    show: {
      type: Boolean,
      value: false
    },
    imageMask:{
      type:Boolean,
      value:false
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
    hide(){
      this.setData({
        show: false
      })
    },
    returnFalse() {

    },
  }
})
