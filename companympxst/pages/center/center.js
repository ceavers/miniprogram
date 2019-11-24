// pages/center/center.js
import city from"../../utils/city.js"
import { api } from '../../utils/api/api.js'
import { baseUrl} from '../../utils/api/http.js'
import { checkLogin } from '../../utils/upload.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:'',
    addCommonPop: false,
    city:'',
    // gender:'',
    nickName:'',
    role: '',
    roleCN: '',
    userInfo: {},
    haveKnews: false,
    imgurl: ''
  },
  CommonPopShow() {
    this.setData({
      addCommonPop: true
    })
    var that = this
    let header = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    header.authorization = app.globalData.user.token;
    wx.request({
      url: `${baseUrl}/applet/qrcode`,
      data: {
        scene: ''+ app.globalData.userInfo.serviceId, 
        page: 'pages/index/index', 
        width: 162
      },
      method: 'GET',
      header,
      responseType: "arraybuffer",
      success: res => {
        console.log(res)
        let base64 = wx.arrayBufferToBase64(res.data)
        this.setData({
          imgurl: "data:image/PNG;base64," + base64
        })
      },
      fail: res => {
        wx.showToast({
          title: '服务器异常',
        })
      }
    })
    
  },
  btnClosed(){
    this.setData({
      addCommonPop: false
    })
  },
  btnVipApply() {
    wx.navigateTo({
      url: "/pages/vipapply/vipapply"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar();
    // const gender = app.globalData.userInfo.gender; 
    // const cityP = app.globalData.userInfo.city;
    // let genderCh = gender==1?"男":"女";
    // let cityC = city.city[cityP] || cityP;
    // this.setData({
    //   avatarUrl: app.globalData.userInfo.avatarUrl,
    //   city: cityC,
    //   gender: genderCh,
    //   nickName: app.globalData.userInfo.nickName
    // })
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
    if (wx.qy) {
      if (getApp().globalData.userInfo === null || getApp().globalData.user === null) {
        checkLogin.login(api, this, true)
      } else {
        api.groupPerson.getServiceInformation({})
        .then(res=>{
          console.log(res.data.serviceAvatar)
          this.setData({
            avatarUrl: res.data.serviceAvatar
          })
          let userInfo = getApp().globalData.userInfo;
          userInfo.role = res.data.role;
          let roleCN;
          switch (userInfo.role) {
            case 0:
              roleCN = '客服';
              break;
            case 1:
              roleCN = '医生';
              break;
            case 2:
              roleCN = '管理员';
              break;
            case 3:
              roleCN = '超级管理员';
              break;
            default:
              roleCN = '权限不明';
          }
          this.setData({
            role: getApp().globalData.userInfo.role,
            userInfo: userInfo,
            roleCN: roleCN
          })
        })
        .catch(error=>{

        })
      } 
    } else {
      wx.showToast({
        title: '请进入企业微信登录',
        icon: 'none'
      })
      return
    }
    if(this.data.role==='3'){
      api.user.getVipApply().
        then(res => {
          if (res.data.length) {
            this.setData({
              haveKnews: true
            })
          } else {
            this.setData({
              haveKnews: false
            })
          }
        })
        .catch(res => {

        })
    }
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  }
})
