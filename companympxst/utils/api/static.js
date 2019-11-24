"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MAX_PIC_SIZE = 1024 * 1024 * 2.5;
const MIN_PIC_SIZE = 1024 * 1024 * 1;
exports.DEFAULT_STR = '- - -';
exports.DEFAULT_NUM = '- - -';
exports.DEFAULT_ARR = [];
const REG_TEL = /^1[^(1|2)]\d{9}$/;
exports.ZIP_PIC = (pic) => {
    if (pic.size < MAX_PIC_SIZE) {
        return Promise.resolve(pic.path);
    }
    let quality = Math.floor((MIN_PIC_SIZE / pic.size) * 100);
    return new Promise((resolve, reject) => {
        wx.compressImage({
            src: pic.path,
            quality,
            success: (res) => {
                resolve(res.tempFilePath);
            },
            fail: (err) => {
                wx.showToast({
                    title: err.errMsg || '压缩文件失败',
                    icon: 'none'
                });
                reject(err);
            }
        });
    });
};
exports.CHECK_TEL = (tel) => REG_TEL.test(tel);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RhdGljLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsTUFBTSxZQUFZLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxHQUFHLENBQUE7QUFHdEMsTUFBTSxZQUFZLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUE7QUFHdkIsUUFBQSxXQUFXLEdBQUcsT0FBTyxDQUFDO0FBR3RCLFFBQUEsV0FBVyxHQUFHLE9BQU8sQ0FBQztBQUd0QixRQUFBLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFFOUIsTUFBTSxPQUFPLEdBQUcsa0JBQWtCLENBQUE7QUFHckIsUUFBQSxPQUFPLEdBQUcsQ0FBQyxHQUFPLEVBQUUsRUFBRTtJQUNqQyxJQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsWUFBWSxFQUFFO1FBQzFCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7S0FDakM7SUFDRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUMxRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3JDLEVBQUUsQ0FBQyxhQUFhLENBQUM7WUFDZixHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUk7WUFDYixPQUFPO1lBQ1AsT0FBTyxFQUFFLENBQUMsR0FBTyxFQUFFLEVBQUU7Z0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7WUFDM0IsQ0FBQztZQUNELElBQUksRUFBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNYLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0JBQ1gsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLElBQUksUUFBUTtvQkFDN0IsSUFBSSxFQUFFLE1BQU07aUJBQ2IsQ0FBQyxDQUFBO2dCQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNiLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQUVZLFFBQUEsU0FBUyxHQUFHLENBQUMsR0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIOmZkOWItuS4iuS8oOeahOWbvueJh+eahOWkp+Wwj+S4ujIuNU1CICovXHJcbmNvbnN0IE1BWF9QSUNfU0laRSA9IDEwMjQgKiAxMDI0ICogMi41XHJcblxyXG4vKiog5Y6L57yp5LmL5ZCO55qE5Zu+54mH5aSn5bCPIOm7mOiupOS4ujFNQiAqL1xyXG5jb25zdCBNSU5fUElDX1NJWkUgPSAxMDI0ICogMTAyNCAqIDFcclxuXHJcbi8qKiDpu5jorqTnqbrlrZfnrKbkuLLnmoTml7blgJnlsZXnpLrnmoTmlbDmja4gKi9cclxuZXhwb3J0IGNvbnN0IERFRkFVTFRfU1RSID0gJy0gLSAtJztcclxuXHJcbi8qKiDpu5jorqTnqbrmlbDlrZfnmoTml7blgJnlsZXnpLrnmoTmlbDmja4gKi9cclxuZXhwb3J0IGNvbnN0IERFRkFVTFRfTlVNID0gJy0gLSAtJztcclxuXHJcbi8qKiDpu5jorqTnqbrmlbDnu4QgKi9cclxuZXhwb3J0IGNvbnN0IERFRkFVTFRfQVJSID0gW107XHJcblxyXG5jb25zdCBSRUdfVEVMID0gL14xW14oMXwyKV1cXGR7OX0kL1xyXG5cclxuLyoqIOWOi+e8qeWbvueJhyAqL1xyXG5leHBvcnQgY29uc3QgWklQX1BJQyA9IChwaWM6YW55KSA9PiB7XHJcbiAgaWYocGljLnNpemUgPCBNQVhfUElDX1NJWkUpIHtcclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocGljLnBhdGgpXHJcbiAgfVxyXG4gIGxldCBxdWFsaXR5ID0gTWF0aC5mbG9vcigoTUlOX1BJQ19TSVpFIC8gcGljLnNpemUpICogMTAwKTtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd3guY29tcHJlc3NJbWFnZSh7XHJcbiAgICAgIHNyYzogcGljLnBhdGgsXHJcbiAgICAgIHF1YWxpdHksXHJcbiAgICAgIHN1Y2Nlc3M6IChyZXM6YW55KSA9PiB7XHJcbiAgICAgICAgcmVzb2x2ZShyZXMudGVtcEZpbGVQYXRoKVxyXG4gICAgICB9LCBcclxuICAgICAgZmFpbDooZXJyKSA9PiB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiBlcnIuZXJyTXNnIHx8ICfljovnvKnmlofku7blpLHotKUnLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZWplY3QoZXJyKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBDSEVDS19URUwgPSAodGVsOmFueSkgPT4gUkVHX1RFTC50ZXN0KHRlbCkiXX0=