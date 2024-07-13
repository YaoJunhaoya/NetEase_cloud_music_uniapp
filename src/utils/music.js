class YaoMusicUtil {
  // 设置一个全局常量
  static innerAudioContext = null;
  /**
   * 创建音乐播放器
   *
   * @param { Boolean } autoplay 是否自动播放
   * @author yaojunhao
   */
  static createMusicPlayer(autoplay = false) {
    this.innerAudioContext = uni.createInnerAudioContext();
    this.setMusicPlayerAutoPlay(autoplay);
    // TODO: 设置音乐播放器的播放地址 暂时设置 方便测试
    // this.setMusicPlayerSrc(
    //   "https://m8.music.126.net/20240711130729/db2f70109c2024ae9eb0d23a14812e10/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3"
    // );
  }
  /**
   * 设置音乐播放器自动播放（必须有创建音乐播放器之后才可以调用）
   *
   * @param { Boolean } autoplay 是否自动播放
   * @author yaojunhao
   **/
  static setMusicPlayerAutoPlay(autoplay) {
    this.innerAudioContext.autoplay = autoplay;
    console.log(
      "yaojunhao 设置音乐播放器",
      autoplay ? "自动播放" : "禁止自动播放"
    );
  }

  /**
   * 销毁音乐播放器
   *
   * @author yaojunhao
   **/
  static destroyMusicPlayer() {
    this.innerAudioContext.destroy();
    this.innerAudioContext = null;
    console.log("yaojunhao 销毁音乐播放器");
  }

  /**
   * 设置音乐播放器的播放地址
   *
   * @param { String } data 音乐播放器的播放地址
   * @param { Boolean } autoplay 是否自动播放
   * @author yaojunhao
   **/
  static setMusicPlayerSrc(data, autoplay = false) {
    this.innerAudioContext.src = data;
    console.log("yaojunhao 设置音乐播放器的播放地址", data);
    if (autoplay) this.playMusic();
  }

  /**
   * 播放音乐
   *
   * @author yaojunhao
   **/
  static playMusic() {
    this.innerAudioContext.play();
    console.log("yaojunhao 播放音乐");
  }

  /**
   * 暂停音乐
   *
   * @author yaojunhao
   **/
  static pauseMusic() {
    this.innerAudioContext.pause();
    console.log("yaojunhao 暂停音乐");
  }

  /**
   * 音乐跳转到指定位置
   *
   * @param { Number } position 跳转到指定位置，单位 s
   * @author yaojunhao
   **/
  static seekMusic(position) {
    this.innerAudioContext.seek(position);
    console.log("yaojunhao 音乐跳转到指定位置", position);
  }
}

export default YaoMusicUtil;
