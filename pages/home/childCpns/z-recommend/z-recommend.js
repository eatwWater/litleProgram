// components/z-recommend/z-recommend.js
Component({
  properties: {
    list: {
      type: Array,
      value: []
    }
  },
  data: {
    isLoad: false
  },
  methods: {
    imageLoad() {
     if(!this.data.isLoad) {
        this.triggerEvent('imgLoad',{},{})
        this.data.isLoad = true
     }
    }
  }
})
