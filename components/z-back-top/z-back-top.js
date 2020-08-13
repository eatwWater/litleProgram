// components/z-back-top/z-back-top.js
Component({
  properties: {

  },
  data: {

  },
  methods: {
    // backTop() {
    //   wx.pageScrollTo({
    //     scrollTop: 0
    //   })
    // }
    backTop() {
      this.triggerEvent('back-top',{},{})
    }
  }
})
