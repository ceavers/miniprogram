// finance/pages/bus_loan_detail/bus_loan_detail.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loan_id:'',  //借入借出ID
    loanDeatil:{}, 
    showAddCateModal:false,   //控制修改备注弹框的显示
    inputBeizhu:'',  //输入的备注的内容
    showAddCateModal2: false,  //控制处理欠款de弹框的显示
    inputMoney:'',  //输入的金额
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      loan_id: wx.getStorageSync('loan_id')
    });
    this.getLoanDeatil();
  },

  showAddCateModal(){
    //显示修改备注弹框
    this.setData({
      showAddCateModal:true
    });
  },

  closeCateModal2(){
    //关闭修改备注弹框
    this.setData({
      showAddCateModal: false
    });
  },

  closeCateModal6(){
    //关闭处理欠款弹框
    this.setData({
      showAddCateModal2: false
    });
  },

  updateBeizhu(e){
    //监听输入备注的内容
    //console.log(e.detail.value);
    this.setData({
      inputBeizhu: e.detail.value
    });
  },

  confirmUpdateBeizhu(){
    //如果备注内容不同则修改
    //console.log(this.data.loanDeatil.note)
    if (this.data.inputBeizhu != this.data.loanDeatil.note && this.data.inputBeizhu.trim().length){
      const data = {
        loan_id: this.data.loan_id,
        note: this.data.inputBeizhu
      };
      api.finance2.modifyBeizhu(data)
        .then(res => {
          console.log(res);
          this.setData({
            //关闭弹框
            showAddCateModal: false
          });
          //更新借入借出明细
          this.getLoanDeatil();

          wx.showToast({
            title: '操作成功!',
            icon: 'none',
            duration: 1500
          })
        })
    }else{
      this.setData({
        //关闭弹框
        showAddCateModal: false
      });
    }
  },

  showAddCateModal2(){
    //显示处理欠款的弹框
    this.setData({
      showAddCateModal2: true
    });
  },

  closeCateModal6(){
    //关闭处理欠款的弹框
    this.setData({
      showAddCateModal2: false
    });
  },

  updateMoney(e){
    //监听修改金额
    this.setData({
      inputMoney:e.detail.value
    });
  },

  confirmInputMoney(){
   
    //确认输入借入借出金额
    if (this.data.inputMoney.trim().length){
      const data = {
        return_sum: this.data.inputMoney,
        loan_id: this.data.loan_id
      };
      api.finance2.modifyMoney(data)
        .then(res => {
          console.log(res);
          this.setData({
            //关闭弹框
            showAddCateModal2: false
          });
          //更新借入借出明细
          this.getLoanDeatil();

          wx.showToast({
            title: '操作成功!',
            icon: 'none',
            duration: 1500
          })
        })
    }else{
      this.setData({
        //关闭弹框
        showAddCateModal2: false
      });
    }
    
  },

  delData() {
    //删除改借出明细
    const data = {
      loan_id: this.data.loan_id
    };
    api.finance2.delRevnue(data)
      .then(res => {
        console.log(res);
        if (res.code == 1) {
          this.setData({
            shadow: false,
          });
          //跳转到借入借出列表页面
          wx.navigateTo({
            url: '/finance/pages/bus_loan_list/bus_loan_list',
          })
        }
      })
  },

  showDelModal() {
    //显示删除弹框
    this.setData({
      shadow: true
    });
  },

  closeDelModal() {
    this.setData({
      shadow: false
    });
  },

  getLoanDeatil(){
    //获取借入借出详情
    const data = {
      loan_id: this.data.loan_id
    };
    api.finance2.getLoanDeatil(data)
      .then(res => {
        console.log(res);
        if(res.code === 1){
          this.setData({
            loanDeatil:res.data
          });
        } 
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