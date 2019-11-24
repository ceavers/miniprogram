// pages/manage/manage.js
import { api } from '../../utils/api/api.js'
let that;
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,//启用，停用
    moveIndex: 0,
    direction: '',
    domIndex: 0,
    directionClass: '',
    items: [],//员工列表
    employMes: ''
  },
  //选择启动，停止用户
  toggle: function (e) {
    if (e.currentTarget.dataset.index != this.data.activeIndex) {
      this.setData({
        //设置active的值为用户点击按钮的索引值
        activeIndex: e.currentTarget.dataset.index,
      })
      if (this.data.activeIndex==1){
        this.getEmployList({
          available:false
        })
      }else{
        this.getEmployList({
          available: true
        })
      }
    }
  },
  //添加员工页面
  gotoAddemploy: function (e) {
    wx.navigateTo({
      url: '/pages/add_employ/add_employ',
    })
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时，滑块全部恢复默认位置
    let data = app.touch._touchstart(e, this.data.items)
    if(data.thisIndex == this.data.domIndex){
      this.setData({
        items: data.items
      })
    } else {
      this.setData({
        items: data.items,
        moveIndex: 0
      })
    }
  },

  //滑动事件处理
  touchmove: function (e) {
    let data = app.touch._touchmove(e, this.data.items)
    // let thisMoveIndex = this.data.moveIndex
    this.setData({
      items: data.items,
      domIndex: data.thisIndex,
      direction: data.moveIndex
    })

  },
  //滑动停止
  touchend: function (e) {
    if (this.data.moveIndex == 0) {
      if (this.data.direction) {
        this.setData({
          directionClass: 'left',
          moveIndex: this.data.moveIndex - 1
        })
      } else {
        this.setData({
          directionClass: 'right',
          moveIndex: this.data.moveIndex + 1
        })
      }
    } else if (this.data.moveIndex == -1) {
      if (this.data.direction) {
        this.setData({
          directionClass: 'left'
        })
      } else {
        this.setData({
          directionClass: '',
          moveIndex: this.data.moveIndex + 1
        })
      }
    } else if (this.data.moveIndex == 1) {
      if (this.data.direction) {
        this.setData({
          directionClass: '',
          moveIndex: this.data.moveIndex - 1
        })
      } else {
        this.setData({
          directionClass: 'right'
        })
      }
    }
  },
  //删除事件
  del: function (e) {
    let that = this
    wx.showModal({
      title: '提示',
      content: '确认要删除此员工么？',
      success: function (res) {
        if (res.confirm) {
          api.department.delEmploy({ staff_ids: e.currentTarget.dataset.id }).
            then(res => {
              that.onLoad();
            })
        } else if (res.cancel) {
          // that.onLoad();
        }
      }
    })
  },
  search(e) {
    let data = {
      name: this.data.employMes,
    }
    if (this.data.moveIndex == 1){
      data.available=false
    }else{
      data.available = true
    }
    this.getEmployList(data)
  },
  edit(e) {
   wx.navigateTo({
     url: `/pages/edit_employ/edit_employ?roleId=${e.currentTarget.dataset.id}`,
   })
  },
  inputModel(e) {
    this.setData({
      employMes: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow(options) {
    this.getEmployList({
      available:true
    })
  },
  getEmployList(data){
    api.department.getEmployList(data)
    .then(res=>{
      this.setData({
        items: res.datas.users
      })
    })
    .catch(err=>{

    })
  }
})