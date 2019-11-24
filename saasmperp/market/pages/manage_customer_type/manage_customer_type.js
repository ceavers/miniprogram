// market/pages/manage_customer_type/manage_customer_type.js
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeListChange: [],//修改类型列表
    typeList: [],//类型列表
    delModal: false,//删除模式 
    confirmDel: false,//确认删除弹窗
    showAddTypeModal: false,//添加类型弹窗
    typeValue: '',//类型的名
    delTypeList: [],//删除的类型id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCustomerTypeList();
  },
  //删除模式
  del(){
    this.setData({
      delModal: true
    })
  },
  //删除确认提示
  confirm(){
    this.setData({
      confirmDel: true
    })
  },
  //确认删除
  confirmDel(){
    api.market.delCustomerType({
      category_id: this.data.delTypeList.join(',')
    }).then(res => {
      if(res.code == 1){
        console.log(res)
        wx.showToast({
          title: '删除成功',
        })
        this.getCustomerTypeList();
        this.setData({
          confirmDel: false,
          delModal: false,
          delTypeList: []
        })
      }
    })
  },
  //取消删除
  cancel(){
    this.setData({
      confirmDel: false,
      delModal: false,
      showAddTypeModal: false,
      typeListChange: this.data.typeList,
      delTypeList: []
    })
  },
  //删除点击类型
  delThisType(e){
    let typeList = this.data.typeListChange
    let typeListChange = typeList.filter(item => {
      if (item.user_category_id != e.currentTarget.dataset.id){
        return item
      }
    })
    let delTypeList = [...this.data.delTypeList, e.currentTarget.dataset.id]
    this.setData({
      typeListChange,
      delTypeList
    })
  },
  //添加类型
  addType(){
    this.setData({
      showAddTypeModal: true
    })
  },
  //input双向绑定
  typeValue(e) {
    console.log(e)
    this.setData({
      typeValue: e.detail.value
    })
  },
  //获取用户类别
  getCustomerTypeList() {
    api.market.getCustomerTypeList({
      page_index: 1,
      page_size: 20
    }).then(res => {
      console.log(res)
      this.setData({
        typeList: res.datas.category,
        typeListChange: res.datas.category
      })
    })
  },
  //确认添加类型
  confirmAdd(){
    api.market.addCustomerType({
      category_name: this.data.typeValue
    }).then(res => {
      if (res.code == 1) {
        this.setData({
          showAddTypeModal: false
        })
        this.getCustomerTypeList();
        wx.showToast({
          title: '添加成功',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})