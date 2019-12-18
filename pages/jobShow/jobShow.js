// pages/jobShow/jobShow.js
const app = getApp()
import Api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    role: '',
    detail: '',
    list: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      role: app.globalData.role || ''
    })
    this.getJobData(options.id)
  },
  getJobData: function(id) {
    let that = this
    Api.requset('api/Job/CompanyJobDetail/' + id)
      .then(res => {
        console.log(res)
        that.setData({
          detail: res.data.Data
        })
        that.getListData()
      })
  },
  getListData: function() {
    let that = this
    Api.requset('api/Job/CommentList/' + that.data.detail.Id)
      .then(res => {
        console.log(res)
        that.setData({
          list: res.data.Data
        })
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  save: function() {
    let that = this
    Api.requset('api/Job/Post', {
        JobId: that.data.detail.Id
      }, 'POST')
      .then(res => {
        console.log(res)
        if (res.data.Code == 200) {
          wx.showToast({
            title: '申请成功',
            icon: 'none'
          })
        }
      })
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