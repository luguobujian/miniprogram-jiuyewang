// pages/simple/simple.js
const app = getApp()
import Api from '../../api/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    s: '',
    role: '',
    clear: '',
    dataList: ''
  },
  bindSearchInput: function(e) {
    if (!e.detail.value) {
      this.getData("")
      return
    }
    this.setData({
      clear: true
    })
    this.getData(e.detail.value)
  },
  bindClear: function() {
    this.setData({
      s: '',
      clear: false
    })
    this.getData("")
  },
  goAddSimple: function() {
    wx.navigateTo({
      url: '../addSimple/addSimple',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      Limit: 99999,
      role: app.globalData.role || ''
    })
    this.getData("")
  },
  getData: function(keyword) {
    let that = this
    Api.requset('api/Interact/List?Limit=' + that.data.Limit + '&keyword=' + keyword)
      .then(res => {
        that.setData({
          dataList: res.data.PagedList.Data
        })
        if (res.data.PagedList.Data.length == 0) {
          wx.showToast({
            title: '暂无相关职位信息',
            icon: 'none',
            duration: 1500
          })
          return
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
    this.getData("")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      Limit: this.data.Limit + 10
    })
    this.getData("")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})