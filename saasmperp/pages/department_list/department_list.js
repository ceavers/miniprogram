// pages/department_list/department_list.js
import { api } from '../../utils/api/api.js'
let that;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moveIndex: 0,
    direction: '',
    domIndex: 0,//当前操作的dom标识
    directionClass: '',
    items: [],//部门列表
    employMes: '',
    pageSize: 10,//条数
    pageNo: 1,//页码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  //获取部门信息
  getDepartmentList(){
    api.department.getDepartmentList().
    then(res => {
      this.setData({
        items: res.datas.depts
      })
    }).
    catch(res => {
      console.error(res)
    })
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时，滑块全部恢复默认位置
    let data = app.touch._touchstart(e, this.data.items)
    console.log(data)
    if (data.thisIndex == this.data.domIndex) {
      this.setData({
        items: data.items
      })
    } else {
      this.setData({
        items: data.items,
        moveIndex: 0
      })
    }
  },

  //滑动事件处理
  touchmove: function (e) {
    let data = app.touch._touchmove(e, this.data.items)
    // let thisMoveIndex = this.data.moveIndex
    this.setData({
      items: data.items,
      domIndex: data.thisIndex,
      direction: data.moveIndex
    })

  },
  //滑动停止
  touchend: function (e) {
    console.log(this.data.moveIndex)
    if (this.data.moveIndex == 0) {
      if (this.data.direction) {
        this.setData({
          directionClass: 'left',
          moveIndex: this.data.moveIndex - 1
        })
      } else {
        this.setData({
          directionClass: 'right',
          moveIndex: this.data.moveIndex + 1
        })
      }
    } else if (this.data.moveIndex == -1) {
      if (this.data.direction) {
        this.setData({
          directionClass: 'left'
        })
      } else {
        this.setData({
          directionClass: '',
          moveIndex: this.data.moveIndex + 1
        })
      }
    } else if (this.data.moveIndex == 1) {
      if (this.data.direction) {
        this.setData({
          directionClass: '',
          moveIndex: this.data.moveIndex - 1
        })
      } else {
        this.setData({
          directionClass: 'right'
        })
      }
    }
  },
  //添加部门
  gotoAdddepartment(){
    wx.navigateTo({
      url: '/pages/add_department/add_department',
    })
  },
  //编辑，添加员工
  edit(e){
    wx.navigateTo({
      url: `/pages/department_mes/department_mes?businessId=${e.currentTarget.dataset.id}`,
    })
  },
  chooseDepart(e){
    const departId= e.currentTarget.dataset.id;
    const departName = e.currentTarget.dataset.name;
    this.setData({
      departId,
      departName
    })
    wx.navigateBack({
      
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getDepartmentList()
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
    if (this.data.departId && this.data.departName){
      const pages = getCurrentPages();
      pages[pages.length-2].setData({
        departId: this.data.departId,
        departName: this.data.departName
      })
    }
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