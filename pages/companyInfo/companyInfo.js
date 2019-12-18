// pages/companyInfo/companyInfo.js
import Api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    regions: ['宿州市', '开发区', '埇桥区', '萧县', '砀山', '灵璧县', '泗县'],

    "Name": "",
    "Profession": 0,
    "Scope": 0,
    "Address": "",
    "ContactPhone": "",
    "BusinessLicenseUrl": "",
    "Introduce": "",
    "Imgs": []
  },
  bindNameInput: function(e) {
    this.setData({
      Name: e.detail.value
    })
  },
  bindAddressInput: function(e) {
    this.setData({
      Address: e.detail.value
    })
  },
  bindContactPhoneInput: function(e) {
    this.setData({
      ContactPhone: e.detail.value
    })
  },
  bindIntroduceInput: function(e) {
    this.setData({
      Introduce: e.detail.value
    })
  },
  bindProfessionListChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      Profession: e.detail.value
    })
  },
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      Scope: e.detail.value
    })
  },
  chsBusinessLicense: function() {
    let that = this
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://xqjyw.lel.cn/api/Upload/Index', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          success(res) {

            const data = JSON.parse(res.data)
            console.log(data)
            that.setData({
              BusinessLicenseUrl: data.Data.Url
            })
          }
        })
      }
    })
  },
  addImgs: function() {
    let that = this
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://xqjyw.lel.cn/api/Upload/Index', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          success(res) {
            const data = JSON.parse(res.data)
            console.log(data)
            that.data.Imgs.push(data.Data.Url)
            that.setData({
              Imgs: that.data.Imgs
            })
          }
        })
      }
    })
  },
  save: function() {
    let that = this
    Api.requset('api/Company/Profile', {
        "Name": that.data.Name,
        "Profession": that.data.array[that.data.Profession].Id,
        "Scope": that.data.Scope,
        "Address": that.data.Address,
        "ContactPhone": that.data.ContactPhone,
        "BusinessLicenseUrl": that.data.BusinessLicenseUrl,
        "Introduce": that.data.Introduce,
        "Imgs": that.data.Imgs
      }, "POST")
      .then(res => {
        console.log(res)
        if (res.data.Code === 200) {
          const pages = getCurrentPages()
          const prePage = pages[pages.length - 2];
          prePage.getData()
          wx.navigateBack()
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData()
    this.getProfessionList()
  },
  getData: function() {
    let that = this
    Api.requset('api/Company/Profile').then(res => {
      console.log(res)
      if (res.data.Code == 200) {
        that.setData({
          detail: res.data.Data,
          "Name": res.data.Data.Name || "",
          "Profession": res.data.Data.Profession || 0,
          "Scope": res.data.Data.Scope || 0,
          "Address": res.data.Data.Address || "",
          "ContactPhone": res.data.Data.ContactPhone || "",
          "BusinessLicenseUrl": res.data.Data.BusinessLicenseUrl || "",
          "Introduce": res.data.Data.Introduce || "",
          "Imgs": res.data.Data.Imgs || []
        })
      }
    })
  },
  getProfessionList: function() {
    let that = this
    Api.requset('api/Category/ProfessionList')
      .then(res => {
        console.log(res)
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