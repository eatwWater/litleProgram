// components/z-tab-control/z-tab-control.js
Component({
  properties: {
    titles: {
      type: Array,
      value: []
    }
  },
  data: {
    currentIndex: 0
  },
  methods: {
    itemClick(event) {
      //1.设置新的index
      // console.log(event)
      this.setData({
        currentIndex: event.currentTarget.dataset.index
      })

      //2.发出事件
      const data = {index: this.data.currentIndex}
      this.triggerEvent("tabClick", data, {})
    }
  }
})
