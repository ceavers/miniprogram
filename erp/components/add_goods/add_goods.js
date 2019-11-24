// components/add_goods/add_goods.js
import {api} from "../../utils/api/api.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    goodsStock:{
      type:Object,
      value:null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    calculatorShow:false,
    colorIndex:0,
    changePrice:false,//计算器计算类型
    skuIndex:0,
    count:0,
    styleSum:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    cancle() {
      this.initData()
      this.setData({
        show: false,
      })
    },
    toCreatePage(){
      if (this.data.styleSum==0){
        this.cancle()
        return
      }
      this.data.goodsStock.count = this.data.count;
      this.data.goodsStock.styleSum = this.data.styleSum;
      this.setData({
        goodsStock: this.data.goodsStock
      })
      this.triggerEvent("addGoodsComplete", { selectDeatil: this.data.goodsStock})
      this.initData()
    },
    changePurchase(){
      this.setData({
        calculatorShow:true,
        changePrice:true
      })
    },
    inputAmount(e){
      this.setData({
        calculatorShow: true,
        changePrice: false,
        skuIndex:e.currentTarget.dataset.index
      })
    },
    //商品详情
    toGoodsDetail(){
      wx.navigateTo({
        url: `/warehouse/pages/goodsInfo/goodsInfo?goodsId=${this.data.goodsStock.product_id}`,
      })
    },
    getResult(e){
      if (this.data.changePrice){
        const data = {
          product_id: this.data.goodsStock.product_id,
          buying_price: e.detail.res
        }
        api.warehouse.modifyGoodsInfo(data)
          .then(res => {
            this.data.goodsStock.price = e.detail.res
            this.setData({
              goodsStock: this.data.goodsStock
            })
            wx.showToast({
              title: '修改成功',
              icon: "none"
            })
          })
          .catch(err => {

          })
      }else{
        let amount = parseInt(e.detail.res);
        const temp = this.data.goodsStock.results;
        if (amount < 0){
          amount=0
          return
        }
        temp[this.data.colorIndex].sum -= temp[this.data.colorIndex].results[this.data.skuIndex].amount;
        temp[this.data.colorIndex].results[this.data.skuIndex].amount = amount;
        temp[this.data.colorIndex].sum += amount;
        this.setData({
          goodsStock: this.data.goodsStock,
          styleSum: this.getStyleSum(temp),
          count: this.getSum(temp)
        })
      } 
    },
    //选择颜色
    selectColor(e){
      this.setData({
        colorIndex:e.currentTarget.dataset.index
      })
    },
    add(e){
      const index =e.currentTarget.dataset.index;
      const temp = this.data.goodsStock.results;
      temp[this.data.colorIndex].results[index].amount++;
      temp[this.data.colorIndex].sum++;
      this.setData({
        goodsStock: this.data.goodsStock,
        styleSum: this.getStyleSum(temp),
        count:this.getSum(temp)
      })
    },
    subtract(e){
      const index = e.currentTarget.dataset.index;
      const temp = this.data.goodsStock.results;
      if (temp[this.data.colorIndex].results[index].amount>0) {
        temp[this.data.colorIndex].results[index].amount--;
        temp[this.data.colorIndex].sum--;
      } else {
        return
      }
      this.setData({
        goodsStock: this.data.goodsStock,
        styleSum: this.getStyleSum(temp),
        count: this.getSum(temp)
      })
    },
    //获取款式数量
    getStyleSum(temp){
      let styleSum=0
      temp.forEach(item=>{
        item.results.forEach(item=>{
          if (item.amount>0){
            styleSum++
          }
        })
      })
      return styleSum;
    },
    //获取总件数
    getSum(temp){
      let sum=0
      temp.forEach(item => {
        sum+=item.sum
      })
      return sum
    },
    //初始化数据
    initData(){
      this.setData({
        colorIndex: 0,
        count: 0,
        styleSum: 0
      })
    }
  }
})
