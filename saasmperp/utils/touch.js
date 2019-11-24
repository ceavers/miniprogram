let startX
let startY
class touch {
  constructor() {
    
  }
  /**
   * @param e 事件对象
   * @param items 滑动队列
   */
  _touchstart(e, items) {
    //开始触摸时 重置所有操作的对象
    items.forEach(function (item, index) {
      if (item.isTouchMove) //只操作为true的
        item.isTouchMove = false;
    })
    startX = e.changedTouches[0].clientX
    startY = e.changedTouches[0].clientY
    let thisIndex = e.currentTarget.dataset.index
    return { items, thisIndex }
  }

  _touchmove(e, items) {
    var thisIndex = e.currentTarget.dataset.index, //当前索引
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = this._angle({
        X: startX,
        Y: startY
      }, {
          X: touchMoveX,
          Y: touchMoveY
        }),
        moveIndex;
    items.forEach(function (item, index) {
      item.isTouchMove = 0;
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (thisIndex == index) {
        if (touchMoveX > startX) //右滑
          item.isTouchMove = false
        else //左滑
          item.isTouchMove = true
          moveIndex = item.isTouchMove
      }
    })
    return {items, moveIndex, thisIndex}
  }
  _touchend(e, items) {
    
  }
  /**
   * 计算x轴偏移量
   * @param start 触摸起始位置
   * @param end 触摸结束位置
   */
  _angle(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  }
}

export default touch