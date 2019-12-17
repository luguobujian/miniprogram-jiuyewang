// pages/addJobs/addJobs.js
import Api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['宿州市', '开发区', '埇桥区', '萧县', '砀山', '灵璧县', '泗县'],
    array2: ['无经验', '1年以下', '1 - 3年', '3 - 5年', '5 - 10年', '10年以上'],
    array3: ['初中', '高中', '中技', '中专', '大专', '本科', '硕士', '博士', '博后', ],
    array4: ['面议', '1000 - 1500元 / 月', '1500 - 2000元 / 月', '2000 - 3000元 / 月', '3000 - 5000元 / 月', '5000 - 10000元 / 月', '1万以上 / 月'],
    array5: [],
    array6: [],

    "Name": "",
    "Scope": 0,
    "WorkExperience": 0,
    "Education": 0,
    "Salary": 0,
    "Tag": "1,2",
    "Desc": "",
    "PositionId": 0,
    "ProfessionId": 1
  },
  bindNameInput: function(e) {
    this.setData({
      Name: e.detail.value
    })
  },
  bindDescInput: function(e) {
    this.setData({
      Desc: e.detail.value
    })
  },
  bindPositionListChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      PositionId: e.detail.value
    })
  },
  bindProfessionListChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      ProfessionId: e.detail.value
    })
  },
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      Scope: e.detail.value
    })
  },
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      Scope: e.detail.value
    })
  },
  bindWorkExperienceChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      WorkExperience: e.detail.value
    })
  },
  bindEducationChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      Education: e.detail.value
    })
  },
  bindSalaryChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      Salary: e.detail.value
    })
  },
  save: function() {
    let that = this
    Api.requset('api/Job/Add', {
        "Name": that.data.Name,
        "Scope": that.data.Scope,
        "WorkExperience": that.data.WorkExperience,
        "Education": that.data.Education,
        "Salary": that.data.Salary,
        "Tag": that.data.Tag,
        "Desc": that.data.Desc,
        "PositionId": that.data.PositionId,
        "ProfessionId": that.data.ProfessionId
      }, "POST")
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
    this.getPositionList()
    this.getProfessionList()
  },
  getPositionList: function() {
    let that = this
    Api.requset('api/Category/PositionList?CategoryId=0')
      .then(res => {
        that.setData({
          array5: res.data.Data
        })
      })
  },
  getProfessionList: function() {
    let that = this
    Api.requset('api/Category/ProfessionList')
      .then(res => {
        that.setData({
          array6: res.data.Data
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