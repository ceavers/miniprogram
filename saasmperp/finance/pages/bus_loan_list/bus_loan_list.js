// finance/pages/bus_loan_list/bus_loan_list.js
import { api } from "../../../utils/api/api.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loanMoney:[30.00,-300.00],
    isSearch: false,
    showSelctModal: false,
    selectFirCate: [
      '借贷类型', '资金账户'
    ],  //筛选的一级数据
    selectSecCate: [
      {value:'借入',class_id:'loanin'},
      { value: '借出', class_id: 'loanout' },
    ],   //筛选的二级分类数据

    choiceSelectIndex: 0,   //筛选的点击一级分类的对应的index
    choiceCtaeNameArr: [],  //选中的二级分类的条件组成的数组
    loanList: [],   //借入借出列表
    showmodal:false,
    isSelect:false,
    showCancel: false,   //是否显示不限的右边的勾勾
    choiceCtaeName: '',
    choiceSecIndex: '',   //选中的二级分类的index 
    searchData:'',  
  },

  selectRevenue(data){
    //借入借出筛选
    api.finance2.selectRevenue(data)
      .then(res => {
        console.log(res);
        this.setData({
          showSelctModal:false,
          loanList:res.datas.loans,
          isSelect:true
        });
      })
  },

  closeAddModal() {
    //关闭新增收支弹框
    this.setData({
      showmodal: false
    });
  },

  showAddModal() {
    //显示新增收支弹框
    this.setData({
      showmodal: true,
      modalTitle: '借入借出',
      modalContent: [
        { src: '/finance/images/jiechu.png', content: '借出', navUrl: '/finance/pages/borrow_out/borrow_out' },
        { src: '/finance/images/jieru.png', content: '借入', navUrl: '/finance/pages/borrow_new/borrow_new'},
      ]

    });
  },

  cancelSelect() {
    //筛选结果出来之后的取消筛选,重置列表数据
    this.setData({
      isSelect: false,

    });
    //重置借入借出列表
    api.finance2.getLoanList()
      .then(res => {
        console.log(res);
        if (res.code === 1) {
          this.setData({
            loanList: res.datas.loans
          });
        }
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
   //获取借入借出列表
    api.finance2.getLoanList()
      .then(res => {
        console.log(res);
        if(res.code === 1){
          this.setData({
            loanList:res.datas.loans
          });
        }
      })
  },

  cancelSearch() {
    this.setData({
      isSearch: false
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
    //分类讨论
    switch (choiceIndex) {
      case 0:
        this.data.selectSecCate = [
          { value: '借入', class_id: 'loanin' },
          { value: '借出', class_id: 'loanout' }
        ];
        this.setData({
          selectSecCate: this.data.selectSecCate
        });
        break
      case 1:
        this.data.selectSecCate = [];
        this.data.selectSecCate = [
          { value: '现金账户', class_id: 'account1' },
          { value: '银行卡1', class_id: 'account2' },
          { value: '银行卡2', class_id: 'account3' },
          { value: '银行卡3', class_id: 'account4' },
          { value: '银行卡4', class_id: 'account5' },
          { value: '银行卡5', class_id: 'account6' },
        ];

        this.setData({
          selectSecCate: this.data.selectSecCate
        });
        break
     

    }
    this.setData({
      choiceSelectIndex: choiceIndex
    });
  },

  choiceCondition(e) {
    let choiceCtaeName = e.currentTarget.dataset.catename;
    let choiceSecIndex = e.currentTarget.dataset.choicesecindex;
    let choiceClassId = e.currentTarget.dataset.cateid;
    console.log(e.currentTarget.dataset);
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

  confirmSelect(){
    //确定对借入借出进行筛选
    if (this.data.isSelect){
      const data = {
        loan_type: 0
      };
      this.selectRevenue(data);
    }else{
      this.setData({
        showSelctModal:false
      });
    }

    
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
    this.setData({
      showmodal: false
    });
    
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