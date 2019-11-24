// pages/edit_employ/edit_employ.js
import {api} from '../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,//弹窗显示
    departId:'2355',
    departName:"采购部"
  },
  formSubmit(e){
    var reg = new RegExp("^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$"); 
    const data =e.detail.value;
    if (data.account.length == 0 || data.email.length == 0 || data.name.length == 0 || data.mobile.length == 0 || data.password.length == 0){
      wx.showToast({
        title: '请完善员工信息',
        icon: 'none'
      })
      return
    } else if (!reg.test(data.email)) {
      wx.showToast({
        title: '邮箱格式不正确',
        icon: 'none'
      })
      return
    } else if ((/^1[34578]\d{9}$/.test(data.mobile)) && data.mobile.length == 11){
      data.dept_id = this.data.departId;
      api.department.editEmploy(data)
        .then(res => {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
          })
          setTimeout(() => {
            wx.navigateBack({

            })
          }, 1000)
        })
        .catch(err => {

        })
    }
    else{
      wx.showToast({
        title: '请输入正确手机号',
        icon: 'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.roleId){
      const data = {
        role_id: options.roleId
      }
      this.getEmployList(data)
    }
  },
  toPartmentPage(){
    wx.navigateTo({
      url: '/pages/department_list/department_list',
    })
  },
  getEmployList(data) {
    //此接口有问题
    api.department.getEmployList(data)
      .then(res => {
        this.setData({
          items: res.datas.staffs[0]
        })
      })
      .catch(err => {

      })
  },
  //重置员工密码
  resetPwd() {
    this.setData({
      showModal: true
    })
  },
  //关闭弹窗
  closeModal() {
    this.setData({
      showModal: false
    })
  },
  //确认重置密码
  confirm() {
    this.closeModal()
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