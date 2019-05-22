// pages/information/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    winWidth: 0,
    winHeight: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  onSwiperTap: function (event) {
    var cookId = event.target.dataset.cookId;
    wx.navigateTo({
      url: 'detail/detail?id=' + cookId,
    })
  },
  switchNav:function(e) {
    var page = this;
    if (this.data.currentTab == e.target.dataset.current) {
      return false;
    } else {
      page.setData({ currentTab: e.target.dataset.current });
    }
  },
  detaildown: function (event) {
    var cookId = event.currentTarget.dataset.cookId;
    var medical = wx.getStorageSync("medical");
    var detail = medical[cookId - 1];
    detail.readingNum++;
    medical[cookId - 1] = detail;
    wx.setStorageSync("medical", medical);
    this.setData({
      medical: medical
    })
    wx.navigateTo({
      url: 'detail/detail?id=' + cookId,
    })
  },
  commentdown: function () {
    wx.navigateTo({
      url: '/pages/index/comment/comment',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var page = this;
    wx.getSystemInfo({
      success: function (res) {

        page.setData({
          winWidth: res.windowWidth
        });
        page.setData({
          winHeight: res.windowHeight
        });
      },
    });
    var medical = wx.getStorageSync("medical");
    this.setData({
      medical: medical
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindvodice: function speechStart(e, that) {
    const recorderManager = wx.getRecorderManager();
    const options = {
      duration: 10000,
      sampleRate: 16000,
      numberOfChannels: 1,
      encodeBitRate: 64000,
      format: 'mp3',
      frameSize: 50
    }
    recorderManager.start(options);
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

  }
})