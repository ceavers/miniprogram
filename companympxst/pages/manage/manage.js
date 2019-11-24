// pages/manage/manage.js
import { api } from '../../utils/api/api.js'
let that;
const App = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    moveIndex: 0,
    direction: '',
    domIndex: 0,
    directionClass: '',
    items: [],
    employMes: '',
    deleShow:false,
    service:[],
    deleServiceId:0,
    replaceServiceId:null,
    defaultAvatar:'/images/serviceH.png',
    itemsAll:[]
  },

  toggle: function (e) {
    if (e.currentTarget.dataset.index != this.data.activeIndex){
      this.setData({
        //设置active的值为用户点击按钮的索引值
        activeIndex: e.currentTarget.dataset.index,
      })
    }
  },
  gotoAddemploy: function (e){
    wx.navigateTo({
      url: '/pages/addemploy/addemploy',
    })
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    let data = App.touch._touchstart(e, this.data.items)
    this.setData({
      items: data
    })
  },

  //滑动事件处理
  touchmove: function (e) {
    let data = App.touch._touchmove(e, this.data.items)
    // let thisMoveIndex = this.data.moveIndex
    this.setData({
      items: data.items,
      domIndex: data.index,
      direction: data.moveIndex
    })
    
  },
  //滑动停止
  touchend: function (e) {
    if(this.data.moveIndex == 0){
      if (this.data.direction) {
        this.setData({
          directionClass: 'left',
          moveIndex: this.data.moveIndex -1
        })
      } else {
        this.setData({
          directionClass: 'right',
          moveIndex: this.data.moveIndex +1
        })
      }
    } else if(this.data.moveIndex == -1) {
      if (this.data.direction) {
        this.setData({
          directionClass: 'left'
        })
      } else {
        this.setData({
          directionClass: '',
          moveIndex: this.data.moveIndex +1
        })
      }
    } else if(this.data.moveIndex == 1){
      if (this.data.direction) {
        this.setData({
          directionClass: '',
          moveIndex: this.data.moveIndex -1
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
    if (e.currentTarget.dataset.role===0){
      const allrole = this.data.itemsAll;
      const service = allrole.filter(item=>{
        if (item.role === 0 && item.serviceId !== e.currentTarget.dataset.id){
          return true;
        }else{
          return false;
        }
      })
      this.setData({
        service: service,
        deleServiceId: e.currentTarget.dataset.id,
        deleShow:true
      })
      return;
    }
    wx.showModal({
      title: '提示',
      content: '确认要删除此员工么？',
      success: function (res) {
        if (res.confirm) {
          console.log(e.currentTarget.dataset.id)
          api.user.delEmploy({ service_id : e.currentTarget.dataset.id}).
          then(res => {
            if(res.code === 0){
              console.log(that)
              that.onShow();
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消',that)
          that.onLoad();
        }
      }
    })
  },
  cancle(){
    this.setData({
      deleShow: false
    })
  },
  deleteService(){
    if(!this.data.replaceServiceId){
      wx.showToast({
        title: '专属客服不能为空',
        icon:'none'
      })
      return
    }
    api.user.delEmploy({ service_id: this.data.deleServiceId, new_service_id: this.data.replaceServiceId }).
      then(res => {
        if (res.code === 0) {
          wx.showToast({
            title: '删除成功',
            icon: 'none'
          })
          this.setData({
            deleShow: false
          })
          this.onShow();
        }else{
          wx.showToast({
            title: '删除失败，请重试',
            icon:'none'
          })
        }
      })
      .catch(error=>{

      })
  },
  radioChange(e){
    this.setData({
      replaceServiceId: e.detail.value
    })
  },
  search(e){
    api.user.getThisEmploy({ name: this.data.employMes }).
    then(res => {
      if(res.code == 0){
        let data = res.data.map(item => {
          switch (item.role) {
            case 0:
              item.crole = '客服';
              break;
            case 1:
              item.crole = '医生';
              break;
            case 2:
              item.crole = '管理员';
              break;
            case 3:
              item.crole = '超级管理员';
              break;
            default:
              item.crole = '角色不明';
          }
          return item
        })
        this.setData({
          items: data
        })
      }
    })
  },
  edit(e){
    wx.navigateTo({
      url: '/pages/modify/modify?serviceId=' + e.currentTarget.dataset.id + '&name=' + e.currentTarget.dataset.name + '&role=' + e.currentTarget.dataset.role,
    })
  },
  inputModel(e){
    console.log(e)
    this.setData({
      employMes: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    console.log('load')
    
  },
  onShow(options){
    that = this;
    console.log('load')
    api.user.getEmployList().
      then(res => {
        console.log(res)
        let data = res.data.map(item => {
          switch (item.role) {
            case 0:
              item.crole = '客服';
              break;
            case 1:
              item.crole = '医生';
              break;
            case 2:
              item.crole = '管理员';
              break;
            case 3:
              item.crole = '超级管理员';
              break;
            default:
              item.crole = '角色不明';
          }
          return item
        })
        this.setData({
          items: data,
          itemsAll:data
        })
      })
  }
})