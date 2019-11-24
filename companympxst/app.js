//app.js
var WxEmoji = require('./utils/WxEmojiView/WxEmojiView.js');//引用表情模板
import { api } from './utils/api/api.js'
import touch from './touch/touch.js'//新加
App({
  touch: new touch(),//新加
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // 登录
    wx.hideTabBar();
    if (wx.qy){
      this.login();
    }else{
      wx.showToast({
        title: '请进入企业微信登录',
        icon:'none'
      })
    }
    //表情
    WxEmoji.init("[_/", {
      "调皮": "调皮.gif",
      "惊讶": "惊讶.gif",
      "偷笑": "偷笑.gif",
      "可爱": "可爱.gif",
      "憨笑": "憨笑.gif",
      "疑问": "疑问.gif",
      "嘘...": "嘘....gif",
      "擦汗": "擦汗.gif",
      "鼓掌": "鼓掌.gif",
      "糗大了": "糗大了.gif",
      "坏笑": "坏笑.gif",
      "左哼哼": "左哼哼.gif",
      "右哼哼": "右哼哼.gif",
      "委屈": "委屈.gif",
      "亲亲": "亲亲.gif",
      "吓": "吓.gif",
      "西瓜": "西瓜.gif",
      "啤酒": "啤酒.gif",
      "玫瑰": "玫瑰.gif",
      "蛋糕": "蛋糕.gif",
      "月亮": "月亮.gif",
      "拥抱": "拥抱.gif",
      "强": "强.gif",
      "握手": "握手.gif",
      "胜利": "胜利.gif",
      "好": "好.gif",
    });
  },
  login: function () {
    let data = {};
    const _this = this;
    wx.showLoading({
      title: '加载中'
    })
    wx.qy.login({
      success: (res) => {
        if (res.code) {
          //发起网络请求
          let data = {};
          data.code = res.code;
          api.user.login(data)
            .then(res => {
              if (res.code == 0) {
                console.log(res.data)
                _this.globalData.user = res.data;
                _this.globalData.user.token = 'Bearer ' + _this.globalData.user.token
                //检查session_key
                wx.qy.checkSession({
                  success: function () {
                    //获取rawData signature
                    wx.qy.getEnterpriseUserInfo({
                      success: function (res) {
                        let userInfo = {}
                        userInfo.rawData = res.rawData;
                        userInfo.signature = res.signature;
                        //获取encryptedData iv
                        wx.qy.getMobile({
                          success: function (res) {
                            userInfo.encryptedData = res.encryptedData;
                            userInfo.iv = res.iv;
                            wx.qy.getAvatar({
                              success: function (res) {
                                getApp().globalData.avatar = res.avatar
                                userInfo.avatar = res.avatar;
                                api.user.provideUserInfo(userInfo)
                                  .then(res => {
                                    console.log('登陆成功')
                                    wx.hideLoading()
                                    getApp().globalData.userInfo = res.data;
                                    //获取头像
                                  })
                                  .catch(error => {

                                  })
                              },
                              fail: function (res) {
                                _this.showToast('获取信息失败');
                              }
                            })
                          },
                          fail: function () {
                            _this.showToast('获取信息失败');
                          }
                        })
                      },
                      fail: function () {
                        _this.showToast('获取信息失败');
                      }
                    })
                  },
                  fail: function () {
                    _this.showToast('获取信息失败');
                    // _this.login() //重新登录
                  }
                })
              }
            })
            .catch(error => {

            })
        } else {
          console.log('登录失败！' + res.errMsg);
          _this.showToast('登录失败');
        }
      },
      fail: function () {
        _this.showToast('登录失败');
      }
    });
  },
  showToast: function (msg) {
    wx.hideLoading()
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    })
  },
  editTabbar: function () {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    // if(pagePath.indexOf('/') != 0){
    //   pagePath = '/' + pagePath;
    // } 
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },
  globalData: {
    user: null,
    userInfo: null,
    avatar: '',
    tabBar: {
      color: "#FF6022",
      selectedColor: "#FF6022",
      borderStyle: "white",
      list: [{
        pagePath: "/pages/index/index",
        text: "首页",
        iconPath: "/images/home.png",
        selectedIconPath: "/images/home-active.png"
      }, {
        pagePath: "/pages/center/center",
        text: "我的",
        iconPath: "/images/center.png",
        selectedIconPath: "/images/center-active.png"
      }
      ]
    }
  }
})