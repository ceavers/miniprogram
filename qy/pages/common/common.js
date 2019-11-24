// pages/common/common.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    EditShow:false,
    addCommonPop:false,
    title:'',
    array:[],
    concent:'',
    Lists: [],
    index:0
  },
  //选择常用语
  chooseCommonLanguage(e){
    var that = this
    var num = e.currentTarget.dataset.id;
    var commonLanague = that.data.Lists[num].text
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      commonLanague: commonLanague
     //, tav: commonLanague
    });
    wx.navigateBack({
      delta: 1
    })
  },
  //设置
  Edittype(){
    this.setData({
      EditShow: !this.data.EditShow,
    })
  },
  //完成
  complete(){
    this.setData({
      EditShow: !this.data.EditShow
    })
  },
  //新增常用语
  CommonPopShow(){
    this.setData({
      addCommonPop:true,
      title: '新增常用语'
    })
    
  },
  //弹窗 取消按钮
  cancel() {
    this.setData({ 
      concent: '',
      addCommonPop: false,
    })
  },
  //新增常用语 获取输入内容
  Text_content: function (e) {
    var add_Common = e.detail.value;
    this.setData({
      concent: add_Common,
    })
    
  },
  //弹窗 确定按钮
  confirm() {
    console.log(this.data.title)
    var title = this.data.title;
    //判断弹窗
    if (title == '新增常用语') {
      //替换掉输入中的空格
      var Input_content = this.data.concent.replace(/\s*/g, '');
      //判断输入是否为空 或 空格
      if (Input_content.length) {
        this.data.Lists.push({ text: this.data.concent })
        this.setData({
          addCommonPop: false,
          concent: '',
          Lists: this.data.Lists
        })
        wx.setStorageSync('common', this.data.Lists)
      } else {
        wx.showToast({
          title: '不能为空',
          icon: 'none'
        })
        this.setData({ concent: '' })
      }
    }
    if (title == '修改常用语') {
      var Input_content = this.data.concent.replace(/\s*/g, '');
      console.log(this.data.concent)
      if (Input_content.length){
        console.log(this.data.Lists[this.data.index])
        this.data.Lists[this.data.index].text = this.data.concent;
        this.setData({
          Lists: this.data.Lists,
          addCommonPop: false,
          concent: ''
        })
        wx.setStorageSync('common', this.data.Lists)
      } else {
        wx.showToast({
          title: '不能为空',
          icon: 'none'
        })
      }
    }
  },
  Delect_Com(e){
    //获取当前节点索引
    var num = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认删除？',
      content: '',
      success:res=> {
        if (res.confirm) {
          console.log('用户点击确定')
          //删除
          this.data.Lists.splice(num, 1)
          this.setData({
            Lists: this.data.Lists
          })
          wx.setStorageSync('common', this.data.Lists)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  //修改常用语
  Edit_Com(e){
    //获取当前节点索引
    var num = e.currentTarget.dataset.id
    console.log(num)
    //获取缓存中当前节点的值
    var Comtext = this.data.Lists[num].text
    this.setData({
      addCommonPop: true,
      title: '修改常用语',
      concent: Comtext,
      index:num
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('common')) {
      this.setData({
        Lists: wx.getStorageSync('common')
      })
    }
  }
})