// pages/companyShow/companyShow.js
import Api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showC: 0,
    detail: '',
    tag: [],
    jobs: ''
  },
  switchNav: function(e) {
    this.setData({
      showC: e.currentTarget.dataset.s
    })
  },
  goNextPage: function (e) {
    wx.navigateTo({
      url: '../jobShow/jobShow?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let that = this
    Api.requset('api/Company/Detail/' + options.id)
      .then(res => {
        console.log(res)
        that.setData({
          detail: res.data.Data,
          tag: res.data.Data.Tag && res.data.Data.Tag.split(',')
        })
      })

    Api.requset('api/Job/CompanyJobList/' + options.id)
      .then(res => {
        that.setData({
          jobs: res.data.Data
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