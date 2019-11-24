// pages/chatRecords/chatRecords.js
import { api } from '../../utils/api/api.js'
import { getNews } from '../../utils/upload.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    userId: '',
    page: 0,
    pageSize: 10,
    currentPage: 1,
    total_page:1,
    input: '',
    isShow: true,
    groupId: '',
    selectMebShow:false,
    defaultAvatar: '/images/serviceH.png',
    data: {},
    apiType:'',
    persons:[],
    name:''
  },
  inputModel(e){
    this.setData({
      input: e.detail.value
    })
  },
  close(){
    this.setData({
      selectMebShow:false
    })
  },
  //群成员
  searchMember(){
    var that = this;
    var data = {
      name:'',
      group_id: that.data.groupId,
      state: 0
    }
    api.groupPerson.searchByName(data).then(res => {
      this.setData({
        persons: res.data,
        selectMebShow:true
      })
    })
      .catch(error => {

      })
  },
  searchMemberByName(e){
      var that = this;
      var data = {
        name: e.detail.value,
        group_id: that.data.groupId,
        state:0
      }
      api.groupPerson.searchByName(data).then(res => {
        this.setData({
          persons: res.data
        })
      })
      .catch(error=>{

      })
  },
  searchChatByMember(e){
    this.setData({
      apiType: 'member',
      selectMebShow: false
    })
    const data={
      group_id: this.data.groupId,
      type: e.currentTarget.dataset.type,
      user_id: e.currentTarget.dataset.id,
      currentPage: 1
    }
    this.setData({
      data,
      items: []
    })
    this.searchLoadMes()
  },
  //查询图片
  searchPicture(){
    this.setData({
      apiType: 'image'
    })
    const data = {
      group_id: this.data.groupId,
      currentPage: 1
    }
    this.setData({
      data,
      items: []
    })
    this.searchLoadMes()
  },
  //查询url
  searchUrl(){
    this.setData({
      apiType:'url'
    })
    const data ={
      group_id: this.data.groupId,
      currentPage:1
    }
    this.setData({
      data,
      items: []
    })
    this.searchLoadMes()
  },
  searchChat(){
    let data
    this.setData({
      apiType:'normal'
    })
    if(this.data.userId != null){
      data = {
        groupId: this.data.groupId,
        userId: this.data.userId,
        key: this.data.input,
        currentPage: 1,
        pageSize: this.data.pageSize,
      }
    }else {
      data = {
        groupId: this.data.groupId,
        key: this.data.input,
        currentPage: 1,
        pageSize: this.data.pageSize
      }
    }
    this.setData({
      data,
      items: []
    })
    this.searchLoadMes()
    
  },
  searchLoadMes(){
    const data=this.data.data;
    if (this.data.apiType ==='normal'){
      if (data.currentPage > this.data.total_page) {
        wx.showToast({
          title: '已经到底啦',
          icon: 'none'
        })
        return
      }
      api.user.getSearchChat(data).
        then(res => {
          let data = this.data.data;
          let resData = res.data.data;
          resData = this.getTime(resData)
          data.currentPage += 1
          this.setData({
            isShow: false,
            data,
            items: [...this.data.items, ...resData],
            total_page: res.data.total_page,
            currentPage: data.currentPage
          })
        })
        .catch(error=>{
        })
    } else if (this.data.apiType === 'url'){
      if (data.currentPage>this.data.total_page){
        wx.showToast({
          title: '已经到底啦',
          icon:'none'
        })
        return
      }
      api.records.searchUrlMsg(data)
        .then(res => {
          let data = this.data.data;
          let resData = res.data.data;
          resData = this.getTime(resData)
          data.currentPage += 1
          this.setData({
            isShow: false,
            data,
            items: [...this.data.items, ...resData],
            total_page: res.data.total_page,
            currentPage: data.currentPage
          })
        })
        .catch(error => {
        })
    } else if (this.data.apiType === 'member'){
      if (data.currentPage > this.data.total_page) {
        wx.showToast({
          title: '已经到底啦',
          icon: 'none'
        })
        return
      }
      api.records.searchMemberMsg(data)
        .then(res => {
          let data = this.data.data;
          let resData = res.data.data;
          resData = this.getTime(resData)
          data.currentPage += 1
          this.setData({
            isShow: false,
            data,
            items: [...this.data.items, ...resData],
            total_page: res.data.total_page,
            currentPage: data.currentPage
          })
        })
        .catch(error => {
        })
    } else if (this.data.apiType === 'image'){
      if (data.currentPage > this.data.total_page) {
        wx.showToast({
          title: '已经到底啦',
          icon: 'none'
        })
        return
      }
      api.records.searchImageMsg(data)
        .then(res => {
          let data = this.data.data;
          let resData = res.data.data;
          const imgData = [];
          for (var i = 0; i < resData.length;i++){
            if (i == 0){
              if (this.data.items.length){
                const lastIndex = this.data.items.length - 1;
                if (this.data.items[lastIndex].time - resData[i].sendTime > 86400000) {
                  imgData.push({
                    contentTypes: 'image',
                    type: 'time',
                    content: getNews.formatDateDay(resData[i].sendTime)
                  })
                  imgData.push({
                    contentTypes: 'image',
                    type: 'image',
                    content: resData[i].content,
                    time: resData[i].sendTime
                  })
                  if (i < resData.length - 1) {
                    const j = i + 1
                    const interval = resData[i].sendTime - resData[j].sendTime;
                    if (interval > 86400000) {
                      imgData.push({
                        contentTypes: 'image',
                        type: 'time',
                        content: getNews.formatDateDay(resData[j].sendTime)
                      })
                    }
                  }
                }else{
                  imgData.push({
                    contentTypes: 'image',
                    type: 'image',
                    content: resData[i].content,
                    time: resData[i].sendTime
                  })
                  if (i < resData.length - 1) {
                    const j = i + 1
                    const interval = resData[i].sendTime - resData[j].sendTime;
                    if (interval > 86400000) {
                      imgData.push({
                        contentTypes: 'image',
                        type: 'time',
                        content: getNews.formatDateDay(resData[j].sendTime)
                      })
                    }
                  }
                }
              }else{
                imgData.push({
                  contentTypes: 'image',
                  type: 'time',
                  content: getNews.formatDateDay(resData[i].sendTime)
                })
                imgData.push({
                  contentTypes: 'image',
                  type: 'image',
                  content: resData[i].content,
                  time: resData[i].sendTime
                })
                if (i < resData.length - 1) {
                  const j = i + 1
                  const interval = resData[i].sendTime - resData[j].sendTime;
                  if (interval > 86400000) {
                    imgData.push({
                      contentTypes: 'image',
                      type: 'time',
                      content: getNews.formatDateDay(resData[j].sendTime)
                    })
                  }
                }
              }
            }else{
              if (i < resData.length - 1) {
                const j = i + 1
                const interval = resData[i].sendTime - resData[j].sendTime;
                if (interval > 86400000) {
                  imgData.push({
                    contentTypes: 'image',
                    type: 'image',
                    content: resData[i].content,
                    time: resData[i].sendTime
                  })
                  imgData.push({
                    contentTypes: 'image',
                    type: 'time',
                    content: getNews.formatDateDay(resData[j].sendTime)
                  })
                } else {
                  imgData.push({
                    contentTypes: 'image',
                    type: 'image',
                    content: resData[i].content,
                    time: resData[i].sendTime
                  })
              }
              }else{
                imgData.push({
                  contentTypes: 'image',
                  type: 'image',
                  content: resData[i].content,
                  time: resData[i].sendTime
                })
              }
            }
            
          }
          console.log(imgData);
          data.currentPage += 1
          this.setData({
            isShow: false,
            data,
            items: [...this.data.items, ...imgData],
            total_page: res.data.total_page,
            currentPage: data.currentPage
          })
        })
        .catch(error => {
        })
    }
  },
  //图片预览
  previewImage(e) {
    console.log(e.currentTarget.dataset.content)
    wx.previewImage({
      current: e.currentTarget.dataset.content, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.content] // 需要预览的图片http链接列表
    })
  },
  getTime(item){
    for(let i=0;i<item.length;i++){
      item[i].sendTime=getNews.formatDate(item[i].sendTime)
    }
    return item;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      groupId: options.groupId,
      userId: options.user_id ? options.user_id : null
    })
  },
  cancel(){
    console.log(this.data.input)
    this.setData({
      input: '',
      isShow: true,
      items:[],
      currentPage:1,
      total_page:1,
      data:{}
    })
  }, 
  toChat(e){
    const logId = e.currentTarget.dataset.logid;
    if (this.data.groupId==1){
      wx.navigateTo({
        url: `/pages/chat/chat?logId=${logId}`,
      })
    } else if (this.data.groupId == 0){
      wx.navigateTo({
        url: `/pages/visitorChat/visitorChat?logId=${logId}`,
      })
    }

  }
})