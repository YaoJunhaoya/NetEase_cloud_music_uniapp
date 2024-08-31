<script>
import YaoMusicUtil from "./utils/music";
export default {
  render() {
    // 根据条件渲染不同的组件
    const ComponentToRender = YaoMusicUtil; /* 另一个组件 */
    return h(ComponentToRender);
  },
  onLaunch: function () {
    console.log("App Launch");
    // 创建一个音乐播放器
    YaoMusicUtil.createMusicPlayer();
    // 播放音乐
    // YaoMusicUtil.playMusic();
    // setTimeout(() => {
    //   // 设置跳转
    //   // YaoMusicUtil.seekMusic(10);
    //   // 设置音乐源，和是否自动播放
    //   // YaoMusicUtil.setMusicPlayerSrc(
    //   //   "https://m801.music.126.net/20240711134205/696338901394d1d057cc8dc4bc5e7f82/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/44177649664/1046/4e44/2a91/2f863c276b5cee12fd32f7d63b145787.mp3",
    //   //   true
    //   // );
    // }, 10000);
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
// 小缝隙 5px
// 中缝隙 10px
// 大缝隙 20px
// 巨缝隙 40px 不同项目之间尺寸差异较大，建议使用40px作为全局缝隙

@import "uview-plus/index.scss";

html,
body {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
// 设置全局的滑块大小
.u-slider {
  width: 100%;
}
</style>
