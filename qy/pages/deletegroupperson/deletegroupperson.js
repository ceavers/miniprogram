// pages/deletegroupperson/deletegroupperson.js
import { api } from '../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    group_id:'',
    deleteList:[],
    persons: []
  },
  checkboxChange:function(e){
    var list = e.detail.value
    this.setData({
      deleteList: list
    })
  },
  deleteGroupPerson: function(){
    var that = this;
    var group_id = that.data.group_id
    var userids = that.data.deleteList;
    if (!userids.length){
      wx.showToast({
        title: '请选择用户',
        icon:'none'
      })
      return
    }
    api.groupPerson.deleteGroupPerson({ userIds: userids, groupId: group_id }).then(res => {
     if(res.code===0){
       var group_id = that.data.group_id
       api.groupPerson.selectMemebrByName({ group_id: group_id}).then(res => {
         this.setData({
           persons: res.data
         })
       })
     }
    })
  },
  searchGroupPerson: function(e){
    var that = this;
    var data = {
      key_word: e.detail.value,
      group_id: that.data.group_id
    }
    api.groupPerson.selectMemebrByName(data).then(res => {
      this.setData({
        persons: res.data
      })
    })
    .catch(error=>{

    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var group_id = options.groupId
    this.setData({
      group_id: group_id,
    })
    const data = {
      group_id: group_id,
    }
    api.groupPerson.selectMemebrByName(data).then(res => {
      this.setData({
        persons: res.data
      })
    })
  }
})