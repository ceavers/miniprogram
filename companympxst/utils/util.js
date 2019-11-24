const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('.') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/** 获取今天0点的时间戳 */
const getTimeNum = (year, mounth, day) => {
  let date = new Date(year, mounth - 1, day)
  return date.getTime()
}
const getTimeArr = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day]
}
/** 有两个值，开始时间和结束时间
 * 每次改变会重新计算start和end的相对位置，
 * 暴露方法 getTimeArr， 返回一个数组，【开始， end】
 * 暴露方法 setItem 改变当前的start或者end，通过index来判断
 * 暴露方法 setIndex 设置当前的index
 * 暴露方法 reset 恢复到初始状态
 * end的时间戳为当前天结束时间即24：00
 * start 的时间戳为当前天的开始时间即0：00
 */
class timeArr{
  constructor() {
    this.getTimeArr = this.getTimeArr.bind(this)
    this.setIndex = this.setIndex.bind(this)
    this.setItem = this.setItem.bind(this)
    this.reset = this.reset.bind(this)
    this.reset()
  }
  start = {}
  end = {}
  index = 0
  reset() {
    let today = getTimeArr(new Date())
    this.start = {
      str: today.join('-'),
      time: getTimeNum(...today)
    }
    this.end = {
      str: today.join('-'),
      time: getTimeNum(...today)
    }
  }
  getTimeArr() {
    let end_time_arr = String.prototype.split.call(this.end.str, '-').map(item => Number(item))
    let end_time = getTimeNum(end_time_arr[0], end_time_arr[1], end_time_arr[2] + 1)
    let start_obj = this.start
    let end_obj = {
      time: end_time,
      str: this.end.str
    }
    // console.log(end_obj)
    let all_time = [start_obj, end_obj]
    return all_time
  }
  setIndex(index) {
    this.index = index
  }
  setItem(itemArr) {
    let obj = {
      str: Array.prototype.join.call(itemArr, '-'),
      time: getTimeNum(...itemArr)
    }
    if(this.index === 0) {
      this.start = obj
    } else {
      this.end = obj
    }
    if (this.start.time > this.end.time) {
      let extend
      extend = this.start
      this.start = this.end
      this.end = extend
    }
  }
}

module.exports = {
  formatTime,
  timeArr
}
