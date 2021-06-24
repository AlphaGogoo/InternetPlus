// text/text.js
const app = getApp()
Page({
  data: {
    swiperH: '', //swiper高度
    nowIdx: 0, //当前swiper索引
    imgList: [ //图片列表
      {
        src: "/images/swiper-images/11.jpg",
        index: 0,
        link: "这应该是一个跳转链接1",
      },
      {
        src: "/images/swiper-images/12.jpg",
        index: 1,
        link: "这应该是一个跳转链接2",
      },
      {
        src: "/images/swiper-images/13.jpg",
        index: 2,
        link: "这应该是一个跳转链接3",
      }
    ],
    information: [
      "大梦三生之朱家花园小程序即将上线",
      "敬请期待. . ."
    ]
  },
  //获取swiper高度
  getHeight: function (e) {
    var winWid = wx.getSystemInfoSync().windowWidth - 2 * 50; //获取当前屏幕的宽度
    var imgh = e.detail.height; //图片高度
    var imgw = e.detail.width;
    var sH = winWid * imgh / imgw + "px"
    this.setData({
      swiperH: sH //设置高度
    })
  },
  //swiper滑动事件
  swiperChange: function (e) {
    this.setData({
      nowIdx: e.detail.current
    })
  },
  //图片点击事件
  click_img: function (e) {
    var link = e.currentTarget.dataset.link;
    console.log(link)
    wx.navigateTo({
      url: '../test/test',
    })
  },
  onLoad() {
    this.setData({
      search: this.search.bind(this)
    })
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        // 将openid存入本地
        app.globalData.openid=res.result.openid
        console.log(res)
        wx.getStorage({
          key: 'user',
          success(localdata) {
            console.log(localdata)
          },
          fail:(localdata)=>{
            console.log("本地没有这个数据，现在进行添加")
            wx.setStorage({
              key: 'user',
              data: {
                openid: res.result.openid
              },
              success(sava) {
                console.log("数据存入成功")
                wx.getStorage({
                  key: 'user',
                  success(find){
                    console.log(find)
                  }
                })
              },
              fail(sava) {
                console.log("数据存入失败")
              }
            })
          }
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  search: function (value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([{
          text: '搜索结果',
          value: 1
        }, {
          text: '搜索结果2',
          value: 2
        }])
      }, 200)
    })
  },
  // 更多
  morescripts: function () {
    console.log("转向更多剧本")
  },
  //跟随推荐去查看剧本
  gotoscript: function (e) {
    console.log("跟随推荐去查看剧本")
  },
  toscripts: function(){
    wx.navigateTo({
      url: 'scripts/scripts',
    })
  },
  morescripts: function(){
    wx.navigateTo({
      url: 'scripts/scripts',
    })
  },

  toflowers:function(){
    wx.navigateTo({
      url: '../test/test',
    })
  }

})