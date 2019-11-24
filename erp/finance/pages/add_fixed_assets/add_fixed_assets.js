// finance/pages/add_fixed_assets/add_fixed_assets.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate:'2019-06-07',  //购买时间
    items1: [],
    items2: [],
    shadow: false,
    incomeContent: '请选择',  //使用人
    accountContent: '请选择', //管理员

    isSearch: false,
    selectModal: '', //选择的弹框是2个之中的哪一个
    showCateModal: false,
    cateData: [],  //类别数据
    choiceCateContent: '无类别',   //选择的分类，默认是无类别
    showAddCateModal: false,  //是否显示增加类别弹框
    fixedName:'',   //资产名称
    fixedDescription:'',   //规格描述
    fixedSn:'',   //序列号
    fixedPrice:'',  //资产价格
    fixedDepreciation:'',  //折旧期限
    fixedSalvage:'',  //资产残值
    initialDepreciation:'',  //初期折旧
    fixedNote:'',   //备注
    staffList:[],  //员工列表
    userID:'',  //使用人ID
    administrator_id:'', //管理员ID
    recorder_id:'',  //录入人ID，就是当前用户的ID
    fixedcat_id:'',  //类别id
    addCategoryName: '',  //新增类别的名称
    showPicker:false,
    showAddImgModel:false,
    imageList: [],  //图片数组
    addImgList: {
      title: '选择操作',
      detail: [{
        cname: '拍照',
        eventName: 'showReceiptModel',

        imageSrc: '/images/market-photo.png'
      }, {
        cname: '相册',
        eventName: 'showReceiptModel2',

        imageSrc: '/finance/images/album.png'
      }],


    },
  },

  //获取弹窗函数
  getEventName(e) {
    var eventName = e.detail.event_name;

    if (e.detail.event_name == 'showReceiptModel') {
      this.showReceiptModel();
    }

    else if (e.detail.event_name == 'showReceiptModel2') {
      this.showReceiptModel2();
    }

    else if (e.detail.event_name == 'bluetoothPrint') {
      //蓝牙打印
    }

  },

  //相机获取图片
  showReceiptModel() {
    let _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        _this.setData({
          goodsImage: tempFilePaths[0],
          showAddImgModel: false,
        })
        if (_this.data.imageList.length) {
          _this.setData({
            //showCalculator: false,
            imageList: [..._this.data.imageList, tempFilePaths[0]]
          })
        } else {

          let imgList = [];
          imgList.push(tempFilePaths[0]);
          _this.setData({
            imageList: imgList

          })

        }
        //更新改采购单的信息
        console.log(_this.data.imageList)
      }
    })
  },
  //相册获取图片
  showReceiptModel2() {
    let _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        _this.setData({
          goodsImage: tempFilePaths[0],
          showAddImgModel: false,
        })

        if (_this.data.imageList.length) {
          _this.setData({
            // showCalculator: false,
            imageList: [..._this.data.imageList, tempFilePaths[0]]
          })
        } else {
          let imgList = [];
          imgList.push(tempFilePaths[0]);
          _this.setData({
            imageList: imgList

          })
        }
        //更新改采购单的信息

      }
    })
  },
  //预览图片
  previewImage(e) {
    console.log(e)
    let imageList = this.data.imageList,
      index = e.currentTarget.dataset.index;
    this.setData({
      previewImage: true,
      previewImageIndex: index,
      swiperIndex: index
    })
  },

  //取消预览
  closePreview() {
    this.setData({
      previewImage: false
    })
  },
  //删除图片弹窗
  delImage() {
    this.setData({
      delImageFlag: true
    })
  },
  //取消删除图片
  delImageCancel() {
    this.setData({
      delImageFlag: false
    })
  },
  //确认删除图片
  delImageConfirm() {
    let imageList = this.data.imageList,
      money = this.data.imageList[this.data.swiperIndex].money;
    let newImageList = imageList.filter((item, index) => {
      if (index != this.data.swiperIndex) {
        return item
      }
    })
    if (!newImageList.length) {
      this.setData({
        previewImage: false
      })
    }
    if (this.data.previewImageIndex >= newImageList.length) {
      this.setData({
        previewImageIndex: newImageList.length - 1
      })
    }
    if (!newImageList.length) {
      this.setData({
        showCalculatorModal: true,
        totalMoney: 0
      })
    }
    this.setData({
      imageList: newImageList,
      delImageFlag: false
    })
  },

  //添加图片弹窗
  showAddImgModel() {
    this.setData({
      showMoreOperations: false,
      showAddImgModel: true
    })
  },
  //图片预览操作的index
  selectSwiperImageIndex(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  },

  setTime(e) {

    let month = parseInt(e.detail.month) >= 10 ? e.detail.month : '0' + e.detail.month;
    let day = parseInt(e.detail.day) >= 10 ? e.detail.day : '0' + e.detail.day;
    let startTime = e.detail.year + '-' + month + '-' + day
    this.setData({
      startDate: startTime
    })
  },


  cancel() {
    this.setData({
      showPicker: false
    })
  },


  showPicker() {
    //显示开始日期弹框
    this.setData({
      showPicker: true
    })
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
            showCateModal: false
          });
          this.getFixedAssetsCateList();
          wx.showToast({
            title: '操作成功!',
            icon: 'none',
            duration: 1500
          })
        })
    } else {
      this.setData({
        showAddCateModal: false

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

  confirmAddFixed(){
    //确认新建固定资产
    //固定资产名称是必须的  还有使用人和管理员ID必须
    if (!this.data.fixedName){
      wx.showToast({
        title: '请输入资产名称!',
        duration:1500,
        icon:'none'
      })
      return
    }
  

    const data = {
      fixedasset_name: this.data.fixedName,
      fixedcat_id: this.data.fixedcat_id,
      fixedasset_specification: this.data.fixedDescription,
      serial_number: this.data.fixedSn,
      buy_time: this.data.startDate,
      fixedasset_price: this.data.fixedPrice,
      depreciable_period: this.data.fixedDepreciation,
      fixedasset_salvage: this.data.fixedSalvage,
      beginning_depreciation: this.data.initialDepreciation,
      user_id: this.data.userID,
      recorder_id: this.data.recorder_id,  //录入人ID
      administrator_id: this.data.administrator_id,  //管理员ID
      note: this.data.fixedNote
    };
    console.log(data)
    this.addFixedAssets(data);
  },

  fixedNote(e){
    //备注的输入
    this.setData({
      fixedNote: e.detail.value
    });
  },

  initialDepreciation(e){
    //初期折旧的输入
    this.setData({
      initialDepreciation: e.detail.value
    });
  },

  fixedName(e){
    //监听资产名称的输入
    this.setData({

      fixedName:e.detail.value
    });
  },

  fixedDescription(e){
    //监听规格描述的输入
    this.setData({
      fixedDescription: e.detail.value
    });
  },

  fixedSn(e){
    //序列号的输入
    this.setData({
      fixedSn: e.detail.value
    });
  },

  fixedPrice(e){
    //资产价格的输入
    this.setData({
      fixedPrice: e.detail.value
    });
  },

  fixedDepreciation(e){
    //折旧期限的输入
    this.setData({
      fixedDepreciation: e.detail.value
    });
  },

  fixedSalvage(e){
    //资产残值的输入
    this.setData({
      fixedSalvage: e.detail.value
    });
  },

  addFixedAssets(data){
    //新增固定资产
    api.finance2.addFixedAssets(data)
      .then(res => {
        console.log(res);
        if(res.code === 1){
          wx.navigateBack({
            delta:1
          });
          wx.showToast({
            title: '操作成功!',
            icon:'success',
            duration:1500
          })

        }
      })
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

  showCateModal() {
    //显示选择分类弹框
    this.setData({
      showCateModal: true,
      
    });
  },
  closeCateModal() {
    this.setData({
      showCateModal: false
    });
  },

  choiceCateContent(e) {
    //选择相应分类也关闭弹框
    console.log(e)
    this.setData({
      showCateModal: false,
      choiceCateContent: e.currentTarget.dataset.catetext,
      fixedcat_id: e.currentTarget.dataset.id
    });
  },


  //两个弹框之间
  showIncomeModal() {

    this.setData({
      selectModal: 1,
    });
    if (this.data.items1.length) {
      //如果不是第一次点开,要保留之前的选择的内容
      this.setData({
        shadow: true,
        items1: this.data.items1,

      });

    } else {
      this.data.items1.push({value: '请选择', checked: true, user_id: 'none'});
      this.data.staffList.forEach(item => {
        this.data.items1.push({value:item.user_name,checked:false,user_id:item.user_id})
      });
      this.setData({
        shadow: true,
        
        items1: this.data.items1

      });
    }


  },

  closeModal() {
    this.setData({
      shadow: false
    })
  },

  showAccountModal() {
    this.setData({
      selectModal: 2,
    });
    if (this.data.items2.length) {
      //如果不是第一次点开,要保留之前的选择的内容
      this.setData({
        shadow: true,
        items2: this.data.items2,

      });
    } else {
      this.data.items2.push({ value: '请选择', checked: true, administrator_id: 'none' });
      this.data.staffList.forEach(item => {
        this.data.items2.push({ value: item.user_name, checked: false, administrator_id: item.user_id })
      });
      this.setData({
        shadow: true,

        items2: this.data.items2

      });
    }
  },

  choiceContent(e) {
    //选择相应的内容
    //根据选择的哪个弹框来改变相应弹框的值
    
    if (this.data.selectModal == 1) {
      for (var i in this.data.items1) {
        if (this.data.items1[i].value == e.detail) {
          this.data.items1[i].checked = true;
          this.setData({
            userID: this.data.items1[i].user_id
          });
        }
        else {
          this.data.items1[i].checked = false;
        }

      }
      this.setData({
        shadow: false,
        items1: this.data.items1,
        incomeContent: e.detail
      });
    }
    else if (this.data.selectModal == 2) {
      for (var i in this.data.items2) {
        if (this.data.items2[i].value == e.detail) {
          this.data.items2[i].checked = true;
          this.setData({
            administrator_id: this.data.items2[i].administrator_id
          });
        }
        else {
          this.data.items2[i].checked = false;
        }

      }
      this.setData({
        shadow: false,
        items2: this.data.items2,
        accountContent: e.detail
      });
    }


  },

  //修改日期
  changeStartDate(event) {
    this.setData({
      startDate: event.detail.value
    });
  },

  getStaff(){
    api.finance2.getStaff()
      .then(res => {
        console.log(res);
        this.setData({
          staffList:res.datas.users
        });
      })
  },

  getMemberInfo(){
    //获取用户信息
    api.finance2.getMemberInfo()
      .then(res => {
        console.log(res);
        if(res.code === 1){
          this.setData({
            recorder_id:res.data.id
          });
        }
      })
  },

  getFixedAssetsCateList(){
    //获取种类列表
    api.finance2.getFixedAssetsCateList()
      .then(res => {
        console.log(res);
        if(res.code === 1){
          this.setData({
            cateData: res.datas.fixedasset_cats

          });
        }
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取员工列表
    this.getStaff();
    this.getMemberInfo();
    this.getFixedAssetsCateList();
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