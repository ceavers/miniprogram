"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./api");
const static_1 = require("./static");
exports.baseUrl = 'https://xstapi.xstfcyy.com/xstmp';
const BAD_REQUEST_TEXT = '服务器异常，请稍后重试！';
const beforeResponse = (res) => {
    let data = res.data;
    if (data.msg === api_1.httpStatus['200']) {
        return Promise.resolve(data);
    }
    wx.showToast({
        title: data.msg || BAD_REQUEST_TEXT,
        icon: 'none'
    });
    return Promise.reject(data);
};
let build;
build = function (data, resolve, reject) {
    let header = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    if (data.use_token) {
      header.authorization = getApp().globalData.user.token;
    }
    let new_data = {
        url: exports.baseUrl + data.url,
        data: data.data,
        method: data.method || 'POST',
        header,
        responseType: data.type || 'text',
        success: res => {
            console.log(res);
            resolve(beforeResponse(res));
        },
        fail: err => {
            wx.showToast({
                title: BAD_REQUEST_TEXT,
                icon: 'none'
            });
            reject(err);
        }
    };
    return new_data;
};
const getNetwork = () => {
    return new Promise((resolve, reject) => {
        wx.getNetworkType({
            success(res) {
                if (res.networkType === 'none') {
                    wx.showToast({
                        title: '未连接到网络！',
                        icon: "none"
                    });
                    reject(res);
                }
                else {
                    resolve(res.networkType);
                }
            },
            fail(err) {
                wx.showToast({
                    title: '获取网络状态失败！',
                    icon: "none"
                });
                reject(err);
            }
        });
    });
};
exports.http = (data) => {
    return getNetwork()
        .then(() => {
        return new Promise((resolve, reject) => {
            let request_option = build(data, resolve, reject);
            if (data.use_token && !getApp().globalData.user.token) {
                reject('获取角色token失败！');
            }
            else {
                wx.request(request_option);
            }
        });
    });
};
exports.upload = (option) => {
    let { url, data, use_token } = option;
    return getNetwork()
        .then(() => {
        let { name, pic, formData = {} } = data;
        let header = use_token ? {
          authorization: getApp().globalData.user.token
        } : {};
        return static_1.ZIP_PIC(pic)
            .then(path => {
            return new Promise((resolve, reject) => {
                wx.uploadFile({
                    url: exports.baseUrl + url,
                    filePath: path,
                    name,
                    formData: formData,
                    header,
                    success(res) {
                        res.data = JSON.parse(res.data);
                        resolve(beforeResponse(res));
                    },
                    fail(err) {
                        console.log(err);
                        reject(err);
                    }
                });
            });
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImh0dHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBa0M7QUFDbEMscUNBQWtDO0FBRXJCLFFBQUEsT0FBTyxHQUFHLCtCQUErQixDQUFBO0FBQ3RELE1BQU0sZ0JBQWdCLEdBQUcsY0FBYyxDQUFBO0FBb0J2QyxNQUFNLGNBQWMsR0FBRyxDQUFDLEdBQU8sRUFBTSxFQUFFO0lBQ3JDLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUE7SUFDbkIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLGdCQUFVLENBQUMsT0FBTyxFQUFFO1FBQ3BDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtLQUM3QjtJQUNELEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDWCxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsSUFBSSxnQkFBZ0I7UUFDbkMsSUFBSSxFQUFFLE1BQU07S0FDYixDQUFDLENBQUE7SUFDRixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDN0IsQ0FBQyxDQUFBO0FBR0QsSUFBSSxLQUFxQixDQUFBO0FBQ3pCLEtBQUssR0FBRyxVQUFVLElBQWUsRUFBRSxPQUFZLEVBQUUsTUFBVztJQUMxRCxJQUFJLE1BQU0sR0FBZTtRQUN2QixjQUFjLEVBQUUsbUNBQW1DO0tBQ3BELENBQUE7SUFDRCxJQUFHLElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDakIsTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQTtLQUM5QztJQUNELElBQUksUUFBUSxHQUFxQjtRQUMvQixHQUFHLEVBQUUsZUFBTyxHQUFHLElBQUksQ0FBQyxHQUFHO1FBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtRQUNmLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU07UUFD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QUFFLENBQUMsVUFBVSxDQUFDO29CQUNaLEdBQUcsRUFBRSxlQUFPLEdBQUcsR0FBRztvQkFDbEIsUUFBUSxFQUFFLElBQUk7b0JBQ2QsSUFBSTtvQkFDSixRQUFRLEVBQUUsUUFBUTtvQkFDbEIsTUFBTTtvQkFDTixPQUFPLENBQUMsR0FBRzt3QkFDVCxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO3dCQUMvQixPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQy9CLENBQUM7b0JBQ0QsSUFBSSxDQUFDLEdBQUc7d0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTt3QkFDaEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO29CQUNiLENBQUM7aUJBQ0YsQ0FBQyxDQUFBO1lBQ04sQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaHR0cFN0YXR1cyB9IGZyb20gJy4vYXBpJ1xyXG5pbXBvcnQgeyBaSVBfUElDIH0gZnJvbSAnLi9zdGF0aWMnXHJcblxyXG5leHBvcnQgY29uc3QgYmFzZVVybCA9ICdodHRwczovL3BheS55ZWFjeS5jb20vcXItY29kZSdcclxuY29uc3QgQkFEX1JFUVVFU1RfVEVYVCA9ICfmnI3liqHlmajlvILluLjvvIzor7fnqI3lkI7ph43or5XvvIEnXHJcbmludGVyZmFjZSBodHRwX2RhdGEge1xyXG4gIHVybDogc3RyaW5nLFxyXG4gIG1ldGhvZD86IGFueSxcclxuICBkYXRhPzogYW55LFxyXG4gIC8qKiDmmK/lkKbpnIDopoHlnKhoZWFkZXLkuIrliqDkuIp0b2tlbiAqL1xyXG4gIHVzZV90b2tlbj86IGJvb2xlYW5cclxufVxyXG4vKiog5o6l5Y+jLCDor7fmsYLlpLTnmoTlrZfmrrUgKi9cclxuaW50ZXJmYWNlIGh0dHBfaGVhZGVyIHtcclxuICAnQ29udGVudC1UeXBlJz86IHN0cmluZyxcclxuICAndG9rZW4nPzogYW55XHJcbn1cclxuXHJcbi8qKuaOpeWPoyDlsIbkvKDlhaXnmoTlr7nosaHkv67mlLnkuLogIHd4LlJlcXVlc3RPcHRpb24g5a+56LGhKi9cclxuaW50ZXJmYWNlIGJ1aWxkX2h0dHBfZGF0YSB7XHJcbiAgKGRhdGE6IGh0dHBfZGF0YSwgcmVzb2x2ZTogYW55LCByZWplY3Q6IGFueSk6IHd4LlJlcXVlc3RPcHRpb25cclxufVxyXG5cclxuLyoq6ZKp5a2Q5Ye95pWw77yM5Zyo6K+35rGC6L+U5Zue6aKd5pe25YCZ5oum5oiq6K+35rGC77yM5aSE55CG5pWw5o2u77yM5bm25oqb5Ye65byC5bi4ICovXHJcbmNvbnN0IGJlZm9yZVJlc3BvbnNlID0gKHJlczphbnkpOmFueSA9PiB7XHJcbiAgbGV0IGRhdGEgPSByZXMuZGF0YVxyXG4gIGlmIChkYXRhLmNvZGUgPT09IGh0dHBTdGF0dXMuc3VjY2Vzcykge1xyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRhKVxyXG4gIH1cclxuICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgdGl0bGU6IGRhdGEubXNnIHx8IEJBRF9SRVFVRVNUX1RFWFQsXHJcbiAgICBpY29uOiAnbm9uZSdcclxuICB9KVxyXG4gIHJldHVybiBQcm9taXNlLnJlamVjdChkYXRhKVxyXG59XHJcblxyXG4vKirpu5jorqRwb3N0ICovXHJcbmxldCBidWlsZDpidWlsZF9odHRwX2RhdGFcclxuYnVpbGQgPSBmdW5jdGlvbiAoZGF0YTogaHR0cF9kYXRhLCByZXNvbHZlOiBhbnksIHJlamVjdDogYW55KTogd3guUmVxdWVzdE9wdGlvbiB7XHJcbiAgbGV0IGhlYWRlcjpodHRwX2hlYWRlciA9IHtcclxuICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xyXG4gIH1cclxuICBpZihkYXRhLnVzZV90b2tlbikge1xyXG4gICAgaGVhZGVyLnRva2VuID0gZ2V0QXBwKCkuZ2xvYmFsRGF0YS51c2VyLnRva2VuXHJcbiAgfVxyXG4gIGxldCBuZXdfZGF0YTogd3guUmVxdWVzdE9wdGlvbiA9IHtcclxuICAgIHVybDogYmFzZVVybCArIGRhdGEudXJsLFxyXG4gICAgZGF0YTogZGF0YS5kYXRhLFxyXG4gICAgbWV0aG9kOiBkYXRhLm1ldGhvZCB8fCAnUE9TVCcsXHJcbiAgICBoZWFkZXIsXHJcbiAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICByZXNvbHZlKGJlZm9yZVJlc3BvbnNlKHJlcykpXHJcbiAgICB9LFxyXG4gICAgZmFpbDogZXJyID0+IHtcclxuICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICB0aXRsZTogQkFEX1JFUVVFU1RfVEVYVCxcclxuICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgfSlcclxuICAgICAgcmVqZWN0KGVycilcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIG5ld19kYXRhXHJcbn1cclxuLyoqXHJcbiAqIOivt+axguS5i+WJjeiOt+WPlue9kee7nOeKtuaAge+8jOWmguaenOWksei0peaPkOekuue9kee7nOW8guW4uFxyXG4gKi9cclxuY29uc3QgZ2V0TmV0d29yayA9ICgpID0+IHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgd3guZ2V0TmV0d29ya1R5cGUoe1xyXG4gICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgIGlmIChyZXMubmV0d29ya1R5cGUgPT09ICdub25lJykge1xyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6ICfmnKrov57mjqXliLDnvZHnu5zvvIEnLFxyXG4gICAgICAgICAgICBpY29uOiBcIm5vbmVcIlxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIHJlamVjdChyZXMpXHJcbiAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgcmVzb2x2ZShyZXMubmV0d29ya1R5cGUpXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBmYWlsKGVycikge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+iOt+WPlue9kee7nOeKtuaAgeWksei0pe+8gScsXHJcbiAgICAgICAgICBpY29uOiBcIm5vbmVcIlxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmVqZWN0KGVycilcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9KVxyXG59XHJcbi8qKuivt+axguaVsOaNruWHveaVsO+8jOi/lOWbnuS4gOS4qnByb21pc2UgKi9cclxuZXhwb3J0IGNvbnN0IGh0dHAgPSAoZGF0YTpodHRwX2RhdGEpID0+IHtcclxuICByZXR1cm4gZ2V0TmV0d29yaygpXHJcbiAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgbGV0IHJlcXVlc3Rfb3B0aW9uOiB3eC5SZXF1ZXN0T3B0aW9uID0gYnVpbGQoZGF0YSwgcmVzb2x2ZSwgcmVqZWN0KVxyXG4gICAgICAgIGlmIChkYXRhLnVzZV90b2tlbiAmJiAhZ2V0QXBwKCkuZ2xvYmFsRGF0YS51c2VyLnRva2VuKSB7XHJcbiAgICAgICAgICByZWplY3QoJ+iOt+WPluinkuiJsnRva2Vu5aSx6LSl77yBJylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgd3gucmVxdWVzdChyZXF1ZXN0X29wdGlvbilcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgdXBsb2FkID0gKG9wdGlvbjphbnkpID0+IHtcclxuICBsZXQgeyB1cmwsIGRhdGEsIHVzZV90b2tlbiB9ID0gb3B0aW9uXHJcbiAgcmV0dXJuIGdldE5ldHdvcmsoKVxyXG4gICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICBsZXQgeyBuYW1lLCBwaWMsIGZvcm1EYXRhID0ge30gfSA9IGRhdGE7XHJcbiAgICAgIGxldCBoZWFkZXIgPSB1c2VfdG9rZW4gPyB7XHJcbiAgICAgICAgdG9rZW46IGdldEFwcCgpLmdsb2JhbERhdGEudXNlci50b2tlblxyXG4gICAgICB9IDoge31cclxuICAgICAgcmV0dXJuIFpJUF9QSUMocGljKVxyXG4gICAgICAgIC50aGVuKHBhdGggPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICB3eC51cGxvYWRGaWxlKHtcclxuICAgICAgICAgICAgICAgIHVybDogYmFzZVVybCArIHVybCxcclxuICAgICAgICAgICAgICAgIGZpbGVQYXRoOiBwYXRoLFxyXG4gICAgICAgICAgICAgICAgbmFtZSxcclxuICAgICAgICAgICAgICAgIGZvcm1EYXRhOiBmb3JtRGF0YSxcclxuICAgICAgICAgICAgICAgIGhlYWRlcixcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlcy5kYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSlcclxuICAgICAgICAgICAgICAgICAgcmVzb2x2ZShiZWZvcmVSZXNwb25zZShyZXMpKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsKGVycikge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXHJcbiAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuIl19