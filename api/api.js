class Api {
  constructor() {
    this.baseUrl = 'http://xqjyw.lel.cn/'
    this._header = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    this.requset = this.requset.bind(this)
  }

  async requset(url = '', data = {}, method = 'GET') {
    return new Promise((resolve, reject) => {
      method = method.toUpperCase()
      url = this.baseUrl + url;
      wx.request({
        url: url,
        data: data,
        header: this.header,
        method: method,
        success: (res => {
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