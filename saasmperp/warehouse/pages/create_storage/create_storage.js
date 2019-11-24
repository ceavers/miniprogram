// warehouse/pages/create_storage/create_storage.js
import {api} from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,
    penetrate:false,
    note:'',
    department_id:'',
    departmentName: '',
    departData: []
  },
  selectDepartment(){
    this.setData({
      isShow: true,
      penetrate:true
    })
  },
  closePopup(){
    this.setData({
      isShow: false,
      penetrate:false
    })
  },
  cancel() {
    this.setData({
      penetrate: false
    })
  },
  getNote(e) {
    this.setData({
      note: e.detail.value
    })
  },
  toHistory(){
    wx.navigateBack({
      
    })
  },
  chooseOk() {
    let tempStr = '';
    let tempArr = [];
    let flag = 1;
    this.data.departData.forEach(item => {
      if (item.checked) {
        if (item.department_id == -1) {
          flag = 0
          this.setData({
            isShow: false,
            departmentName: '公共'
          })
        } else {
          flag && tempArr.push(item.department_name)
        }
      }
    })
    if (flag) {
      for (let i = 0; i < tempArr.length; i++) {
        if (i == 0) {
          tempStr = tempArr[i]
        } else {
          tempStr = tempStr + '、' + tempArr[i]
        }
      }
      this.setData({
        isShow: false,
        penetrate: false,
        departmentName: tempStr
      })
    }
    this.getCommitDepartment()
  },
  //获取绑定部门
  getCommitDepartment() {
    let tempArr = [];
    let temStr = '';
    let flag = 0;
    this.data.departData.forEach(item => {
      if (item.checked) {
        if (item.department_id == -1) {
          flag = 1
        }
      }
    })
    //所有部门
    if (flag) {
      this.data.departData.forEach(item => {
        if (item.department_id != -1) {
          tempArr.push(item.department_id)
        }
      })
    } else {
      this.data.departData.forEach(item => {
        if (item.checked) {
          tempArr.push(item.department_id)
        }
      })
    }
    for (let i = 0; i < tempArr.length; i++) {
      if (i == 0) {
        temStr = tempArr[i]
      } else {
        temStr = temStr + ',' + tempArr[i]
      }
    }
    this.setData({
      department_id: temStr
    })
  },  
  formSubmit(e) {
    const data = e.detail.value;
    if (!data.depo_name.trim().length) {
      wx.showToast({
        title: '仓库名称不能为空',
        icon: 'none'
      })
      return
    }
    data.department_id = this.data.department_id;
    api.warehouse.createStorage(data)
      .then(res => {
        wx.showToast({
          title: '新建成功',
        })
        setTimeout(() => {
          wx.navigateBack({
          })
        }, 1000)
      })
      .catch(err => {

      })
  },
  //获取部门列表
  getDepartmentList() {
    api.warehouse.getDepartmentList({})
      .then(res => {
        const departList = res.datas.results;
        departList.forEach(item => {
          item.checked = false
        })
        departList.unshift({
          department_id: -1,
          department_name: '公共',
          checked: false
        })
        this.setData({
          departData: departList
        })
      })
      .catch(err => {

      })
  },
  selectDepart(e) {
    const id = e.currentTarget.dataset.id
    if (id == -1) {
      this.data.departData.forEach(item => {
        if (item.department_id == id) {
          item.checked = !item.checked
        } else {
          item.checked = false
        }
      })
      this.setData({
        departData: this.data.departData,
      })
    } else {
      this.data.departData.forEach(item => {
        if (item.department_id == id) {
          item.checked = !item.checked
        }
        if (item.department_id == -1) {
          item.checked = false
        }
      })
      this.setData({
        departData: this.data.departData
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDepartmentList()
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