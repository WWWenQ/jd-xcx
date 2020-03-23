// pages/list/index.js


const interfaces = require("../../utils/urlConfig.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prolist: [],
    page: 1,
    size: 5,
    noData: false,
  },

  switchToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "/pages/detail/index?id=" + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.title
    })

    wx.showLoading({
      title: '加载中...',
    })
    const self = this;
    wx.request({
      url: interfaces.productionsList,
      header: {
        "content-type": "application/json"
      },
      success(res) {
        wx.hideLoading()
        console.log(res.data)
        self.setData({
          prolist: res.data
        })
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
    wx.showNavigationBarLoading();
    this.setData({
      page: 1,
      noData: false,

    })
    const self = this;
    wx.request({
      url: interfaces.productionsList,
      header: {
        "content-type": "application/json"
      },
      success(res) {
        self.setData({
          prolist: res.data,

        })
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }
    })

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    wx.stopPullDownRefresh()
    wx.showNavigationBarLoading()
    const prolist = this.data.prolist;
    let page = this.data.page;
    this.setData({
      page: ++page
    })
    const self = this;
    wx.request({
      url: interfaces.productionsList + '/' + self.data.page + '/' + self.data.size,
      header: {
        "content-type": "application/json"
      },
      success(res) {
        if (res.data.length == 0) {
          self.setData({
            noData: true
          })
        } else {
          res.data.forEach(item => {
            prolist.push(item)
          })
          self.setData({
            prolist: prolist
          })
        }
        wx.hideNavigationBarLoading()
      }
    })



  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})