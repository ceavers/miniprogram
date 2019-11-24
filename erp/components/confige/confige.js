// components/pay_type/pay_type.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    seven:{
      type: String,
      value: "7", 
    },
    six: {
      type: String,
      value: "6",
    },
    five: {
      type: String,
      value: "5",
    },
    four: {
      type: String,
      value: "4",
    },
    three: {
      type: String,
      value: "3",
    },
    two: {
      type: String,
      value: "2",
    },
    one: {
      type: String,
      value: "1",
    },
    eight:{
      type: String,
      value: "8",
    },
    nine:{
      type: String,
      value: "9",
    },
    zero:{
      type: String,
      value: "0",
    },
    dian:{
      type: String,
      value: ".",
    },
    sum:{
      type: String,
      value: '0.00',
    },
    sum1: {
      type: Number,
      value: '',
    },
    shadow1:{
      type:Boolean,
      value:true,
    },
    starttime:{
      type:String,
      value:"今天"
    },
    showAccount:{
      type:Boolean,
      value:true
    },
    textArr:{
      type:String,
      value:"备注"
    }
  },
  data: {
    // 这里是一些组件内部数据

  },
  methods: {
    // 这里是一个自定义方法
    seven(e) {
      this.triggerEvent('seven', this.data.seven)
    },
    six(e) {
      this.triggerEvent('six', this.data.six)
    },
    five(e) {
      this.triggerEvent('five', this.data.five)
    },
    four(e) {
      this.triggerEvent('four', this.data.four)
    },
    three(e) {
      this.triggerEvent('three', this.data.three)
    },
    two(e) {
      this.triggerEvent('two', this.data.two)
    },
    one(e) {
      this.triggerEvent('one', this.data.one)
    },
    zero(e) {
      this.triggerEvent('zero', this.data.zero)
    },
    eight(e) {
      this.triggerEvent('eight', this.data.eight)
    },
    nine(e){
      this.triggerEvent('nine', this.data.nine)
    },
    dian(e) {
      this.triggerEvent('dian', this.data.dian)
    },
    day(e){
      this.triggerEvent('day')
    },
    remove(e){
      this.triggerEvent('remove',this.data.sum,this.data.sum_)
    },
    remove1(e){
      this.triggerEvent('remove1', this.data.sum,this.data.sum_)
    },
    comit(e) {
      this.triggerEvent('comit')
    },
    showText(){
      this.triggerEvent('showText')
    }
    
  }
})
