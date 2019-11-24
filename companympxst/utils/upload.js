//websocket BASEurl
const wsBaseUrl ='wss://xstmp.xstfcyy.com'
//xst 域名正则
const regexp = /((http|ftp|https|file):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/ig;
function upload(file, type, HOST,that,time){
  wx.showLoading({
    title: '上传中',
  })
  wx.uploadFile({
    url: 'https://xstchat.oss-cn-shanghai.aliyuncs.com',//上传的路径
    filePath: file,
    name: 'file',
    formData: {
      name: file,
      key: "${filename}",//上传图片的名字和路径（默认路径根目录，自定义目录：xxx/xxx.png）
      policy: "eyJleHBpcmF0aW9uIjoiMjAyMC0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==",
      OSSAccessKeyId: "LTAI4OEbpX9t1IBo",
      success_action_status: "200",
      signature: "4JL7/ozTDd5bGidJ5urV9lQESs8=",
    },
    success: function (res) {
      // const fileName = file.replace('http://tmp', '')
      const fileName = file.replace('wxfile://', '/')
      console.log(fileName);
      const uploadUrl = HOST + fileName;
      console.log(uploadUrl);
      const msg = { ...that.data.sendMessage };;
      msg.msgType = type;
      msg.message = uploadUrl;
      //@发消息
      if (that.data.toUserId){
        const userid = that.data.tav.indexOf('@') < 0 ? -1 : that.data.toUserId;
        if (userid !== -1) {
          msg.toUserId = userid;
        }
        that.setData({
          tav:'',
          toUserId:-1
        })
      }
      if (type =='voice'){
        msg.time =time
      }
      wx.sendSocketMessage({
        data: JSON.stringify(msg),
        success:res=>{
        },
        fail: res => {
          wx.showToast({
            title: "服务器异常",
            icon: 'none',
            duration: 1000
          })
        }
      })
      wx.hideLoading()
    },
    fail: function ({ errMsg }) {
      console.log('upladImage fail, errMsg is: ', errMsg)
      wx.hideLoading()
      wx.showToast({
        title: "发送失败",
        icon: 'none',
        duration: 1000
      })
    },
  })
}
//处理url
function disposeUrl(text) {
  const url = text.match(regexp)
  const textTemp = text.replace(regexp, '^|^');
  const textArr = textTemp.split('^');
  const cloneArr = [...textArr];
  textArr.map((item, index) => {
    if (item === '|') {
      let time = 0;
      for (var i = 0; i < index; i++) {
        if (cloneArr[i] === "|") {
          time++;
        }
      }
      textArr[index] = url[time];
    }
  })
  let objTemp = []
  for (let j = 0; j < textArr.length; j++) {
    if (regexp.test(textArr[j]) && textArr[j].length) {
      const item = {
        textType: 'url',
        text: textArr[j]
      }
      objTemp.push(item)
    } else if (!regexp.test(textArr[j]) && textArr[j].length) {
      const item = {
        textType: 'text',
        text: textArr[j]
      }
      objTemp.push(item)
    }
  }
  console.log(objTemp);
  return objTemp;
}
//获取未读消息
const getNews = {
  formatDate: function (time) {
    var now = new Date(time);
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return month + "/" + date + " " + hour + ":" + minute;
  },
  formatDateDay: function (time) {
    var now = new Date(time);
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return month + "/" + date
  },
  getNewRecords: function (group_id, user_id, that, api,logId) {
    wx.showLoading()
    if (logId){
      const data={
        chat_logid: logId,
        group_id: group_id,
        size:20,
        point:0
      }
      api.records.selectMsgById(data)
      .then(res=>{
        const newRecords = res.data.data;
        for (var i = 0; i < newRecords.length; i++) {
          if (newRecords[i].senderInfo == null) {
            continue;
          }
          const msg = {};
          msg.chatLogid = newRecords[i].chatLogid;
          msg.type = newRecords[i].sendType;
          msg.avatarUrl = newRecords[i].senderInfo.senderAvater;
          msg.nickName = newRecords[i].senderInfo.senderName;
          msg.role = newRecords[i].senderInfo.role;
          msg.userOrServiceId = newRecords[i].sendUid;
          msg.msgType = newRecords[i].contentType;
          if (msg.msgType === 'text') {
            msg.message = disposeUrl(newRecords[i].content);
          } else {
            msg.message = newRecords[i].content;
          }
          that.data.records.unshift(msg)
          if (i < newRecords.length - 1) {
            const j = i + 1;
            const interval = (newRecords[i].sendTime - newRecords[j].sendTime) / 1000;
            if (interval > 120) {
              const sysMsg = {};
              sysMsg.userOrServiceId = 'sysMsg';
              sysMsg.message = this.formatDate(newRecords[i].sendTime);
              that.data.records.unshift(sysMsg)
            }
          }
        }
        let msgIndex;
        that.data.records.forEach((item, index) => {
          if (item.chatLogid == logId) {
            msgIndex = index;
          }
        })
        that.setData({
          records: that.data.records,
          toScrollId: `scrollId${msgIndex}`
        })
        setTimeout(()=>{
          wx.hideLoading()
        },2000)
      })
      .catch(error=>{
        wx.hideLoading()
      })
      return
    }
    if (that.data.currentPage < that.data.totalPages) {
      const data = {
        currentPage: that.data.currentPage + 1,
        tag:1,
        pageSize: 16
      }
      const oldLength = that.data.records.length
      api.groupPerson.getRecords(group_id, user_id, data).then(res => {
        console.log(res.data)
        const newRecords = res.data.data;
        for (var i = 0; i < newRecords.length; i++) {
          if (newRecords[i].senderInfo==null){
            continue;
          }
          const msg = {};
          msg.type = newRecords[i].sendType;
          msg.avatarUrl = newRecords[i].senderInfo.senderAvater;
          msg.nickName = newRecords[i].senderInfo.senderName;
          msg.role = newRecords[i].senderInfo.role;
          msg.userOrServiceId = newRecords[i].sendUid;
          msg.msgType = newRecords[i].contentType;
          if (msg.msgType === 'text') {
            msg.message = disposeUrl(newRecords[i].content);
          } else {
            msg.message = newRecords[i].content;
          }
          that.data.records.unshift(msg)
          if (i < newRecords.length - 1) {
            const j = i + 1;
            const interval = (newRecords[i].sendTime - newRecords[j].sendTime) / 1000;
            if (interval > 120) {
              const sysMsg = {};
              sysMsg.userOrServiceId = 'sysMsg';
              sysMsg.message = this.formatDate(newRecords[i].sendTime);
              that.data.records.unshift(sysMsg)
            }
          }
        }
        that.setData({
          records: that.data.records,
          currentPage: that.data.currentPage + 1,
          totalPages: res.data.total_page
        })
        if (data.currentPage === 1) {
          that.setData({
            toScrollId: `scrollId${that.data.records.length - 1}`
          })
        }else{
          that.setData({
            toScrollId: `scrollId${that.data.records.length - oldLength}`
          })
        }
        setTimeout(() => {
          wx.hideLoading()
        }, 1000)
      })
        .catch(error => {
          wx.hideLoading()
        })
    } else {
      wx.hideLoading()
      wx.showToast({
        title: '暂无更多消息',
        icon: 'none'
      })
    }
  }
}
const checkLogin = {
  login: function (api, that, render) {
    let data = {};
    const _this = that;
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
                getApp().globalData.user = res.data;
                getApp().globalData.user.token = 'Bearer ' + getApp().globalData.user.token
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
                                getApp().globalData.avatar = res.avatar;
                                userInfo.avatar = res.avatar;
                                api.user.provideUserInfo(userInfo)
                                  .then(res => {
                                    console.log('登陆成功')
                                    wx.hideLoading()
                                    getApp().globalData.userInfo = res.data;
                                    if (render){
                                      checkLogin.renderData(_this)
                                    }
                                  })
                                  .catch(error => {

                                  })
                              },
                              fail: function (res) {
                                checkLogin.showToast('获取信息失败');
                              }
                            })
                          },
                          fail: function () {
                            checkLogin.showToast('获取信息失败');
                          }
                        })
                      },
                      fail: function () {
                        checkLogin.showToast('获取信息失败');
                      }
                    })
                  },
                  fail: function () {
                    checkLogin.showToast('登录失败');
                    // this.login() //重新登录
                  }
                })
              }
            })
            .catch(error => {

            })
        } else {
          console.log('登录失败！' + res.errMsg);
          checkLogin.showToast('登录失败');
        }
      },
      fail: function () {
        checkLogin.showToast('登录失败');
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
  renderData(that) {
    console.log(11221)
    console.log(that)
    that.setData({
      avatarUrl: getApp().globalData.avatar
    })
    let userInfo = getApp().globalData.userInfo
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
    that.setData({
      role: getApp().globalData.userInfo.role,
      userInfo: userInfo,
      roleCN: roleCN
    })
    console.log(getApp().globalData.userInfo)
  },
}
module.exports = {
  wsBaseUrl,
  getNews,
  upload,
  checkLogin,
  disposeUrl
}