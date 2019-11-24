// finance/pages/bus_query/bus_query.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate:'2019-01-19',  //收支开始时间
    endDate:'2019-07-19',  //结束时间
    shadow:false,  //控制查询的弹框显示
    items:[],  //查询弹框的内容
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // choiceSecSelect(e){
  //   //弹出筛选框的时候点击一级分类显示对应的二级分类
  //   let choiceIndex = e.currentTarget.dataset.index;
  //   //choiceSelectIndex
  //   console.log(index);
  // },

  choicePayType(){
    //选择支出还是收入
    this.setData(
      {
        shadow:true,
        items:[
          {
            value:'请选择'
          },
          {
            value: '收入'
          },
          {
            value: '支出'
          },
          
        ]
      }
    );
  },

  choicePerson(){
    //选择经手人
    this.setData({
      shadow:true,
      items:[
        {value:'请选择'},
        {value:'小钟'},
        {value:'小明'}
      ]
    });
  },


  choiceAccount(){
    //选择账户类型
    this.setData({
      shadow: true,
      items: [
        { value: '请选择' },
        { value: '现金账户' },
        { value: '银行卡1' },
        { value: '银行卡2' }
  
      ]
    });
  },



  queryIncomeAndExpenses(){
    //查询收支
  },

  changeStartDate(event){
    this.setData({
      startDate: event.detail.value
    });
  },

  changeEndDate(event){
    this.setData({
      endDate:event.detail.value
    });
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