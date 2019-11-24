/** 限制上传的图片的大小为2.5MB */
const MAX_PIC_SIZE = 1024 * 1024 * 2.5

/** 压缩之后的图片大小 默认为1MB */
const MIN_PIC_SIZE = 1024 * 1024 * 1

/** 默认空字符串的时候展示的数据 */
export const DEFAULT_STR = '- - -';

/** 默认空数字的时候展示的数据 */
export const DEFAULT_NUM = '- - -';

/** 默认空数组 */
export const DEFAULT_ARR = [];

const REG_TEL = /^1[^(1|2)]\d{9}$/

/** 压缩图片 */
export const ZIP_PIC = (pic:any) => {
  if(pic.size < MAX_PIC_SIZE) {
    return Promise.resolve(pic.path)
  }
  let quality = Math.floor((MIN_PIC_SIZE / pic.size) * 100);
  return new Promise((resolve, reject) => {
    wx.compressImage({
      src: pic.path,
      quality,
      success: (res:any) => {
        resolve(res.tempFilePath)
      }, 
      fail:(err) => {
        wx.showToast({
          title: err.errMsg || '压缩文件失败',
          icon: 'none'
        })
        reject(err)
      }
    })
  })
}

export const CHECK_TEL = (tel:any) => REG_TEL.test(tel)