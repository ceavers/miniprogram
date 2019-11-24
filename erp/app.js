 //app.js
import { manageModule} from "./utils/module.js"
import touch from './utils/touch.js'//滑动
App({
  touch: new touch,//滑动
  onLaunch: function () {

  },
  globalData: {
    //用户基本信息
    userInfo:null,
    selectCustomer: null,//销售单选择的客户
    editCustomer: null,//销售单修改后的客户
    selectSupplier: null,//
    manageModule: manageModule,
    flag:0,//返回上一个页面刷新数据
  }
})