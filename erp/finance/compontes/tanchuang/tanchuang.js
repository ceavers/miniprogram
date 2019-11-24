// components/filter/filter.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show:{
       type:Boolean,
       value:true
    },
    tc_title:{
      type:String,
      value:"借入借出"
    },
    imgurl:{
     type:String,
     value:"../../images/jiechu.png"
    },
    imgurl1: {
      type: String,
      value: "../../images/jieru.png"
    },
    content:{
      type: String,
      value:"借出"
    },
    content1: {
      type: String,
      value: "借入"
    },
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
    quxiao(e) {
      this.triggerEvent('quxiao')
    },
    jieru(e) {
      this.triggerEvent('jieru')
    },
    jiechu(e) {
      this.triggerEvent('jiechu')
    },

  }
})
