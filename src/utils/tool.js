class YaoToolUtil {
  /**
   * 页面跳转，不能在tabBar中跳转
   *
   * @param {any} data 待拷贝对象
   * @author yaojunhao
   */
  static deepClone(data) {
    return JSON.parse(JSON.stringify(data));
  }
}

export default YaoToolUtil;
