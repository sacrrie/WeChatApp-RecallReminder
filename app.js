import saveManager from './store/saveManager'
import todoStore from './store/todoStore'

//app.js
App({
  onLaunch: function () {
    // 读取数据
    saveManager.read()

    // 获取用户信息
    wx.getUserInfo({
      success: (res) => {
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userInfo = res.userInfo
      }
    })
  },

  globalData: {
    userInfo: null
  },

  /**
   * 小程序隐藏事件
   */
  onHide() {
    saveManager.save()
  },

  /**
   * 小程序错误事件
   */
  onError() {
    saveManager.save()
  }
})