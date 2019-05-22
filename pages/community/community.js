// pages/community/community.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      
  },
  dynamicdown:function(){
    wx.navigateTo({
      url: '/pages/community/dynamic/dynamic',
    })
  },
  consulationdown:function(){
wx.navigateTo({
  url: '/pages/community/consultation/consultation',
})
},
  assistancedown:function(){
   wx.navigateTo({
     url: '/pages/community/assistance/assistance',
     
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var medical = wx.getStorageSync("medical");
    this.setData({
      medical: medical
    })

  },
  onUpTap: function (e) {
    var id = e.currentTarget.dataset.cookId;
    var medical = wx.getStorageSync("medical");
    var index = medical[id - 1];
    if (index.upStatus) {
      index.upNum--;
      index.upStatus = false;
      
    } else {
      index.upNum++;
      index.upStatus = true;
    }
    this.setData({
      "item.upStatus": index.upStatus,
      "item.upNum": index.upNum,
    })
    wx.showToast({
      title: index.upStatus ? "点赞成功" : "取消点赞",
    })
    medical[id - 1] = index;
    wx.setStorageSync("medical", medical);
  },
  onShareAppMessage:function(res){
    if(res.from==='button'){

    }
    return{
      title:"医保一点通",
      path:"/pages/community/community",
      success:function(res){
        console.log("成功",res)
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