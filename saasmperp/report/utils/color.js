const colorList =[
  '#62AC4B',
  '#FDD04F',
  '#66CCCC',
  '#CCFF66',
  '#FF99CC',
  '#FF6666',
  '#FFFF66',
  '#99CC66',
  '#666699',
  '#CCFFFF',
  '#FF9999',
  '#99CC33',
  '#FF9900',
  '#FFCC00',
  '#FFCCCC',
  '#FF0033',
  '#FF9966',
  '#FF9900',
  '#CCFF00',
  '#CC3399',
  '#99CC33',
  '#FF6600',
  '#993366',
  '#CCCC33',
  '#666633',
  '#666633',
  '#66CCCC',
  '#666699',
  '#CC9999',
  '#FF9900',
  '#0099CC',
  '#FFFF00',
  '#CCCC99',
  '#CC3399',
  '#99CC00',
  '#FF6666',
  '#FFFF00',
  '#3399CC',
  '#CC6600',
  '#CCCC33',
  '#FF9933',
  '#009933',
  '#FF6666',
  '#FF6600',
  '#009966',
  '#CC6633',
  '#FFCC99',
  '#FFCC33',
  '#99CCFF',
  '#009999',
]

function randomColor() {//十六进制颜色随机
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  var color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
  return color;
}
module.exports={
  colorList,
  randomColor
}