// warehouse/pages/edit_storage/edit_storage.js
import {api} from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    depoId:'',
    depoName:'',
    departmentName:'',
    department_id:'',
    principal:'',
    addr:'',
    note:'',
    departData: [],
    penetrate:false
  },
  closePopup() {
    this.setData({
      isShow: false,
      penetrate:false
    })
  },
  cancel(){
    this.setData({
      penetrate: false
    })
  },
  chooseOk() {
    let tempStr = '';
    let tempArr = [];
    let flag = 1;
    this.data.departData.forEach(item => {
      if (item.checked) {
        if (item.department_id==-1){
          flag=0
          this.setData({
            isShow: false,
            departmentName:'公共'
          })
        } else {
          flag && tempArr.push(item.department_name)
        }
      }
    })
    if(flag){
      for (let i = 0; i < tempArr.length; i++) {
        if (i == 0) {
          tempStr = tempArr[i]
        } else {
          tempStr = tempStr + '、' + tempArr[i]
        }
      }
      this.setData({
        isShow: false,
        penetrate:false,
        departmentName: tempStr
      })
    }
    this.getCommitDepartment()
  },
  selectDepartment() {
    this.setData({
      isShow: true,
      penetrate:true
    })
  },
  getNote(e){
    this.setData({
      note:e.detail.value
    })
  },
  selectDepart(e){
    const id = e.currentTarget.dataset.id
    if(id==-1){
      this.data.departData.forEach(item=>{
        if (item.department_id==id){
          item.checked = !item.checked
        }else{
          item.checked = false
        }
      })
      this.setData({
        departData: this.data.departData,
      })
    }else{
      this.data.departData.forEach(item => {
        if (item.department_id == id) {
          item.checked = !item.checked
        }
        if (item.department_id==-1){
          item.checked = false
        }
      })
      this.setData({
        departData: this.data.departData
      })
    }
  },
  formSubmit(e){
    const data=e.detail.value;
    if (!data.depo_name.trim().length){
      wx.showToast({
        title: '仓库名称不能为空',
        icon:'none'
      })
      return
    }
    data.depo_id = this.data.depoId;
    data.department_id = this.data.department_id;
    api.warehouse.editStorage(data)
    .then(res=>{
      wx.showToast({
        title: '修改成功',
      })
      getApp().globalData.flag=1
      setTimeout(()=>{
        wx.navigateBack({
        })
      },1000)
    })
    .catch(err=>{

    })
  },
  //获取绑定部门
  getCommitDepartment(){
    let tempArr=[];
    let temStr='';
    let flag = 0;
    this.data.departData.forEach(item=>{
      if(item.checked){
        if (item.department_id==-1){
          flag=1
        }
      }
    })
    //所有部门
    if(flag){
      this.data.departData.forEach(item => {
        if (item.department_id != -1) {
          tempArr.push(item.department_id)
        }
      })
    }else{
      this.data.departData.forEach(item => {
        if (item.checked) {
          tempArr.push(item.department_id)
        }
      })
    }
    for (let i = 0; i < tempArr.length;i++){
      if(i==0){
        temStr = tempArr[i]
      }else{
        temStr = temStr + ',' + tempArr[i]
      }
    }
    this.setData({
      department_id: temStr
    })
  },
  //获取仓库详情
  getStorageDetail() {
    const data = {
      depo_id: this.data.depoId
    }
    api.warehouse.getStorageDetail(data)
      .then(res => {
        this.setData({
          depoName: res.data.depo_name,
          departmentName: res.data.depo_department_name,
          principal: res.data.depo_manager,
          addr: res.data.depo_addr,
          note: res.data.depo_note,
          department_id: res.data.depo_department_ids
        })
      })
      .catch(err => {

      })
  },
  //获取部门列表
  getDepartmentList(){
    api.warehouse.getDepartmentList({})
    .then(res=>{
      const departList = res.datas.results;
      departList.forEach(item=>{
        item.checked=false
      })
      departList.unshift({
        department_id:-1,
        department_name:'公共',
        checked:false
      })
      this.setData({
        departData: departList
      })
    })
    .catch(err=>{

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.depoId){
      this.setData({
        depoId:options.depoId,
      })
      this.getStorageDetail()
      this.getDepartmentList()
    }else{
      wx.showToast({
        title: '页面参数异常',
        icon:'none'
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