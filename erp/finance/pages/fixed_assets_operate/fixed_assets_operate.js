// finance/pages/fixed_assets_operate/fixed_assets_operate.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    operateType: '',  //operateType等于1为资产移交，2为资产闲置
    items1: [],
    items2: [],
  
    shadow: false,
    incomeContent: '',  //使用人名称
    accountContent: '',   //管理员名称
    fixedasset_id:'',  //资产id
    isSearch: false,
    selectModal: '', //选择的弹框是2个之中的哪一个
    user_id:'',  //使用人id
    administrator_id:'',  //管理员id
    fixedasset_state:'', //资产状态
    staffList:[],  //员工列表
    new_administrator_id:'',  //新的管理员id
    new_user_id:'',  //新的使用人id
  },

  showIncomeModal() {

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
      //this.data.items1.push({ value: '请选择', checked: false, user_id:'none'});
      this.data.staffList.forEach(item => {
        if (item.user_id == this.data.user_id){
          
          this.data.items1.push({ value: item.user_name, checked: true, user_id: item.user_id });
        }else{
          this.data.items1.push({ value: item.user_name, checked: false, user_id: item.user_id });
        }
        
      });
      this.setData({
        shadow: true,

        items1: this.data.items1

      });
    }


  },

  closeModal() {
    this.setData({
      shadow: false
    })
  },

  getAdministratorId(e){
    if (e.detail != this.data.accountContent){
      //如果修改了管理员
      this.setData({
        new_administrator_id:e.detail
      });
    }
  },

  getId(e){
    if (e.detail != this.data.incomeContent){
      this.setData({
        new_user_id: e.detail
      });
     
    }
  },

  confirmFixedAssets(){
    //确认修改固定资产
    //如果修改人,分情况
    if (this.data.operateType == 1){
      //移交固定资产

      if (this.data.new_user_id){
        const data = {
          fixedasset_id: this.data.fixedasset_id,
          user_id: this.data.user_id,
          new_user_id: this.data.new_user_id
        };

        api.finance2.transferFixedAssets(data)
          .then(res => {
            console.log(res);
            if(res.code === 1){
              //返回上个页面，更新数据,并且关闭弹框
              
              let pages = getCurrentPages();
              let prev = pages[ pages.length -2];
              prev.setData({
                showOperateModal:false
              });

              wx.navigateBack({
                delta: 1
              })
              wx.showToast({
                title: '修改成功!',
                duration: 1500,
                icon: 'none'
              })
            }
          })
      }else{
        //如果没有进行修改，直接返回上个页面
        let pages = getCurrentPages();
        let prev = pages[pages.length - 2];
        prev.setData({
          showOperateModal: false
        });

        wx.navigateBack({
          delta:1
        })
      }
    }else{
      //闲置固定资产

        if (this.data.new_administrator_id){
          const data = {
            fixedasset_id: this.data.fixedasset_id,
            administrator_id: this.data.administrator_id,
            new_administrator_id: this.data.new_administrator_id,
            fixedasset_state: this.data.fixedasset_state
          };

       
          api.finance2.unusedFixedAssets(data)
            .then(res => {
              if(res.code === 1){
                
                let pages = getCurrentPages();
                let prev = pages[pages.length - 2];
                prev.setData({
                  showOperateModal: false
                });

                wx.navigateBack({
                  delta: 1
                })
                wx.showToast({
                  title: '修改成功!',
                  duration: 1500,
                  icon: 'none'
                })
              }
            })
        }
          else{
            let pages = getCurrentPages();
            let prev = pages[pages.length - 2];
            prev.setData({
              showOperateModal: false
            });

            wx.navigateBack({
              delta: 1
            })
          }
     
    }

    
  },
  

  showAccountModal() {
    this.setData({
      selectModal: 2,
    });
    if (this.data.items2.length) {
      //如果不是第一次点开,要保留之前的选择的内容
      this.setData({
        shadow: true,
        items2: this.data.items2,

      });
    } else {
      //this.data.items2.push({ value: '请选择', checked: false, administrator_id: 'none' });
      this.data.staffList.forEach(item => {
        if (item.user_id == this.data.administrator_id) {

          this.data.items2.push({ value: item.user_name, checked: true, administrator_id: item.user_id });
        } else {
          this.data.items2.push({ value: item.user_name, checked: false, administrator_id: item.user_id });
        }
      });
      this.setData({
        shadow: true,

        items2: this.data.items2

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
        }
        else {
          this.data.items1[i].checked = false;
        }

      }
      this.setData({
        shadow: false,
        items1: this.data.items1,
        incomeContent: e.detail
      });
    }
    else if (this.data.selectModal == 2) {
      for (var i in this.data.items2) {
        if (this.data.items2[i].value == e.detail) {
          this.data.items2[i].checked = true;
        }
        else {
          this.data.items2[i].checked = false;
        }

      }
      this.setData({
        shadow: false,
        items2: this.data.items2,
        accountContent: e.detail
      });
    }
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //一开始获取员工列表
    api.finance2.getStaff()
      .then(res => {
        console.log(res);
        if(res.code === 1){
          this.setData({
            staffList:res.datas.users
          });
        }
      })


      //operateType等于1为资产移交，2为资产闲置
    if (options.operateType == 1){
      this.setData({
        operateType:1,
        user_id: options.user_id,
        incomeContent: options.userName
      });
    } else if (options.operateType == 2){
      this.setData({
        operateType: 2,
        administrator_id: options.administrator_id,
        fixedasset_state: options.fixedasset_state,
        accountContent: options.administratorName
      });
    }

    this.setData({
      fixedasset_id: options.fixedasset_id
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