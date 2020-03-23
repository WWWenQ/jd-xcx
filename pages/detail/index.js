// pages/detail/index.js
const interfaces = require("../../utils/urlConfig.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baitiao: [],
    partData: {},
    baitiaoSelectItem: {
      desc: "【白条支付】首单享立减优惠"
    },
    isHidden: true,
    hideBuy: true,
    badgeCount:0
  },


  popBaitiaoView() {
    this.setData({
      isHidden: false
    })
  },
  popBuyView() {
    this.setData({
      hideBuy: false
    })
  },

  mountChanged(e) {
    const partData = this.data.partData;
    partData.count = e.detail;
    this.setData({
      partData: partData
    })
  },

  selectBaitiaoItem(e) {
    const baitiao = this.data.baitiao
    for (let i = 0; i < baitiao.length; i++) {
      baitiao[i].select = false
    }
    const index = e.detail;
    baitiao[index].select = true;
    this.setData({
      baitiao: baitiao
    })
  },
  makeBaitiao(e) {
    const curBaitiao = this.data.baitiao.filter(item => item.select == true)

    const desc = curBaitiao[0].desc;

    this.setData({
      baitiaoSelectItem: {
        desc: desc
      },
      isHidden: true
    })

  },

  setBadgeCount(cartArray){
    const count = cartArray.length;
    this.setData({
      badgeCount:count
    })
  },
  addCart() {
    const self = this;
    wx.getStorage({
      key: 'cartInfo',
      success(res) {
        let partData = self.data.partData;
        let cartArray = res.data;
        let isExit = false;
        cartArray.forEach(item => {
          if (item.id == partData.id) {
            item.total += partData.count
            isExit = true
            wx.setStorage({
              key: 'cartInfo',
              data: cartArray,
            })
          }
        })

        if (!isExit) {
          let cartArray = res.data;
          partData.total = self.data.partData.count;
          cartArray.push(partData)
          wx.setStorage({
            key: 'cartInfo',
            data: cartArray,
          })
        }

        self.setBadgeCount(cartArray)


      },
      fail() {
        let partData = self.data.partData;
        let cartArray = [];
        partData.total = self.data.partData.count;
        cartArray.push(partData)

        wx.setStorage({
          key: 'cartInfo',
          data: cartArray,
        })
        self.setBadgeCount(cartArray)
      }
      
    })

    wx.showToast({
      title: '成功加入购物车',
      icon: "success",
      duration: 2000
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
    })
    const id = options.id;
    const self = this;
    wx.request({
      url: interfaces.productionDetail,
      header: {
        "content-type": "application/json"
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data)
        const result = res.data.filter(item => {
          return item.partData.id == id
        })
        console.log(result)
        self.setData({
          baitiao: result[0].baitiao,
          partData: result[0].partData
        })
      }
    })
  },

  showCartView(){
    wx.switchTab({
      url: '/pages/cart/index',
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
    const self = this;
    wx.getStorage({
      key: 'cartInfo',
      success: function(res) {
        self.setBadgeCount(res.data)
      },
    })
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