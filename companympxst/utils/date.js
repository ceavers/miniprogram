let now , chose, show,
  time_list = {
    chose_data: {}
  }

const TIME_STR = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
const BASE_ARRAY = new Array(42)

/**
 * 传入一个Date对象，返回包含年月日的对象
 */
const get_time_obj = time => {
  let year = time.getFullYear(),
    mounth = Number(time.getMonth()) + 1,
    day = time.getDate(),
    time_str = `${year}-${mounth}-${day}`,
    time_str_mounth = `${year}-${mounth}`;
  return {
    year,
    mounth,
    day,
    time_str,
    time_str_mounth
  }
}


/**
 * 获取指定年月的天数
 * 2019 3 =》 31
 */
const get_mounth_days = (year, mounth) => {
  return new Date(year, mounth, 0).getDate()
}

/**
 * 获取指定年月的第一天是星期几
 */

const get_mounth_firt_date = (year, mounth) => {
  return new Date(year, mounth -1, 1).getDay()
}

/**
 * 获取指定年月的日期结构
 */
const get_mounth_days_arr = (year, mounth) => {
  let days_all = get_mounth_days(year, mounth)
  let start = get_mounth_firt_date(year, mounth)
  let arr = Array.from(BASE_ARRAY)
              .map((item, index) => {
                let result = index - start + 1
                if (result > 0 && result <= days_all) {
                  let time_str = `${year}-${mounth}-${result}`
                  return {
                    value: result,
                    time_str
                  } 
                }
                return {
                  value: -1
                }
              })
  return arr
}

/**
 * 获取选择的年的全部数据
 */
const get_yead_time_list = () => {
  let mounth_list, { year } = show;
  
  mounth_list = TIME_STR.map((item, index) => {
    let days_arr = get_mounth_days_arr(year, index + 1)
    let time_str_mounth = `${year}-${index + 1}`
    // console.log(time_str_mounth)
    return {
      days_arr,
      name: item,
      time_str_mounth
    }
  })
  return {
    chose_data: show,
    mounth_list
  }
}

const build = {
  setNow() {
    now = get_time_obj(new Date)
  },
  getNow() {
    return now
  },
  setChose(time) {
    chose = get_time_obj(time)
  },
  getChose() {
    return chose
  },
  getTimeList() {
    return time_list
  },
  setShow(time) {
    show = get_time_obj(time)
    time_list = get_yead_time_list()
  },
  getShow() {
    return show
  }
}

export default build