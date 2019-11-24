// components/filter/filter.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    filterData:{
      type:Array,
      value:[]
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
      if (this.properties.classIndex != e.currentTarget.dataset.index){
        this.setData({
          classIndex: e.currentTarget.dataset.index,
          itemIndex: -2
        })
      }
      
    },
    selectFilterItem(e){
      this.setData({
        itemIndex: e.currentTarget.dataset.index
      })
    },
    selectFilterNoItem(){
      this.setData({
        itemIndex:-1
      })
    },
    comfirm(){
      
      this.setData({
        show: false
      })
      const data = {
        choiceFilter: this.properties.itemIndex >= 0 ?  this.properties.filterData[this.properties.classIndex].data[this.properties.itemIndex]:''
      }

     this.triggerEvent('confirm', data);
      
    }
  }
})
