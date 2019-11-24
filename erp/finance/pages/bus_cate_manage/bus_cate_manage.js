// finance/pages/bus_cate_manage/bus_cate_manage.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAddCateModal:false,
    addCategoryName: '',  //新增类别的名称
    fixedList:[] ,  //种类列表
    showDelete:false
  },

  delCategory(e){
    //删除某个类

    console.log(e.currentTarget)
    const data = {
      fixedcat_id: e.currentTarget.dataset.id
    };

    api.finance2.delFixedAssets(data)
      .then(res => {
        console.log(res);
        //刷新类别数据
        this.getFixedAssetsCateList();
      })
  },

  showDelete(){
    this.setData({
      showDelete: !this.data.showDelete
    });
  },

  addCategory() {
    //新增类别
    if (this.data.addCategoryName) {
      const data = {
        fixedcat_name: this.data.addCategoryName
      };

      api.finance2.addFixedAssetsCate(data)
        .then(res => {
          console.log(res);
          //刷新类别列表
          this.setData({
            showAddCateModal: false,
            
          });
          this.getFixedAssetsCateList();
          wx.showToast({
            title: '操作成功!',
            icon: 'none',
            duration: 1500
          })
        })
    }else{
      this.setData({
        showAddCateModal: false,

      });
    }
  },

  updateCate(e) {
    //监听新增类别的内容
    if (e.detail) {
      this.setData({
        addCategoryName: e.detail
      });
    }
  },

  showAddCateModal() {
    this.setData({
      showAddCateModal: true
    });
  },

  closeCateModal2() {
    this.setData({
      showAddCateModal: false
    });
  },

  getFixedAssetsCateList(){
    //获取固定资产种类列表
    api.finance2.getFixedAssetsCateList()
      .then(res => {
        console.log(res);
        this.setData({
          fixedList: res.datas.fixedasset_cats
        });
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFixedAssetsCateList()
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