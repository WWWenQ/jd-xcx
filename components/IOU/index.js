// components/IOU/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isHidden: {
      type: Boolean,
      value: true
    },
    baitiaoInfo: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    index:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideBaitiaoView(e) {
      // console.log(e)
      if (e.target.dataset.target == "self") {
        this.setData({
          isHidden: true
        })
      }

    },
    selectItem(e){
      const index = e.currentTarget.dataset.index;
      this.setData({
        index:index
      })
      this.triggerEvent("selectBaitiaoItem",index)
    },

    makeBaitiao(){
      this.triggerEvent("makeBaitiao",this.data.index)
    }
  }
})