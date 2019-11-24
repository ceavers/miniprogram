// finance/pages/setting_modify/setting_modify.js
import {
  api
} from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordType: '', //判断是记收入还是记支出传递过来的
    firstCategory: [],
    secondCategory: [], //这是记收入的数据
    class_name: "",
    class_ico: "",
    listId: "",
    firstID: "",
    smName: "",
    expenditureFirCate: [],
    expenditureSecCate: [],
    choiceIndex: 0, //点击大类的index
    showSecondCateModal: false, //是否显示二级分类的弹框
    showmask: false, //遮罩层
    showFirCateModal: false,
    iconArr: [{
        src: '/finance/images/add-bigcate1.png'
      },
      {
        src: '/finance/images/add-bigcate2.png'
      },
      {
        src: '/finance/images/add-bigcate3.png'
      },
      {
        src: '/finance/images/add-bigcate4.png'
      },
      {
        src: '/finance/images/add-bigcate5.png'
      },
      {
        src: '/finance/images/add-bigcate6.png'
      },
      {
        src: '/finance/images/add-bigcate7.png'
      },
      {
        src: '/finance/images/add-bigcate8.png'
      },
      {
        src: '/finance/images/add-bigcate9.png'
      },
      {
        src: '/finance/images/add-bigcate10.png'
      },
      {
        src: '/finance/images/add-bigcate11.png'
      },
      {
        src: '/finance/images/add-bigcate12.png'
      },
    ], //大类图标数组
    iconActiveArr: [{
        src: '/finance/images/add-bigcate-active1.png'
      },
      {
        src: '/finance/images/add-bigcate-active2.png'
      },
      {
        src: '/finance/images/add-bigcate-active3.png'
      },
      {
        src: '/finance/images/add-bigcate-active4.png'
      },
      {
        src: '/finance/images/add-bigcate-active5.png'
      },
      {
        src: '/finance/images/add-bigcate-active6.png'
      },
      {
        src: '/finance/images/add-bigcate-active7.png'
      },
      {
        src: '/finance/images/add-bigcate-active8.png'
      },
      {
        src: '/finance/images/add-bigcate-active9.png'
      },
      {
        src: '/finance/images/add-bigcate-active10.png'
      },
      {
        src: '/finance/images/add-bigcate-active11.png'
      },
      {
        src: '/finance/images/add-bigcate-active12.png'
      },
    ], //大类激活图标数组
    bgActiveIndex: '',
    bgActive: [],
    firstCateName: '', //添加的大类名称
    isDeleteFirCate: false, //是否删除大类
    isDeleteSecCate: false, //是否删除小类

  },
  showSecondCate(event) {
    let choiceIndex = event.currentTarget.dataset.index;
    this.setData({
      choiceIndex: choiceIndex,
      listId: event.currentTarget.dataset.id,
    });
    let that = this
    if (that.data.recordType == "1") {
      let data = {
        token: wx.getStorage({
          key: "token"
        })
      }
      api.finance.getXlList(data)
        .then(res => {
          if (res.code == 1) {
            let arr1 = []
            console.log(res.datas.sub_classes)
            for (let i = 0; i < res.datas.sub_classes.length; i++) {
              arr1.push(res.datas.sub_classes[i])
            }
            that.setData({
              secondCategory: arr1,
            })
          }
        })
        .catch(err => {

        })
    } else {
      let data1 = {
        parent_class_id: that.data.listId
      }
      api.finance.outsList(data1)
        .then(res => {
          if (res.code == 1) {
            let arr1 = []
            console.log(res.datas.sub_classes)
            for (let i = 0; i < res.datas.sub_classes.length; i++) {
              arr1.push(res.datas.sub_classes[i])
            }
            that.setData({
              expenditureSecCate: arr1,
            })
          }
        })
        .catch(err => {

        })
    }

  },
  //删除大类
  remove(e) {
    console.log(e);
   let that =this 
   if(that.data.recordType=="1"){
     let data = {
       class_ids: e.currentTarget.dataset.id
     }
     api.finance.removeBgList(data)
       .then(res => {
         if (res.code == 1) {
           wx.showToast({
             title: '删除成功',
             icon: 'none',
             duration: 1500
           })
           that.setData({
             showFirCateModal: false,
             isDeleteFirCate: !that.data.isDeleteFirCate
           })
         }
       })
       .catch(err => {

       })
   }if(that.data.recordType=="2"){
     let data = {
       class_ids: e.currentTarget.dataset.id
     }
     api.finance.removeoutBgList(data)
       .then(res => {
         if (res.code == 1) {
           wx.showToast({
             title: '删除成功',
             icon: 'none',
             duration: 1500
           })
           that.setData({
             showFirCateModal: false,
             isDeleteFirCate: !that.data.isDeleteFirCate
           })
         }
       })
       .catch(err => {

       })
   }

  },
  //新增小类
  trueMask() {
    let that = this
  if(that.data.recordType=="1"){
    let data = {
      parent_class_id: that.data.listId,
      class_name: that.data.smName,
    }
    api.finance.newSList(data)
      .then(res => {
        if (res.code == 1) {
          wx.showToast({
            title: '添加成功',
            icon: 'none',
            duration: 1500
          })
          that.setData({
            showmask: false,
            showSecondCateModal: false
          });

        }
      })
      .catch(err => {

      })
  }
  if(that.data.recordType=="2"){
    let data = {
      parent_class_id: that.data.listId,
      class_name: that.data.smName,
    }
    api.finance.newoutSList(data)
      .then(res => {
        if (res.code == 1) {
          wx.showToast({
            title: '添加成功',
            icon: 'none',
            duration: 1500
          })
          that.setData({
            showmask: false,
            showSecondCateModal: false
          });

        }
      })
      .catch(err => {

      })
  }
   
  },

  clsoeMask() {
    this.setData({
      showmask: false,
      showSecondCateModal: false
    });
  },
  //删除小类
  remove1(e) {
    let that = this
    console.log(e.currentTarget.dataset.id)
   if(that.data.recordType=="1"){
     let data = {
       class_name: that.data.firstCateName,
       class_ico: e.currentTarget.dataset.id,
     }
     api.finance.removeSList(data)
       .then(res => {
         if (res.code == 1) {
           console.log(res)
           wx.showToast({
             title: '删除成功',
             icon: 'none',
             duration: 1500
           })
         }
         that.setData({
           showFirCateModal: false,
           isDeleteSecCate: !this.data.isDeleteSecCate
         });

       })
       .catch(err => {

       })
   }if(that.data.recordType=="2"){
     let data = {
       class_name: that.data.firstCateName,
       class_ico: e.currentTarget.dataset.id,
     }
     api.finance.removeoutSmList(data)
       .then(res => {
         if (res.code == 1) {
           console.log(res)
           wx.showToast({
             title: '删除成功',
             icon: 'none',
             duration: 1500
           })
         }
         that.setData({
           showFirCateModal: false,
           isDeleteSecCate: !this.data.isDeleteSecCate
         });

       })
       .catch(err => {

       })
   }
  
  },
  changeIcon(e) {
    //点击大类图标改变颜色
    let bgActiveIndex = e.currentTarget.dataset.index;
    console.log(e)
    let bgArr = [];
    this.data.iconArr.forEach((i, j) => {
      if (j == bgActiveIndex) {
        bgArr.push(true);
      } else {
        bgArr.push(false);
      }
    });
    let that = this
    that.setData({
      bgActive: bgArr,
      bgActiveIndex: bgActiveIndex,
      class_ico: e.currentTarget.dataset.src
    });

  },


  //新增大类
  showFirCateModal() {
    this.setData({
      showFirCateModal: true
    });
  },
  smName(e) {
    console.log(e.detail.value)
    let that = this
    that.setData({
      smName: e.detail.value
    })
  },
  deleteFirCate() {
    //删除大类
    this.setData({
      isDeleteFirCate: !this.data.isDeleteFirCate
    });
  },

  deleteSecCate() {
    //删除小类
    this.setData({
      isDeleteSecCate: !this.data.isDeleteSecCate
    });
  },

  closeFirmask() {
    this.setData({
      showFirCateModal: false
    });
  },

  getFirstName(e) {
    this.setData({
      firstCateName: e.detail.value
    });
  },
  //确认添加大类
  confirmAddFirstCate() {
    if (!this.data.firstCateName) {
      //如果没有输入大类名称，则给出提示
      wx.showToast({
        title: '请输入大类名称！',
        icon: 'none',
        duration: 1500
      })
      return
    }
    if (this.data.bgActive.length == 0) {
      //如果没有选择图标则给出提示
      wx.showToast({
        title: '请选择图标！',
        icon: 'none',
        duration: 1500
      })
      return
    }
    if (this.data.recordType == "1"){
      let that = this
      let data = {
        class_name: that.data.firstCateName,
        class_ico: that.data.class_ico,
      }
      api.finance.newBgList(data)
        .then(res => {
          if (res.code == 1) {
            console.log(res)
            wx.showToast({
              title: '添加成功',
              icon: 'none',
              duration: 1500
            })
          }
          that.setData({
            showFirCateModal: false
          });

        })
        .catch(err => {

        })
    }
    if (this.data.recordType == "2"){
      let that = this
      let data = {
        class_name: that.data.firstCateName,
        class_avatar: that.data.class_ico,
      }
      api.finance.newoutBList(data)
        .then(res => {
          if (res.code == 1) {

            console.log(res)
            wx.showToast({
              title: '添加成功',
              icon: 'none',
              duration: 1500
            })
          }
          that.setData({
            showFirCateModal: false
          });

        })
        .catch(err => {

        })
    }
  },


  //新增小类
  showSecCateModal() {
    this.setData({
      showSecondCateModal: true,
      showmask: true
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //页面加载时判断是记支出过来的还是记收入过来的
    console.log(options);
    this.setData({
      recordType: options.recordType
    });
    let that = this
    console.log(that.data.recordType + "zxcv")
    if (that.data.recordType == "1") {
      let data = {
        token: wx.getStorage({
          key: "token"
        })
      }
      api.finance.getIncomeList(data)
        .then(res => {
          if (res.code == 1) {
            let arr = []
            console.log(res.datas.incomes)
            for (let i = 0; i < res.datas.incomes.length; i++) {
              arr.push(res.datas.incomes[i])
            }
            that.setData({
              firstCategory: arr,

            })
          }
        })
        .catch(err => {

        })
      api.finance.getXlList(data)
        .then(res => {
          if (res.code == 1) {
            let arr1 = []
            console.log(res.datas.sub_classes)
            for (let i = 0; i < res.datas.sub_classes.length; i++) {
              arr1.push(res.datas.sub_classes[i])
            }
            that.setData({
              secondCategory: arr1,
            })
          }
        })
        .catch(err => {

        })
    }
    if (that.data.recordType == "2") {
      let data = {
        token: wx.getStorage({
          key: "token"
        })
      }
      api.finance.outlayList(data)
        .then(res => {
          if (res.code == 1) {
            console.log(res.datas.outlays)
            that.setData({
              expenditureFirCate: res.datas.outlays,
            })
          }
        })
        .catch(err => {

        })
      let data1 = {
        parent_class_id: that.data.listId
      }
      api.finance.outsList(data1)
        .then(res => {
          if (res.code == 1) {
            let arr1 = []
            console.log(res.datas.sub_classes)
            for (let i = 0; i < res.datas.sub_classes.length; i++) {
              arr1.push(res.datas.sub_classes[i])
            }
            that.setData({
              expenditureSecCate: arr1,
            })
          }
        })
        .catch(err => {

        })
    }
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})