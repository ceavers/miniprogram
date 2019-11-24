// pages/chatperson/chatperson.js
import { api } from '../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      group_id:'',
      persons: []
  },
  btnPerson(e) {
    var that = this
    //拿到点击的index下标
    var id = e.currentTarget.dataset.id
    // console.log(id)
    // var id = that.data.persons[index].user_id
    wx.navigateTo({
      url: "/pages/grouppersoninformation/grouppersoninformation?id=" + id + "&groupId=" + that.data.group_id
    })
  },
  btnDelete() {
    var that = this
    wx.navigateTo({
      url: "/pages/deletegroupperson/deletegroupperson?groupId=" + that.data.group_id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var group_id = options.id
    this.setData({
      group_id: group_id,
    })
    const data = {
      group_id: group_id,
    }
    api.groupPerson.selectMemebrByName(data).then(res => {
      let person = res.data;
      this.setData({
        persons: person
      })
      wx.hideLoading()
    })
    .catch(error => {
      wx.hideLoading()
    })
  },
  onShow: function () {


  }
})