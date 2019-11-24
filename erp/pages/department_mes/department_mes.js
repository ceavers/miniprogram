// pages/department_mes/department_mes.js
import {api} from '../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    departmentInfo:null,
    staffs:[],
    settleAccounts:[],
    depots:[],
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.businessId){
      this.setData({
        businessId: options.businessId
      })
    }
  },
  //去员工管理界面
  gotoEmploy(){
    wx.navigateTo({
      url: '/pages/employee_management/employee_management',
    })
  },
  //修改部门信息
  gotoEditDepartment(){
    wx.navigateTo({
      url: `/pages/edit_department/edit_department?id=${this.data.id}`,
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
    this.getDepartmentInfo()
  },
  getDepartmentInfo(){
    const data = {
      dept_no: this.data.businessId
    }
    api.department.getDepartmentInfo(data)
      .then(res => {
        this.setData({
          id: res.data.dept_no,
          departmentInfo: res.data,
          staffs: res.data.users,
          settleAccounts: res.data.accounts,
          depots: res.data.depots
        })
      })
      .catch(err => {

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