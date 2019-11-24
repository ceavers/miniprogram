// market/components/bottomModal/bottomModal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hasTags:{
      type:Boolean,
      value:false
    },
    show: {
      value: false,
      type: Boolean
    },
    modalList: {
      value: {
        title: '',
        detail: [],//url跳转路径 imageSrc图片路径 cname名字
      },
      type: Object
    },
    isWidth:{
      value: false,
      type: Boolean
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
    hideBottomModal(){
      this.setData({
        show: false
      })
    },
    returnEventName(e){
      this.triggerEvent("tap", e.currentTarget.dataset);
    },
    returnFalse(){
      
    }
  }
})
