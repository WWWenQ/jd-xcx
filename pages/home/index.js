// pages/home/index.js
const interfaces = require("../../utils/urlConfig.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logos: [],
    pageRow: [],
    quicks: [],
    swipers: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    vertical: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: "加载中..."
    })
    var self = this;
    wx.request({
      url: interfaces.homepage,
      header: {
        "content-type": "application/json"
      },
      success(res) {
        console.log(res.data)
        self.setData({
          logos: res.data.logos,
          pageRow: res.data.pageRow,
          quicks: res.data.quicks,
          swipers: res.data.swipers,
        })

        wx.hideLoading()
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