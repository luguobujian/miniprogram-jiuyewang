// pages/editMyEdu/editMyEdu.js
import Api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ae: "",
    array2: ['初中', '高中', '中技', '中专', '大专', '本科', '硕士', '博士', '博后'],
    "ResumeId": "",
    "School": "",
    "Education": "",
    "Profession": "",
    "StartDate": "",
    "EndDate": "",

  },
  bindSchoolInput(e) {

    this.setData({
      School: e.detail.value
    })
  },
  bindProfessionInput(e) {
    this.setData({
      Profession: e.detail.value
    })
  },
  bindEducationChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      Education: e.detail.value
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

      Api.requset('api/Resume/EducationAdd', {
          "ResumeId": that.data.ResumeId,
          "School": that.data.School,
          "Education": that.data.Education,
          "StartDate": that.data.StartDate,
          "EndDate": that.data.EndDate,
          "Profession": that.data.Profession
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
  del: function() {
    let that = this
    Api.requset('api/Resume/EducationDelete/' + that.data.ae, {}, "POST")
      .then(res => {
        if (res.data.Code === 200) {
          const pages = getCurrentPages()
          const prePage = pages[pages.length - 2];
          prePage.getData(that.data.ResumeId)
          wx.navigateBack()
        }
      })
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
    Api.requset('api/Resume/Education/' + id)
      .then(res => {
        console.log(res)
        if (res.data.Code === 200) {
          if (res.data.Data) {
            that.setData({
              "School": res.data.Data.School,
              "Education": res.data.Data.Education,
              "Profession": res.data.Data.Profession,
              "StartDate": res.data.Data.StartDate,
              "EndDate": res.data.Data.EndDate
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