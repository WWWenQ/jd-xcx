// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartArray: [],
    totalMoney: "0.00",
    totalCount: 0,
    selectAll: false,
    startX: 0,
    startY: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
        const cartArray = res.data;
        cartArray.forEach(item => {
          item.select = false
          item.isTouchMove = false
        })
        self.setData({
          cartArray: cartArray
        })

        cartArray.length > 0 ?
          wx.setTabBarBadge({
            index: 2,
            text: String(cartArray.length),
          }) : wx.removeTabBarBadge({
            index: 2,
          })
      },
    })
  },
  mountChanged(e) {
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    cartArray[index].total = e.detail;
    this.setData({
      cartArray: cartArray
    })
  },
  switchGoodDetail(e) {
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    const id = cartArray[index].id
    wx.navigateTo({
      url: '/pages/detail/index?id=' + id,
    })
  },

  selectGood(e) {
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    let selectAll = this.data.selectAll;
    cartArray[index].select = !cartArray[index].select;
    let select = cartArray[index].select;
    let totalCount = this.data.totalCount;
    let totalMoney = Number(this.data.totalMoney)
    if (select) {
      totalCount += cartArray[index].total;
      totalMoney += Number(cartArray[index].price)
      totalMoney = String(totalMoney.toFixed(2))

    } else {
      totalCount -= cartArray[index].total;
      totalMoney -= Number(cartArray[index].price)
      totalMoney = String(totalMoney.toFixed(2))
      selectAll = false;
    }



    this.setData({
      cartArray: cartArray,
      totalCount: totalCount,
      totalMoney: totalMoney,
      selectAll: selectAll
    })
  },

  subCount(e) {
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    let select = cartArray[index].select;
    let totalMoney = Number(this.data.totalMoney)
    if (select) {

      totalMoney -= Number(cartArray[index].price)
      totalMoney = String(totalMoney.toFixed(2))
      this.setData({
        cartArray: cartArray,
        totalMoney: totalMoney
      })
    }
  },
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    let select = cartArray[index].select;
    let totalMoney = Number(this.data.totalMoney)
    if (select) {

      totalMoney += Number(cartArray[index].price)
      totalMoney = String(totalMoney.toFixed(2))
      this.setData({
        cartArray: cartArray,
        totalMoney: totalMoney
      })
    }
  },

  selectAll() {

    let selectAll = this.data.selectAll;
    let totalMoney = 0;
    let totalCount = 0;
    selectAll = !selectAll;
    let cartArray = this.data.cartArray;
    cartArray.forEach(item => {
      item.select = selectAll
      totalMoney += Number(item.price) * item.total
      totalCount += item.total
    })
    if (selectAll) {
      this.setData({
        cartArray: cartArray,
        selectAll: selectAll,
        totalMoney: String(totalMoney.toFixed(2)),
        totalCount: totalCount
      })
    } else {
      this.setData({
        cartArray: cartArray,
        selectAll: selectAll,
        totalMoney: "0.00",
        totalCount: 0
      })
    }

  },

  touchstart(e) {
    let startX = this.data.startX;
    let startY = this.data.startY;
    startX = e.changedTouches[0].clientX;
    startY = e.changedTouches[0].clientY;
    this.data.cartArray.forEach(item => {
      if (item.isTouchMove)
        item.isTouchMove = false;
    })
    this.setData({
      startX: startX,
      startY: startY,
      cartArray: this.data.cartArray
    })
  },
  touchmove(e) {
    const index = e.currentTarget.dataset.index
    let startX = this.data.startX;
    let startY = this.data.startY;
    let moveX = e.changedTouches[0].clientX;
    let moveY = e.changedTouches[0].clientY;

    var angel = this.angel({
      X: startX,
      Y: startY
    }, {
      X: moveX,
      Y: moveY
    })

    this.data.cartArray.forEach((cart, i) => {
      cart.isTouchMove = false;
      if (Math.abs(angel) > 30) return;
      if (i == index) {
        if (moveX > startX) {
          cart.isTouchMove = false
        } else {
          cart.isTouchMove = true
        }
      }
    })

    this.setData({
      cartArray: this.data.cartArray
    })

  },

  angel(start, end) {
    let _X = end.X - start.X;
    let _Y = end.Y - start.Y;

    return 360 * Math.atan(_Y / _X) / (2 * Math.PI)
  },

  del(e) {
    const index = e.currentTarget.dataset.index;
    const self = this;
    wx.getStorage({
      key: 'cartInfo',
      success(res) {
        const partData = res.data;
        partData.forEach((cart, i) => {
          if (cart.title == self.data.cartArray[index].title) {
            partData.splice(i, 1)
          }
        })
        wx.setStorage({
          key: 'cartInfo',
          data: partData,
        })
        self.update(index)
      },
    });
  },

  update(index) {
    let cartArray = this.data.cartArray;
    let totalMoney = Number(this.data.totalMoney);
    let totalCount = this.data.totalCount;

    if (cartArray[index].select) {
      totalMoney -= Number(cartArray[index].price) * cartArray[index].total;
      totalCount--;
    }
    cartArray.splice(index, 1)
    this.setData({
      cartArray: this.data.cartArray,
      totalMoney: String(totalMoney.toFixed(2)),
      totalCount: totalCount
    })
    cartArray.length > 0 ?
      wx.setTabBarBadge({
        index: 2,
        text: String(cartArray.length)
      }) : wx.removeTabBarBadge({
        index: 2,
      })
  },
  setAcount() {
    let shoppingList = [];
    this.data.cartArray.forEach(cart => {
      if (cart.select) {
        shoppingList.push(cart)
      }
    })

    const accountInfo = {
      shoppingList: shoppingList,
      totalMoney: this.data.totalMoney
    }
    wx.navigateTo({
      url: '/pages/order/index?accountInfo=' + JSON.stringify(accountInfo),
    })
  },
  /**
   * 
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    const cartArray = this.data.cartArray;
    wx.setStorage({
      key: 'cartInfo',
      data: cartArray,
    })
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