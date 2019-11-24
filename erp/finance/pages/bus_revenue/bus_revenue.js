// finance/pages/bus_revenue/bus_revenue.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderFee:[-30.00,300.00],  //订单费用
    showSelctModal: false, 
    selectFirCate: [
      '收入支出', '收支类别','收支子类','资金账户'
    ],  //筛选的一级数据
    // selectSecCate: [
    //   ['收入', '支出'],
    //   ['营业收入','项目收入','零售','网络销售'],
    //   ['微商', '天猫', '淘宝'],
    //   ['现金账户','银行卡1','银行卡2']

    // ],   //筛选的二级分类数据

    selectSecCate: [
      { value: '收入', class_id: 'income' },
      { value: '支出', class_id: 'outlay' }
    ],  //默认最开始是显示收入支出

    choiceSelectIndex: 0,   //筛选的点击一级分类的对应的index
    choiceCtaeNameArr: [],  //选中的二级分类的条件组成的数组
    showmodal:false,  //是否显示新增收支记账弹框
    modalContent:[],  //弹框内容
    modalTitle:'',   //弹框标题
    inoutList:[],  //收支列表
    isSearch:false,  //默认是没有开始查询
    searchData:'',   //搜索内容
    incomes:[],  //收入类别数据
    outlays:[],   //支出类别数据
    choiceSecIndex:'',   //选中的二级分类的index
    showCancel:false,   //是否显示不限的右边的勾勾
    choiceCtaeName:'', 
    choiceIdArr:[],  //选中的二级分类的ID的数组
    inout_types:'',   //收支类型
    isSelect:false,  //是否在筛选收支记账
    selectData:[],  //筛选条件数组
     
  },

  cancelSelect(){
    //筛选结果出来之后的取消筛选,重置列表数据
    this.setData({
      isSelect:false,

    });
    this.getCustomerTypeList();
  },

  confirmSelect(){
    //确定筛选
    if(this.isSelect){
      const data = {
        inout_types: 0
      };
      api.finance2.selectInout(data)
        .then(res => {
          console.log(res);
          this.data.selectData.push(this.data.choiceCtaeName);
          this.setData({
            showSelctModal: false,
            inoutList: res.datas.inouts,
            selectData: this.data.selectData,
            isSelect:true
          });
        })
    }else{
      this.setData({
        showSelctModal: false
      });
    }
    

    
  },

  getAccountList(){
    //获取账户列表
    api.finance2.getAccountList()
      .then(res => {
        console.log(res);
      })
  },

  getInOutList(){
    //获取收支的类别
    api.finance2.getInOutList()
      .then(res => {
        console.log(res);
        this.setData({
          incomes:res.datas.incomes,
          outlays:res.datas.outlays
        });
      })
  },

  cancelSearch(){
    //取消搜索 重置收支记账列表
    this.setData({
      isSearch:false
    });
    this.getCustomerTypeList();

  },

  closeAddModal(){
    //关闭新增收支弹框
    this.setData({
      showmodal:false
    });
  },

  showAddModal(){
    //显示新增收支弹框
    this.setData({
      showmodal:true,
      modalTitle:'收支记账',
      modalContent:[
        { src: '/finance/images/add-modal1.png', content: '费用支出', navUrl:'/finance/pages/expenditure/expenditure'},
        { src: '/finance/images/add-modal2.png', content: '其他收入', navUrl: '/finance/pages/income/income' },
      ]
      
    });
  },

  showSelctModal() {
    //显示筛选框,获取收支的分类,先默认显示第一个大类的所有小类
    this.getInOutList();
    
    this.setData({
      showSelctModal: true
    });

  },

  selectCate(parent_class_id){
    //点击相应的大类显示下面的小类
    const data = {
      parent_class_id: parent_class_id
    };
    api.finance2.selectInout(data)
      .then(res => {
        console.log(res);
      })
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
    switch (choiceIndex){
      case 0:
        this.data.selectSecCate = [
          {value:'收入',class_id:'income'},
          { value: '支出', class_id: 'outlay' }
        ];
        this.setData({
          selectSecCate: this.data.selectSecCate
        });
        break
      case 1:
        this.data.selectSecCate = [];
        this.data.incomes.forEach(i => {
          this.data.selectSecCate.push({ value: i.class_name, class_id: i.class_id});
        });
        this.data.outlays.forEach(i => {
          this.data.selectSecCate.push({ value: i.class_name, class_id: i.class_id });
        });

        this.setData({
          selectSecCate: this.data.selectSecCate
        });
        break
      case 2:
        this.data.selectSecCate = [];
        this.data.incomes.forEach(i => {
          i.sub_classes.forEach(j => {
            this.data.selectSecCate.push({ value: j.class_name, class_id: j.class_id });
          })
        });
        this.data.outlays.forEach(i => {
          i.sub_classes.forEach(j => {
            this.data.selectSecCate.push({ value: j.class_name, class_id: j.class_id });
          })
        });
        this.setData({
          selectSecCate: this.data.selectSecCate
        });
        break

      case 3:
        this.data.selectSecCate = [
          { value: '现金账户', class_id: 'account1' },
          { value: '收入', class_id: 'account2' },
          { value: '支出', class_id: 'account3' }
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
      showCancel:false,
      choiceCtaeName: choiceCtaeName,
      isSelect:true
    });
  },

  cancelAllSelect(){
    //关闭所有的条件
    this.setData({
      isSelect:false,
      choiceSecIndex:'',
      choiceCtaeName:''
    });
  },

  cancelCondition() {
    //点击不限的时候，相当于把这个子类的筛选条件清空
    this.setData({
      showCancel:true,
      choiceSecIndex:'',
      choiceCtaeName:'',
      isSelect:false
    });
  },

  getCustomerTypeList(){
  
    api.finance2.getInoutList()
      .then(res => {
        console.log(res);
        if(res.code === 1){
          //获取收支记账列表
          this.setData({
            inoutList:res.datas.inouts
          });
        }
      });
      
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    //重新回到该页面关闭弹框
    this.setData({
      showmodal:false
    });

    this.getCustomerTypeList();
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