// warehouse/pages/inStorage_add_goods/inStorage_add_goods.js
import { api } from '../../../utils/api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    //类别
    categoryShow: false,
    categoryData: [],
    goodsData: [],
    inStorageShow: false,
    //单品信息
    goodsStock: null,
    //总数
    total: 0,
    //出入库总价
    totalPrice: 0
  },
  createGoods() {
    wx.navigateTo({
      url: '/warehouse/pages/addgoods/addgoods',
    })
  },
  categoryShow() {
    this.setData({
      categoryShow: true
    })
  },
  storageShow(e) {
    const data = {
      product_id: e.currentTarget.dataset.goodsId
    }
    this.getGoodsStock(data)
    this.setData({
      inStorageShow: true
    })
  },
  //获取单品库存
  getGoodsStock(data) {
    api.warehouse.getGoodsStock(data)
      .then(res => {
        res.datas.product_id = data.product_id
        res.datas.results.forEach(item => {
          item.sum = 0;
          item.results.forEach(item => {
            item.amount = 0;
          })
        })
        this.setData({
          goodsStock: res.datas
        })
      })
      .catch(err => {

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
  addGoodsComplete(e) {
    this.setData({
      inStorageShow: false
    })
    switch (this.data.type) {
      case '0':
        //出库
        this.setInStorage(e.detail.selectDeatil, 'selectOutStockList')
        this.selectGou();
        break;
      case '1':
        //入库
        this.setInStorage(e.detail.selectDeatil, 'selectInStockList')
        this.selectGou()
        break;
      case '2':
        //调拨
        this.setInStorage(e.detail.selectDeatil, 'selectAllotList')
        this.selectGou()
        break;
      case '3':
        //盘点
        this.setInStorage(e.detail.selectDeatil, 'selectCheckList')
        this.selectGou()
        break;
    }
  },
  setInStorage(data, key) {
    const tempStr = JSON.stringify(data);
    const tempObj = JSON.parse(tempStr);
    if (wx.getStorageSync(key)) {
      let tempList = wx.getStorageSync(key);
      let flag = 1;
      for (let i = 0; i < tempList.length; i++) {
        if (tempList[i].product_id === tempObj.product_id) {
          flag = 0;
          for (let j = 0; j < tempObj.results.length; j++) {
            let sum = 0
            for (let z = 0; z < tempObj.results[j].results.length; z++) {
              if (tempObj.results[j].results[z].amount > 0) {
                tempList[i].results[j].results[z].amount = tempObj.results[j].results[z].amount
              }
              sum += tempList[i].results[j].results[z].amount;
            }
            tempList[i].results[j].sum = sum;
          }
          tempList[i].styleSum = this.getStyleSum(tempList[i].results);
          tempList[i].count = this.getSum(tempList[i].results);
        }
      }
      console.log(tempList);
      flag && tempList.push(data);
      wx.setStorageSync(key, tempList)
    } else {
      let temp = [];
      temp.push(data)
      wx.setStorageSync(key, temp)
    }
  },
  getStyleSum(temp) {
    let styleSum = 0
    temp.forEach(item => {
      item.results.forEach(item => {
        if (item.amount > 0) {
          styleSum++
        }
      })
    })
    return styleSum;
  },
  getSum(temp) {
    let sum = 0
    temp.forEach(item => {
      sum += item.sum
    })
    return sum
  },
  complete() {
    wx.navigateBack({
      delta: 1,
    })
  },
  //获取类别 大类
  getCategory() {
    api.warehouse.getCategory({})
      .then(res => {
        const data = res.datas.categorys;
        const category = data.map(item => {
          return {
            category_id: item.category_id,
            category_name: item.category_name
          }
        })
        this.setData({
          categoryData: category
        })
      })
      .catch(err => {

      })
  },
  getType(e) {
    const data = e.detail
    this.getRepertoryList(data)
  },
  searchRepertory(e) {
    const data = {
      search_content: e.detail.value
    }
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
        //显示勾
        this.selectGou()
      })
      .catch(err => {

      })
  },
  selectGou() {
    let key = '';
    switch (this.data.type) {
      case '0':
        key = "selectOutStockList"
        break;
      case '1':
        key = "selectInStockList"
        break;
      case '2':
        key = "selectAllotList"
        break;
      case '3':
        key = "selectCheckList"
        break;
    }
    if (key) {
      if (wx.getStorageSync(key) && wx.getStorageSync(key).length > 0) {
        const tempList = wx.getStorageSync(key);
        this.data.goodsData.forEach(item => {
          item.data.forEach(goodsItem => {
            let flag = 0;
            tempList.forEach(selectItem => {
              if (goodsItem.product_id == selectItem.product_id && selectItem.count > 0) {
                flag = 1;
              }
            })
            if (flag) {
              goodsItem.checked = true
            } else {
              goodsItem.checked = false
            }
          })
        })
      } else {
        this.data.goodsData.forEach(item => {
          item.data.forEach(goodsItem => {
            goodsItem.checked = false
          })
        })
      }
      this.setData({
        goodsData: this.data.goodsData
      })
      this.getTotal(key)
      if (this.data.type == 0 || this.data.type == 1) {
        this.getTotalPrice(key)
      }
    }
  },
  //计算总数
  getTotal(key) {
    if (wx.getStorageSync(key) && wx.getStorageSync(key).length > 0) {
      let total = 0;
      const tempList = wx.getStorageSync(key);
      tempList.forEach(item => {
        total += item.count
      })
      this.setData({
        total: total
      })
    }
  },
  //计算总价
  getTotalPrice(key) {
    if (wx.getStorageSync(key) && wx.getStorageSync(key).length > 0) {
      let totalPrice = 0;
      const tempList = wx.getStorageSync(key);
      tempList.forEach(item => {
        totalPrice += item.count * item.price
      })
      this.setData({
        totalPrice: totalPrice
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type) {
      this.setData({
        type: options.type
      })
    }
    this.getCategory()
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