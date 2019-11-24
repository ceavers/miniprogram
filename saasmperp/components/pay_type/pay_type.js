// components/pay_type/pay_type.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
      width:{
        type: String,
        value: "500rpx", 
      } ,
      backgd:{
        type: String,
        value: "rgb(68,68,68)", 
      },
      color:{
        type: String,
        value: "rgba(255,255,255,1)", 
      } ,
      fz:{
        type: String,
        value: "28rpx",
      },
      mleft:{
        type: String,
        value: "40rpx",
      } ,
      mright:{
        type: String,
        value: "40rpx",
      } ,
      height:{
        type: String,
        value: "90rpx",
      },
      borderbom:{
        type: String,
        value: "1px solid gray",
      },
      position:{
        type: String,
        value: "fixed",
      } ,
      index:{
        type: String,
        value: "100"
      },
      shadow: {
        type:Boolean,
        value:false
      },
      items:{
       type:Array,
       value: []
      },
  },
  data: {
    // 这里是一些组件内部数据

  },
  methods: {
    // 这里是一个自定义方法
    radioChange(e){
      
      this.triggerEvent('radioChange', e.detail.value)
    },

    // getId(e){
    //   //获取用户id
    //   this.triggerEvent('getId', e.currentTarget.dataset.userid)
    // },

    getRecorderId(e){
      //获取录入人ID
      if (e.currentTarget.dataset.recorderid){
        this.triggerEvent('getRecorderId', e.currentTarget.dataset.recorderid)
      } else if (e.currentTarget.dataset.administratorid){
        this.triggerEvent('getAdministratorId', e.currentTarget.dataset.administratorid)
      } else if (e.currentTarget.dataset.userid){
        this.triggerEvent('getId', e.currentTarget.dataset.userid)
      } else if (e.currentTarget.dataset.outid) {
        //获取支出账户id
        this.triggerEvent('getOutId', e.currentTarget.dataset.outid)
      } else if (e.currentTarget.dataset.inid) {
        //获取转入账户id
        this.triggerEvent('getInId', e.currentTarget.dataset.inid)
      }
      
    },

    // getAdministratorId(e){
    //   //获取管理员ID
    //   this.triggerEvent('getAdministratorId', e.currentTarget.dataset.administratorid)
    // },
	indexInfo(e){
      this.triggerEvent('indexInfo', e.currentTarget.dataset.id)
    },
    closeModal(){
      //关闭遮罩层和模态框
      this.triggerEvent('close')
    }
  }
})
