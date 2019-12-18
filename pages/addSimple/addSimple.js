// pages/addSimple/addSimple.js
import Api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "Title": "",
    "Desc": "",
    "ContactName": "",
    "ContactPhone": ""
  },
  bindTitleInput: function(e) {
    this.setData({
      Title: e.detail.value
    })
  },
  bindContactNameInput: function(e) {
    this.setData({
      ContactName: e.detail.value
    })
  },
  bindContactPhoneInput: function(e) {
    this.setData({
      ContactPhone: e.detail.value
    })
  },
  bindDescInput: function(e) {
    this.setData({
      Desc: e.detail.value
    })
  },
  save: function() {
    let that = this
    console.log({
      "Title": that.data.Title,
      "Desc": that.data.Desc,
      "ContactName": that.data.ContactName,
      "ContactPhone": that.data.ContactPhone
    })
    Api.requset('api/Interact/Add', {
        "Title": that.data.Title,
        "Desc": that.data.Desc,
        "ContactName": that.data.ContactName,
        "ContactPhone": that.data.ContactPhone
      }, "POST")
      .then(res => {
        console.log(res)
        if (res.data.Code === 200) {
          const pages = getCurrentPages()
          const prePage = pages[pages.length - 2];
          prePage.getData("")
          wx.navigateBack()
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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