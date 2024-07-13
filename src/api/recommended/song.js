import requests from "../index";

class RecommendedSong {
  /**
   * 获取每日推荐歌曲,可获得每日推荐歌曲 ( 需要登录 )
   *
   * @returns
   */
  getRecommendSongs() {
    return requests({
      url: `/recommend/songs`,
      method: "get",
    });
  }

  /**
   * 推荐新音乐
   *
   * @param { Number } limit 取出数量 , 默认为 10 (不支持 offset)
   * @author yaojunhao
   **/
  getRecommendNewSong(limit = 10) {
    return requests({
      url: `/personalized/newsong?limit=${limit}`,
      method: "get",
    });
  }

  /**
   * 推荐歌单
   *
   * @param { Number } limit 取出数量 , 默认为 30 (不支持 offset)
   * @author yaojunhao
   **/
  getRecommendSongList(limit = 30) {
    return requests({
      url: `/personalized?limit=${limit}`,
      method: "get",
    });
  }
}

// 应用模块接口前缀
const MODULE_BASE = "";
export default new RecommendedSong();
