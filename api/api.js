const app = getApp()
class Api {
  constructor() {
    this.baseUrl = 'https://ssl.lel.cn/'
    this.header = {}
    this.requset = this.requset.bind(this)
  }

  async requset(url = '', data = {}, method = 'GET') {
    return new Promise((resolve, reject) => {
      let header = {
        'Authorization': app.globalData.token ? "BasicAuth " + app.globalData.token : '',
        'Content-Type': 'application/json'
      }
      method = method.toUpperCase()
      url = this.baseUrl + url;
      wx.request({
        url: url,
        data: data,
        header: header,
        method: method,
        success: (res => {
          wx.stopPullDownRefresh()
          if (res.statusCode === 200) {
            resolve(res)
          } else {
            if (this._errorHandler != null) {
              this._errorHandler(res)
            }
            reject(res)
          }
        }),
        fail: (res => {
          wx.stopPullDownRefresh()
          if (this._errorHandler != null) {
            this._errorHandler(res)
          }
          reject(res)
        })
      })
    })
  }
}
export default new Api()