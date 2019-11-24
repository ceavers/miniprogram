// finance/pages/bus_fixed_assets/bus_fixed_assets.js
import { api } from "../../../utils/api/api.js"
Page({

  /**
   * 页面的初始数据
   */

  data: {
    hasFixedAssetsData:true,
    showSelctModal: false,
    selectFirCate: [
      '资产类别', '状态'
    ],  //筛选的一级数据
    // selectSecCate: [
    //   ['土地、房屋及构筑物', '专用设备','交通运输设备','电气设备','电子产品及通信设备'],

    //   ['闲置', '使用中', '已报废'],

    // ],   //筛选的二级分类数据

    selectSecCate: [
      
    ],  //默认最开始是显示收入支出

    choiceSelectIndex: 0,   //筛选的点击一级分类的对应的index
    choiceCtaeNameArr: [],  //选中的二级分类的条件组成的数组
    fixedList:[],  //资产列表数据
    id:'',
    serchData:[],  //搜索的数据
    cateData:[],   //类别数据
    isSearch:false,
    isSelect:false,  //是否点击筛选过来
    isDel:false,  //是否是点击删除资产跳转过来
    choiceCtaeName:'',  //选中的二级分类的名称
    choiceId: '',   //选中的二级分类id
    showClearIcon:false,   //是否显示不限的勾勾
    choiceSecIndex:'',  //点击的二级分类的index
    choiceFixedassetState:'',  //选中的二级分类的状态
  },

  confirmSelect(){
    //确认进行筛选
    if (!this.data.choiceId && !this.data.choiceFixedassetState){
      this.setData({
        isSelect:false,
        showSelctModal:false
      });
    }else{
      const data = {};
      if (this.data.choiceId){
        data['fixedcat_id'] = this.data.choiceId;
      }

      if (this.data.choiceFixedassetState){
        data['fixedasset_state'] = this.data.choiceFixedassetState;
      }

    
      api.finance2.selectFixedAssets(data)
        .then(res => {
          console.log(res);
          //刷新固定资产
          this.setData({
            showSelctModal: false,
            isSelect: true,
            fixedList: res.datas.fixedassets
          });
        })
    }
  },

  showSelctModal() {
    //显示筛选框
   this.setData({
      showSelctModal: true,
      selectSecCate:this.data.cateData,
      choiceSelectIndex:0
    });
  },

  closeSelectModal() {
    //关闭筛选弹框,并且取消筛选
    this.setData({
      showSelctModal: false,
      isSelect:false
    });
  },

  choiceSecSelect(e) {
    //点击相应的一级分类展示对应的二级分类的数据,
    let choiceIndex = e.currentTarget.dataset.index;
    //console.log(choiceIndex);
    this.setData({
      choiceSelectIndex: choiceIndex
    });

    //分类讨论
    switch (choiceIndex) {
      case 0:
        this.data.selectSecCate = this.data.cateData;
        
        this.setData({
          selectSecCate: this.data.selectSecCate
        });
        break
      case 1:
        this.data.selectSecCate = [
          { fixedcat_name: '闲置', fixedasset_state:0},
          { fixedcat_name: '使用中', fixedasset_state: 1 },
          { fixedcat_name: '已报废', fixedasset_state: 2 },
        ];


        this.setData({
          selectSecCate: this.data.selectSecCate
        });
        break

    }
  },

  choiceCondition(e) {
    //点击二级分类
    let choiceCtaeName = e.currentTarget.dataset.catename;
    let choiceId = e.currentTarget.dataset.id;
    let choiceSecIndex = e.currentTarget.dataset.index;
    let choiceFixedassetState = e.currentTarget.dataset.fixedassetstate
    this.setData({
      choiceCtaeName: choiceCtaeName,
      choiceId: choiceId,
      showClearIcon:false,
      isSelect: true,
      choiceSecIndex: choiceSecIndex,
      choiceFixedassetState: choiceFixedassetState
    });
  },

  cancelSelect(){
    
    //筛选结果出来之后的取消筛选,重置列表数据
    this.setData({
      isSelect: false,

    });
    this.getFixedList();
  },

  cancelCondition() {
    //点击不限的时候，相当于把这个子类的筛选条件清空
    this.setData({
      showClearIcon:true,
      choiceCtaeName: '',
      choiceId: '',
      isSelect:false,
      choiceSecIndex:''
    });
  },


  cancelSearch() {
    //取消搜索 重置固定资产列表
    this.setData({
      isSearch: false
    });
    this.getFixedList();

  },

  resetDel(){
    //重置当离开该页面的时候重置是否为删除跳转过来的
    
    this.setData({
      isDeL:false
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.getFixedList();
  },

  getFixedList(){
    api.finance2.getFixedList()
      .then(res => {
        console.log(res);
        if (res.code === 1) {
          this.setData({
            fixedList: res.datas.fixedassets
          });

          if (res.datas.fixedassets.length){
               //判断，如果有无列表数据
               this.setData({
                 hasFixedAssetsData:true
               });
          }else{
            this.setData({
              hasFixedAssetsData:false
            });
          }
        }
      })
  },

  getFixedAssetsCateList(){
    api.finance2.getFixedAssetsCateList()
      .then(res => {
        console.log(res);
          this.setData({
            cateData: res.datas.fixedasset_cats
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
    //获取固定资产列表,每次刷新

    if (this.data.isDel){
      this.getFixedList();
    }

    //获取类别列表
    this.getFixedAssetsCateList()
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