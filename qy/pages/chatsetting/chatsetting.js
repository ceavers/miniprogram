// pages/chatsetting/chatsetting.js
import { api } from '../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    group_id:'',
    persons: []
  },
  btnPopups() {
    wx.navigateTo({
      url: '/pages/chatperson/chatperson?id='+this.data.group_id
    })
  },
  btnPerson(e) {
    var that = this
    //拿到点击的index下标
    var id = e.currentTarget.dataset.id
    // console.log(id)
    // var id = that.data.persons[index].user_id
    wx.navigateTo({
      url: "/pages/grouppersoninformation/grouppersoninformation?id=" + id +"&groupId=" +that.data.group_id
    })
  },
  btnDelete() {
    var that = this
    wx.navigateTo({
      url: "/pages/deletegroupperson/deletegroupperson?groupId=" + that.data.group_id
    })
  },
  btnNotice() {
    var that = this
    wx.navigateTo({
      url: "/pages/updatenotice/updatenotice?groupId=" + that.data.group_id
    })
  },
  btnRecords() {
    wx.navigateTo({
      url: "/pages/chatRecords/chatRecords?groupId=" + this.data.group_id
    })
  },
  btnBlock() {
    wx.navigateTo({
      url: "/pages/block/block?groupId=" + this.data.group_id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var group_id = options.id
    this.setData({
      group_id:group_id
    })

  },
  onShow: function(){
    var that = this
    var group_id = that.data.group_id
    const data = {
      group_id: group_id,
    }
    api.groupPerson.selectMemebrByName(data).then(res => {
      let person = res.data;
      if (person.length <= 9) {
        this.setData({
          persons: person
        })
      } else {
        this.setData({
          persons: person.splice(0,9)
        })
      }
    })
    .catch(error => {

    })
  }
})