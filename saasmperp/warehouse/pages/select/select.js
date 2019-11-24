// warehouse/pages/select/select.js
import {api} from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //筛选
    filterShow: false,
    filterData: [
      {
        className: '商品类别',
        typeId: "subclass_id",
        data: [
          {
            name: '不限',
            id: -1,
            checked: true
          }
        ]
      },
      {
        className: '商品小类',
        typeId: "category_id",
        data: [
          {
            name: '不限',
            id: -1,
            checked: true
          }
        ]
      },
      {
        className: '商品品牌',
        typeId: 'brand_id',
        data: [
          {
            name: '不限',
            id: -1,
            checked: true
          }
        ]
      },
      {
        className: '仓库',
        typeId: "depo_id",
        data: [
          {
            name: '不限',
            id: -1,
            checked: true
          }
        ]
      },
      {
        className: '有无库存',
        typeId: 'is_stock',
        data: [
          {
            name: '不限',
            id: -1,
            checked: true
          },
          {
            id: 1,
            name: "有库存",
            checked: false
          },
          {
            id: 0,
            name: "无库存",
            checked: false
          }
        ]
      }
    ],
    goodsData:[]
  },
  filterShow() {
    this.setData({
      filterShow: true
    })
  },
  filtrCancel() {
    this.setData({
      filterShow: false
    })
  },
  toDeatilPage(e){
    const id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/warehouse/pages/stockInfo/stockInfo?goodsId=${id}`,
    })
  },
  //扫码
  scan() {
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
      }
    })
  },
  //获取筛选数据
  getFilterData() {
    api.warehouse.getFilterData()
      .then(res => {
        const resData = res.datas;
        for (let prop in resData) {
          if (prop == 'brands') {
            resData[prop].forEach(item => {
              this.data.filterData[2].data.push({
                id: item.brand_id,
                name: item.brand_name,
                checked: false
              })
            })
          } else if (prop == 'categories') {
            resData[prop].forEach(item => {
              this.data.filterData[1].data.push({
                id: item.category_id,
                name: item.category_name,
                checked: false
              })
            })
          } else if (prop == 'depos') {
            resData[prop].forEach(item => {
              this.data.filterData[3].data.push({
                id: item.depo_id,
                name: item.depo_name,
                checked: false
              })
            })
          } else if (prop == 'subclasses') {
            resData[prop].forEach(item => {
              this.data.filterData[0].data.push({
                id: item.subclass_id,
                name: item.subclass_name,
                checked: false
              })
            })
          }
        }
        this.setData({
          filterData: this.data.filterData
        })
      })
      .catch(err => {

      })
  },
  searchRepertory(e) {
    const data = {
      search_content: e.detail.value
    }
    this.getRepertoryList(data)
  },
  getFilterItem(e) {
    const data = e.detail
    this.getRepertoryList(data)
  },
  getRepertoryList(data) {
    api.warehouse.getRepertoryList(data)
      .then(res => {
        const resData = res.datas.results;
        let tempArray = []
        resData.forEach(item => {
          let flag = 0;
          for (let i = 0; i < tempArray.length; i++) {
            if (item.category_id == tempArray[i].category_id) {
              //存在
              flag = 1;
              tempArray[i].data.push({
                price: item.price,
                product_id: item.product_id,
                product_code: item.product_code,
                product_name: item.product_name,
                stock: item.stock,
                pic_url: item.pic_url
              })
              break
            }
          }
          if (flag == 0) {
            tempArray.push({
              category_id: item.category_id,
              category_name: item.category_name,
              data: [
                {
                  price: item.price,
                  product_id: item.product_id,
                  product_code: item.product_code,
                  product_name: item.product_name,
                  stock: item.stock,
                  pic_url: item.pic_url
                }
              ]
            })
          }
        })
        this.setData({
          goodsData: tempArray
        })
      })
      .catch(err => {

      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFilterData()
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
    this.getRepertoryList({})
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