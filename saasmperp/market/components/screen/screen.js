// market/components/screen/screen.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showScreen: {
      value: true,
      type: Boolean
    },//筛选弹窗flag
    selectClassificationIList: {
      value: [],
      type: Array
    },//一级分类列表
    screenOptionList: {
      value: [],//二级筛选列表,
      type: Array
    },
    selectFirstClassificationIndex: {
      value: 0,
      type: String
    },//选择一级分类
    selectSecondClassificationIndex: {
      value: 0,
      type: String
    },//选择二级分类
    selectedScreenList: {
      value: {},
      type: Object
    },//选择的二级分类
  },

  /**
   * 组件的初始数据
   */
  data: {
    oldSelectedScreenList: [],
    selectName: []
  },

  /**
   * 组件的方法列表
   */
  methods: {    
    //选择一级分类
    selectClassificationI(e) {
      this.setData({
        selectFirstClassificationIndex: e.currentTarget.dataset.index,
      })
    },
    //选择二级分类
    selectClassificationII(e) {
      if (!this.data.oldSelectedScreenList.length) {
        let selectedScreenList = JSON.stringify(this.properties.selectedScreenList)
        this.setData({
          oldSelectedScreenList: JSON.parse(selectedScreenList),

        })
      }
      let selectedScreenList = this.properties.selectedScreenList   
      selectedScreenList[this.data.selectFirstClassificationIndex].select_second_type_id = e.currentTarget.dataset.id
      selectedScreenList[this.data.selectFirstClassificationIndex].name = e.currentTarget.dataset.name
      console.log(e.currentTarget.dataset.name)
      this.setData({
        selectSecondClassificationIndex: e.currentTarget.dataset.index,
        selectedScreenList
      })
    },
    //取消筛选
    cancelScreen() {
      //取消，还原selectedScreenList
      if (this.data.oldSelectedScreenList.length){
        const oldSelectedScreenList = JSON.stringify(this.data.oldSelectedScreenList)
        this.setData({
          selectedScreenList: JSON.parse(oldSelectedScreenList)
        })
      }
      this.setData({
        showScreen: false
      })
    },
    //确认筛选
    confirmScreen() {
      const selectedScreenList = JSON.stringify(this.properties.selectedScreenList)
      this.setData({
        showScreen: false,
        showList: true,
        oldSelectedScreenList: JSON.parse(selectedScreenList)
      })
      console.log(this.data.oldSelectedScreenList)
      this.triggerEvent('confirmScreen', this.properties.selectedScreenList)
    },
  }
})
