// market/pages/purchase_invoice_cancel_receipt/purchase_invoice_cancel_receipt.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    purchaseDetails:'', //采购单详情
    choiceAccount:"",  //选中的账户名称
    startDate:'',   //收付款时间
    shadow: false,
    accountList:[],  //账户列表
    items:[],  //弹出的账户列表
    choiceAccountName:'',  //选中的账户名称
    choiceAccountId:'',  //选中的账户id
    //purchasetype:2,   //采购单类型，是采购单还是采购退货单  为1则表示采购单  2为后者
    payMoney:'',  //付款金额
    note:'',  //收付款备注
    inputMoney:'none',  //修改过的收付款金额
    purType:'',   //采购单类型
  },
  
  inputNote(e){
    //监听收付款备注的输入
  
      this.setData({
        note:e.detail.value
      })
    
  },

  inputMoney(e){
    //监听收付款金额的输入
    
      this.setData({
        inputMoney:e.detail.value
      })
    
  },

  comfirmCollect(){
    //确认收款


    if (this.data.purType == 2){
      const data = {
        buy_money: this.data.purchaseDetails.refund_money,
        already_pay_money: this.data.purchaseDetails.already_refund_money,
        
        account: this.data.choiceAccountId,
        date: this.data.startDate,
        
        type:0,
        order_id: this.data.purchaseDetails.order_id
      };

      
      if (!this.data.inputMoney.trim().length){
        wx.showToast({
          title: '请输入收款金额!',
          icon:'none',
          duration:1500
        })
        return
      }

      this.data.note.trim().length ? data['note'] = this.data.note.trim() : "";

      this.data.inputMoney != 'none' && this.data.inputMoney.trim().length ? data['pay_money'] = this.data.inputMoney : data['pay_money'] = this.data.payMoney;
      console.log(data);

      this.purchaseReceiptAndPaymen(data);
    }else{
      //确认付款
      const data = {
        buy_money: this.data.purchaseDetails.refund_money,
        already_pay_money: this.data.purchaseDetails.already_refund_money,

        account: this.data.choiceAccountId,
        date: this.data.startDate,

        type: 1,
        order_id: this.data.purchaseDetails.order_id
      };
      if (!this.data.inputMoney.trim().length) {
        wx.showToast({
          title: '请输入付款金额!',
          icon: 'none',
          duration: 1500
        })
        return
      }

      this.data.note.trim().length ? data['note'] = this.data.note.trim() : "";

      this.data.inputMoney != 'none' && this.data.inputMoney.trim().length ? data['pay_money'] = this.data.inputMoney : data['pay_money'] = this.data.payMoney;
      console.log(data);

      this.purchaseReceiptAndPaymen(data);
    }
    
  },

  getAccountList(){
    //获取账户列表
    api.finance2.getAccountList()
      .then(res => {
        console.log(res);
        this.setData({
          accountList:res.datas.accounts
        })
        this.setData({
          choiceAccountName: res.datas.accounts[0].account_name,
          choiceAccountId: res.datas.accounts[0].account_id
        })
      })
  },

  //修改日期
  changeStartDate(event) {
    this.setData({
      startDate: event.detail.value
    });
  },

  showModal() {
    //显示选择账户弹框
    console.log(this.data.accountList);
    //this.data.items.push({ value: item.in_account.account_name + '(' + item.transfer_sum + ')', checked: false, in_account_id: item.in_account.account_id});
    this.data.accountList.forEach((item,index) => {
      if(index == 0){
        this.data.items.push({ value: item.account_name + '(' + item.account_sum + ')', checked: true, account_id: item.account_id });
        this.setData({
          choiceAccountName: item.account_name ,
          choiceAccountId: item.account_id
        })
      }else{
        this.data.items.push({ value: item.account_name + '(' + item.account_sum + ')', checked: false, account_id: item.account_id });
      }
    })
    this.setData({
      shadow: true,
      items: this.data.items
    })

  },

  closeModal() {
    this.setData({
      shadow: false
    })
  },

  radioChange(e) {
    //选择相应的仓库
    let items = [];
    this.data.items.forEach(item => {
      if (e.detail == item.value) {
        items.push({ value: item.value, checked: true, account_id: item.account_id });
        this.setData({
          choiceAccountName: item.value,
          choiceAccountId: item.account_id
        })
      } else {
        items.push({ value: item.value, checked: false, account_id: item.account_id });
      }
    })

    this.setData({
      shadow: false,
      items: items,

    })
  },

  purchaseReceiptAndPaymen(data){
    //采购收付款
    api.market.purchaseReceiptAndPaymen(data)
      .then(res => {
        console.log(res);
        let pages = getCurrentPages();
        let prev = pages[pages.length -2];
        prev.setData({
          isModify:true
        })
        wx.navigateBack({
          delta:1
        })
        wx.showToast({
          title: '操作成功!',
          icon:'none',
          duration:1500
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let purType = wx.getStorageSync('purType');
    let purchaseDetails = wx.getStorageSync('purchase_details');
    this.getAccountList();
    
    this.setData({
      purchaseDetails: purchaseDetails,
      startDate: purchaseDetails.date,
      payMoney: (purchaseDetails.refund_money * 100 - purchaseDetails.already_refund_money * 100) / 100,
      purType: purType
    })
  },

  toFixed2Num(value){
    //强制保留两位小数
    var value = Math.round(parseFloat(value) * 100) / 100;

    var s = value.toString().split(".");
    if (s.length == 1) {
      value = value.toString() + ".00";
      return value;
    }
    if (s.length > 1) {
      if (s[1].length < 2) {
        value = value.toString() + "0";
      }
      return value;
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