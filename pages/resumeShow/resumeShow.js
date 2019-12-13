// pages/resumeShow/resumeShow.js
import Api from '../../api/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: ''
  },
  goInvited: function() {
    wx.navigateTo({
      url: '../invited/invited',
    })
  },

  getData: function(id) {
    let that = this
    Api.requset('/api/Resume/Detail/' + id)
      .then(res => {
        console.log(res)
        that.setData({
          detail: res.data.Data
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.getData(options.id)
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