// finance/pages/fixed_assets_query/fixed_assets_query.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items1: [],
    items2: [],
    items3: [],
    shadow: false,
    incomeContent: '请选择',
    accountContent: '请选择',
    personContent: '请选择',
    isSearch: false,
    selectModal: '', //选择的弹框是3个之中的哪一个
    showCateModal:false, 
    cateData:[],  //固定资产类别
    choiceCateContent:'请选择',   //选择的分类，默认是请选择
    showAddCateModal:false,  //是否显示增加类别弹框
    fixedSn:'',
    fixedName:'',
    staffList:[],   //员工列表
    fixedcat_id:'',   //类别ID
    user_id:'',  //使用人ID
    administrator_id:'',  //管理员ID
    recorder_id:'',  //录入人ID
  },

  getRecorderId(e){
    //点击录入人获取录入人ID
    console.log(e);
    this.setData({
      recorder_id:e.detail
    });
  },

  getAdministratorId(e){
    //点击录入人获取管理员ID
    console.log(e)
    this.setData({
      administrator_id: e.detail
    });
  },

  fixedName(e){
    //监听资产名称的输入
    this.setData({
      fixedName:e.detail.value
    });
  },

  fixedSn(e){
    //监听序列号的输入
    this.setData({
      fixedSn: e.detail.value
    });
  },

  queryFixedAssets(){
    //资产查询
    const data = {};
    const serchData = {};
    if (this.data.fixedName.trim().length){
      data['fixedasset_name'] = this.data.fixedName.trim();
      serchData['资产名称'] = this.data.fixedName.trim();
    }

    if (this.data.fixedSn.trim().length) {
      data['serial_number'] = this.data.fixedSn.trim();
      serchData['序列号'] = this.data.fixedSn.trim();

    }
    if (this.data.choiceCateContent != '请选择'){

      serchData['资产类别'] = this.data.choiceCateContent;
      data['fixedcat_id'] = this.data.fixedcat_id;
    }

    if (this.data.incomeContent != '请选择'){
      serchData['录入人'] = this.data.incomeContent;
      data['recorder_id'] = this.data.recorder_id;
    }

    if (this.data.accountContent != '请选择') {
      serchData['管理员'] = this.data.accountContent;
      data['administrator_id'] = this.data.administrator_id;
    }

    if (this.data.personContent != '请选择') {
      serchData['使用人'] = this.data.personContent;
      data['user_id'] = this.data.user_id;
    }

    var serchDataArr = [];
    for (var item in serchData){
      serchDataArr.push(item + '：' + serchData[item])
    }

    if (Object.keys(data).length){
      
      api.finance2.queryFixedAssets(data)
        .then(res => {
          console.log(res);

          //返回上个页面并传参
          let pages = getCurrentPages();
          let prevPage = pages[pages.length - 2]   //-2是上个页面，-3是上上个页面
          prevPage.setData({
            isSearch: true,
            searchData: serchDataArr,
            fixedList: res.datas.fixedassets

          });
          wx.navigateBack({
            delta: 1
          })
        })

      
    }else{
      
      wx.navigateBack({
        delta: 1
      })
    }

   
  },


  clearFixedAssets(){
    //清空查询
    this.setData({
      items1: [],
      items2: [],
      items3: [],
      fixedSn: '',
      fixedName: '',
      incomeContent: '请选择',
      accountContent: '请选择',
      personContent: '请选择',
      
      choiceCateContent: '请选择',
    });
  },

  showAddCateModal(){
    this.setData({
      showAddCateModal:true
    });
  },

  closeCateModal2(){
    this.setData({
      showAddCateModal: false
    });
  },

  showCateModal(){
    //显示选择分类弹框
    this.setData({
      showCateModal:true,
      // cateData:[
      //   '土地、房屋及构筑物','家具用具','专用设备','电气设备','交通运输设备','其他类'
      // ]
    });
  },
  closeCateModal(){
    this.setData({
      showCateModal: false
    });
  },

  choiceCateContent(e){
    //选择相应分类也关闭弹框
    console.log(e)
    this.setData({
      showCateModal:false,
      choiceCateContent:e.currentTarget.dataset.catetext,
      fixedcat_id: e.currentTarget.dataset.id
    });
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
      this.data.items1.push({ value: '请选择', checked: true, recorder_id:'none'});
      this.data.staffList.forEach( item => {
        this.data.items1.push({ value: item.user_name, checked: false, recorder_id: item.user_id });
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
      this.data.items2.push({ value: '请选择', checked: true, administrator_id:'none'});
      this.data.staffList.forEach(item => {
        this.data.items2.push({ value: item.user_name, checked: false, administrator_id: item.user_id });
      });
      this.setData({
        shadow: true,
        items2: this.data.items2
      });
    }
  },

  showPersonModal() {
    this.setData({
      selectModal: 3,
    });
    if (this.data.items3.length) {
      //如果不是第一次点开,要保留之前的选择的内容
      this.setData({
        shadow: true,
        items3: this.data.items3,

      });
    } else {
      this.data.items3.push({ value: '请选择', checked: true, user_id: 'none' });
      this.data.staffList.forEach(item => {
        this.data.items3.push({ value: item.user_name, checked: false, user_id: item.user_id });
      });
      this.setData({
        shadow: true,
        items3: this.data.items3

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
    else if (this.data.selectModal == 3) {
      for (var i in this.data.items3) {
        if (this.data.items3[i].value == e.detail) {
          this.data.items3[i].checked = true;
        }
        else {
          this.data.items3[i].checked = false;
        }

      }
      this.setData({
        shadow: false,
        items3: this.data.items3,
        personContent: e.detail
      });
    }


  },

  getId(e){
    //获取点击的用户id
  
    console.log(e);
    this.setData({
      user_id:e.detail
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取固定资产种类列表
    this.getFixedAssetsCateList()
    //获取员工列表
    this.getStaff()
  },

  getFixedAssetsCateList(){
    api.finance2.getFixedAssetsCateList()
      .then(res => {
        console.log(res);
        if(res.code === 1){
          this.setData({
            cateData: res.datas.fixedasset_cats
          });
        }
      })
  },

  getStaff(){
    api.finance2.getStaff()
      .then(res => {
        console.log(res);
        if(res.code === 1){
          this.setData({
            staffList: res.datas.users
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