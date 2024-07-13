class YaoSkipUtil {
  /**
   * 页面跳转，不能在tabBar中跳转
   *
   * @param {String} url 跳转地址
   * @author yaojunhao
   */
  static navigateTo(url) {
    console.log("跳转地址:", url);
    uni.navigateTo({
      url: url,
      fail: (error) => {
        console.error("跳转失败:", error);
      },
    });
  }
}

export default YaoSkipUtil;
