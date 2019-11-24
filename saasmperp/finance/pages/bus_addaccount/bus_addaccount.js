// finance/pages/bus_addaccount/bus_addaccount.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[], 
    shadow:false,
    showPublicSectorModal:false,  //控制选择部门的弹框显示
    sectorData: [],  //部门信息
    accountType:'',  //确定是修改账户还是新建账户
    addAccountSum:'',  //新增的金额
    addAccountName:'',  //新增的账户名称
    accountList:[],   //账户列表
    choiceAccountTypeName:'',   //选中的账户类型名称
    choiceAccountTypeId: '', //选中的账户类型id
    addAccountNum:'',   //新增账户的账号
    addAccountPeo:'',  //新增账户的开户人
    addAccountNote:'',   //新增账户的备注
    choiceBranch:'',  //新增选中的部门名称，默认是第一个
    choiceBranchId:'',  //新增选中的部门的id,也是默认第一个
    choiceSectorIndex:0  ,  //新增选中部门的index

    accountDetail:'',  //修改账户传递过来的账户详情
    modifyId:'',  //修改账户的账户id
    modifyName:'',  //账户名称
    modifySum:'',   //修改账户的金额
    modifyType:'',  //修改账户的账户类型
    modifyTypeId:'',  //修改账户的账户类型id
    modifySectorName:'',   //修改账户的部门名称
    modifySn:'',   //修改账户的账号
    modifyHolder:'',  //开户人
    modifyNote:'',  //备注
    modifySectorId:'',  //修改账户的部门id
    new_modifyName:'none',  
    new_modifySum:'none',
    new_modifyType:'',
    new_modifySectorName:'',
    new_modifySn:'',
    new_modifyHolder:'',
    new_modifyNote:'',
    new_modifySectorId:'',
    new_modifyTypeId:'',
  },

  choiceSector(e){
    if (this.data.accountType == 1) {
        //新增账户
      let choiceBranch = e.currentTarget.dataset.name;
      let choiceBranchId = e.currentTarget.dataset.id;
      let choiceSectorIndex = e.currentTarget.dataset.index;
      this.setData({
        choiceBranch: choiceBranch,
        choiceBranchId: choiceBranchId,
        choiceSectorIndex: choiceSectorIndex
      });
    }else{
      //修改账户
      if (e.currentTarget.dataset.id != this.data.modifySectorId){
        this.setData({
          new_modifySectorId: e.currentTarget.dataset.id,
          new_modifySectorName: e.currentTarget.dataset.name,
          modifySectorId: e.currentTarget.dataset.id,
          modifySectorName: e.currentTarget.dataset.name,
          choiceSectorIndex: e.currentTarget.dataset.index
        });
      }
    }
    
  },

  confirmChoiceSector(){
      //新增账户   确认选好部门
      this.setData({
        showPublicSectorModal:false
      });
     },

  confirmAccount(){
    if (this.data.accountType == 1){
      //新增账户
      var data = {};
      
      if (!this.data.addAccountName.trim().length){
        wx.showToast({
          title: '账户名称不能为空!',
          icon:'none',
          duration:1500
        })
        return
      }else{
        data['account_name'] = this.data.addAccountName.trim();
      }

      if (!this.data.addAccountSum) {
        wx.showToast({
          title: '账户余额不能为空!',
          icon: 'none',
          duration: 1500
        })
        return
      }else{
        data['account_sum'] = this.data.addAccountSum.trim();
      }

      this.data.choiceAccountTypeId ? data['account_type'] = this.data.choiceAccountTypeId :'';

      this.data.addAccountNum ? data['account_num'] = this.data.addAccountNum :'';

      this.data.addAccountPeo ? data['account_holder'] = this.data.addAccountPeo :'';

      this.data.addAccountNote ? data['note'] = this.data.addAccountNote:'';

      //部门id
      this.data.choiceBranchId ? data['dept_id'] = this.data.choiceBranchId:'';

    
      api.finance2.addAccount(data)
        .then(res => {
          console.log(res);
          
          //刷新账户列表信息
          let pages = getCurrentPages();
          let prevpage = pages[pages.length -2];
          prevpage.setData({
            isModify:true
          });

          wx.navigateBack({
            delta:1
          })
          wx.showToast({
            title: '操作成功!',
            icon: 'none',
            duration: 1500
          })
        })

    }else{
      //修改账户
     
      var data = {
        account_id: this.data.modifyId
      };

      if (!this.data.new_modifyName.trim().length && this.data.new_modifyName != 'none'){
        wx.showToast({
          title: '请输入账户名称!',
          icon:'none',
          duration:1500
        })
        return
      }

      if (!this.data.new_modifySum.trim().length && this.data.new_modifySum != 'none') {
        wx.showToast({
          title: '请输入账户金额!',
          icon: 'none',
          duration: 1500
        })
        return
      }
      
      this.data.new_modifyName != 'none' ? data['account_name'] = this.data.new_modifyName :'';

      this.data.new_modifySum  != 'none' ? data['account_sum'] = this.data.new_modifySum :'';

      this.data.new_modifyTypeId ? data['account_type'] = this.data.new_modifyTypeId : '';

      this.data.new_modifySectorId ? data['dept_id'] = this.data.new_modifySectorId :'';

      this.data.new_modifySn ? data['account_num'] = this.data.new_modifySn :'';

      this.data.new_modifyHolder ? data['account_holder'] = this.data.new_modifyHolder : '';

      this.data.new_modifyNote ? data['note'] = this.data.new_modifyNote : '';

      console.log('修改data------------');
      console.log(data);

      if (Object.keys(data).length > 1){
        api.finance2.modifyAccount(data)
          .then(res => {
            console.log(res)
            //刷新账户详情信息
            let pages = getCurrentPages();
            let prevpage = pages[pages.length -2];

            prevpage.setData({
              isModify:true
            });
            wx.navigateBack({
              delta: 1
            })

          })
      }
      else{

        let pages = getCurrentPages();
        let prevpage = pages[pages.length - 2];

        prevpage.setData({
          isModify: false
        });
        wx.navigateBack({
          delta:1
        })
      }
      
    }
  },

  accountNote(e){
    if (this.data.accountType == 1) {
      //新增账户
      if (e.detail.value.trim().length) {
        this.setData({
          addAccountNote: e.detail.value.trim()
        });
      }
    }
    else{
      //修改账户
      if (e.detail.value != this.data.modifyNote){
        this.setData({
          new_modifyNote: e.detail.value
        });
      }
    }
  },

  accountPeo(e){
    if (this.data.accountType == 1) {
      //新增账户
      if (e.detail.value.trim().length) {
        this.setData({
          addAccountPeo: e.detail.value.trim()
        });
      }

    }
    else{
      //修改账户
      if (e.detail.value != this.data.modifyHolder) {
        this.setData({
          new_modifyHolder: e.detail.value
        });
      }
    }
  },

  accountNum(e){
    if (this.data.accountType == 1){
      //新增账户
      if(e.detail.value.trim().length){
        this.setData({
          addAccountNum: e.detail.value.trim()
        });
      }
    }
    else{
      //修改账户
      if (e.detail.value != this.data.modifySn) {
        this.setData({
          new_modifySn: e.detail.value
        });
      }
    }
  },

  closeAccModal() {
    //关闭请选择弹框
    this.setData({
      shadow: false
    });
  },

  choiceContent(e) {
    //选择相应的内容
    //根据选择的哪个弹框来改变相应弹框的值
      for (var i in this.data.items) {
        if (this.data.items[i].value == e.detail) {
          this.data.items[i].checked = true;
          if (this.data.accountType == 1) {
            //新增账户
            this.setData({
              choiceAccountTypeName: this.data.items[i].value,
              choiceAccountTypeId: this.data.items[i].account_id
            });
          }else{
            //修改账户
            this.setData({
              modifyType: this.data.items[i].value,
              modifyTypeId: this.data.items[i].account_id,
              new_modifyType: this.data.items[i].value,
              new_modifyTypeId: this.data.items[i].account_id,
            })
          }
          
        }
        else {
          this.data.items[i].checked = false;
        }

      }
      this.setData({
        shadow: false,
        items: this.data.items,
        rolloutContent: e.detail
      });
     
  },

  addAccountName(e){
    //新增账户名称  新增账户
   
    if (this.data.accountType ==1){
      if(e.detail.value.trim().length){
       
        this.setData({
          addAccountName: e.detail.value
        })
      }    
    }else{
      //修改账户
      if (e.detail.value != this.data.modifyName) {
        this.setData({
          new_modifyName: e.detail.value
        });
      }
    }
    
  },


  addAccountSum(e){
    if (this.data.accountType == 1){
      if(e.detail.value.trim().length){
        this.setData({
          addAccountSum: e.detail.value
        });
      }
    }else{
      //修改账户 modifySum
      if (e.detail.value != this.data.modifySum){
        this.setData({
          new_modifySum: e.detail.value
        });
      }

    }
  },

  getAccountList(){
    //获取账户列表
    api.finance2.getAccountList()
      .then(res => {
        console.log(res);
        this.setData({
          accountList:res.datas.accounts
        });
        if (this.data.accountType == 1){
          //新增账户
          this.setData({
            choiceAccountTypeName: res.datas.accounts[0].account_name,
            choiceAccountTypeId: res.datas.accounts[0].account_id
          });
        }else{
          //修改账户

        }
      })
  },

  getBranchList(){
    //获取部门列表
    api.finance2.getBranchList()
      .then(res => {
        console.log(res);
        this.setData({
          sectorData:res.datas.depts
        })

        if (this.data.accountType == 1){
          //新增账户
          this.setData({
            choiceBranchId: res.datas.depts[0].dept_no,
            choiceBranch: res.datas.depts[0].dept_name,
            choiceSectorIndex: 0
          });
        }else{
          //修改账户
          console.log(this.data.modifySectorName);
          res.datas.depts.forEach((item,index) => {
            if (item.dept_name == this.data.modifySectorName){
              this.setData({
                choiceSectorIndex:index,

          })
            }
          });

         
        }
        
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.accountDetail) {
      let accountDetail = JSON.parse(options.accountDetail);
      
      this.setData({
        accountDetail: accountDetail,
        modifyId: accountDetail.account_id,
        modifyName: accountDetail.account_name,
        modifySum: accountDetail.account_sum,
        modifyType: accountDetail.account_type,
        modifySectorName: accountDetail.dept.dept_name,
        modifySn: accountDetail.account_num,
        modifyHolder: accountDetail.account_holder,
        modifyNote: accountDetail.note,
        modifySectorId: accountDetail.dept.dept_no

      });
    }
      this.setData({
        accountType: options.accountType
      });

      this.getAccountList();
      this.getBranchList();

    
  },

  showPayModal(){
    //显示账户的弹框
   
    this.data.accountList.forEach((item,index) => {
      if (this.data.accountType == 1) {
        //新增账户默认显示第一个账户类型
        if (index == 0) {
          this.data.items.push({ value: item.account_name, checked: true, account_id: item.account_id });
          
        } else {
          this.data.items.push({ value: item.account_name, checked: false, account_id: item.account_id });
        }
      }else{
        //修改账户
        if (item.account_name == this.data.modifyType){
          this.data.items.push({ value: item.account_name, checked: true, account_id: item.account_id });
        }else{
          this.data.items.push({ value: item.account_name, checked: false, account_id: item.account_id });
        }
      }
      
      
    });

    this.setData({
      shadow:true,
      items: this.data.items  
    });
  },


  showPublicSectorModal(){

  //显示部门选择的弹框
    this.setData({
      showPublicSectorModal:true
    });
  },

  closePublicSectorModal(){
    //关闭部门选择的弹框
    this.setData({
      showPublicSectorModal: false
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