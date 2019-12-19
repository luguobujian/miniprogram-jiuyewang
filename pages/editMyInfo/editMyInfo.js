// pages/editMyInfo/editMyInfo.js
import Api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['保密', '男', '女'],
    array2: ['初中', '高中', '中技', '中专', '大专', '本科', '硕士', '博士', '博后'],
    regions: ['宿州市', '开发区', '埇桥区', '萧县', '砀山', '灵璧县', '泗县'],
    customItem: '全部',



    RealName: '',
    Sex: 0,
    Birthday: '',
    WorkBeginDate: '',
    Scope: 0,
    Education: 0,
    MobilePhone: '',
    Email: ''
  },
  bindRealNameInput(e) {
    this.setData({
      RealName: e.detail.value
    })
  },
  bindMobilePhoneInput(e) {
    this.setData({
      MobilePhone: e.detail.value
    })
  },
  bindEmailInput(e) {
    this.setData({
      Email: e.detail.value
    })
  },
  bindSexPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      Sex: e.detail.value
    })
  },
  bindBirthdayDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      Birthday: e.detail.value
    })
  },
  bindWorkBeginDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      WorkBeginDate: e.detail.value
    })
  },
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      Scope: e.detail.value
    })
  },
  bindEducationChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      Education: e.detail.value
    })
  },
  save: function() {
    let that = this
    if (!this.data.RealName) {
      wx.showToast({
        title: '姓名有误',
        icon: 'none',
        duration: 1500
      })
      return
    }
    if (!this.data.Birthday) {
      wx.showToast({
        title: '请选择出生年月',
        icon: 'none',
        duration: 1500
      })
      return
    }
    if (!this.data.WorkBeginDate) {
      wx.showToast({
        title: '请选择参加工作时间',
        icon: 'none',
        duration: 1500
      })
      return
    }
    if (!(/^1[34578]\d{9}$/.test(this.data.MobilePhone))) {
      wx.showToast({
        title: '请输入正确手机号',
        icon: 'none',
        duration: 1500
      })
      return
    }


    let str = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/

    if (!str.test(this.data.Email)) {
      wx.showToast({
        title: '请输入正确邮箱',
        icon: 'none',
        duration: 1500
      })
      return
    }

    Api.requset('api/Member/Profile', {
        "RealName": that.data.RealName,
        "Sex": that.data.Sex,
        "Birthday": that.data.Birthday,
        "WorkBeginDate": that.data.WorkBeginDate,
        "Scope": that.data.Scope,
        "Education": that.data.Education,
        "MobilePhone": that.data.MobilePhone,
        "Email": that.data.Email
      }, "POST")
      .then(res => {
        console.log(res)
        if (res.data.Code == 200) {
          wx.showToast({
            title: '保存成功',
            icon: 'none',
            duration: 1500
          })
          const pages = getCurrentPages()
          const prePage = pages[pages.length - 2];
          prePage.getData(res.data.Data.ResumeId)
          wx.navigateBack()
        }
      })
  },
  getData: function() {
    let that = this
    Api.requset('api/Member/Profile')
      .then(res => {
        that.setData({
          RealName: res.data.Data.RealName,
          Sex: res.data.Data.Sex,
          Birthday: res.data.Data.Birthday,
          WorkBeginDate: res.data.Data.WorkBeginDate,
          Scope: res.data.Data.Scope,
          Education: res.data.Data.Education,
          MobilePhone: res.data.Data.MobilePhone,
          Email: res.data.Data.Email
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData()
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