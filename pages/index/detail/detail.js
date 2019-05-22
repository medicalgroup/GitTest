// pages/index/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
commentdown:function(e){
  var id=e.currentTarget.dataset.cookId;
  wx.navigateTo({
    url: '/pages/index/comment/comment?id'+id,
  })
},
  imgYu: function (event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var id=options.id;
      var medical=wx.getStorageSync("medical");
      var detail=medical[id-1];
      this.setData({
        item:detail
      })
      wx.setNavigationBarTitle({
        title:"医保资讯",
      })
  },
  onUpTap:function(e){
    var id=e.currentTarget.dataset.cookId;
    var medical=wx.getStorageSync("medical");
    var detail=medical[id-1];
    if(detail.upStatus){
      detail.upNum--;
      detail.upStatus=false;
    }else{
      detail.upNum++;
      detail.upStatus=true;
    }
    this.setData({
      "item.upStatus":detail.upStatus,
      "item.upNum":detail.upNum,
    })
    wx.showToast({
      title: detail.upStatus?"点赞成功":"取消点赞",
    })
    medical[id - 1] = detail;
    wx.setStorageSync("medical", medical);
    var pages = getCurrentPages();
    if (pages.length > 1) {
      var prePage = pages[pages.length - 2];
      prePage.onLoad();
    }
  },
  onCollectionTap: function (e) {
    var id = e.currentTarget.dataset.cookId;
    var medical = wx.getStorageSync("medical");
    var detail = medical[id - 1];
    if (detail.collectionStatus) {
      detail.collectionNum--;
      detail.collectionStatus = false;
    } else {
      detail.collectionNum++;
      detail.collectionStatus = true;
    }
    this.setData({
      "item.collectionStatus": detail.collectionStatus,
      "item.collectionNum": detail.collectionNum,
    })
    wx.showToast({
      title: detail.collectionStatus ? "收藏成功" : "取消收藏",
    })
    medical[id - 1] = detail;
    wx.setStorageSync("medical", medical);
    var pages = getCurrentPages();
    if (pages.length > 1) {
      var prePage = pages[pages.length - 2];
      prePage.onLoad();
    }
  },
  onShareAppMessage:function(){
    let that=this;
    return{
      title:"医保一点通",
      path:'/pages/index/detail/detail',
      success:(res)=>{
        console.log(res.shareTickets[0])
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success:(res)=>{
            that.setData({
              isShow:true
            })
          },
          fail:function(res){
            console.log(res)
          },
          complete:function(res){
            console.log(res)
          }
        })
      }
    }
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {

    }
    return {
      title: "医保一点通",
      path: "/pages/community/community",
      success: function (res) {
        console.log("成功", res)
      }
    }
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
  
})