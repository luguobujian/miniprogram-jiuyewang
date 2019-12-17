// pages/bind/bind.js
const app = getApp()
import Api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnValue: '获取验证码',
    btnDisabled: false,
    name: '',
    phone: '',
    code: '',
    second: 60
  },
  onLoad: function(options) {
    console.log(options)
  },
  //姓名输入
  bindNameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  //手机号输入
  bindPhoneInput(e) {
    var val = e.detail.value;
    this.setData({
      phone: val
    })
  },
  //验证码输入
  bindCodeInput(e) {
    this.setData({
      code: e.detail.value
    })
  },
  //获取短信验证码
  getCode(e) {
    let that = this;
    Api.requset('api/Auth/SendVCode', {
        "MobilePhone": that.data.phone,
        "Type": 0
      }, "POST")
      .then(res => {
        console.log(res)
        if (res.data.Code == 200) {
          that.timer()
        }
      })
  },
  timer: function() {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          var second = this.data.second - 1;
          this.setData({
            second: second,
            btnValue: second + '秒',
            btnDisabled: true
          })
          if (this.data.second <= 0) {
            this.setData({
              second: 60,
              btnValue: '获取验证码',
              btnDisabled: false
            })
            resolve(setTimer)
          }
        }, 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },
  //保存
  save(e) {
    let that = this
    console.log('手机号: ' + this.data.phone);
    console.log('验证码: ' + this.data.code);
    Api.requset('api/Auth/Bind', {
        "MobilePhone": that.data.phone,
        "VCode": that.data.code,
        "WxOpenId": app.globalData.openId,
        "WxUnionId": ""
      }, "POST")
      .then(res => {
        console.log(res)
        if (res.data.Code == 200) {
          app.globalData.token = res.data.Data.Token
          const pages = getCurrentPages()
          const prePage = pages[pages.length - 2];
          prePage.getData()
          wx.navigateBack()
        } else {
          wx.showToast({
            title: res.data.Msg,
            icon: 'none',
            duration: 1500
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