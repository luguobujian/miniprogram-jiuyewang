//index.js
//获取应用实例
const app = getApp()
import Api from '../../api/api.js'
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    showTab: 1,

    Slide: [],
    News: [],
    Notice: [],
    Recommend: [],
    Newest: [],


    indicatorDots: true,
    indicatorColor: "rgba(255,255,255,.3)",
    indicatorActiveColor: "rgba(255,255,255,1)",
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getIndexData: function() {
    let that = this
    Api.requset('api/Index/Detail')
      .then(res => {
        console.log(res)
        that.setData({
          Slide: res.data.Data.Slide,
          News: res.data.Data.News,
          Notice: res.data.Data.Notice,
          Recommend: res.data.Data.Recommend,
          Newest: res.data.Data.Newest
        })
      })
  },
  onLoad: function() {
    this.getIndexData()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  switchNav: function(e) {
    this.setData({
      showTab: e.currentTarget.dataset.s
    })
  },
  goSearchPage: function() {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  goNextPage: function(e) {
    wx.navigateTo({
      url: '../news/news?type=' + e.currentTarget.dataset.type,
    })
  },
  goCompanyPage: function() {
    wx.navigateTo({
      url: '../companyShow/companyShow',
    })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})