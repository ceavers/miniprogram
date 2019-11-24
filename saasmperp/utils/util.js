/**
 * 常用工具
 * formatTime   格式化时间戳
 * formatNumber 不满10补0
 */
const formatTime = time => {
  const date = new Date(time);
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//加逗号
const putComma = num =>{
  let numStr = num.toString()
  let integer = numStr.split('.')[0]  //按小数点切 取整数
  let decimal = numStr.split('.')[1]  //取小数
  let reg = /(?=(\B)(\d{3})+$)/g  //加逗号正则 只适用于整数
  integer = integer.replace(reg, ',')
  let res = integer
  if (decimal != undefined) {
    res = integer + '.' + decimal
  }
  return res
}

module.exports = {
  formatTime: formatTime,
  putComma: putComma
}

