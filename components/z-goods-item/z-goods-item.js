// components/z-goods-item/z-goods-item.js
Component({
  properties: {
    item: {
      type: Object,
      value: {}
    }
  },
  data: {

  },
  methods: {
    itemClick(e) {
      //1.获取iid
      const iid = this.data.item.iid
      //2.跳转到对应路径
      wx.navigateTo({
        url:'/pages/detail/detail?iid=' + iid
      })
    }
  }
})
