// pages/detail/detail.js
import {
  getDetail, GoodsBaseInfo, ShopInfo, ParamInfo, getRecommends
} from '../../service/detail'

const TOP = 1500;
const app = getApp()

Page({
  data: {
    iid: '',
    topImages: [],
    baseInfo: {},
    shopInfo: {},
    detailInfo: {},
    paramInfo: {},
    commentInfo: {},
    recommends: {},
    isShowBackTop: false
  },
  onLoad(options) {
    // 1.获取传入的iid
    // console.log(options)
    this.setData({
      iid: options.iid
    })

    // 2.获取商品的详情数据
    this._getDetailData()

    // 3.请求推荐详情数据
    this._getRecommends()
  },
  // -------------------网络请求-------------
  _getDetailData() {
    getDetail(this.data.iid).then(res => {
      const data = res.data.result;
      // console.log(data)

      //1.取出顶部的图片
      const topImages = data.itemInfo.topImages;

      // 2.创建BaseInfo对象
      const baseInfo = new GoodsBaseInfo(data.itemInfo, data.columns, data.shopInfo.services)

      // 3.创建ShopInfo对象
      const shopInfo = new ShopInfo(data.shopInfo)

      // 4.获取detailInfo信息
      const detailInfo = data.detailInfo

      // 5.创建ParamInfo对象
      const paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule)

      //6.获取评论信息
      let commentInfo = {}
      if (data.rate && data.rate.cRate > 0) {
        commentInfo = data.rate.list[0]
      }

      this.setData({
        topImages,
        baseInfo,
        shopInfo,
        detailInfo,
        paramInfo,
        commentInfo
      })
    })
  },
  _getRecommends() {
    getRecommends().then(res => {
      this.setData({
        recommends: res.data.data.list
      })
    })
  },


  // 事件
  onAddCart() {
    // 1.获取商品对象
    const obj = {}
    obj.iid = this.data.iid;
    obj.imageURL = this.data.topImages[0];
    obj.title = this.data.baseInfo.title;
    obj.desc = this.data.baseInfo.desc;
    obj.price = this.data.baseInfo.realPrice;

    // 2.加入到购物车列表
    app.addToCart(obj)

    //3.加入成功提示
    wx.showToast({
      title: '加入购物车成功',
    })

    // console.log(app.globalData.cartList)
  }
  
})