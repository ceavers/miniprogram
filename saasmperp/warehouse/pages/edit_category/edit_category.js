// warehouse/pages/edit_category/edit_category.js
import {api} from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // bigClassList:["上装","裤装","裙装","套装"],//商品大类
    bigClassList:[],
    bigId:0,
    // smClassList: ["上装", "裤装", "裙装", "套装","上装", "裤装", "裙装", "套装"],//商品小类
    smClassList:[],
    smId:0,

    size:'',//判断点击的大小类 1-大类 0-小类

    bigDelShow:false,//删除大类 开关
    smDelShow:false,//删除小类 开关

    modalShow:false,//弹窗开关
    addCategoryShow:false,//新增类别弹窗
    addCategoryInput: ''//新增类别弹窗 内容
  },

  // 获取大类id 点击切换小类
  getBigId(e){
    var id = e.currentTarget.dataset.id;
    var smClasslist = this.data.bigClassList[id].subclass
    this.setData({
      bigId:id,
      smClassList:smClasslist
    })
  },
  
  // 大类 删除按钮开关 
  delBigbtn(){
    if (!this.data.smDelShow){
      this.setData({
        bigDelShow: true
      })
    }
  },

  // 删除类
  delBigClass(e){
    var _this = this
    var id = e.currentTarget.dataset.id;
    var size = e.currentTarget.dataset.size;//判断删除的大 小类 1大
    const data ={}
    if(size=="1"){          //大类
      data.category_id = this.data.bigClassList[id].category_id
      data.is_subclass = 0
    }else if(size=="0"){
      data.category_id = this.data.smClassList[id].class_id
      data.is_subclass = 1
    }
    console.log(data)
    api.warehouse.delCategory(data)
      .then(res=>{
        console.log(res)
        wx.showToast({
          title: '删除成功!',
          icon:'none'
        })
        _this.onShow()
      })
      .catch(err => {

      })
  },

  //大类 确认按钮开关 
  sureBigbtn() {
    this.setData({
      bigDelShow:false
    })
  },

  // 获取小类id
  getSmId(e){
    var id = e.currentTarget.dataset.id;
    this.setData({
      smId: id
    })
    console.log("smId: ",id)
  },

  // 小类 删除按钮开关 
  delSmbtn(){
    if (!this.data.bigDelShow) {
      this.setData({
        smDelShow: true
      })
    }
  },

  // 小类 确认按钮开关 
  sureSm() {
    this.setData({
      smDelShow: false
    })
  },

  // 打开新增弹窗
  addClass(e){
    var size = e.currentTarget.dataset.size
    // 进行删除操作时无法 新增
    if(size == "1"){
      if (!this.data.smDelShow){
        this.setData({
          size: size,
          modalShow: true
        })
      }
    }
    if(size == "0"){
      if (!this.data.bigDelShow) {
        this.setData({
          size: size,
          modalShow: true
        })
      }
    }
  },
  // 监听输入内容
  addCategoryInput(e){
    this.setData({
      addCategoryInput: e.detail.value
    })
  },

  // 新增类别 确定
  addcategory() {
    var _this = this
    var size = this.data.size;
    var value = this.data.addCategoryInput//获取输入内容
    if (value.trim().length){
      const data = { category_name :value}
      if (size == "1") {              //新增大类
        data.is_subclass = 0
      } else if(size=="0") {          //新增小类
        data.is_subclass=1
        data.category_id = this.data.bigClassList[this.data.bigId].category_id
      }
      console.log(data)
      api.warehouse.addCategory(data)
        .then(res => {
          _this.setData({
            addCategoryInput: '',
            size: '',
            modalShow: false
          })
          wx.showToast({
            title: '类别添加成功!',
            icon:'none'
          })
          _this.onShow()
        })
        .catch(err => {

        })
    } else {
      wx.showToast({
        title: '类别名称不能为空',
        icon: "none"
      })
    }
  },

  // 关闭新增类别 弹窗 
  closeAddCategory() {
    this.setData({
      modalShow: false,
      addCategoryInput: '',
      size:''
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var _this = this
    api.warehouse.getCategory({})
      .then(res => {
        if (res.datas.categorys.length>0){
          if (res.datas.categorys[_this.data.bigId]) {
            var bigClassList = res.datas.categorys  //大类
            if (bigClassList[_this.data.bigId].subclass) {      //页面显示时 默认显示第一个大类的小类
              var smClassList = bigClassList[_this.data.bigId].subclass
            }
            _this.setData({
              bigClassList: bigClassList,
              smClassList: smClassList
            })
          } else {
            _this.setData({bigId:0})
            _this.onShow()
          }
        }else{
          wx.showToast({
            title: '暂无类别信息！',
            icon:'none'
          })
        }
        
      })
      .catch(err => {

      })
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