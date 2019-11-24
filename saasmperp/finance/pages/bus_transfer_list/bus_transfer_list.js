// finance/pages/bus_transfer_list/bus_transfer_list.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSearch:false,
    showSelctModal:false,
    selectFirCate: [
      '转出账户','转入账户'
    ],  //筛选的一级数据
    selectSecCate: [
      ['现金账户', '银行卡2','银行卡665'],
    
      ['现金账户', '银行卡4', '银行卡1', '银行卡2','银行卡3','银行卡55','银行卡88'],

    ],   //筛选的二级分类数据

    choiceSelectIndex: 0,   //筛选的点击一级分类的对应的index
    choiceCtaeNameArr: [],  //选中的二级分类的条件组成的数组
    transferList:[],   //转账列表
    choiceSecIndex: '',   //选中的二级分类的index
    showCancel: false,   //是否显示不限的右边的勾勾
    choiceCtaeName: '',
    choiceIdArr: [],  //选中的二级分类的ID的数组
    searchData:'',
    isSelect: false,  //是否在筛选收支记账
    isModify:false,  //是否修改过账户数据，是的话则刷新列表数据
  },

  cancelSelect() {
    //筛选结果出来之后的取消筛选,重置列表数据
    this.setData({
      isSelect: false,

    });
    this.getTransferList();
  },


  choiceCondition(e) {
    let choiceCtaeName = e.currentTarget.dataset.catename;
    let choiceSecIndex = e.currentTarget.dataset.choicesecindex;
    let choiceClassId = e.currentTarget.dataset.cateid;
    
    this.setData({
      choiceSecIndex: choiceSecIndex,
      showCancel: false,
      choiceCtaeName: choiceCtaeName,
      isSelect: true
    });
  },

  cancelAllSelect() {
    //关闭所有的条件
    this.setData({
      isSelect: false,
      choiceSecIndex: '',
      choiceCtaeName: ''
    });
  },

  cancelCondition() {
    //点击不限的时候，相当于把这个子类的筛选条件清空
    this.setData({
      showCancel: true,
      choiceSecIndex: '',
      choiceCtaeName: '',
      isSelect: false
    });
  },

  selectTransfer(data){
    //转账筛选
    api.finance2.selectTransfer(data)
      .then(res => {
        console.log(res);
        this.setData({
          showSelctModal:false,
          transferList:res.datas.transfers,
          isSelect:true
        });
      })
  },

  getTransferList(){
    //获取转账列表
    api.finance2.transferList()
      .then(res => {
        console.log(res);
        if(res.code === 1){
          this.setData({
            transferList:res.datas.transfers
          });
        } 
      })
  },

  cancelSearch(){
    this.setData({
      isSearch:false
    });
  },

  showSelctModal() {
    //显示筛选框
    this.setData({
      showSelctModal: true
    });
  },

  closeSelectModal() {
    //关闭筛选弹框
    this.setData({
      showSelctModal: false
    });
  },

  choiceSecSelect(e) {
    //点击相应的一级分类展示对应的二级分类的数据
    let choiceIndex = e.currentTarget.dataset.index;
    //console.log(choiceIndex);
    this.setData({
      choiceSelectIndex: choiceIndex
    });
  },

  confirmSelect() {
    //确定对借入借出进行筛选
    if (this.data.isSelect) {
      const data = {
        out_account_id:3215

      };
      this.selectTransfer(data);
    } else {
      this.setData({
        showSelctModal: false,
        
      });
    }


  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    this.getTransferList();
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