import requests from "../index";

class Songparticulars {
  /**
   * 获取歌曲详情 传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情(dt为歌曲时长)
   *
   * @param { Number | String  } ids 音乐 id, 如 ids=347230
   * @author yaojunhao
   **/
  songDetail(ids) {
    return requests({
      url: `/song/detail?ids=${ids}`,
      method: "get",
    });
  }

  /**
   * 获取歌单详情
   *
   * @param { Number | String } id 歌单 id
   * @param { Number } s (可选参数)歌单最近的 s 个收藏者,默认为 8
   * @author yaojunhao
   **/
  playlistDetail(id, s = 8) {
    return requests({
      url: `/playlist/detail?id=${id}`,
      method: "get",
    });
  }
}

// 应用模块接口前缀
const MODULE_BASE = "";
export default new Songparticulars();
