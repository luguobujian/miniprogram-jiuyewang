// pages/invited/invited.js
const app = getApp()
import Api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resumeId: '',
    index: 0,
    array: [],
    message: '你好，你的经历和我们的岗位比较匹配，发份简历给我吧！'
  },
  bindJobsChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindMessageInput: function(e) {
    this.setData({
      message: e.detail.value
    })
  },
  bindCome: function() {
    let that = this
    Api.requset('api/Resume/Invite', {
        "ResumeId": that.data.resumeId,
        "JobId": that.data.array[that.data.index].id,
        "Message": that.data.message
      }, 'POST')
      .then(res => {
        console.log(res)
        if (res.data.Code == 200) {
          wx.showToast({
            title: "邀请成功",
            icon: 'none',
            duration: 2000
          })
          wx.navigateBack()
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      resumeId: options.ResumeId
    })
    this.getCompanyJobList()
  },
  getCompanyJobList: function() {
    let that = this
    console.log(app.globalData.userInfo.Id)
    Api.requset('api/Job/CompanyJobList/' + app.globalData.userInfo.Id)
      .then(res => {
        console.log(res)
        if (res.data.Code == 200) {
          let tempData = res.data.Data
          for (let i = 0; i < tempData.length; i++) {
            that.data.array.push({
              id: tempData[i].Id,
              name: tempData[i].Name,
              salaryText: tempData[i].SalaryText,
              text: tempData[i].Name + " " + tempData[i].SalaryText,
            })
          }
          that.setData({
            array: that.data.array
          })
          console.log(that.data.array)
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