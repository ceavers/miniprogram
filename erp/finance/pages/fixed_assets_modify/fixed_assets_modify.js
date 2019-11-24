// finance/pages/fixed_assets_modify/fixed_assets_modify.js
import { api } from "../../../utils/api/api.js"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    
    startDate:'',
    choiceCateContent: '',   //选择的分类，默认是无类别
    showAddCateModal: false,  //是否显示增加类别弹框
    cateData:[],  //fenlei shuju 
    showCateModal:false,
    shadow:false,  //控制请选择的弹框显示
    items2:[],
    accountContent:'', //选择的管理员名称
    staffList:[],  //员工列表
    fixedasset_id:'',  //资产分类id
    fixedDeatil:'',  //固定资产详情
    administrator_id:'',   //管理员id
    fixedName:'',  //资产名称
    fixedDesc:'',  //规格描述
    fixedSn:'',   //序列号
    fixedPrice:'',  //资产价格
    fixedDepreciable:'',   //折旧期限
    fixedSalvage:'',   //资产残值
    fixedNote:'',  //备注
    fixedImageArr:[] ,  //图片数组
    new_administrator_id:'',   //用来确认是否修改了管理员
    choiceCateId:'',  //选中的分类id
    new_fixedasset_name:'none',
    new_choiceCateContent:'',
    new_fixedDesc:'none', 
    new_fixedSn:'none',
    new_startDate:'',
    new_fixedPrice:'none',
    new_fixedDepreciable:'none',
    new_fixedSalvage:'none',
    new_fixedNote:'none',
    changeTime:false,
    shadow2:false,   //控制删除弹框的显示
    addCategoryName:'',  //新增类别的名称
    showPicker2:false,
    showPicker:false,  
  },
  setTime(e) {

    let month = parseInt(e.detail.month) >= 10 ? e.detail.month : '0' + e.detail.month;
    let day = parseInt(e.detail.day) >= 10 ? e.detail.day : '0' + e.detail.day;
    let startTime = e.detail.year + '-' + month + '-' + day
    this.setData({
      startDate: startTime
    })
  },

  setTime2(e) {
    let month = parseInt(e.detail.month) >= 10 ? e.detail.month : '0' + e.detail.month;
    let day = parseInt(e.detail.day) >= 10 ? e.detail.day : '0' + e.detail.day;
    let endTime = e.detail.year + '-' + month + '-' + day
    this.setData({
      endDate: endTime
    })
  },

  cancel() {
    this.setData({
      showPicker: false
    })
  },

  cancel2() {
    this.setData({
      showPicker2: false
    })
  },
  showPicker() {
    //显示开始日期弹框
    this.setData({
      showPicker: true
    })
  },

  showPicker2() {
    //显示结束日期弹框
    this.setData({
      showPicker2: true
    })

  },

  addCategory(){
    //新增类别
    if (this.data.addCategoryName){
      const data = {
        fixedcat_name: this.data.addCategoryName
      };

      api.finance2.addFixedAssetsCate(data)
        .then(res => {
          console.log(res);
          //刷新类别列表
          this.setData({
            showAddCateModal:false,
            showCateModal:false
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
        showAddCateModal: false
        
      });
    }
  },

  updateCate(e){
    //监听新增类别的内容
    if(e.detail){
      this.setData({
        addCategoryName:e.detail
      });
    }
  },

  updateSalvage(e){
    //修改残值
    if (e.detail.value != this.data.fixedSalvage) {
      this.setData({
        new_fixedSalvage: e.detail.value
      });
    }
  },

  updateNote(e){
    //修改备注
    console.log(e.detail);
    console.log(this.data.fixedNote)
    if (e.detail.value != this.data.fixedNote) {
      this.setData({
        new_fixedNote: e.detail.value
      });
    }
  },

  updateDepre(e){
    //修改折旧
    if (e.detail.value != this.data.fixedDepreciable) {
      this.setData({
        new_fixedDepreciable: e.detail.value
      });
    }
  },

  updateFixedassetName(e){
    //修改资产名称
    if (e.detail.value != this.data.fixedDesc){
      this.setData({
        new_fixedasset_name: e.detail.value
      });
    }
  },

  updateDesc(e){
    //修改规格描述
    if (e.detail.value != this.data.fixedName) {
      this.setData({
        new_fixedDesc: e.detail.value
      });
    }
  },

  updateSn(e){
    //修改序列号
    if (e.detail.value != this.data.fixedSn) {
      this.setData({
        new_fixedSn: e.detail.value
      });
    }
  },


  getAdministratorId(e){
    //获取管理员id
    if (this.data.administrator_id != e.detail){
      this.setData({
        new_administrator_id:e.detail
      });
    }
  },

  updatePrice(e){
    //修改价格
    if (e.detail.value != this.data.fixedPrice) {
      this.setData({
        new_fixedPrice: e.detail.value
      });
    }
  },

  confirmMoidyFixed(){
    //修改固定资产
    const data = {
      fixedasset_id: this.data.fixedasset_id
      
    };

    if (!this.data.new_fixedasset_name.trim().length){
      //如果资产名称改为空了，则返回
      wx.showToast({
        title: '资产名称不能为空!',
        icon:'none',
        duration:1500
      })
      return 
    }
    if (this.data.changeTime){
      data['buy_time'] = this.data.startDate
    }

    if (this.data.new_fixedasset_name != 'none' && this.data.new_fixedasset_name){
      data['fixedasset_name'] = this.data.new_fixedasset_name;
    }

    if (this.data.new_administrator_id){
      data['administrator_id'] = this.data.new_administrator_id;
    } 
    
    this.data.choiceCateId ? data['fixedcat_id'] = this.data.choiceCateId : '';

    this.data.new_fixedDesc != 'none' ? data['fixedasset_specification'] = this.data.new_fixedDesc : '';

    this.data.new_fixedSn != 'none' ? data['serial_number'] = this.data.new_fixedSn:'';

    this.data.new_fixedPrice != 'none' ? data['fixedasset_price'] = this.data.new_fixedPrice:'';

    this.data.new_fixedSalvage != 'none' ? data['fixedasset_salvage'] = this.data.new_fixedSalvage : '';

    this.data.new_fixedDepreciable != 'none' ? data['depreciable_period'] = this.data.new_fixedDepreciable:'';

    this.data.new_fixedNote != 'none' ? data['note'] = this.data.new_fixedNote :'';


    console.log('修改data-------------------');
    console.log(data);

    if(Object.keys(data).length > 1){
      api.finance2.modifyFixedAssets(data)
        .then(res => {
          console.log(res);
          if(res.code === 1){
            let pages = getCurrentPages();
            let prevpage = pages[pages.length - 2];
            prevpage.setData({
              isModify:true
            });

            wx.navigateBack({
              delta:1
            })

          }
        })
    }else{
      //如果没有修改，则直接返回页面
      wx.navigateBack({
        delta:1
      })
    }
  },


  choiceContent(e) {
    //选择相应的内容
    //根据选择的哪个弹框来改变相应弹框的值
      for (var i in this.data.items2) {
        if (this.data.items2[i].value == e.detail) {
          this.data.items2[i].checked = true;
          
          this.setData({
            new_administrator_id: this.data.items2[i].administrator_id
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
  },

  showAccountModal() {
   
    if (this.data.items2.length) {
      //如果不是第一次点开,要保留之前的选择的内容
      this.setData({
        shadow: true,
        items2: this.data.items2,

      });
    } else {
      this.data.items2.push({ value: '请选择', checked: false, administrator_id: '0' });
      this.data.staffList.forEach(item => {
        if (item.administrator_id == this.data.administrator_id) {

          this.data.items2.push({ value: item.user_name, checked: true, administrator_id: item.user_id });
        } else {
          this.data.items2.push({ value: item.user_name, checked: false, administrator_id: item.user_id });
        }
      });
      this.setData({
        shadow: true,

        items2: this.data.items2

      });
    }
  },

  closeModal(){
    this.setData({
      shadow:false
    });
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

    if (e.currentTarget.dataset.id != this.data.administrator_id){
      this.setData({
        showCateModal: false,
        choiceCateContent: e.currentTarget.dataset.catetext,
        
        choiceCateId: e.currentTarget.dataset.id
      });
    }
    
  },

  //修改日期
  changeStartDate(event) {
    this.setData({
      startDate: event.detail.value,
      changeTime:true
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取员工列表
    this.getStaff();
    //获取固定资产种类列表
    this.getFixedAssetsCateList();

    //获取固定资产详情
    
    console.log(JSON.parse(options.fixedDeatil));
    this.setData({
      fixedDeatil: JSON.parse(options.fixedDeatil),
      choiceCateContent: JSON.parse(options.fixedDeatil).fixedasset_cat.fixedcat_name,
      startDate: JSON.parse(options.fixedDeatil).buy_time,
      accountContent: JSON.parse(options.fixedDeatil).administrator.name,
      administrator_id: JSON.parse(options.fixedDeatil).administrator.id,
      fixedasset_id: JSON.parse(options.fixedDeatil).fixedasset_id,
      fixedName: JSON.parse(options.fixedDeatil).fixedasset_name,
      fixedDesc: JSON.parse(options.fixedDeatil).fixedasset_specification,
      fixedSn: JSON.parse(options.fixedDeatil).serial_number,
      fixedPrice: JSON.parse(options.fixedDeatil).fixedasset_price,
      fixedDepreciable: JSON.parse(options.fixedDeatil).depreciable_period,
      fixedSalvage: JSON.parse(options.fixedDeatil).fixedasset_salvage,
      fixedNote: JSON.parse(options.fixedDeatil).note,
    })    
  },

  getFixedAssetsCateList(){
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

  getStaff(){
    api.finance2.getStaff()
      .then(res => {
        this.setData({
          staffList:res.datas.users
        });
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