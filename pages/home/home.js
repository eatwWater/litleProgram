// pages/home/home.js
import {getMultiData, getGoodsData} from '../../service/home'

const types = ['pop','new','sell']
const TOP_DISTANCE = 1000

Page({
  data: {
   banners: [],
   recommends: [],
   titles: ['流行','新款','精选'],
   goods: {
     pop: {page: 0, list: []},
     new: {page: 0, list: []},
     sell: {page: 0, list: []}
   },
   currentType: 'pop',
   showBackTop: false,
   isTabFixed: false,
   tabScrollTop: 0
  },
  onLoad() {
    // 1.请求轮播图以及推荐数据
    this._getMultiData()

    //2.获取goods数据
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')
  },
  // --------------网络请求-----------------
  _getMultiData() {
    getMultiData().then(res => {
      // 1.1取出轮播图和推荐数据
      const banners = res.data.data.banner.list;
      const recommends = res.data.data.recommend.list;

      // 1.2将数据存到data中
      this.setData({
        banners,
        recommends
      })
    })
  },
  _getGoodsData(type) {
    //1.获取页码
    const page = this.data.goods[type].page + 1

    // 2.发送请求
    getGoodsData(type, page).then(res => {
      //2.1取出数据
      const list = res.data.data.list;

      // 2.2将数据设置到对应type的list中
      const oldList = this.data.goods[type].list;
      oldList.push(...list);

      // 2.3将数据设置到data中的goods中
      const typeKey = `goods.${type}.list`;
      const pageKey = `goods.${type}.page`;
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page
      })

    })
  },

  // --------------其他函数-----------------
  // imageLoad
  handleImageLoad() {
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      // console.log(rect)
      this.data.tabScrollTop = rect.top
    }).exec()
  },

  // 监听tab-control点击
  tabControlClick(event) {
    //取出tab-control的index
    const index = event.detail.index;

    // 设置currentType
    const type = types[index]
    this.setData({
      currentType: types[index]
    })
  },

  // 上拉加载更多
  onReachBottom() {
    // 到底部->请求数据
    this._getGoodsData(this.data.currentType)
  },
  onPageScroll(options) {
    // 1.取出scrollTop
    const scrollTop = options.scrollTop;

    //2. 修改showBackTop
    // 不要在滚动的函数中频繁地调用this.setData
    const flag1 = scrollTop >= TOP_DISTANCE
    if(flag1 != this.data.showBackTop) {
      this.setData({
        showBackTop: flag1
      })
    }

    //3.修改isTabFixed
    const flag2 = scrollTop >= this.data.tabScrollTop
    if (flag2 != this.data.isTabFixed) {
      this.setData({
        isTabFixed: flag2
      })
    }
  },
  backTop() {
    wx.pageScrollTo({
      duration: 300,
      scrollTop: 0
    })
  }
})
