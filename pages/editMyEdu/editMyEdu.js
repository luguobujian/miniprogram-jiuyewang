// pages/editMyEdu/editMyEdu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "ResumeId": "",
    "School": "",
    "Education": "",
    "Profession": "",
    "StartDate": "",
    "EndDate": ""
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