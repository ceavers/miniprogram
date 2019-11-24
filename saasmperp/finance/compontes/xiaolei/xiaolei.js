// components/filter/filter.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    xl_title:{
      type:String,
      value:"工资奖金" 
    },
    items:{
      type:Array,
      value: ["基本工资", "绩效奖金","设保"]
    },
    show:{
      type:Boolean,
      value:false,
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
    remove(){
     let that =this
     that.setData({
         show:false
     })
    },
    dataInfo(e) {
      let that = this
      that.triggerEvent('dataInfo',that.data.items)
    },

  }
})
