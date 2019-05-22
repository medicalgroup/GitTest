// pages/cook/cookcomment/cookcomment.js
const app = getApp();
var util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    useKeyboardFlag: true,
    sendMoreMsgFlag: false,
    keyboardInputValue: "",
    audio: {
      url: null,
      timeLen: 0
    },
    currentAudio: "",
    chooseFiles: [],
    deleteIndex: -1,
  },
  sendMoreMsg: function () {
    this.setData({
      sendMoreMsgFlag: !this.data.sendMoreMsgFlag
    })
  },
  switchInputType: function (event) {
    this.setData({
      useKeyboardFlag: !this.data.sendMoreMsgFlag
    })
  },
 

  onLoad: function (options) {
    
  },

  
  bindCommentInput: function (event) {
    var val = event.detail.value;
    this.data.keyboardInputValue = val;
  },
  submitComment: function (event) {
    var imgs = this.data.chooseFiles;
    var audio = this.data.audio;
    // console.log(audio);
    var newData = {
      username: app.globalData.userInfo.nickName,
      avatar: app.globalData.userInfo.avatarUrl,
      create_time: new Date().getTime() / 1000,
      content: {
        txt: this.data.keyboardInputValue,
        img: imgs,
        audio: audio
      },
    };
    if (!newData.content.txt && imgs.length == 0 && !audio) {
      return;
    }
    var medical= wx.getStorageSync("medical");
    var comments = medical[this.data.cookId - 1].comments;
    comments[comments.length] = newData;
    medical[this.data.cookId - 1].commentNum++;
    medical[this.data.cookId - 1].comments = comments;
    wx.setStorageSync("medical", medical);
    this.showCommitSuccessToast();
    this.setData({
      keyboardInputValue: "",
      chooseFiles: [],
      sendMoreMsgFlag: false,
      audio: {
        url: null,
        timeLen: 0
      },
    })
    var pages = getCurrentPages();
    if (pages.length > 1) {
      var that = this;
      var curPage = pages[pages.length - 1];
      var prePage = pages[pages.length - 2];
      var preprePage = pages[pages.length - 3];
      curPage.onLoad({
        id: that.data.cookId
      });
      prePage.onLoad({
        id: that.data.cookId
      });
      preprePage.onLoad();
    }
  },
  showCommitSuccessToast: function () {
    wx.showToast({
      title: '评论成功',
      duration: 1000,
      icon: "success"
    })
  },

  playAudio: function (event) {
    // console.log(event)
    var url = event.currentTarget.dataset.url,
      that = this;
    if (url == this.data.currentAudio) {
      wx.pauseVoice();
      this.data.currentAudio = "";
    }
    else {
      this.data.currentAudio = url;
      wx.playVoice({
        filePath: url,
        complete: function () {
          that.data.currentAudio = "";
        },
      });
    }
  },
  chooseImage: function (event) {
    var imgArr = this.data.chooseFiles;
    var leftCount = 3 - imgArr.length;
    if (leftCount <= 0) {
      return;
    }
    var sourceType = [event.currentTarget.dataset.category],
      that = this;
    wx.chooseImage({
      count: leftCount,
      sourceType: sourceType,
      success: function (res) {
        that.setData({
          chooseFiles: imgArr.concat(res.tempFilePaths)
        });
      },
    })
  },
  deleteImage: function (event) {
    var index = event.currentTarget.dataset.idx;
    var that = this;
    that.setData({
      deleteIndex: index
    });
    that.data.chooseFiles.splice(index, 1);
    setTimeout(function () {
      that.setData({
        deleteIndex: -1,
        chooseFiles: that.data.chooseFiles
      });
    }, 500);
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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

  }
})