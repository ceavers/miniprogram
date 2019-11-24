import { http, upload} from './http'

export enum httpStatus {
  /** 请求没有带token */
  no_token = 403,
  /**token失效 */
  out_time = 401,
  /**成功 */
  success = 200
}

export enum user_roleId {
  /**商家 */
  shop = 10001,
  /**银行工作人员 */
  client = 10002,
  /**游客 */
  tourist = 10003,
  /**管理员 */
  adminstar = 10004,
  /**员工 */
  staff = 10005,
  /**已申请办理业务的商家 */
  apply_shop = 10006
}

export interface uploadOption {
  data: any,
  pic: object
}

/** 申请办理业务接口的参数 */
interface shop_apply_option {
  /** 法人姓名（营业执照识别） */
  person: string
  /** 营业执照号码（识别获得） */
  shopsCode: number
  /* *法人电话 */
  mobile: number
  /** 微信Id */
  wechantId: string
  /** 公众平台对应Id */
  unionId: string
  /** 微信昵称 */
  userName: string
  /** 省编码 */
  provinceCode: string
  /** 省名 */
  provinceName: string
  /** 市编码 */
  cityCode: string
  /** 市名 */
  cityName: string
  /** 区编码 */
  areaCode: string
  /** 区名 */
  areaName: string
  /** 详细地址(营业执照所识别) */
  address: string
  /** 营业执照图片 */
  license: string
  /** 微信头像图片 */
  headPic: string
}

const use_token = true
export const api = {
  user: {
    /**发送验证码 */
    sendSms: (data: any) => http({ url: '/user/sendSms/login', data}),
    /** 登录 */
    login: (data: any) => http({ url: '/user/login', data }),
    /** 获取旗下员工信息 */
    getEmployee: (data: any = {}) => http({ url: '/user/getEmployee', data, use_token}),
    /** 添加员工 */
    addEmployee: (data: any) => http({ url: '/user/addEmployee', data, use_token }),
    /** 删除员工 */
    deleteEmployee: (data: any) => http({ url: '/user/deleteEmployee', data, use_token }),
  },
  wechat: {
    /**获取openid */
    getOpenId: (data: any) => http({url: '/wechant/getOpenId', data})
  },
  shops: {
    /** 识别营业执照 */
    discernLicense: (data: any) => upload({ url: '/shops/discernLicense', data }),
    /** 申请办理业务 */
    apply: (data: shop_apply_option) => http({ url: '/shops/apply', data }),
    /** 商家获取商户信息 */
    getShopsInformation: (data: any = {}) => http({ url: '/shops/getShopsInformation', data, use_token}),
    /** 收款管理界面数据获取,首页信息 */
    getShopsDayInformation: (data: any = {}) => http({ url: '/shops/getMerchantShopsDayInformation', data, use_token }),
    /** 获取收款流水  */
    getHistoryOrders: (data: any) => http({ url: '/shops/getHistoryOrders', data, use_token }),
    /** 获取收款订单 */
    getCollectionOrders: (data: any) => http({ url: '/shops/getCollectionOrders', data, use_token }),
  },
  order: {
    /** 创建订单 */
    generateQRCode: (data: any) => http({ url: '/order/generateQRCode', data, use_token }),
    /** 通过订单id查询订单状态 */
    checkOrder: (data: any) => http({ url: '/order/checkOrder', data, use_token }),
  },
  bank: {
    /** 银行工作人员获取首页信息 */
    getBankDayInformation: (data: any = {}) => http({ url: '/bank/getBankDayInformation', data, use_token }),
    /** 银行工作人员获取商铺信息列表 */
    getBankShops: (data: any) => http({ url: '/bank/getBankShops', data, use_token }),
    /** 交易情况统计 */
    getBankDayHistory: (data: any) => http({ url: '/bank/getBankDayHistory', data, use_token }),
    /** 使用情况统计 */
    getShopsUsageStatistics: (data: any) => http({ url: '/bank/getShopsUsageStatistics', data, use_token }),
    /** 银行工作人员新建审核单 */
    createMerchant: (data: any) => http({ url: '/bank/createMerchant', data, use_token }),
    /** 银行工作人员提交信息，审核办理(需要token) */
    checkApply: (data: any) => http({ url: '/bank/checkApply', data, use_token }),
  },
  other: {
    /** 上传图片文件  type: 1营业执照 2店铺头像 3个人头像*/
    uploadHeadPic: (data: any) => upload({ url: '/other/uploadHeadPic', data, use_token}),
    /** 获取地址json接口 */
    getAreaList: (data: any = {}) => http({ url: '/other/getAreaList', data}),
  }
}
