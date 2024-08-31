class YaoToolUtil {
  /**
   * 深拷贝
   *
   * @param {any} data 待拷贝对象
   * @author yaojunhao
   */
  static deepClone(data) {
    return JSON.parse(JSON.stringify(data));
  }
}

export default YaoToolUtil;
