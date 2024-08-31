class YaoMusicUtil {
  // 设置一个全局常量
  static innerAudioContext = null;

  // 当前音乐状态
  static overallMusicState = false;

  /**
   * 当前音乐播放器
   *
   * @author yaojunhao
   **/
  static getInnerAudioContext() {
    return this.innerAudioContext;
  }

  /**
   * 创建音乐播放器
   *
   * @param { Boolean } autoplay 是否自动播放
   * @author yaojunhao
   */
  static createMusicPlayer(autoplay = false) {
    this.innerAudioContext = uni.createInnerAudioContext();
    this.setMusicPlayerAutoPlay(autoplay);
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
   * 开启音乐状态监视
   *
   * @param { Function } onPlay 音乐开始播放后触发
   * @returns { Boolean }
   * @author yaojunhao
   **/
  static musicStateMonitor(stateFunction) {
    console.log("yaojunhao 获取当音乐状态", this.overallMusicState);

    // 监听到音乐播放后触发
    function Play() {
      // 修改musicState状态
      this.overallMusicState = true;
      console.log("yaojunhao  获取当音乐状态 开始播放", this.overallMusicState);
      stateFunction();
    }
    // 监听播放
    this.innerAudioContext.onPlay(Play);
    // 移除监听播放
    // this.innerAudioContext.offPlay(Play);

    // 监听到音乐暂停后触发
    function Pause() {
      // 修改musicState状态
      this.overallMusicState = false;
      console.log("yaojunhao  获取当音乐状态 暂停", this.overallMusicState);
      stateFunction();
    }
    // 监听暂停
    this.innerAudioContext.onPause(Pause);
    // 移除监听暂停
    // this.innerAudioContext.offPause(Pause);

    // 监听到音乐停止后触发
    function Stop() {
      // 修改musicState状态
      this.overallMusicState = false;
      console.log("yaojunhao  获取当音乐状态 停止", this.overallMusicState);
      stateFunction();
    }
    // 监听停止
    this.innerAudioContext.onStop(Stop);
    // 移除监听停止
    // this.innerAudioContext.offStop(Stop);
  }

  /**
   * 获取当前音乐播放状态
   *
   * @author yaojunhao
   **/
  static getMusicState() {
    console.log("yaojunhao  获取当前音乐播放状态", this.overallMusicState);
    return this.overallMusicState;
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
