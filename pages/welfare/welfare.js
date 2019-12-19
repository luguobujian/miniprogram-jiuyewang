// pages/welfare/welfare.js
import Api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [],
    detailValue: [],
    detailId: []
  },
  chooseItem: function(e) {
    console.log('checkboxChange e:', e);
    let string = "lists[" + e.target.dataset.index + "].selected"
    this.setData({
      [string]: !this.data.lists[e.target.dataset.index].selected
    })
    let detailValue = this.data.lists.filter(it => it.selected).map(it => it.value)
    let detailId = this.data.lists.filter(it => it.selected).map(it => it.id)
    console.log('所有选中的值为：', detailValue)
    console.log('所有选中的值为：', detailId)
    this.setData({
      detailValue,
      detailId
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData()
  },
  getData: function() {
    let that = this
    Api.requset('api/Category/PositionTagList')
      .then(res => {
        console.log(res)
        if (res.data.Code == 200) {
          let tempData = res.data.Data
          for (let key in tempData) {
            that.data.lists.push({
              id: key,
              value: tempData[key],
              selected: false
            })
          }
          that.setData({
            lists: that.data.lists
          })
          console.log(that.data.lists)
        }

      })
  },
  save: function() {
    let that = this

    let ids = that.data.detailId.join(',')
    let ts = that.data.detailValue.join(',')
    const pages = getCurrentPages()
    const prePage = pages[pages.length - 2];
    prePage.setData({
      Tag: "",
      TagText: ""
    })
    prePage.setData({
      Tag: ids,
      TagText: ts

    })
    wx.navigateBack()
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