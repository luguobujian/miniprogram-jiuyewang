// pages/resumeEdit/resumeEdit.js
import Api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: ''
  },
  goEditMyInfo: function() {
    wx.navigateTo({
      url: '../editMyInfo/editMyInfo',
    })
  },
  goEditMyExpect: function() {
    wx.navigateTo({
      url: '../editMyExpect/editMyExpect?id=' + this.data.detail.Id,
    })
  },
  goDes: function() {
    wx.navigateTo({
      url: '../myDes/myDes?id=' + this.data.detail.Id,
    })
  },
  goEditMyWork: function(e) {
    wx.navigateTo({
      url: '../editMyWork/editMyWork?ae=' + e.currentTarget.dataset.ae + '&id=' + this.data.detail.Id,
    })
  },
  goEditEdu: function(e) {
    wx.navigateTo({
      url: '../editMyEdu/editMyEdu?ae=' + e.currentTarget.dataset.ae + '&id=' + this.data.detail.Id,
    })
  },
  goEditPro: function(e) {
    wx.navigateTo({
      url: '../editMyPro/editMyPro?ae=' + e.currentTarget.dataset.ae + '&id=' + this.data.detail.Id,
    })
  },
  goEditCert: function() {
    wx.navigateTo({
      url: '../editMyCert/editMyCert?id=' + this.data.detail.Id,
    })
  },
  delSkill: function(e) {
    let that = this
    Api.requset('api/Resume/SkillDelete/' + e.currentTarget.dataset.id, {}, "POST")
      .then(res => {
        if (res.data.Code === 200) {
          that.getData(that.data.detail.Id)
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.getData(options.id)
  },
  getData: function(id) {
    let that = this
    Api.requset('/api/Resume/Detail/' + id)
      .then(res => {
        console.log(res)
        that.setData({
          detail: res.data.Data
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