/**
 * baseUrl        http请求基本路径 
 * build          配置http请求对象
 * getNetwork     获取网络类型
 * http           http请求入口
 * beforeResponse 请求成功处理函数
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseUrl = 'https://easydoc.xyz/mock';
const BAD_REQUEST_TEXT = '服务器异常，请稍后重试！';
const beforeResponse = (res) => {
  let data = res.data;
  if (data.code === 1) {
    return Promise.resolve(data);
  }
  wx.showToast({
    title: data.msg || BAD_REQUEST_TEXT,
    icon: 'none'
  });
  return Promise.reject(data);
};
let build;
build = function (data, resolve, reject) {
  let header = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  if (data.use_token) {
    header.token = wx.getStorageSync('token');
  }
  let new_data = {
    url: exports.baseUrl + data.url,
    data: data.data,
    method: data.method || 'POST',
    header,
    success: res => {
      if (data.loading) {
        wx.hideLoading()
      }
      resolve(beforeResponse(res));
    },
    fail: err => {
      if (data.loading) {
        wx.hideLoading()
      }
      wx.showToast({
        title: BAD_REQUEST_TEXT,
        icon: 'none'
      });
      reject(err);
    }
  };
  return new_data;
};
const getNetwork = (data) => {
  return new Promise((resolve, reject) => {
    wx.getNetworkType({
      success(res) {
        if (res.networkType === 'none') {
          if (data.loading) {
            wx.hideLoading()
          }
          wx.showToast({
            title: '未连接到网络！',
            icon: "none"
          });
          reject(res);
        }
        else {
          resolve(res.networkType);
        }
      },
      fail(err) {
        if (data.loading) {
          wx.hideLoading()
        }
        wx.showToast({
          title: '获取网络状态失败！',
          icon: "none"
        });
        reject(err);
      }
    });
  });
};
exports.http = (data) => {
  if (data.loading){
    wx.showLoading({
      title: '加载中',
      mask:true
    })
  }
  return getNetwork(data)
    .then(() => {
      return new Promise((resolve, reject) => {
        let request_option = build(data, resolve, reject);
        if (data.use_token && !wx.getStorageSync('token')) {
          if (data.loading) {
            wx.hideLoading()
          }
          reject('获取角色token失败！');
        }
        else {
          wx.request(request_option);
        }
      });
    });
};