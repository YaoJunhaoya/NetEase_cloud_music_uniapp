import requests from "../index";
import YaoMusicUtil from "../../utils/music";
import YaoToolUtil from "../../utils/tool";

class PlaySong {
  /**
   * 获取音乐 url - 新版
   *
   * @param { Number | String  } id 音乐 id
   * @param { String } level 播放音质等级, 分为 standard => 标准,higher => 较高, exhigh=>极高, lossless=>无损, hires=>Hi-Res, jyeffect => 高清环绕声, sky => 沉浸环绕声, jymaster => 超清母带
   * @author yaojunhao
   **/
  getSongUrlNew(id, level = "standard") {
    return requests({
      url: `/song/url/v1?id=${id}&level=${level}`,
      method: "get",
    });
  }

  /**
   * 音乐是否可用
   *
   * @param { Number | String } id  歌曲 id
   * @param { Number } br  码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
   * @author yaojunhao
   **/
  checkMusic(id, br = 999000) {
    return requests({
      url: `/check/music?id=${id}&br=${br}`,
      method: "get",
    });
  }

  /**
   * 播放音乐
   *
   * @param { Number | String  } id 音乐 id
   * @author yaojunhao
   **/
  async playSong(id) {
    // 判断是否能播放
    const { data: checkMusicData } = await this.checkMusic(id);
    console.log("yaojunhao 判断是否能播放", checkMusicData);
    let ischeckMusic = YaoToolUtil.deepClone(checkMusicData).success;
    console.log("yaojunhao 能否播放", ischeckMusic);
    if (ischeckMusic) {
      // 允许播放
      // 获取url
      const { data: SongUrl } = await this.getSongUrlNew(id);
      console.log("yaojunhao 获取音乐 url ", SongUrl);
      // 设置播放地址 自动播放
      YaoMusicUtil.setMusicPlayerSrc(
        YaoToolUtil.deepClone(SongUrl).data[0].url,
        true
      );
    } else {
      console.log("yaojunhao 禁止播放", "亲爱的,暂无版权");
    }
  }
}

// 应用模块接口前缀
const MODULE_BASE = "";
export default new PlaySong();
