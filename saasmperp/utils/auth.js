/**
 * 此文件api调用 code判断 应在实际开发中更改
 * 
 */
const api = require('/api/api')

// 检测登录状态，返回 true / false
async function checkHasLogined() {
  const token = wx.getStorageSync('token')

  if (!token) {
    return false
  }
  wx.checkSession({
    fail() {
      return false
    }
  })
  const checkTokenRes = await api.checkToken(token)//检测token是否过期
  if (checkTokenRes.code != 0) {
    wx.removeStorageSync('token')
    return false
  }
  return true
}

async function login(page) {
  const _this = this
  wx.login({
    success: function (res) {
      api.login(res.code).then(function (res) {
        if (res.code == 10000) {
          // 去注册
          _this.register(page)
          return;
        }
        if (res.code != 0) {
          // 登录错误抛出错误信息
          wx.showModal({
            title: '错误',
            content: '无法登录，请重试:' + res.msg,
            showCancel: false
          })
          return;
        }
        wx.setStorageSync('token', res.data.token)//登录成功后缓存token
        wx.setStorageSync('uid', res.data.uid)//登录成功后缓存uid
        if (page) {
          page.onShow()
        }
      })
    }
  })
}
//注册界面
async function register(page) {
  let _this = this;
  wx.login({
    success: function (res) {
      let code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
      wx.getUserInfo({
        success: function (res) {
          //注册成功后的操作 需要的参数视情况而定。
          let iv = res.iv;
          let encryptedData = res.encryptedData;
          let referrer = '' // 推荐人 
          let referrer_storge = wx.getStorageSync('referrer');
          if (referrer_storge) {
            referrer = referrer_storge;
          }
          // 下面开始调用注册接口 需要在api.js里配置
          api.register({
            code: code,
            encryptedData: encryptedData,
            iv: iv,
            referrer: referrer
          }).then(function (res) {
            _this.login(page);
          })
        }
      })
    }
  })
}
//退出登录后
function loginOut() {
  wx.removeStorageSync('token') 
  wx.removeStorageSync('uid')
  wx.removeStorageSync('userInfo')
}

module.exports = {
  checkHasLogined: checkHasLogined,
  login: login,
  register: register,
  loginOut: loginOut
}