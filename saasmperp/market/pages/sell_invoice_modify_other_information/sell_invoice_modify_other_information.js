// market/pages/sell_invoice_modify_other_information/sell_invoice_modify_other_information.js
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    employList: [],//销售员列表
    showEmployListModal: false,//销售员弹窗
    employ: {},//销售员信息,
    department: {},//部门
    departmentList: [],//
    showDepartmentList: false,//
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      otherMes: JSON.parse(options.otherMes),
      employ: {
        user_id: JSON.parse(options.otherMes).order_worker_id,
        user_name: JSON.parse(options.otherMes).order_worker
        },
      department: {
        dept_name: JSON.parse(options.otherMes).sale_dept_name,
        dept_no: JSON.parse(options.otherMes).sale_dept_id,
      }
    })
    this.getEmployList();
    this.getBranchList();
  },
  //获取销售员
  getEmployList() {
    api.department.getEmployList({

    }).then(res => {
      if (res.code == 1) {
        res.datas.users.forEach(item => {
          item.account_name = item.user_name
        })
        this.setData({
          employList: res.datas.users,
        })
      }
    })
  },
  //显示销售员弹窗
  showEmployListModal() {
    this.setData({
      showEmployListModal: true
    })
  },
  //获取销售员
  getEmploy(e) {
    this.setData({
      employ: this.data.employList[e.detail]
    })
  },
  //获取部门
  getBranchList(){
    api.finance2.getBranchList({

    }).then(res => {
      if(res.code == 1){
        res.datas.depts.forEach(item => {
          item.account_name = item.dept_name
        })
        this.setData({
          departmentList: res.datas.depts
        })
      }
    })
  },
  //显示部门弹窗
  showDepartmentList() {
    this.setData({
      showDepartmentList: true
    })
  },
  //获取部门
  getDepartment(e) {
    this.setData({
      department: this.data.departmentList[e.detail]
    })
  },
  //确认修改
  confirmEdit(e){
    api.market.editOrder({
      order_id: this.data.orderId,
      order_type: 0,
      sale_dept_id: this.data.department.dept_no,
      order_worker_id: this.data.employ.user_id,
      foreign_order_id: e.detail.value.orderNum
    }).then(res => {
      if (res.code == 1) {
        wx.navigateBack({
          detal: 1
        })
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