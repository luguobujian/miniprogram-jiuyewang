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
    duration: 500,

    role: '',

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
    this.getData()

  },
  getData: function() {
    let that = this
    new Promise((resolve, reject) => {
        wx.login({
          success(res) {
            console.log(res)
            resolve(res)
          }
        })
      })
      .then(r => Api.requset('api/Auth/Code2Session?js_code=' + r.code))
      .then(r => {
        console.log(r)
        new Promise((resolve, reject) => {
          app.globalData.openId = r.data.Data.WxOpenId
        })
      })
      .then(r => Api.requset('api/Auth/Login', {
        "WxOpenId": app.globalData.openId
      }, "POST"))
      .then(r => {
        console.log(r)
        let that = this
        if (r.data.Data.MType == 2) {
          app.globalData.role = 2
          that.setData({
            role: 2
          })
        } else if (r.data.Data.MType == 1) {
          app.globalData.role = 1
          that.setData({
            role: 1
          })
        }
        new Promise((resolve, reject) => {
          if (r.data.Code == 200) {
            if (r.data.Data.Status == 1) {
              wx.navigateTo({
                url: '../bind/bind',
              })
            } else {
              app.globalData.token = r.data.Data.Token
              resolve(r.data.Data.Token)
            }
          }
        })
      })
      .then(
        r => {
          if (that.data.role == 1) {
            Api.requset('api/Member/Basic').then(res => {
              console.log(res)
              let that = this
              if (res.data.Code == 200) {
                app.globalData.userInfo = res.data.Data
              }
            })
          } else {
            Api.requset('api/Company/Basic').then(res => {
              console.log(res)
              let that = this
              if (res.data.Code == 200) {
                app.globalData.userInfo = res.data.Data
              }
            })
          }
        }
      )
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this
    Api.requset('api/Category/PositionTagList')
      .then(res => {
        console.log(res)
      })
    Api.requset('api/Category/PositionCategoryList')
      .then(res => {
        console.log(res)
      })
    Api.requset('api/Category/PositionList')
      .then(res => {
        console.log(res)
      })
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
  goCompanyPage: function(e) {
    wx.navigateTo({
      url: '../companyShow/companyShow?id=' + e.currentTarget.dataset.id,
    })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getData()
  },
})