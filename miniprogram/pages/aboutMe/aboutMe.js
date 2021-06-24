// 获取应用实例
const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    username:'',
    userInfo: {},
    hasUserInfo: false,
    logged: false,
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl'), // 如需尝试获取用户信息可改为false
    openid: ''
  },
  onLoad: function () {
    //获取本地数据
    wx.getStorage({
      key: 'user',
      success: (res) => {
        console.log("获取本地数据")
        console.log(res)
        if (res.data.hasOwnProperty("username")) {
          this.setData({
            avatarUrl: res.data.avatarUrl,
            username: res.data.username,
            hasUserInfo: true,
            openid: res.data.openid
          })
        } else {
          console.log("本地没有找到")
          this.setData({
            hasUserInfo: false,
            openid: res.data.openid
          })
          db.collection('user').where({
            _openid: this.data.openid
          }).get().then(res => {
            console.log(res)
            if (res.data.length == 0) {
              this.setData({
                hasUserInfo: false
              })
            } else {
              this.setData({
                hasUserInfo: true
              })
              wx.setStorage({
                key: 'user',
                data: {
                  openid: res.data[0]._openid,
                  avatarUrl: res.data[0].avatarUrl,
                  username: res.data[0].username,
                  gender: res.data[0].gender,
                  city: res.data[0].city
                },
                success(res) {
                  wx.getStorage({
                    key: 'user',
                    success(res){
                      console.log(res)
                    }
                  })
                  console.log("数据存入成功")
                },
                fail(res) {
                  console.log("数据存入失败")
                }
              })
            }
          })
        }
      },
      fail(res) {
        console.log("获取失败")
      }
    })

    if (!wx.cloud) {
      wx.redirectTo({
        url: '../aboutMe/aboutMe',
      })
      return
    }
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      })
    }
  },

  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
        // 向本地存入数据
        wx.setStorage({
          key: 'user',
          data: {
            username: res.userInfo.nickName,
            gender: res.userInfo.gender,
            city: res.userInfo.city,
            avatarUrl: res.userInfo.avatarUrl,
            openid: app.globalData.openid//这一句有问题
          },
        })

        db.collection('user').where({
          _openid: this.data.openid
        }).get().then(test => {
          console.log(test)
          if (test.data.length == 0) {
            // 向数据库中添加用户信息
            db.collection('user').add({
              data: {
                username: res.userInfo.nickName,
                gender: res.userInfo.gender,
                city: res.userInfo.city,
                avatarUrl: res.userInfo.avatarUrl
              },
              success: res => {
                console.log("插入成功");
              }
            })
            
          } else {

          }
        })
      }
    })
  },

  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
    }
  },

  tomyinfo:function(){
    var avatarUrl = this.data.avatarUrl;
    var username = this.data.username;
    wx.navigateTo({
      url: 'myinfo/myinfo?avatarUrl='+this.data.avatarUrl+"&username="+this.data.username,
    })
  }
})

