// pages/updatenotice/updatenotice.js
import { api } from '../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    group_id:'',
    notice: 'notice'
  },
  getNotice: function(e){
    var notice = e.detail.value;
    this.setData({
      notice: notice
    })
  },
  saveNotice:function(e){
    var that = this
    var group_id = that.data.group_id
    var notice = that.data.notice
    console.log(notice,group_id)
    api.groupPerson.updateGroupNotice({ groupId: group_id, notice: notice }).then(res => {
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var group_id = options.groupId
    console.log(group_id)
    this.setData({
      group_id: group_id
    })

  }
})