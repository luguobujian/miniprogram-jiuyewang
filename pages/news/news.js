// pages/news/news.js
import Api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    Limit: 10,
    dataList: ''
  },
  goNextPage: function(e) {

    wx.navigateTo({
      url: '../newShow/newShow?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.type == 1) {
      wx.setNavigationBarTitle({
        title: '新闻'
      })
    } else if (options.type == 2) {
      wx.setNavigationBarTitle({
        title: '公告'
      })
    }
    this.setData({
      type: options.type
    })
    this.getData()
  },
  getData: function(type) {
    let that = this
    Api.requset('api/Article/List?Limit=' + that.data.Limit + '&Category=' + that.data.type)
      .then(res => {
        console.log(res)
        if (res.data.Code == 200) {
          that.setData({
            dataList: res.data.PagedList.Data
          })

          if (that.data.dataList.length >= res.data.PagedList.Data.length) {
            wx.showToast({
              title: '已经到底啦~',
              icon: 'none',
              duration: 1500
            })
            return
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
    this.getData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      Limit: this.data.Limit + 10
    })
    this.getData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})