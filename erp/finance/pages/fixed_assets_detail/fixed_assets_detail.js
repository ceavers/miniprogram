// finance/pages/fixed_assets_detail/fixed_assets_detail.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showOperateModal:false,
    fixedDeatil:'',
    jsonFixedDeatil:'', 
    isModify:false,  //用来标志从修改页面跳过来是否修改过，修改过就刷新数据 
    shadow2:false,  //控制删除弹框的显示
    imageList:[] ,  //图片数组
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

  delData() {
    //删除固定资产
    const data = {
      fixedasset_id: this.data.fixedasset_id
    };

    api.finance2.delFixedAssets(data)
      .then(res => {
        console.log(res);
        if(res.code === 1){
          let pages = getCurrentPages();
          let prevpage = pages[pages.length -2];
          prevpage.setData({
            isDel:true
          });
          wx.navigateBack({
            delta:1
          })

          wx.showToast({
            title: '删除成功!',
            icon:'none',
            duration:1500
          })
        }
      })
  },

  showDelModal(){
    //开启删除弹框
    this.setData({
      shadow2: true
    });
  },

  closeDelModal() {
    //关闭删除弹框
    this.setData({
      shadow2: false
    });
  },


  showOperateModal(){
    this.setData({
      showOperateModal:true
    });
  },
 
  closeOperateModal(){
    this.setData({
      showOperateModal: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      fixedasset_id: options.fixedasset_id
    });
    
    this.getFixedDeatil();
    
  },

  updateStatus(){
    this.setData({
      isModify:false
    });
  },

  getFixedDeatil() {
    //获取固定资产详情
    const data = {
      fixedasset_id: this.data.fixedasset_id
    }
    api.finance2.getFixedDeatil(data)
      .then(res => {
        console.log(res);
        if (res.code === 1) {
          
          this.setData({
            fixedDeatil: res.data,
            jsonFixedDeatil:JSON.stringify(res.data)
          });
          if (res.data.fixedasset_imgs.length){
            res.data.fixedasset_imgs.forEach(item => {
              this.data.imageList.push(item.fixedasset_img_url);
            })
            this.setData({
              imageList: this.data.imageList
            })
          }
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
    //每次进入这个页面刷新数据
    if (this.data.isModify){
      this.getFixedDeatil();
    }
    
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