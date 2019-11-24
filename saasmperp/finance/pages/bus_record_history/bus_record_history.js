// finance/pages/bus_record_history/bus_record_history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //假数据
      recordMoney:[-30.00,+300],
      showmodal:false,
      modalTitle:'',
      modalContent:[],
      hasRecordhistory:true,   //是否有收支历史数据
    showSelctModal: false,  //是否显示筛选弹框
    selectFirCate: [
      '收入支出', '收支类别', '收支子类', '资金账户'
    ],  //筛选的一级数据
    selectSecCate: [
      ['收入', '支出'],
      ['项目收入', '零售', '营业收入', '网络销售', '其他收入'],
      ['微商', '淘宝', '天猫'],
      ['现金账户', '银行卡4', '银行卡1', '银行卡2'],

    ],   //筛选的二级分类数据

    choiceSelectIndex: 0,   //筛选的点击一级分类的对应的index
    choiceCtaeNameArr:[],  //选中的二级分类的条件组成的数组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  showModal(){
    
      this.setData({
        showmodal:true,
        modalTitle:'收支记账',
        modalContent:[
          { src:'/finance/images/disbursement.png',content:'费用支出'},
          {src:'/finance/images/other-income.png',content:'其他收入'}
          ]
      });
  },

  closeSelectModal(){
    //关闭筛选弹框
    this.setData({
      showSelctModal:false
    });
  },

  choiceSecSelect(e){
    //点击相应的一级分类展示对应的二级分类的数据
    let choiceIndex = e.currentTarget.dataset.index;
    //console.log(choiceIndex);
    this.setData({
      choiceSelectIndex: choiceIndex
    });
  },

  choiceCondition(e){
    let choiceCtaeName = e.currentTarget.dataset.catename;
  },

  cancelCondition(){},

  showSelctModal(){
    
    this.setData({
      showSelctModal:true
    });
  },

  close(){
    this.setData({
      showmodal:false
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