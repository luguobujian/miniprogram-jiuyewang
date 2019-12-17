// pages/my/my.js
const app = getApp()
import Api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login: false,
    showMy: true,
    userInfo: app.globalData.userInfo || ''
  },
  goResumeEdit: function() {
    if (!this.data.login) {
      wx.navigateTo({
        url: '../bind/bind',
      })
      return
    }
    if (this.data.userInfo.ResumeId === 0) {
      wx.navigateTo({
        url: '../editMyInfo/editMyInfo?id=' + this.data.Id,
      })
    } else {
      wx.navigateTo({
        url: '../resumeEdit/resumeEdit?id=' + this.data.userInfo.ResumeId,
      })
    }
  },
  goCompanyJobs: function() {
    wx.navigateTo({
      url: '../companyJobs/companyJobs',
    })
  },
  goCompanyInfo: function() {
    wx.navigateTo({
      url: '../companyInfo/companyInfo',
    })
  },
  goCompanyRecruitment: function() {
    wx.navigateTo({
      url: '../companyRecruitment/companyRecruitment',
    })
  },
  goCompanyMessage: function() {
    if (!this.data.login) {
      wx.navigateTo({
        url: '../bind/bind',
      })
      return
    }
    wx.navigateTo({
      url: '../companyMessage/companyMessage',
    })
  },
  goLogin: function() {
    // wx.navigateTo({
    //   url: '../login/login',
    // })
    if (!this.data.login) {
      wx.navigateTo({
        url: '../bind/bind',
      })
      return
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.userInfo) {
      this.setData({
        login: true,
        userInfo: app.globalData.userInfo,
      })
    } else {
      this.getData()
    }

  },
  getData: function() {
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
        if (r.data.Data.MType === 2) {
          that.setData({
            showMy: false
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
        r => Api.requset('api/Member/Basic')
      ).then(res => {
        console.log(res)
        let that = this
        if (res.data.Code == 200) {
          app.globalData.userInfo = res.data.Data
          that.setData({
            userInfo: res.data.Data
          })
        }
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})