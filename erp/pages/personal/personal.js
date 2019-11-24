// pages/personal/personal.js
import {api} from '../../utils/api/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex:1,
    isShow:false,
    userInfo:null
  },
  //换头像
  changeAvatar(){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var size = res.tempFiles[0].size
        var path = res.tempFilePaths[0]
        var pictype = path.slice(-3)
        if (size > 1024 * 1024) {
          wx.showModal({
            title: '提示',
            content: '图片太大',
          })
          return false
        }
        if (pictype != 'png' && pictype != 'jpeg' && pictype != 'jpg' && pictype != 'bmp') {
          wx.showModal({
            title: '提示',
            content: '图片格式错误',
          })
          return false
        }
        //调用方法，上传图片
        that.uploadImg(res.tempFilePaths, that);
        wx.showLoading({
          title: '正在上传..',
        })
      }
    })
  },
  //改名字
  changeName(){
    wx.navigateTo({
      url: '/pages/changeName/changeName',
    })
  },
  //改性别
  changeSex() {
    this.setData({
      isShow:true
    })
  },
  chooseSex(e){
    this.setData({
      sex: parseInt(e.currentTarget.dataset.sex)
    })
  },
  cancle(){
    this.setData({
      isShow: false
    })
  },
  changeGender(){
    const data={
      gender:this.data.sex
    }
    api.user.updataInfo(data)
    .then(res=>{
      this.data.userInfo.gender = this.data.sex;
      this.setData({
        userInfo: this.data.userInfo
      })
      app.globalData.userInfo.gender = this.data.sex;

      this.setData({
        isShow: false
      })

    })
    .catch(er=>{

    })
  },
  //改电话
  changePhone(){
    wx.navigateTo({
      url: '/pages/changePhone/changePhone',
    })
  },
  //上传图片
  uploadImg(tempFilePaths, that) {
    wx.uploadFile({
      url: 'https://easydoc.xyz/mock/2xukn3Iw',
      filePath: tempFilePaths[0],
      name: 'files',
      formData: {
      },
      success: function (res) {
        const resData = JSON.parse(res.data);
        const data = {
          avatar: resData.data.path
        }
        wx.hideLoading()
        api.user.updataInfo(data)
        .then(res=>{
          that.data.userInfo.avatar = resData.data.path;
          that.setData({
            userInfo: that.data.userInfo
          })
          app.globalData.userInfo.avatar = resData.data.path;
        })
        .catch(err=>{

        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getUserInfo() {
    if (!app.globalData.userInfo) {
      api.user.getUserInfo()
        .then(res => {
          app.globalData.userInfo = res.data;
          this.setData({
            userInfo: res.data,
            sex: res.data.gender
          })
        })
        .catch(er => {

        })
    }else{
      this.setData({
        userInfo: app.globalData.userInfo,
        sex: app.globalData.userInfo.gender
      })
    }
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
    this.getUserInfo();
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