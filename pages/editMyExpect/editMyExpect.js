// pages/editMyExpect/editMyExpext.js
import Api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ResumeId: '',
    index: 0,
    array: '',
    index2: 0,
    array2: ['宿州市', '开发区', '埇桥区', '萧县', '砀山', '灵璧县', '泗县'],
    index3: 0,
    array3: ['面议', '(1000 - 1500元 / 月)', '(1500 - 2000元 / 月)', '(2000 - 3000元 / 月)', '(3000 - 5000元 / 月)', '(5000 - 10000元 / 月)', ' (1万以上 / 月)'],

  },
  bindPositionListChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  bindSalaryChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index3: e.detail.value
    })
  },
  save: function() {
    let that = this
    Api.requset('api/Resume/ExpectUpdate', {
        "ResumeId": that.data.ResumeId,
        "PositionId": that.data.array[that.data.index].PositionId,
        "Scope": that.data.index2,
        "Salary": that.data.index3
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
    this.setData({
      ResumeId: options.id
    })
    this.getPositionList()
    this.getData(options.id)
  },
  getData: function(id) {
    let that = this
    Api.requset('api/Resume/Expect?ResumeId=' + id)
      .then(res => {
        if (res.data.Code === 200) {
          that.data.array.forEach((item, index) => {
            if (item.PositionId === res.data.Data.PositionId) {
              that.setData({
                index: index,
              })
            }
          })
          that.setData({
            index2: res.data.Data.Scope,
            index3: res.data.Data.Salary,
          })
        }
      })
  },
  getPositionList: function() {
    let that = this
    Api.requset('api/Category/PositionList?CategoryId=0')
      .then(res => {
        that.setData({
          array: res.data.Data
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