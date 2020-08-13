// pages/cart/cart.js

const app = getApp()

Page({
  data: {
    cartList: [],
    isSelectAll: true,
    totalPrice: 0,
    totalCounter: 0
  },
  onLoad: function (options) {
    // 2.第一次加载数据
    this.setData({
      cartList: app.globalData.cartList
    })

    // 2.设置回调
    app.addCartCallback = () => {
      // 2.1解决如果第一次先进入购物车界面，再添加商品，而购物车界面没有展示的问题
      this.setData({
        cartList: app.globalData.cartList
      })
      this.changeData()
    }

    //2.2.设置修改某个商品的回调
    app.changeGoodsState = (index, goods) => {
      // 1.修改某一项的选中状态
      // console.log('回调')
      this.setData({
        [`cartList[${index}]`]: goods
      })

      // 2.修改全部选中的状态
      const selectAll = !this.data.cartList.find(item => !item.checked)
      this.setData({
        isSelectAll: selectAll
      })
      this.changeData()
    }
  },
  onShow() {
    wx.setNavigationBarTitle({
      title: `购物车(${this.data.cartList.length})`
    })

    this.changeData()
  },
  onSelectAll() {
    if (this.data.isSelectAll) {//目前全部选中
      this.data.cartList.forEach(item => {
        item.checked = false
      })
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: false
      })
    } else {//某些/全部没有选中
        this.data.cartList.forEach(item => {
          item.checked = true
        })
        this.setData({
          cartList: this.data.cartList,
          isSelectAll: true
        })
    }
  },
  changeData() {
    // 1.获取所有选中数据
    let totalPrice = 0;
    let counter = 0;

    for (let item of this.data.cartList) {
      if (item.checked) {
        counter++
        totalPrice += item.price * item.count
      }
    } 

    // 2.修改数据
    this.setData({
      totalCounter: counter,
      totalPrice: totalPrice
    })
  }
})