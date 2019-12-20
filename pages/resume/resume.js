// pages/resume/resume.js
import Api from '../../api/api.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sort: 0,
    dataList: '',
    showChoose: '职位筛选',
    PositionId: '',
    Limit: 10,

    chooseList: [],
    multiple: false
  },
  choose(e) {
    let arr = e.detail.chooseArray
    if (arr.length == 0) {
      this.setData({
        showChoose: '职位筛选',
        PositionId: '',
      })
      this.getData()
      return
    }
    let PositionIds = []
    let showChooses = []
    arr.forEach((item, value) => {
      PositionIds.push(item.PositionId)
      showChooses.push(item.Name)
    })
    this.setData({
      showChoose: showChooses.join(','),
      PositionId: PositionIds.join(','),
      chooseArray: e.detail.chooseArray
    })
    this.getData()
    console.log(this.data.PositionId);
    console.log(this.data.showChoose);
  },
  navSwitch: function(e) {
    if (this.data.sort == 0) {
      this.setData({
        sort: 1
      })
    } else {
      this.setData({
        sort: 0
      })
    }

    this.getData()
  },
  goResumeShow: function(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../resumeShow/resumeShow?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData()
    this.getPositionList()
  },
  getData: function() {
    let that = this
    Api.requset('api/Resume/List?Limit=' + that.data.Limit + '&Sort=' + that.data.sort + '&PositionId=' + that.data.PositionId)
      .then(res => {
        console.log(res)
        that.setData({
          dataList: res.data.PagedList.Data
        })
      })
  },
  getPositionList: function() {
    let that = this
    Api.requset('api/Category/PositionList?CategoryId=0')
      .then(res => {
        console.log(res)
        that.setData({
          chooseList: res.data.Data
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