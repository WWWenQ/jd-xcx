// components/buy/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hideBuy: {
      type: Boolean,
      value: true
    },
    partData: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideBuyView(e) {
      if (e.target.dataset.target == "self") {
        this.setData({
          hideBuy: true
        })
      }
    },
    mountChanged(e){
      var val = e.detail;
      this.triggerEvent("mountChanged",val)
    },
    addCart(){
      this.setData({
        hideBuy:true
      }),
      this.triggerEvent("addCart")
    }
  }
})