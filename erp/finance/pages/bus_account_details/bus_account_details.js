// finance/pages/bus_account_details/bus_account_details.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTransfer:false,  //控制记账转账的弹框显示
    showmodal: false,  //控制账户弹框的显示
    modalContent: [], //账户弹框的内容
    modalTitle: '', //账户弹框的标题
    accountDetail:'', //账户详情
    jsonAccountDetail:'',
    isModify:false,  //是否修改过详情
    shadow:false,  //控制删除弹框的显示
  },

  closeDelModal(){
    //关闭删除弹框
    this.setData({
      shadow:false
    })
  },

  showDelModal(){
    this.setData({
      shadow: true
    })
  },

  delData(){
    //删除账户
    const data = {
      account_id: this.data.accountDetail.account_id
    };

    api.finance2.delAccount(data)
      .then(res => {
        console.log(res);
        //返回上个页面，并且刷新账户列表信息  关闭弹框
        let pages = getCurrentPages();
        let prev = pages[pages.length -2];
        prev.setData({
          isModify:true
        })
        this.setData({
          shadow:false
        })

        wx.navigateBack({
          delta:1
        })
        wx.showToast({
          title: '删除成功!',
          icon:'none',
          duration:1500
        })
      })
  },

  resetModify(){
    //重置是否修改过详情的标志
    this.setData({
      isModify: false,  
    })
  },

  showAccountModal(){
    //显示账户弹框
    this.setData({
      showmodal:true,
      modalContent: [
        { src: '/finance/images/add-modal1.png', content: '费用支出', navUrl: '/finance/pages/expenditure/expenditure' },
        
        { src: '/finance/images/add-modal2.png', content: '其他收入', navUrl: '/finance/pages/income/income' },
      ],
      modalTitle: '收支记账',
      showTransfer: false,   //同时关闭记账弹框
    });
  },

  closeModal2(){
    this.setData({
      showmodal:false,
      
    });
  },

  showTransfer(){
    this.setData({
      showTransfer:true
    });
  },

  closeTransfer(){
    this.setData({
      showTransfer: false

    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let accountDetail = JSON.parse(options.accountDetail);
    this.setData({
      accountDetail: accountDetail,
      jsonAccountDetail: options.accountDetail
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
    if (this.data.isModify){
      const data = {
        account_id: this.data.accountDetail.account_id
      }
      api.finance2.getAccountDetail(data)
        .then(res => {
          
          console.log(res);
          this.setData({
            accountDetail:res.data
          })
        })
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