// miniprogram/pages/index/scripts/scripts.js
const db = wx.cloud.database()
Page({
  data: {
    script_image: '',
    script_synopsis: '',
    script_tag: '',
    script_people_played: '',
  },

  onLoad: function (options) {
    db.collection('scripts').get({
      success:(res)=> {
        console.log(res)
        this.setData({
          script_image: res.data[0].image,
          script_synopsis: res.data[0].synopsis,
          script_tag: res.data[0].tag,
          script_people_played: res.data[0].number
        })
        console.log("本页面的数据")
        console.log(this.data)
      },
      fail(res){
        console.log("查询失败")
      }
    })
  },

  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  tobookscript:function(){
    wx.navigateTo({
      url: 'bookscript/bookscript'
    })
  }
})