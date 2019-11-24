import { httpStatus } from './api'
import { ZIP_PIC } from './static'

export const baseUrl = 'https://pay.yeacy.com/qr-code'
const BAD_REQUEST_TEXT = '服务器异常，请稍后重试！'
interface http_data {
  url: string,
  method?: any,
  data?: any,
  /** 是否需要在header上加上token */
  use_token?: boolean
}
/** 接口, 请求头的字段 */
interface http_header {
  'Content-Type'?: string,
  'token'?: any
}

/**接口 将传入的对象修改为  wx.RequestOption 对象*/
interface build_http_data {
  (data: http_data, resolve: any, reject: any): wx.RequestOption
}

/**钩子函数，在请求返回额时候拦截请求，处理数据，并抛出异常 */
const beforeResponse = (res:any):any => {
  let data = res.data
  if (data.code === httpStatus.success) {
    return Promise.resolve(data)
  }
  wx.showToast({
    title: data.msg || BAD_REQUEST_TEXT,
    icon: 'none'
  })
  return Promise.reject(data)
}

/**默认post */
let build:build_http_data
build = function (data: http_data, resolve: any, reject: any): wx.RequestOption {
  let header:http_header = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  if(data.use_token) {
    header.token = getApp().globalData.user.token
  }
  let new_data: wx.RequestOption = {
    url: baseUrl + data.url,
    data: data.data,
    method: data.method || 'POST',
    header,
    success: res => {
      console.log(res);
      resolve(beforeResponse(res))
    },
    fail: err => {
      wx.showToast({
        title: BAD_REQUEST_TEXT,
        icon: 'none'
      })
      reject(err)
    }
  }
  return new_data
}
/**
 * 请求之前获取网络状态，如果失败提示网络异常
 */
const getNetwork = () => {
  return new Promise((resolve, reject) => {
    wx.getNetworkType({
      success(res) {
        if (res.networkType === 'none') {
          wx.showToast({
            title: '未连接到网络！',
            icon: "none"
          })
          reject(res)
        } else{
          resolve(res.networkType)
        }
      },
      fail(err) {
        wx.showToast({
          title: '获取网络状态失败！',
          icon: "none"
        })
        reject(err)
      }
    })
  })
}
/**请求数据函数，返回一个promise */
export const http = (data:http_data) => {
  return getNetwork()
    .then(() => {
      return new Promise((resolve, reject) => {
        let request_option: wx.RequestOption = build(data, resolve, reject)
        if (data.use_token && !getApp().globalData.user.token) {
          reject('获取角色token失败！')
        } else {
          wx.request(request_option)
        }
      })
    })
}

export const upload = (option:any) => {
  let { url, data, use_token } = option
  return getNetwork()
    .then(() => {
      let { name, pic, formData = {} } = data;
      let header = use_token ? {
        token: getApp().globalData.user.token
      } : {}
      return ZIP_PIC(pic)
        .then(path => {
          return new Promise((resolve, reject) => {
              wx.uploadFile({
                url: baseUrl + url,
                filePath: path,
                name,
                formData: formData,
                header,
                success(res) {
                  res.data = JSON.parse(res.data)
                  resolve(beforeResponse(res));
                },
                fail(err) {
                  console.log(err)
                  reject(err)
                }
              })
          })
        })
    })
}
