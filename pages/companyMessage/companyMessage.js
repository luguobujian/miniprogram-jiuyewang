// pages/companyMessage/companyMessage.js
const app = getApp()
import Api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    role: '',
    showId: '',
    showInp: false,
    inpP: '',
    dataList: '',

    "CommentId": '',
    "Desc": ""
  },

  bindShowInp: function(e) {
    this.setData({
      showInp: true,
      inpP: e.currentTarget.dataset.w,
      showId: e.currentTarget.dataset.id
    })
  },
  bindDescInput: function(e) {
    this.setData({
      Desc: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData()
    this.setData({
      role: app.globalData.role || ''
    })
  },
  getData: function() {
    let that = this
    if (that.data.role === 1) {
      Api.requset('api/Member/CommentList')
        .then(res => {
          console.log(res)
          that.setData({
            dataList: res.data.PagedList.Data
          })
        })
    } else {
      Api.requset('api/Company/CommentList')
        .then(res => {
          console.log(res)
          that.setData({
            dataList: res.data.PagedList.Data
          })
        })
    }

  },
  save: function() {
    let that = this
    if (!that.data.Desc) {
      wx.showToast({
        icon: 'none',
        title: '你什么都没输入',
      })
      return
    }
    console.log({
      "CommentId": that.data.showId,
      "Desc": that.data.Desc
    })
    Api.requset('api/Job/AddReply', {
        "CommentId": that.data.showId,
        "Desc": that.data.Desc
      }, 'POST')
      .then(res => {
        console.log(res)
        that.setData({
          showId: '',
          showInp: false,
          Desc: ''
        })
        this.getData()
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