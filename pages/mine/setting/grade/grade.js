page: ({

  data: {
    userStars: [
      { id: 1, image: '../../../images/30.png' },
      { id: 1, image: '../../../images/30.png' },
      { id: 1, image: '../../../images/30.png' },
      { id: 1, image: '../../../images/30.png' },
      { id: 1, image: '../../../images/30.png' },
      ]
  },
  // starTap: function (e) {
  //   var index = e.currentTarget.dataset.index; // 获取当前点击的是第几颗星星
  //   var tempUserStars = this.data.userStars; // 暂存星星数组
  //   var len = tempUserStars.length; // 获取星星数组的长度
  //   for (var i = 0; i < len; i++) {
  //     if (i <= index) { // 小于等于index的是满心
  //       tempUserStars[i] = '../../../images/29.png'
  //     } else { // 其他是空心
  //       tempUserStars[i] = '../../../images/30.png'
  //     }
  //   }
  //   // 重新赋值就可以显示了
  //   this.setData({
  //     userStars: tempUserStars
  //   })
  // },

})