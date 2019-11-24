// warehouse/pages/enable_barCode/enable_barCode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:1,  // 1-添加 3-修改  
    enable:0 ,//是否启用单品条码
    prohibitValue:'',//禁用单品 条码
    sweepCode:'',//扫一扫
    units_sku: [],//单品条码 数据列表 {size_id:0,color_id:0,sku_code:'13152521'}
    tempList:[],//临时列表
    colorList: [],//颜色列表 通过接口获取
    sizeList: [],//尺码列表 通过接口获取
  },

  // 启用单品条码开关
  switch(e){
    if (e.detail.value){
      this.setData({
        enable:1
      })
    }else{
      this.setData({
        enable: 0
      })
    }
  },

  // 扫一扫
  sweepCode(e) {
    var color = e.currentTarget.dataset.color;
    var size = e.currentTarget.dataset.size;
    var value = '';
    var _this = this
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode', 'qrCode'],
      success(res) {
        console.log(res)
        value = res.result
      }
    })
    // console.log(value)
    // const data ={
    //   size_id: size,
    //   color_id: color,
    //   sku_code: value
    // }
    // var list = [...this.data.tempList];
    // list.forEach((item) => {
    //   if (item.color_id === color) {
    //     if (item.size_id === size) {
    //       item.sku_code = value
    //     }
    //   }
    // })
    // this.setData({
    //   tempList: list
    // })
    // console.log(this.data.tempList)
  },

  //获取单品 条码
  getInput(e){
    var value = e.detail.value;
    var color = e.currentTarget.dataset.color;
    var size = e.currentTarget.dataset.size;
    const data = {
      size_id: size,
      color_id: color,
      sku_code: value
    }
    var list = [...this.data.tempList];
    list.forEach((item)=>{
      if(item.color_id===color){ 
        if(item.size_id===size){
          item.sku_code = value
        }
      }
    })
    this.setData({
      tempList:list
    })
  },

  // 获取未启用 条码
  getProhibitInput(e){
    var value = e.detail.value
    this.setData({
      prohibitValue: value
    })
  },

  // 确认 携带数据返回上一级页面
  submit(){
    let enable = this.data.enable;
    if (enable){
      var list = this.data.tempList
      let flag = 1
      list.forEach((item) => {
        if (!item.sku_code.trim().length) {
          flag = 0
          console.log(flag)
        }
      })
      if (flag) {
        console.log("提交成功")
        this.setData({
          units_sku: this.data.tempList
        })
        console.log(this.data.units_sku)
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];//当前页面
        var prevPage = pages[pages.length - 2];//上一个页面
        prevPage.setData({
          unit_barcode_active: this.data.enable,
          units_sku: this.data.units_sku
        })
        wx.navigateBack({
          delta: 1
        })
      } else {
        wx.showToast({
          title: '条码不能为空！',
          icon: 'none'
        })
      }
    }else{
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];//当前页面
      var prevPage = pages[pages.length - 2];//上一个页面
      prevPage.setData({
        unit_barcode_active: this.data.enable
      })
      if (this.data.prohibitValue.trim().length){
        prevPage.setData({
          sweepCode: this.data.prohibitValue
        })
      }
      wx.navigateBack({
        delta: 1
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.state==1){
      wx.setNavigationBarTitle({title:'添加商品'})
    } else if (options.state == 3){
      wx.setNavigationBarTitle({ title: '修改商品' })
      this.setData({
        state:3,
        enable:1
      })
    }
    var colorlist = JSON.parse(options.colorCheckedList)
    var sizelist = JSON.parse(options.sizeCheckedList)
    var list = []
      for (var i = 0; i < colorlist.length; i++) {
        for (var j = 0; j < sizelist.length; j++) {
          const data = { color_id: colorlist[i].color_id, size_id: sizelist[j].size_id}
          list.push(data)
        }
      }
    for(var i=0;i<list.length;i++){
      list[i].sku_code=""
    }
    this.setData({ 
      tempList:list,
      colorList: colorlist,
      sizeList: sizelist
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})