// pages/resumeEdit/resumeEdit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  goEditMyInfo: function() {
    wx.navigateTo({
      url: '../editMyInfo/editMyInfo',
    })
  },
  goDes: function() {
    wx.navigateTo({
      url: '../myDes/myDes',
    })
  },
  goEditMyWork: function() {
    wx.navigateTo({
      url: '../editMyWork/editMyWork',
    })
  },
  goEditEdu: function() {
    wx.navigateTo({
      url: '../editMyEdu/editMyEdu',
    })
  },
  goEditPro: function() {
    wx.navigateTo({
      url: '../editMyPro/editMyPro',
    })
  },
  goEditCert: function() {
    wx.navigateTo({
      url: '../editMyCert/editMyCert',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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