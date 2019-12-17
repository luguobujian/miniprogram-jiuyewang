// pages/editMyPro/editMyPro.js
import Api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ae: '',
    "ResumeId": 0,
    "Name": "",
    "Classes": "",
    "StartDate": "",
    "EndDate": "",
    "Desc": ""
  },
  bindNameInput(e) {
    this.setData({
      Name: e.detail.value
    })
  },
  bindClassesInput(e) {
    this.setData({
      Classes: e.detail.value
    })
  },
  bindDescInput(e) {
    this.setData({
      Desc: e.detail.value
    })
  },
  bindStartDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      StartDate: e.detail.value
    })
  },
  bindEndDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      EndDate: e.detail.value
    })
  },

  save: function() {
    let that = this
    if (that.data.ae === 'add') {
      Api.requset('api/Resume/TrainAdd', {
          "ResumeId": that.data.ResumeId,
          "Name": that.data.Name,
          "Classes": that.data.Classes,
          "StartDate": that.data.StartDate,
          "EndDate": that.data.EndDate,
          "Desc": that.data.Desc
        }, "POST")
        .then(res => {
          console.log(res)
          if (res.data.Code === 200) {
            const pages = getCurrentPages()
            const prePage = pages[pages.length - 2];
            prePage.getData(that.data.ResumeId)
            wx.navigateBack()
          }
        })
    } else {
      Api.requset('api/Resume/TrainUpdate', {
          "Id": that.data.ae,
          "Name": that.data.Name,
          "Classes": that.data.Classes,
          "StartDate": that.data.StartDate,
          "EndDate": that.data.EndDate,
          "Desc": that.data.Desc
        }, "POST")
        .then(res => {
          console.log(res)
          if (res.data.Code === 200) {
            const pages = getCurrentPages()
            const prePage = pages[pages.length - 2];
            prePage.getData(that.data.ResumeId)
            wx.navigateBack()
          }
        })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    if (options.ae === 'add') {
      this.setData({
        ae: 'add',
        ResumeId: options.id
      })
    } else {
      this.setData({
        ae: options.ae,
        ResumeId: options.id
      })
      this.getData(options.ae)
    }
  },
  getData: function(id) {
    let that = this
    Api.requset('api/Resume/Train/' + id)
      .then(res => {
        if (res.data.Code === 200) {
          that.setData({
            Name: res.data.Data.Name,
            Classes: res.data.Data.Classes,
            StartDate: res.data.Data.StartDate,
            EndDate: res.data.Data.EndDate,
            Desc: res.data.Data.Desc
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