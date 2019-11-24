// warehouse/pages/addgoods/addgoods.js
import {api} from "../../../utils/api/api.js"
import {baseUrl} from "../../../utils/api/http.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:1, //页面状态 1-增 2-删 3-改 4-查

    goodsInfo:[],//商品信息 修改

    goods_name:'',//商品名称
    selling_price:'',//售价
    buying_price:'',//进价

    isRoll:false,//弹窗开启时禁止屏幕滚动
    
    textareaVal:'',//文本域内容
    textRealVal:'',//文本域 替代内容

    avatar:'',//图片
    imgShow: false,//图片弹窗开关
    havaPic: true,//是否选择 有 图片
    imgList: [],//图片列表
    previewModal:false,//预览弹窗
    delPop:false,//预览 删除弹窗
    currentID: '',//当前显示的图片 角标
    
    category:'',
    categoryShow: false,//类别弹窗开关
    //categoryList: ["流行男鞋","上衣","连衣裙","裤装","亲子装","时尚女鞋","裤装","亲子装"],//类别列表
    categoryList: [],//类别列表
    categoryIndex: 0,//选中的类别 默认 第一个

    // categoryInfoList:["上装","T恤","披风","衬衫"],//类别详情列表
    categoryInfoList:[],//子类别列表
    categoryInfoShow:false,//详细类别弹窗开关
    categoryInfoIdx:0,//选中的子类别 默认 第一个

    addCategoryShow:false,//新增类别弹窗 开关
    addCategoryType: '',//当前新增弹窗 类型 color-新增颜色 category-新增类别
    addCategoryTitle:'',
    addCategoryVal:'',//新增类别
    addCategoryInput:'',//重置input内容

    colorId:0,
    sizeid:0,
    color:'',// 颜色
    size: '',//尺码
    colorShow:false,//颜色弹窗 开关
    colorShowType:'',//打开颜色弹窗的类型  颜色尺码公用弹窗 color-颜色 size-尺码
    
    colorList: [],//颜色列表 通过接口获取
    
    sizeList: [         //尺码列表 通过接口获取
      { size_id: 1, size: "均码" },
      { size_id: 4, size: "XXXS" }, 
      { size_id: 15, size: "SL" }, 
      { size_id: 8, size: "XS" }, 
      { size_id: 5, size: "S" }, 
      { size_id: 9, size: "XS" }, 
      { size_id: 2, size: "M" }, 
      { size_id: 6, size: "XL" }, 
      { size_id: 7, size: "XXL" }, 
      { size_id: 0, size: "XXXL" }],

    colorCheckedList: [],//选中的颜色列表
    colorTempList:[],//选择颜色的临时列表 -点击确认才可上传
    sizeCheckedList: [],//选中的尺码列表
    sizeTempList: [],//选择尺码的临时列表 -点击确认才可上传

    dialogShow: false,//删除颜色 确认弹窗 开关

    product_code:'',//商品编号（货号）
    sweepCode:'',//扫一扫
    unit_barcode_active:0 ,//是否启用单品条码 默认0 0-未启用 1-启用
    units_sku: [],//单品条码;数据列表
    units_stock: []//单品初始库存;数据列表
  },

  //预览图片 
  previewImage(e){
    var imgList = this.data.imgList;
    var url = e.currentTarget.dataset.url;
    this.setData({
      previewModal:true,
      isRoll: true,
      currentID: e.currentTarget.dataset.index
    })
  },
  // 关闭预览 弹窗
  closeModal(){
    this.setData({
      previewModal: false,
      isRoll: false
    })
  },

  // 获取当前显示图片的角标
  getImgId(e){
    var imgId = e.detail.current;
    this.setData({
      currentID:imgId
    })
  },

  // 预览中 打开删除图片弹窗
  openDelPop(){
    this.setData({
      delPop: true
    })
  },

  // 预览中 删除图片弹窗 点击删除
  delImg(){
    var list = this.data.imgList
    var currentID = this.data.currentID;
    // if (currentID == list.length-1){//是最后一张
    //   if (currentID==0){
    //     this.setData({
    //       currentID: 0
    //     })
    //     list.splice(this.data.currentID, 1)
    //   }else{
    //     this.setData({
    //       currentID: this.data.currentID - 1
    //     })
    //     list.splice(this.data.currentID+1, 1)
    //   }
    // }else{//不是最后一张 
    //   this.setData({
    //     currentID: this.data.currentID
    //   })
    //   list.splice(this.data.currentID, 1)
    // }
    if(currentID != list.length-1){//不是最后一张 删除后显示后一张
        this.setData({
          currentID: this.data.currentID
        })
        list.splice(this.data.currentID, 1)
    }else{
      if (currentID != 0) {//是最后一张但不是第一张 删除后显示前一张
        this.setData({
          currentID:this.data.currentID -1
        })
        list.splice(this.data.currentID + 1, 1)
      }else{//只剩一张 
        this.setData({
          currentID:0
        })
        list.splice(this.data.currentID, 1)
      }
    }
    if (list.length > 0) {
      this.setData({
        imgList: list,
        delPop: false,
      })
    } else {
      this.setData({
        imgList:[],
        havaPic:true,
        previewModal: false,
        delPop: false,
      })
    }
  },
  // 预览中 删除图片弹窗 点击取消
  cancel(){
    this.setData({
      delPop: false
    })
  },
  // 删除弹窗 点击遮罩 关闭删除弹窗
  previewCancle(){
    this.setData({
      delPop: false
    })
  },

  // 监听文本域内容 替换
  textareaValue(e) {
    this.setData({ textareaVal: e.detail.value })
  },

  // 选择图片
  choiceImg(){
    this.setData({
      imgShow:true,
      isRoll:true,
      textRealVal: this.data.textareaVal
    })
  },

  // 图片弹窗-选择相机
  camera(){
    var _this = this;
    wx.chooseImage({
      count:5,
      sizeType:['original'],
      sourceType: ['camera'],
      success: function(res) {
        var size = res.tempFiles[0].size;
        var path = res.tempFilePaths[0]
        console.log(path)
        var pictype = path.slice(-3)
        console.log(pictype)
        if (size > 1024 * 1024) {
          wx.showModal({
            title: '提示',
            content: '图片不能大于1M',
          })
          return false
        }
        if (pictype != 'png' && pictype != 'jpeg' && pictype != 'jpg' && pictype != 'bmp') {
          wx.showModal({
            title: '提示',
            content: '图片格式错误',
          })
          return false
        }
        _this.setData({
          havaPic: false,
          imgShow: false,
          isRoll: false
        })
        // 调用方法 上传图片
        // for (var i = 0; i < newList.length; i++) {
          _this.uploadImg(res.tempFilePaths, _this);
        // }
        wx.showLoading({
          title: '正在上传...',
        })
      },
    })
  },
  // 图片弹窗-选择相册
  album(){
    var _this =this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album'],
      success: function (res) {
        // if(res.tempFilePaths.length>0){
        //   const tempFilePaths = res.tempFilePaths;
        //   var newList = [];
        //   for (var i = 0; i < tempFilePaths.length; i++) {
        //     newList.push(tempFilePaths[i]);
        //   }
        //   _this.setData({
        //     havaPic:false,
        //     imgShow: false,
        //     isRoll: false,
        //   })
        // }else{
        //   _this.setData({
        //     havaPic:true
        //   })
        // }
        var size = res.tempFiles[0].size;
        var path = res.tempFilePaths[0]
        console.log(path)
        var pictype = path.slice(-3)
        console.log(pictype)
        if(size > 1024*1024){
          wx.showModal({
            title: '提示',
            content: '图片不能大于1M',
          })
          return false
        }
        if (pictype != 'png' && pictype != 'jpeg' && pictype != 'jpg' && pictype != 'bmp'){
          wx.showModal({
            title: '提示',
            content: '图片格式错误',
          })
          return false
        }
        _this.setData({
          havaPic:false,
          imgShow:false,
          isRoll:false
        })
        // 调用方法 上传图片
        // for (var i = 0; i < newList.length;i++){
          _this.uploadImg(res.tempFilePaths, _this);
        // }
        wx.showLoading({
          title: '正在上传...',
        })
      },
    })
  },

  // 上传图片
  uploadImg(tempFilePaths,_this){
    wx.uploadFile({
      url: `${baseUrl}/2xukn3Iw`,
      filePath: tempFilePaths[0],
      name: 'file',
      formData:{
        location:'head',
      },
      success:function(res){
        const data =JSON.parse(res.data);
        let jsonStr = JSON.stringify(_this.data.imgList)
        var list = JSON.parse(jsonStr)
        list.push(data.data.path)
        _this.setData({
          imgList: list
        })
        wx.hideLoading()
      },
      fail:function(err){
        wx.hideLoading()
      }
    })
  },

  // 图片弹窗 关闭按钮
  closeImg(){
    this.setData({
      imgShow:false,
      isRoll:false
    })
  },

  // 点击遮罩层 关闭弹窗 允许滚动 清空颜色/尺码临时列表
  popCancle(){
    this.setData({
      isRoll: false,
      colorTempList:[],
      sizeTempList:[],
    })
  },

  // 监听商品名输入
  getGoodsName(e){
    this.setData({
      goods_name: e.detail.value
    })
  },
  
  // 选择类别 弹窗
  choiceCategory(){
    this.selectCategory();
    this.setData({
      textRealVal: this.data.textareaVal,
      categoryShow: true,
      isRoll: true,
    })
  },

  //查询类别 方法
  selectCategory(){
    var _this = this
    api.warehouse.getCategory({})
      .then(res => {
        var categoryList = res.datas.categorys 
        _this.setData({
          categoryList: categoryList,
        })
      })
      .catch(err => {

      })
  },

  // 查询颜色/尺码 枚举属性列表
  selectColorList(){
    var _this =this
    api.warehouse.enumCateList({})
      .then(res=>{
        let colorlist = res.data.results
        let list = []
        for (var i = 0; i < colorlist.length;i++){
          list.push({ color_id: colorlist[i].cate_val_id, color: colorlist[i].cate_val_name})
        }
        _this.setData({
          colorList: list,
        })
        // 加入默认值 默认第一个选中
        if (this.data.state == 1) {
          let list2 = []
          list2.push({ color_id: colorlist[0].cate_val_id })
          this.setData({
            colorCheckedList: list2,
            color: colorlist[0].cate_val_name
          })

          // 暂时加入尺码 默认值
          let list = [{ size_id:1}]
          this.setData({
            size:'均码',
            sizeCheckedList: list
          })
        }
      })
      .catch(err=>{

      })
  },

  //类别弹窗 关闭按钮 
  closeCategory(){
    this.setData({
      categoryShow:false,
      isRoll: false
    })
  },
  
  // 获取选中的类别 选择 子类别弹窗
  choiceCategoryInfo(e){
    var id = e.currentTarget.dataset.id;//获取到点击的第几个
    this.setData({
      categoryIndex: id
    })
    var list = this.data.categoryList
    if (list[id].subclass){             //如果有子类别 开启子类别弹窗
      var categoryInfoList = list[id].subclass
      this.setData({
        categoryInfoList:categoryInfoList,
        categoryInfoShow:true,
        // isRoll:true
      })
    }else{
      wx.showToast({
        title: '暂无小类！',
        icon:'none'
      })
    }
  },


  // 子类别弹窗 关闭按钮 
  colseCategoryInfo(){
    this.setData({
      categoryInfoShow: false,
      // isRoll: false
    })
  },
  // 获取选中的子类别
  categoryInfoIndex(e){
    var bigList = this.data.categoryList//获取大类
    let bigid = this.data.categoryIndex//大类id
    var bigValue = bigList[bigid].category_name//大类名称
    var smList = this.data.categoryInfoList//获取小类
    let smid = e.currentTarget.dataset.id;//小类id
    var smValue = smList[smid].class_name//小类名称
    var value = bigValue + "-" + smValue
    this.setData({
      category: value,
      categoryInfoIdx:smid,
      categoryInfoShow:false,
      categoryShow:false,
      isRoll:false
    })
  },

  // 管理 按钮 跳转至类别管理页
  toEditCategory(){
    this.setData({
      categoryShow: false,
      isRoll: false
    })
    wx.navigateTo({
      url: '../edit_category/edit_category',
    })
  },

  // 打开新增类别弹窗
  openAddCategory(e){
    var type = e.currentTarget.dataset.type
    if(type=="color"){
      this.setData({
        addCategoryTitle:"新增颜色",
        addCategoryType:'color'
      })
    } else if (type =="category"){
      this.setData({
        addCategoryTitle: "新增类别",
        addCategoryType: 'category'
      })
    }else if(type=="size"){
      this.setData({
        addCategoryTitle: "新增尺码",
        addCategoryType: 'size'
      })
    }
    this.setData({
      addCategoryShow:true
    })
  },

  // 新增类别 监听输入内容
  addCategoryInput(e){
    this.setData({
      addCategoryInput: e.detail.value
    })
  },
  // 新增类别 确定
  addcategory(){
    var _this = this;
    var type = this.data.addCategoryType//获取当前弹窗新增类型
    var value = this.data.addCategoryInput
    if (type =="category"){
      var list = this.data.categoryList;
      if (value.trim().length) {//判断是否为空 空格
        const date ={
          category_name:value,
          is_subclass:0
        }
        api.warehouse.addCategory(date)
          .then(res => {
            api.warehouse.getCategory({})
              .then(res => {
                var categoryList = res.datas.categorys  //大类
                _this.setData({
                  categoryList: categoryList,
                  addCategoryShow: false,
                  addCategoryInput: '',
                })
                wx.showToast({
                  title: '添加成功！',
                  icon: 'none'
                })
              })
              .catch(err => {})
          })
          .catch(err => {})
      } else {
        wx.showToast({
          title: '类别名称不能为空',
          icon: "none"
        })
      }
    }else if(type=="color"){
      var list = this.data.colorList;
      if (value.trim().length) {//判断是否为空 空格
        list.push({ color: value, state:false})
        this.setData({
          addCategoryShow: false,
          addCategoryInput: '',
          colorList:list
        })
      }else{
        wx.showToast({
          title: '颜色不能为空',
          icon: "none"
        })
      }
    }else if(type =="size"){
      var list = this.data.sizeList;
      if (value.trim().length) {//判断是否为空 空格
        list.push({size:value,state:false})
        this.setData({
          addCategoryShow: false,
          addCategoryInput: '',
          sizeList: list
        })
      } else {
        wx.showToast({
          title: '尺码不能为空',
          icon: "none"
        })
      }
    }
  },

  // 关闭新增类别 弹窗 
  closeAddCategory(){
    this.setData({
      addCategoryShow: false,
      addCategoryInput: ''
    })
  },

  // 监听售价输入内容
  getSellingPrice(e){
    this.setData({
      selling_price:e.detail.value
    })
  },

  // 监听进价输入内容
  getBuyingPrice(){
    this.setData({
      buying_price:e.detail.value
    })
  },

  // 打开颜色弹窗
  choiceColorShow(e){
    var type = e.currentTarget.dataset.type;
    if(type=="color"){
      var list = this.data.colorList;
      for (var i = 0; i < list.length; i++) {
        list[i].state = false
      }
      this.setData({ colorList: list})
      var choiceList = [...this.data.colorCheckedList]//数组为引用值 需重新赋值
      if(choiceList.length>0){
        for (var i = 0; i < choiceList.length; i++) {
          for(var j=0;j<list.length;j++){
            if(list[j].color_id===choiceList[i].color_id){
              list[j].state=true
            }
          }
        }
        this.setData({ 
          colorList: list,
          colorTempList: choiceList  //赋值给临时数组 后续改变临时数组 原数组不改变
        })
      }
    }else if(type=="size"){
      var list = this.data.sizeList;
      for (var i = 0; i < list.length;i++){
        list[i].state = false
      }
      this.setData({ sizeList: list})
      var choiceList = [...this.data.sizeCheckedList]
      if (choiceList.length > 0) {
        for (var i = 0; i < choiceList.length; i++) {
          for(var j=0;j<list.length;j++){
            if(list[j].size_id===choiceList[i].size_id){
              list[j].state=true
            }
          }
        }
        this.setData({ 
          sizeList: list,
          sizeTempList: choiceList
        })
      }
    }
    this.setData({
      colorShowType: type,
      colorShow:true,
      isRoll:true
    })
  },

  //颜色弹窗 关闭按钮  清空颜色/尺码 临时列表
  closeColor(){
    this.setData({
      colorShowType:'',
      colorTempList:[],
      sizeTempList:[],
      colorShow:false,
      isRoll: false
    })
  },

  // 颜色弹窗 点击选中-加入选中列表（点击取消-从选中列表删除）
  choiceColor(e){
    var id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    var type = this.data.colorShowType;
    if(type=="color"){
      var templist = this.data.colorTempList;
      var colorlist = this.data.colorList;
      if (templist.length>0){
        let flag=0  //列表有无此数据 0-无
        let indexj  //
        templist.forEach((item,index)=>{
          if(item.color_id===id){
            flag = 1;
            indexj= index
          }
        })
        if(flag){ //有此数据 删
          for (var i = 0; i < colorlist.length; i++) {
            if (colorlist[i].color_id === id) {
              colorlist[i].state = false
            }
          }
          this.setData({colorList:colorlist})
          templist.splice(indexj,1)
        }else{    //无此数据 加
          for (var i = 0; i < colorlist.length; i++) {
            if (colorlist[i].color_id === id) {
              colorlist[i].state = true
            }
          }
          this.setData({ colorList: colorlist })
          templist.push({ color_id: id})
        }
      }else{                          //若选中列表 无数据直接添加
        for (var i = 0; i < colorlist.length;i++){
          if (colorlist[i].color_id === id){
            colorlist[i].state =true
          }
        }
        this.setData({ colorList: colorlist })
        templist.push({ color_id: id})
      }
      this.setData({
        colorTempList: templist,
        colorId: index
      })
    }else if(type=="size"){
      var list = this.data.sizeTempList
      var sizelist = this.data.sizeList;
      if (list.length > 0) {
        let flag = 0  //列表有无此数据 0-无
        let indexj  //
        list.forEach((item, index) => {
          if (item.size_id === id) {
            flag = 1;
            indexj = index
          }
        })
        if (flag) { //有此数据 删
          // sizelist[id].state = false
          for(var i=0;i<sizelist.length;i++){
            if(sizelist[i].size_id===id){
              sizelist[i].state=false
            }
          }
          this.setData({ sizeList: sizelist })
          list.splice(indexj, 1)
        } else {    //无此数据 加
          // sizelist[id].state = true
          for (var i = 0; i < sizelist.length; i++) {
            if (sizelist[i].size_id === id) {
              sizelist[i].state = true
            }
          }
          this.setData({ sizeList: sizelist })
          list.push({ size_id: id })
        }
      } else {                          //若选中列表 无数据直接添加
        // sizelist[id].state = true
        for (var i = 0; i < sizelist.length; i++) {
          if (sizelist[i].size_id === id) {
            sizelist[i].state = true
          }
        }
        this.setData({ sizeList: sizelist })
        list.push({ size_id: id })
      }
      this.setData({
        sizeTempList: list,
        sizeid: index
      })
    }
  },

  // 颜色弹窗 长按删除 开启确认弹窗
  delColor(e){
    var _this = this
    var id = e.currentTarget.dataset.id;
    var type = this.data.colorShowType;
    if (type=="color"){
      var list = this.data.colorList
      // var value = list[id].color
      for(var i=0;i<list.length;i++){
        if(list[i].color_id===id){
          var value = list[i].color
        }
      }
      this.setData({ color: value })
    }else if(type=="size"){
      var list = this.data.sizeList
      // var value = list[id].size
      for(var i=0;i<list.length;i++){
        if(list[i].size_id===id){
          var value = list[i].size
        }
      }
      this.setData({ size: value })
    }
    if (this.data.state == 1) {
      this.setData({
        dialogShow: true
      })
    } else if (this.data.state == 3) {
      if (type == "color"){
        wx.showModal({
          title: '确认',
          content: '此颜色共有999个库存，确认删除？',
          success(res){
            if(res.confirm){
              _this.box_ConfirmBtn()
            }
          }
        })
      } else if (type == "size"){
        wx.showModal({
          title: '确认',
          content: '此尺码共有999个库存，确认删除？',
          success(res) {
            if (res.confirm) {
              _this.box_ConfirmBtn()
            }
          }
        })
      }
    }
  },

  // 确认弹窗 取消按钮
  box_CloseBtn(){
    this.setData({
      dialogShow:false,
      color:'',
      size:''
    })
  },
  // 确认弹窗 确定按钮 进行删除操作
  box_ConfirmBtn() {
    var type = this.data.colorShowType;
    if(type=="color"){
      var list = this.data.colorList;
      list.splice(this.data.colorId, 1)
      this.setData({
        colorList: list,
        dialogShow: false,
        color: '',
        size: ''
      })
    }else if(type=="size"){
      var list = this.data.sizeList;
      list.splice(this.data.sizeid, 1)
      this.setData({
        sizeList: list,
        dialogShow: false,
        color: '',
        size: ''
      })
    }
  },

  // 颜色弹窗 确认按钮
  colorSubmit(){
    var type = this.data.colorShowType;
    if(type=="color"){
      var list = this.data.colorTempList
      var colorlist =this.data.colorList
      if(list.length>0){
        let colorStr=''
        for(var i=0;i<list.length;i++){
          for (var j = 0; j < colorlist.length;j++){
            if(colorlist[j].color_id===list[i].color_id){
              var value = colorlist[j].color
            }
          }
          // var value = this.data.colorList[list[i].color_id].color
          if(i==0){
            colorStr = colorStr+ value
          }else{
            colorStr = colorStr+','+ value
          }
        }
        this.setData({
          color: colorStr,
          colorCheckedList: list,
          colorTempList:[],
          colorShow: false,
          isRoll: false,
          colorId: 0
        })
      }else{
        wx.showToast({
          title: '请选择颜色！',
          icon:'none'
        })
      }
    }else if(type=="size"){
      var list = this.data.sizeTempList
      var sizelist = this.data.sizeList
      if (list.length > 0) {
        let sizeStr = ''
        for (var i = 0; i < list.length; i++) {
          // var value = this.data.sizeList[list[i].size_id].size
          for(var j=0;j<sizelist.length;j++){
            if(list[i].size_id===sizelist[j].size_id){
              var value = sizelist[j].size
            }
          }
          if (i == 0) {
            sizeStr = sizeStr + value
          } else {
            sizeStr = sizeStr + ',' + value
          }
        }
        this.setData({
          size: sizeStr,
          sizeCheckedList: list,
          sizeTempList:[],
          colorShow: false,
          isRoll: false,
          colorId: 0
        })
      } else {
        wx.showToast({
          title: '请选择尺码！',
          icon: 'none'
        })
      }
    }
  },

  //监听货号 (商品编码)
  getProductCode(e){
    this.setData({
      product_code:e.detail.value
    })
  },

  // 扫一扫
  sweepCode(){
    var _this = this
    wx.scanCode({
      onlyFromCamera:true,
      scanType: ['barCode', 'qrCode'],
      success(res){
        console.log(res)
        _this.setData({
          sweepCode: res.result
        })   
      }
    })
  },

  // 深度克隆 数组为引用值 赋值时 赋值的是其地址 通过深度克隆 克隆出一个新数组 新旧互不影响
  deepClone: function (obj) {
    let newObj = Array.isArray(obj) ? [] : {}
    if (obj && typeof obj === "object") {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = (obj && typeof obj[key] === 'object') ? this.deepClone(obj[key]) : obj[key];
        }
      }
    }
    return newObj;
  },

  // 获取选中的颜色/尺码列表 并添加其值 转换为json对象
  jsonString(){
    var colorCheckedList = this.deepClone(this.data.colorCheckedList);
    var colorlist = this.data.colorList;
    var sizeCheckedList = this.deepClone(this.data.sizeCheckedList);
    var sizelist = this.data.sizeList;

    for (var i = 0; i < colorCheckedList.length; i++) {
      for (var j = 0; j < colorlist.length; j++) {
        if (colorlist[j].color_id === colorCheckedList[i].color_id) {
          colorCheckedList[i].color = colorlist[j].color
        }
      }
    }
    for (var i = 0; i < sizeCheckedList.length; i++) {
      for (var j = 0; j < sizelist.length; j++) {
        if (sizelist[j].size_id === sizeCheckedList[i].size_id) {
          sizeCheckedList[i].size = sizelist[j].size
        }
      }
    }
    var colorCheckedList = JSON.stringify(colorCheckedList);
    var sizeCheckedList = JSON.stringify(sizeCheckedList);
    const data = {
      colorCheckedList: colorCheckedList,
      sizeCheckedList: sizeCheckedList
    }
    return data;
  },

  // 启用单品条码 
  toBarCode() {
    if (this.data.colorCheckedList.length > 0 && this.data.sizeCheckedList.length>0){
      const data = this.jsonString();
      var colorCheckedList = data.colorCheckedList;
      var sizeCheckedList = data.sizeCheckedList;
      wx.navigateTo({
        url: '../enable_barCode/enable_barCode?colorCheckedList=' + colorCheckedList + "&sizeCheckedList=" + sizeCheckedList + '&state=' + this.data.state,
      })
    }else{
      wx.showToast({
        title: '请选择颜色尺码！',
        icon:'none'
      })
    }
  },

  // 设置初始库存 
  toEditInitialStock(){
    if (this.data.colorCheckedList.length > 0 && this.data.sizeCheckedList.length > 0) {
      const data = this.jsonString();
      var colorCheckedList = data.colorCheckedList;
      var sizeCheckedList = data.sizeCheckedList;
      console.log(colorCheckedList, sizeCheckedList)
      wx.navigateTo({
        url: '../edit_Initial_Stock/edit_Initial_Stock?colorCheckedList=' + colorCheckedList + "&sizeCheckedList=" + sizeCheckedList,
      })
    } else {
      wx.showToast({
        title: '请选择颜色尺码！',
        icon: 'none'
      })
    }
  },



  // 确认新建 按钮
  addBtn(){
    var _this =this
    if (this.data.goods_name.trim().length){
      if (this.data.state === 1){
        const data = {
          product_name: this.data.goods_name,//商品名称
          category_id: this.data.categoryList[this.data.categoryIndex].category_id,
          //subclass_id: this.data.categoryInfoList[this.data.categoryInfoIdx].class_id,
          selling_price: this.data.selling_price,//售价
          buying_price: this.data.buying_price,//进价
          colors: this.data.colorCheckedList,//颜色合集
          sizes: this.data.sizeCheckedList,//尺码合集
          product_code: this.data.product_code,  //商品编码(货号)
          barcode: this.data.sweepCode,//扫一扫 条码
          unit_barcode_active: this.data.unit_barcode_active, //是否启用单品条码
          units_sku: this.data.units_sku,//单品条码;数据列表
          units_stock: this.data.units_stock,//单品初始库存
          note: this.data.textareaVal//商品备注
        }
        if (this.data.categoryInfoList.length > 0) {
          data.subclass_id = this.data.categoryInfoList[this.data.categoryInfoIdx].class_id //小类id
        }
        api.warehouse.addGoods(data)
          .then(res => {
            const dat = {
              product_id: res.data.product_id,
              imgs: _this.data.imgList
            }
            api.warehouse.uploadImage(dat)
              .then(res=>{
                wx.showToast({
                  title: '新建成功！',
                  icon:'none'
                })
                setTimeout(function(){
                  wx.navigateBack({
                    delta:1
                  })
                }, 500)
              })
              .catch(err=>{

              })
          })
          .catch(res => {

          })
      }else if(this.data.state === 3){
        const data = {
          product_name: this.data.goods_name,//商品名称
          category_id: this.data.categoryList[this.data.categoryIndex].category_id,
          //subclass_id: this.data.categoryInfoList[this.data.categoryInfoIdx].class_id,
          selling_price: this.data.selling_price,//售价
          buying_price: this.data.buying_price,//进价
          colors: this.data.colorCheckedList,//颜色合集
          sizes: this.data.sizeCheckedList,//尺码合集
          product_code: this.data.product_code,  //商品编码(货号)
          barcode: this.data.sweepCode,//扫一扫 条码
          unit_barcode_active: this.data.unit_barcode_active, //是否启用单品条码
          units_sku: this.data.units_sku,//单品条码;数据列表
          units_stock: this.data.units_stock,//单品初始库存
          note: this.data.textareaVal//商品备注
        }
        if (this.data.categoryInfoList.length > 0) {
          data.subclass_id = this.data.categoryInfoList[this.data.categoryInfoIdx].class_id //小类id
        }
      }
    }else{
      wx.showToast({
        title: '请输入商品名称!',
        icon:'none'
      })
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.selectCategory();  //查询类别接口
    this.selectColorList(); //查询颜色接口
    if(options.goodsId){
      console.log("状态：", options.state, "商品id：", options.goodsId)
      var goodsInfo = JSON.parse(options.goodsInfo)
      console.log("商品信息：", goodsInfo)
      var imglist = [];
      if (goodsInfo.product_imgs.length > 0) {
        for (var i = 0; i < goodsInfo.product_imgs.length; i++) {
          imglist.push(goodsInfo.product_imgs[i].pic_url)
        }
        this.setData({
          havaPic: false
        })
      }

      for (var i=0;i<this.data.categoryList;i++){
        if (this.data.categoryList[i].category_id === goodsInfo.category_id){
          this.setData({ categoryIndex:i})
        }
      }
      for (var i = 0; i < this.data.categoryInfoList;i++){
        if (this.data.categoryInfoList[i].class_id === goodsInfo.subclass_id){
          this.setData({ categoryInfoIdx:i})
        }
      }
      
      let colorStr = ''
      let colorlist = []
      for (var i=0;i<goodsInfo.colors.length;i++){
        colorlist.push({color_id:goodsInfo.colors[i].color_id})
        var value = goodsInfo.colors[i].color_name
        if (i == 0) {
          colorStr = colorStr + value
        } else {
          colorStr = colorStr + ',' + value
        }
      }
      
      let sizeStr = ''
      let sizelist =[]
      for (var i = 0; i < goodsInfo.sizes.length;i++){
        sizelist.push({size_id:goodsInfo.sizes[i].size_id})
        var value = goodsInfo.sizes[i].size_name
        if (i == 0) {
          sizeStr = sizeStr + value
        } else {
          sizeStr = sizeStr + ',' + value
        }
      }

      this.setData({
        state: options.state,
        goodsInfo: goodsInfo,
        imgList: imglist,
        goods_name: goodsInfo.product_name,
        category: goodsInfo.category_detail,
        selling_price: goodsInfo.selling_price,
        buying_price: goodsInfo.buying_price,
        color: colorStr,
        colorCheckedList: colorlist,
        size: sizeStr,
        sizeCheckedList: sizelist,
        product_code: goodsInfo.product_code,
        sweepCode: goodsInfo.barcode,
        unit_barcode_active: goodsInfo.unit_barcode_active,
        // units_sku:
        // units_stock: goodsInfo.units_stock,
        textRealVal: goodsInfo.note
      })
    }
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