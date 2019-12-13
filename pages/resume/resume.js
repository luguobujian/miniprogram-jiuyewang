// pages/resume/resume.js
import Api from '../../api/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sort: 0,
    dataList: ''
  },
  navSwitch: function(e) {
    this.setData({
      sort: e.currentTarget.dataset.sort
    })
    this.getData()
  },
  goResumeShow: function(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../resumeShow/resumeShow?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData()
  },
  getData: function() {
    let that = this
    Api.requset('api/Resume/List?Sort=' + that.sort)
      .then(res => {
        console.log(res)
        that.setData({
          dataList: res.data.PagedList.Data
        })
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