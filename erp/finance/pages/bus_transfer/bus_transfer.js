// finance/pages/bus_transfer/bus_transfer.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    transferList:[],  //转账列表
    items1:[],  //转ru列表
    items2:[],  //转出列表
    rolloutContent: '',   //选中的转入的账户
    rollinContent: '',   //选中的转出的账户
    shadow:false,  //控制选择弹框的显示
    selectModal:'',  //选择的是哪一个弹框
    account_id:'',   //支出账户的id
    choiceOutId:'',  //选中的支出账户的id
    choiceOutName:'',  //选中的支出账户的名称
    choiceInId:'',
    choiceInName:'', 
    showAccount66:false,  //用来控制键盘中账户的显示
    transfersMoney:'0',  //转账金额
    transfersNote:'',  //转账备注
  },

  comit(){
    //确认转账
    if (!this.data.choiceInId) {
      wx.showToast({
        title: '请选择转入账户!',
        icon: 'none',
        duration: 1500
      })
      return
    }
    if (this.data.transfersMoney == 0){
      wx.showToast({
        title: '请输入金额!',
        icon:'none',
        duration:1500
      })
      return
    }

    
      const data = {
        out_account_id: this.data.choiceOutId,
        in_account_id: this.data.choiceInId,
        transfer_num: this.data.transfersMoney,
        //note:this.data.transfersNote
      };

      
      api.finance2.addTransfers(data)
        .then(res => {
          console.log(res);
          //刷新账户列表数据
          let pages = getCurrentPages();
          let prevpage = pages[pages.length -2];
          prevpage.setData({

            isModify:true
          })

          wx.navigateBack({
            delta:1
          })
          wx.showToast({
            title: '操作成功!',
            icon:'none',
            duration:1000
          })
        })
    
  },
  zero(e) {
    this.data.transfersMoney != '0' ? this.data.transfersMoney += e.detail : this.data.transfersMoney = this.data.transfersMoney.replace('0', e.detail.toString());
    this.setData({
      transfersMoney: this.data.transfersMoney
    })
  },
  
  one(e){
    this.data.transfersMoney != '0' ? this.data.transfersMoney += e.detail : this.data.transfersMoney = this.data.transfersMoney.replace('0', e.detail.toString());
    this.setData({
      transfersMoney: this.data.transfersMoney
    })
  },
  two(e) {
    this.data.transfersMoney != '0' ? this.data.transfersMoney += e.detail : this.data.transfersMoney = this.data.transfersMoney.replace('0', e.detail.toString());
    this.setData({
      transfersMoney: this.data.transfersMoney
    })
  },
  three(e) {
    this.data.transfersMoney != '0' ? this.data.transfersMoney += e.detail : this.data.transfersMoney = this.data.transfersMoney.replace('0', e.detail.toString());
    this.setData({
      transfersMoney: this.data.transfersMoney
    })
  },
  four(e) {
    this.data.transfersMoney != '0' ? this.data.transfersMoney += e.detail : this.data.transfersMoney = this.data.transfersMoney.replace('0', e.detail.toString());
    this.setData({
      transfersMoney: this.data.transfersMoney
    })
  },
  five(e) {
    this.data.transfersMoney != '0' ? this.data.transfersMoney += e.detail : this.data.transfersMoney = this.data.transfersMoney.replace('0', e.detail.toString());
    this.setData({
      transfersMoney: this.data.transfersMoney
    })
  },
  six(e) {
    this.data.transfersMoney != '0' ? this.data.transfersMoney += e.detail : this.data.transfersMoney = this.data.transfersMoney.replace('0', e.detail.toString());
    this.setData({
      transfersMoney: this.data.transfersMoney
    })
  },
  seven(e) {
    this.data.transfersMoney != '0' ? this.data.transfersMoney += e.detail : this.data.transfersMoney = this.data.transfersMoney.replace('0', e.detail.toString());
    this.setData({
      transfersMoney: this.data.transfersMoney
    })
  },
  eight(e) {
    this.data.transfersMoney != '0' ? this.data.transfersMoney += e.detail : this.data.transfersMoney = this.data.transfersMoney.replace('0', e.detail.toString());
    this.setData({
      transfersMoney: this.data.transfersMoney
    })
  },
  nine(e) {
    
    this.data.transfersMoney != '0' ? this.data.transfersMoney += e.detail : this.data.transfersMoney = this.data.transfersMoney.replace('0', e.detail.toString());
    this.setData({
      transfersMoney: this.data.transfersMoney
    })
  },

  dian(e){
    if (this.data.transfersMoney.indexOf('.') == -1){
      this.data.transfersMoney += e.detail;
      this.setData({
        transfersMoney: this.data.transfersMoney
      })
    }
    
  },

  remove1(e){
    console.log(e.detail)
    this.setData({
      transfersMoney: '0'
    })
  },

  remove(e){
    console.log(e.detail)
    this.setData({
      transfersMoney: '0'
    })
  },

  getInId(e){
    //获取转入账户id
    this.setData({
      choiceInId: e.detail
    })
  },

  getOutId(e){
    //获取支出账户id 
    this.setData({
      choiceOutId:e.detail
    })
  },

  closeAccModal(){
    this.setData({
      shadow: false
    })
  },

  //下面2个点击请选择的弹框
  showRolloutModal() {
    //收入支出
    this.setData({
      selectModal: 1,
    });
    if (this.data.items1.length) {
      //如果不是第一次点开,要保留之前的选择的内容
      this.setData({
        shadow: true,
        items1: this.data.items1,

      });


    } else {
      this.data.transferList.forEach(item => {
        if (item.out_account.account_id == this.data.account_id){
          this.data.items1.push({ value: item.out_account.account_name + '(' + item.transfer_sum+')', checked: true, out_account_id: item.out_account.account_id})
        }else{
          this.data.items1.push({ value: item.out_account.account_name + '(' + item.transfer_sum + ')', checked: false, out_account_id: item.out_account.account_id })
        }
      });
      this.setData({
        shadow: true,
        items1: this.data.items1

      });
    }


  },

  showRollinModal() {
    this.setData({
      selectModal: 2,
    });
    if (this.data.items2.length) {
      //如果不是第一次点开,要保留之前的选择的内容
      this.setData({
        shadow: true,
        items2: this.data.items2,

      });
    }
    else {
      this.data.items2.push({value:'转入账户',checked:true,in_account_id:'none'});
      this.data.transferList.forEach(item => {
        this.data.items2.push({ value: item.in_account.account_name + '(' + item.transfer_sum + ')', checked: false, in_account_id: item.in_account.account_id});
      });
      this.setData({
        shadow: true,

        items2:this.data.items2
      });

    }


  },

  choiceContent(e) {
    //选择相应的内容
    //根据选择的哪个弹框来改变相应弹框的值

    if (this.data.selectModal == 1) {
      for (var i in this.data.items1) {
        if (this.data.items1[i].value == e.detail) {
          this.data.items1[i].checked = true;
          this.setData({
            choiceOutId: this.data.items1[i].out_account_id,
            choiceOutName: this.data.items1[i].value
          })
        }
        else {
          this.data.items1[i].checked = false;
        }

      }
      this.setData({
        shadow: false,
        items1: this.data.items1,
        rolloutContent: e.detail
      });
    }
    else if (this.data.selectModal == 2) {
      for (var i in this.data.items2) {
        if (this.data.items2[i].value == e.detail) {
          this.data.items2[i].checked = true;
          this.setData({
            choiceInName: this.data.items2[i].value,
            choiceInId: this.data.items2[i].in_account_id
          })
        }
        else {
          this.data.items2[i].checked = false;
        }

      }
      this.setData({
        shadow: false,
        items2: this.data.items2,
        rollinContent: e.detail
      });
    }
  

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let account_id = options.account_id;
    this.setData({
      account_id: account_id
    })
      //获取转账列表
    this.getTransferList()
  },

  getTransferList(){
    
    
    api.finance2.transferList()
      .then(res => {
        console.log(res);
        if(res.code === 1){
          this.setData({
            transferList:res.datas.transfers,
            
          });
          res.datas.transfers.forEach(item => {
            if (item.out_account.account_id == this.data.account_id){
              //设置初始选中的支出账户id
              this.setData({
                choiceOutName: item.out_account.account_name + '(' + item.transfer_sum+')',
                choiceOutId: item.out_account.account_id
              })
            }
          })
          //choiceOutName
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
    this.setData({
      choiceInName: '转入账户'
    })
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