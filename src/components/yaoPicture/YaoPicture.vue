<template>
  <view class="YaoPicture">
    <!-- 图片上隐藏内容 -->
    <view class="YaoPicture_content">
      <text v-if="props.picName" class="YaoPictur_picName">{{
        props.picName
      }}</text>
      <!-- 播放按钮 -->
      <view class="YaoPicture_content_play" @tap="playSongList">
        <image src="../../static/播放2.png" mode="scaleToFill" />
      </view>
    </view>
    <!-- 图片 -->
    <image :src="props.picUrl" mode="aspectFit" />
  </view>
</template>

<script setup>
import PlaySong from "../../api/song/playSong";
import Songparticulars from "../../api/song/Songparticulars";
import YaoToolUtil from "../../utils/tool";
// import useSongStore from "../../pinia/songStore";

// pinia仓库
// const songStor = useSongStore();

/**
 * 父组件传值
 *
 * @param { String } picUrl 图片地址(必填)
 * @param { Boolean } songOrSonglist  歌曲还是歌单（默认 true 歌曲）false 歌单(必填)
 * @param { Number } id  id(必填)
 * @param { String } picName 描述名称
 * @author yaojunhao
 **/
const props = defineProps(["picUrl", "picName", "songOrSonglist", "id"]);

/**
 * 播放歌曲
 *
 * @param { Number } id 歌曲id
 * @param { Boolean } songOrSonglist  歌曲还是歌单（默认 true 歌曲）false 歌单
 * @author yaojunhao
 **/
async function playSongList(
  e,
  id = props.id,
  songOrSonglist = props.songOrSonglist
) {
  console.log("yaojunhao 播放歌曲", props.id, props.songOrSonglist);
  // 如果是歌曲
  if (songOrSonglist) {
    //获取歌曲详情
    const { data: songData } = await Songparticulars.songDetail(id);
    console.log("yaojunhao 歌曲详情", songData);
    PlaySong.playSong(songData.songs[0].id);
  } else {
    // 如果是歌单
    //获取歌单详情
    const { data: songListData } = await Songparticulars.playlistDetail(id);
    console.log("yaojunhao 歌单详情", songListData);
    // 将歌单的id提取出来
    let ids = YaoToolUtil.deepClone(songListData).privileges.map((item) => {
      return item.id;
    });
    console.log("yaojunhao 歌单的id提取出来", ids);
    //获取歌曲详情
    const { data: songData } = await Songparticulars.songDetail(ids);
    console.log("yaojunhao 歌单的所有歌曲详情", songData);
    // TODO:将列表放入播放列表
    const allPlayList = YaoToolUtil.deepClone(songData);
    // songStor.allPlayListToLocal(allPlayList.songs);
    console.log("yaojunhao 播放列表", allPlayList.songs);
    // 播放第一首歌曲
    PlaySong.playSong(songData.songs[0].id);
  }
}

/**
 * 描述
 *
 * @param { } data 描述
 * @author yaojunhao
 **/
</script>

<style lang="less" scoped>
// 设置固定值
@myImg: 120px;
@playBtn: 25px;

.YaoPicture {
  position: relative;
  width: @myImg;
  height: @myImg;
  margin: 0 10px;
  .YaoPicture_content {
    position: absolute;
    width: @myImg;
    height: @myImg;
    top: 0;
    left: 0;
    background-color: #c2c2c256;
    .YaoPictur_picName {
      width: @myImg;
      margin-left: 5px;
      font-size: 13px;
      font-weight: 600;
      color: #2f2f2f;
    }
    .YaoPicture_content_play {
      position: absolute;
      bottom: 5px;
      right: 5px;
      width: @playBtn;
      height: @playBtn;
      image {
        width: @playBtn;
        height: @playBtn;
      }
    }
  }
  image {
    width: @myImg;
    height: @myImg;
    border-radius: 10px;
  }
}
</style>
