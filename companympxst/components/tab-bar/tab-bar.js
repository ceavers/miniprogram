// components/tab-bar/tab-bar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar: {
      type: Object,
      value: {
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
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
