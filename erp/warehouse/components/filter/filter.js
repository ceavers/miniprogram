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
      this.setData({
        classIndex:e.currentTarget.dataset.index,
      })
    },
    selectFilterItem(e){
      const itemId = e.currentTarget.dataset.id;
      const classIndex = this.data.classIndex;
      this.data.filterData[classIndex].data.forEach(item=>{
        if (itemId == item.id){
          item.checked=true
        }else{
          item.checked=false
        }
      })
      this.setData({
        filterData: this.data.filterData
      })
    },
    comfirm(){
      const filterItem={};
      this.data.filterData.forEach(item=>{
        item.data.forEach(classItem=>{
          if (classItem.checked){
            if (classItem.id!=-1){
              filterItem[item.typeId] = classItem.id
            }
          }
        })
      })
      this.triggerEvent('setFilterItem', filterItem)
      this.data.filterData.forEach(item => {
        item.data.forEach(classItem => {
          if (classItem.id == -1) {
            classItem.checked=true
          }else{
            classItem.checked = false
          }
        })
      })
      this.setData({
        show: false,
        classIndex:0,
        filterData: this.data.filterData
      })
    }
  }
})
