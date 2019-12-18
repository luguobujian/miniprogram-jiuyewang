// pages/search/search.js
import Api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    s: '',
    clear: false,
    hotList: '',
    lists: ''
  },
  bindSearchInput: function(e) {
    if (!e.detail.value) {
      this.setData({
        lists: []
      })
      return
    }
    this.setData({
      clear: true
    })
    this.getData(e.detail.value)

  },
  searchThis: function(e) {
    console.log(e)
    this.setData({
      s: e.currentTarget.dataset.s,
      clear: true
    })
    this.getData(e.currentTarget.dataset.s)
  },
  bindClear: function() {
    this.setData({
      s: '',
      lists: [],
      clear: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getHotList()
  },
  getHotList: function() {
    let that = this
    Api.requset('api/Search/Keyword')
      .then(res => {
        that.setData({
          hotList: res.data.Data
        })
      })
  },
  getData: function(keyword) {
    let that = this
    Api.requset('api/Job/List?keyword=' + keyword)
      .then(res => {
        console.log(res)
        that.setData({
          lists: res.data.PagedList.Data
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