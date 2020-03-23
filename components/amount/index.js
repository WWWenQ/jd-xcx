// components/amount/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count:{
      type:Number,
      value:1
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
    inputChangeHandle(e){
      const val = e.detail.value;
      this.triggerEvent("mountChanged",val)
    },
    subtract(e){
      let count = this.data.count;
      if(count>1){
        count--;
        this.setData({
          count:count
        })
        const val = e.detail.value;
        this.triggerEvent("mountChanged", count)
        this.triggerEvent("subevent")
      }
    },
    add(e){
      let count = this.data.count;
      count++;
      this.setData({
        count:count
      })
      
      this.triggerEvent("mountChanged", count)
      this.triggerEvent("addevent")
    }
  }
})
