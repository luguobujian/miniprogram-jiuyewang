// pages/editMyWork/editMyWork.js
import Api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ae: '',
    "ResumeId": 0,
    "CompanyName": "",
    "Duty": "",
    "StartDate": "",
    "EndDate": "",
    "Introduce": ""
  },
  bindCompanyNameInput(e) {
    this.setData({
      CompanyName: e.detail.value
    })
  },
  bindDutyInput(e) {
    this.setData({
      Duty: e.detail.value
    })
  },
  bindIntroduceInput(e) {
    this.setData({
      Introduce: e.detail.value
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
  del: function() {
    let that = this
    Api.requset('api/Resume/WorkExperienceDelete/' + that.data.ae, {}, "POST")
      .then(res => {
        console.log(res)
        if (res.data.Code === 200) {
          const pages = getCurrentPages()
          const prePage = pages[pages.length - 2];
          prePage.getData(that.data.ResumeId)
          wx.navigateBack()
        }
      })
  },

  save: function() {
    let that = this
    let oDate1 = new Date(that.data.StartDate).getTime();
    let oDate2 = new Date(that.data.EndDate).getTime()
    if (oDate1 > oDate2) {
      wx.showToast({
        title: '离职时间不能小于入职时间',
        icon: 'none',
        duration: 2200
      })
      return
    }
    if (that.data.ae === 'add') {
      Api.requset('api/Resume/WorkExperienceAdd', {
          "ResumeId": that.data.ResumeId,
          "CompanyName": that.data.CompanyName,
          "Duty": that.data.Duty,
          "StartDate": that.data.StartDate,
          "EndDate": that.data.EndDate,
          "Introduce": that.data.Introduce
        }, "POST")
        .then(res => {
          if (res.data.Code === 200) {
            const pages = getCurrentPages()
            const prePage = pages[pages.length - 2];
            prePage.getData(that.data.ResumeId)
            wx.navigateBack()
          }
        })
    } else {
      Api.requset('api/Resume/WorkExperienceUpdate', {
          "Id": that.data.ae,
          "CompanyName": that.data.CompanyName,
          "Duty": that.data.Duty,
          "StartDate": that.data.StartDate,
          "EndDate": that.data.EndDate,
          "Introduce": that.data.Introduce
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
      wx.setNavigationBarTitle({
        title: '添加工作经历',
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
    Api.requset('api/Resume/WorkExperience/' + id)
      .then(res => {
        if (res.data.Code === 200) {
          that.setData({
            CompanyName: res.data.Data.CompanyName,
            Duty: res.data.Data.Duty,
            StartDate: res.data.Data.StartDate,
            EndDate: res.data.Data.EndDate,
            Introduce: res.data.Data.Introduce
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