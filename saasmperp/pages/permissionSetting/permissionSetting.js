// pages/permissionSetting/permissionSetting.js
import {api} from '../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authList:[],
    authListTwo:[],
    rankOneIndex:0,
    rankTwoIndex: 0,
    rankThreeIndex: 0,
    permissionIdList:[],
    roleName:'',
    note:''
  },
  getRoleName(e){
    this.setData({
      roleName:e.detail.value
    })
  },
  getNote(e){
    this.setData({
      note:e.detail.value
    })
  },
  save(){
    if (this.data.roleName.length==0 || this.data.note.length==0){
      wx.showToast({
        title: '请完善角色信息',
        icon: 'none'
      });
      return
    }
    if (!this.data.permissionIdList.length){
      wx.showToast({
        title: '至少配置一条权限',
        icon: 'none'
      });
      return
    }
    const data={
      name: this.data.roleName,
      note: this.data.note,
      authorise_id_list: this.data.permissionIdList
    }
    api.user.addRole(data)
    .then(res=>{
      wx.showToast({
        title: '权限配置成功',
        icon: 'success',
      })
      setTimeout(() => {
        wx.navigateBack({
          
        })
      }, 1000)
    })
    .catch(err=>{

    })
  },
  reset(){
    for (let i = 0; i < this.data.authList.length;i++){
      let modelList = this.data.authList[i].model;
      for (let j = 0; j < modelList.length; j++){
        let permissionList = modelList[j].actions;
        for (let z = 0; z < permissionList.length; z++){
          permissionList[z].choose=false;
        }
      }
    }
    this.setData({
      roleName: '',
      note: '',
      permissionIdList: [],
      authList: this.data.authList,
      authListTwo: this.data.authListTwo
    })
  },
  getAuthorityList(){
    api.user.getAuthorityList()
    .then(res=>{
      const authList = res.datas.modules;
      this.setData({
        authList: authList,
        authListTwo: authList[0]
      })
    })
    .catch(err=>{

    })
  },
  chooseModule(e){
    this.setData({
      rankOneIndex:e.currentTarget.dataset.index,
      authListTwo: this.data.authList[e.currentTarget.dataset.index],
      rankTwoIndex:0
    })
  },
  chooseModel(e){
    console.log(e.currentTarget.dataset.index)
    if (this.data.rankTwoIndex == e.currentTarget.dataset.index){
      this.setData({
        rankTwoIndex: -1,
      })
      return
    }
    this.setData({
      rankTwoIndex: e.currentTarget.dataset.index,
    })
  },
  choosePermission(e){
    const index = e.currentTarget.dataset.index;
    const permissionId = e.currentTarget.dataset.authid;
    const twoIndex = this.data.rankTwoIndex;
    this.data.authListTwo.model[twoIndex].actions[index].choose = !this.data.authListTwo.model[twoIndex].actions[index].choose;
    this.setData({
      authListTwo: this.data.authListTwo
    })
    const indexOf = this.data.permissionIdList.indexOf(permissionId);
    if (indexOf<0){
      this.data.permissionIdList.push(permissionId)
      this.setData({
        permissionIdList: this.data.permissionIdList
      })
    }else{
      this.data.permissionIdList.splice(indexOf,1)
      this.setData({
        permissionIdList: this.data.permissionIdList
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAuthorityList();
    if (options.roleId){
      const data={
        role_id: options.roleId
      }
      api.user.getRoleList(data)
      .then(res=>{
        const roleInfo = res.datas[0];
        this.setData({
          roleName: roleInfo.role_name,
          note: roleInfo.note
        })
      })
      .catch(err=>{

      })
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