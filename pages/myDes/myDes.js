// pages/myDes/myDes.js
import Api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    desc: ''
  },
  bindDescInput: function(e) {
    this.setData({
      desc: e.detail.value
    })
  },
  save: function() {
    let that = this
    if (!this.data.desc) {
      wx.showToast({
        title: '你什么都没输入',
        icon: 'none',
        duration: 1500
      })
      return
    }
    Api.requset('api/Resume/SpecialityUpdate', {
        "ResumeId": that.data.id,
        "Desc": that.data.desc
      }, "POST")
      .then(res => {
        console.log(res)
        if (res.data.Code === 200) {
          const pages = getCurrentPages()
          const prePage = pages[pages.length - 2];
          prePage.getData(that.data.id)
          wx.navigateBack()
        }
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    if (options.id) {
      this.setData({
        id: options.id
      })
      this.getData(options.id)
    }
  },
  getData: function(id) {
    let that = this
    Api.requset('api/Resume/Speciality?ResumeId=' + id)
      .then(res => {
        console.log(res)
        if (res.data.Code === 200) {
          if (res.data.Data) {
            that.setData({
              desc: res.data.Data.Desc
            })
          }
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