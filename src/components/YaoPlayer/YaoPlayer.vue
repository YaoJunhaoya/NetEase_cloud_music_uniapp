<template>
  <view class="YaoPlayer">
    <!-- 音乐图片 -->
    <view class="YaoPlayer_img">
      <image
        :src="currentlyPlaying?.al?.picUrl"
        mode="scaleToFill"
        :class="{ YaoPlayer_img_rotate: musicState }"
      />
    </view>
    <!-- 播放器操作台 -->
    <view class="YaoPlayer_console">
      <!-- 播放器按钮 -->
      <view class="YaoPlayer_btn">
        <image
          src="../../static/icons/prev-light.png"
          mode="scaleToFill"
          @tap="upOrDown(-1)"
        />
        <image :src="startImg" mode="scaleToFill" @tap="playOrSuspend" />
        <image
          src="../../static/icons/next-light.png"
          mode="scaleToFill"
          @tap="upOrDown(1)"
        />
      </view>
      <!-- 播放器进度条 -->
      <view class="YaoPlayer_progress">
        <span class="YaoPlayer_progress_time">{{ yaoPlayerProgress }}</span>
        <u-slider
          v-model="yaoPlayerProgress"
          step="1"
          min="0"
          :max="yaoPlayerProgressMax"
          activeColor="#dd001b"
        ></u-slider>
        <span class="YaoPlayer_progress_time">{{ yaoPlayerProgressMax }}</span>
      </view>
    </view>
    <!-- 播放列表 -->
    <view class="YaoPlayer_list" @tap="showPopup = true">
      <image src="../../static/列表.png" mode="widthFix" />
    </view>
    <!-- 弹出层 -->
    <u-popup
      :show="showPopup"
      mode="bottom"
      overlay
      safeAreaInsetTop
      closeOnClickOverlay
      @close="packUpPopup"
    >
      <scroll-view scroll-y class="u_popup">
        <view v-for="(item, index) in allPlayList" :key="index">
          {{ item.name }}
        </view>
      </scroll-view>
    </u-popup>
  </view>
</template>

<script setup>
import { onMounted, ref, reactive, watch } from "vue";

import YaoMusicUtil from "../../utils/music";
import YaoToolUtil from "../../utils/tool";
import PlaySong from "../../api/song/playSong";
import Songparticulars from "../../api/song/Songparticulars";

import useSongStore from "../../pinia/songStore";

// 当前音乐播放状态
let musicState = ref(null);
// pinia仓库
const songStor = useSongStore();

// 设置是暂停图片还是播放图片
let startImg = ref("../../static/icons/play-light.png");

// 播放列表弹出层
let showPopup = ref(false);

// 遮罩层收起时触发
function packUpPopup() {
  // 关闭遮罩层
  showPopup.value = false;
}

// 音乐当前时间
let yaoPlayerProgress = ref(0);
// 音乐当前时间
let yaoPlayerProgressMax = ref(100);

// 当前播放的音乐数据
let currentlyPlaying = ref({});
// 监视当前播放的音乐的id
watch(
  () => songStor.currentlyPlaying,
  (newVal, oldVal) => {
    getCurrentPlayList();
    console.log("currentlyPlaying changed", newVal, oldVal);
  }
);

/**
 * 通过当前播放列表获取当前播放音乐id是否存在
 * 如果有就返回这个数组对象的数据，没有返回false
 *
 * @returns { Object || Boolean }
 * @author yaojunhao
 **/
async function getCurrentPlayList() {
  const newAllPlayList = songStor.allPlayList;
  console.log("yaojunhao 获取所有播放列表", songStor.allPlayList);
  const newCurrentlyPlaying = songStor.currentlyPlaying;
  console.log("yaojunhao 获取当前播放的音乐的id", songStor.currentlyPlaying);
  const newSongData = newAllPlayList.find(
    (item) => item.id == newCurrentlyPlaying
  );
  if (newSongData) {
    currentlyPlaying.value = newSongData;
  } else {
    // 这个歌曲id不是当前播放列表中的歌曲id 获取一下数据
    const { data: songData } = await Songparticulars.songDetail(
      newCurrentlyPlaying
    );
    currentlyPlaying.value = songData?.songs[0];
  }
  console.log("yaojunhao currentlyPlaying.value", currentlyPlaying.value);
}

let innerAudioContext = YaoMusicUtil.getInnerAudioContext();
// 监听到音乐播放后触发
function Play() {
  // 获取当前播放状态
  songStor.musicStateToLocal(true);
  console.log("yaojunhao  获取当音乐状态 开始播放", true);
}
// 监听播放
innerAudioContext.onPlay(Play);
// 监听到音乐暂停后触发
function Pause() {
  songStor.musicStateToLocal(false);
  console.log("yaojunhao  获取当音乐状态 开始播放", false);
}
// 监听暂停
innerAudioContext.onPause(Pause);

// 监听到音乐停止后触发
function Stop() {
  songStor.musicStateToLocal(false);
  console.log("yaojunhao  获取当音乐状态 开始播放", false);
}
// 监听停止
innerAudioContext.onStop(Stop);
// 监视当前音乐播放状态
watch(
  () => songStor.musicState,
  (newVal, oldVal) => {
    console.log("musicState changed", newVal, oldVal);
    musicState.value = newVal;
    startImg.value = !musicState.value
      ? "../../static/icons/play-light.png"
      : "../../static/icons/pause-light.png";

    console.log("yaojunhao musicState", musicState.value);
  }
);

/**
 * 点击播放或者暂停
 *
 * @author yaojunhao
 **/
function playOrSuspend() {
  if (musicState.value) {
    YaoMusicUtil.pauseMusic();
  } else {
    YaoMusicUtil.playMusic();
  }
}

// 获取播放列表（不是最新的数据）
let allPlayList = ref(songStor.allPlayList);

// 监视播放列表
watch(
  () => songStor.allPlayList,
  (newVal, oldVal) => {
    allPlayList.value = newVal;
    console.log("yaojunhao allPlayList changed", newVal, oldVal);
  }
);

/**
 * 歌曲列表中上一首或者下一首
 *
 * @param { Number } num -1为上一首 1为下一首
 * @param { Boolean } auto 是否自动播放
 * @author yaojunhao
 **/
function upOrDown(num) {
  // 当前播放的音乐的id
  let currentId = songStor.currentlyPlaying;
  // 获取当前播放列表
  let songsList = YaoToolUtil.deepClone(allPlayList.value);
  const index = songsList.findIndex((item) => item.id == currentId) + num;

  // TODO:可能会有吗播放权限 需要设置跳过这个或者删除这个
  if (index < 0) {
    songStor.playSongList(songsList[songsList.length - 1].id);
  } else if (index >= songsList.length) {
    songStor.playSongList(songsList[0].id);
  } else {
    songStor.playSongList(songsList[index].id);
  }
}

/**
 * 首次加载时需要触发的时间
 *
 * @author yaojunhao
 **/
function playerInit() {
  // 激活音乐监视
  YaoMusicUtil.musicStateMonitor(function () {
    console.log("yaojunhao 首次加载时需要触发的时间");
  });
  // 当前音乐播放状态
  musicState.value = YaoMusicUtil.getMusicState();
  // 设置第一首歌 但是不播放
  PlaySong.playSong(songStor.currentlyPlaying, false);
  // 设置进度条时间
  // 查看歌曲是否暂停 播放图片 歌曲图片是否旋转

  console.log("yaojunhao playerInit", musicState.value);
}

onMounted(() => {
  console.log("yaojunhao 获取播放列表", allPlayList.value);
  getCurrentPlayList();
  console.log("yaojunhao 当前播放的音乐数据", currentlyPlaying.value);

  // 首次加载时需要触发的条件
  playerInit();
});
// TODO：最好能销毁组件
</script>

<style lang="less" scoped>
.YaoPlayer {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100vw;
  height: 60px;
  background-color: #ebebeb;
  /* 边框阴影 */
  box-shadow: 0 0 10px #a7a7a7;
  .YaoPlayer_img {
    width: 60px;
    height: 60px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    image {
      width: calc(50px - 6px);
      height: calc(50px - 6px);
      border-radius: 30px;
    }
  }
  .YaoPlayer_console {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: calc(100vw - 110px);
    height: 100%;
    overflow: hidden;
    .YaoPlayer_btn {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: calc(100vw - 110px);
      // height: calc(100% - 60px);
      image {
        width: 25px;
        height: 25px;
        margin: 0 10px;
      }
    }
    .YaoPlayer_progress {
      width: 100%;
      height: 20px;
      overflow: hidden;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .YaoPlayer_progress_time {
        font-size: 13px;
        color: #a7a7a7;
      }
    }
  }
  .YaoPlayer_list {
    margin: 5px;
    width: calc(35px - 10px);
    height: calc(60px - 10px);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    image {
      width: 100%;
    }
  }
}
.u_popup {
  width: 100vw;
  height: 80vh;
}
/* 定义关键帧 */
@keyframes rotate {
  from {
    transform: rotate(0deg); /* 开始时的旋转角度 */
  }
  to {
    transform: rotate(360deg); /* 结束时的旋转角度 */
  }
}
.YaoPlayer_img_rotate {
  animation: rotate 10s linear infinite;
}
</style>
