// finance/pages/bus_accounts/bus_accounts.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    accountsData:[
      {
        type:'现金账户',
        money:'1000.00'
      },
      {
        type: '现金账户',
        money: '2000.00'
      },
      {
        type: '微信钱包',
        money: '6700.00'
      }
    ],   //账户列表
    bgColorArr: ['#FDD04F', '#62AC4B', '#169FE6','#ffa631',
      '#ffa400', '#62AC4B','#bce672','#c9dd22','#d9b611','#e9bb1d','#0c8918','#eacd76',
    '#40de5a','#c0ebd7','#a78e44','#aa7000','#9ed048','#e0f0e9','#808080','#88ada6',
      '#44cef6', '#bce672', '#c0ebd7', '#a78e44', '#aa7000', '#e0f0e9', '#808080', '#169FE6', '#40de5a', '#c0ebd7', '#FDD04F', '#62AC4B'
      
    ],     //随机背景颜色数组,足够多

    showAccountModal:false,  //用来控制现金账户的弹框显示
    showmodal:false,  //控制账户弹框的显示
    modalContent:[], //账户弹框的内容
    modalTitle: '', //账户弹框的标题
    accountList:[],  //账户列表
    accountId:'',   //账户id
    randomIndex:'',  //随机index
    accountDetail:'',   //账户详情
    jsonAccountDetail:'',
    isModify:false ,  //用来确定是否需要刷新列表数据
  },

  getAccountList(){
    //获取账户列表
    api.finance2.getAccountList()
      .then(res => {

        console.log(res);
        this.setData({
          accountList:res.datas.accounts
        });
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAccountList()
    // this.setData({

    // });
  },

  showAccountModal2(e){
    //显示现金账户的弹框，并且设置选中的账户id,然后查询账户的详情
    this.setData({
      showAccountModal:true,
      accountId:e.currentTarget.dataset.id
    });
    const data = {
      account_id:e.currentTarget.dataset.id
    };
    api.finance2.getAccountDetail(data)
      .then(res => {
        console.log(res);
        this.setData({
          accountDetail:res.data,
          jsonAccountDetail: JSON.stringify(res.data)
        });
      })
  },

  closeTransfer(){
    //关闭现金账户的弹框
    this.setData({
      showAccountModal: false,
      isModify: false
    });
  },

  closeAccountModal(){
  
    //关闭现金账户的弹框
    this.setData({
      showAccountModal: false,
      isModify:false

    });
  },

  closeModal2(){
    //关闭账户的弹框
    this.setData({
      showmodal:false
    });
  },

  showAccountModal(){
    //显示账户弹框
    this.setData({
      showmodal:true,
      modalContent:[
        { src: '/finance/images/add-modal1.png', content: '费用支出', navUrl: '/finance/pages/expenditure/expenditure' },
        { src: '/finance/images/add-modal2.png', content: '其他收入', navUrl: '/finance/pages/income/income' },
      ],
      modalTitle:'收支记账'
    });
  },

  addAccount(){
    //重置是否需要刷新列表信息的标志
    this.setData({
      isModify:false
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
    // //每次到这个页面关闭弹框
    // this.setData({
    //   showAccountModal: false
    // })
    if (this.data.isModify){
      //刷新列表信息
      this.getAccountList();
    }
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