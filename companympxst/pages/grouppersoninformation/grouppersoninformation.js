// pages/grouppersoninformation/grouppersoninformation.js
import {
  api
} from '../../utils/api/api.js'
import city from "../../utils/city.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: "",
    gender: "",
    imageUrl: '',
    city: '',
    telephone: '',
    serviceId: "",
    serviceName: "",
    note:'',
    user_id: '',
    group_id: '',
    inputShow:false,
    editNote:''
  },
  btnRecords() {
    var that = this
    wx.navigateTo({
      url: "/pages/chatRecords/chatRecords?user_id=" + that.data.user_id + '&groupId' + that.data.group_id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var user_id = options.id;
    var group_id = options.groupId
    console.log(user_id,group_id)
    this.setData({
      group_id: group_id
    })
    api.groupPerson.getGroupPersonInformation(group_id, user_id).then(res => {
      // console.log(res)
      this.setData({
        nickname: res.data.userNike,
        gender: res.data.sex === 0 ? '女' : '男',
        imageUrl: res.data.userAvatar,
        city: res.data.userCity,
        telephone: res.data.tel,
        user_id: res.data.userId,
        note: res.data.note
      })
      const cityP = that.data.city
      let cityC = city.city[cityP] || cityP
      this.setData({
        city: cityC
      })
      var serviceId = res.data.serviceId
      // console.log(serviceId)
      if (serviceId) {
        api.groupPerson.getServiceInformation({
          service_id: serviceId
        }).then(rese => {
          console.log(rese.data)
          this.setData({
            telephone: rese.data.tel,
            serviceId: rese.data.serviceId,
            serviceName: rese.data.serviceName,
          })
        })

      }
    })
  },
  editNote(){
    this.setData({
      inputShow:true
    })
  },
  editNoteOK(){
    if (!this.data.editNote.trim().length){
      this.setData({
        inputShow: false
      })
    }else{
      api.user.updateusernote(this.data.user_id, this.data.editNote.trim())
      .then(res=>{
        if(res.code==0){
          wx.showToast({
            title: '修改成功',
            icon:'none'
          })
          this.setData({
            inputShow: false,
            note: this.data.editNote.trim()
          })
        }
      })
      .catch(error=>{

      })
    }
  },
  getNote(e){
    this.setData({
      editNote:e.detail.value
    })
  }
})