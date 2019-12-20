// pages/simpleShow/simpleShow.js
const app = getApp()
import Api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    role: '',
    showInp: false,
    Desc: '',
    detail: '',
    list: ''
  },
  bindShowInp: function(e) {
    if (this.data.showInp) {
      this.setData({
        showInp: false,
      })
    } else {
      this.setData({
        showInp: true,
      })
    }

  },
  goCompanyPage: function(e) {
    wx.navigateTo({
      url: '../companyShow/companyShow?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      role: app.globalData.role || ''
    })
    this.getJobData(options.id)
  },
  bindDescInput: function(e) {
    this.setData({
      Desc: e.detail.value
    })
  },
  getJobData: function(id) {
    let that = this
    Api.requset('api/Interact/Detail/' + id)
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
    Api.requset('api/Interact/CommentList?InteractId=' + that.data.detail.Id + '&Limit=' + 999)
      .then(res => {
        console.log(res)
        that.setData({
          list: res.data.PagedList.Data
        })
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  // save: function() {
  //   let that = this
  //   Api.requset('api/Job/Post', {
  //       JobId: that.data.detail.Id
  //     }, 'POST')
  //     .then(res => {
  //       console.log(res)
  //       if (res.data.Code == 200) {
  //         wx.showToast({
  //           title: '申请成功',
  //           icon: 'none'
  //         })
  //       }
  //     })
  // },
  saveComment: function() {
    let that = this
    if (!that.data.Desc) {
      wx.showToast({
        icon: 'none',
        title: '你什么都没输入',
      })
      return
    }
    console.log({
      "InteractId": that.data.detail.Id,
      "Desc": that.data.Desc
    })
    Api.requset('api/Interact/AddComment', {
        "InteractId": that.data.detail.Id,
        "Desc": that.data.Desc
      }, 'POST')
      .then(res => {
        console.log(res)
        if (res.data.Code == 200) {
          that.setData({
            showInp: false,
            Desc: ''
          })
          this.getListData()
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