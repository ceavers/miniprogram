// components/add_record_history.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    modalContent:{
      type:Array,
      value:[]
    },
    modalTitle:{
      type:String,
      value:''
    },
    showmodal:{
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
    closeModal(){
      this.triggerEvent('close')
    },
    close(){
      this.properties.showmodal = false
    }
  }
})
