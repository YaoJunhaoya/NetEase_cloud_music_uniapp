import { defineStore } from "pinia";
import PlaySong from "../api/song/playSong";
import Songparticulars from "../api/song/Songparticulars";
import YaoToolUtil from "../utils/tool";

// 这里存的都是歌曲有关
const useSongStore = defineStore("songStore", {
  state: () => ({
    // 获取所有播放列表
    allPlayList: JSON.parse(uni.getStorageSync("allPlayList")) || [],
    // 获取当前播放的音乐的id
    currentlyPlaying: JSON.parse(uni.getStorageSync("currentlyPlaying")) || [],
    // 当前音乐播放状态
    musicState: false,
  }),
  actions: {
    /**
     * 把所有播放列表存储在本地
     *
     * @param { Array } item 存入的数据
     * @author yaojunhao
     **/
    allPlayListToLocal(item = []) {
      uni.setStorage({
        key: "allPlayList",
        data: JSON.stringify(item),
        success: (res) => {
          console.log("yaojunhao allPlayList 储存成功", res);
        },
      });
      this.allPlayList = item;
    },
    /**
     * 保存当前播放的音乐的id
     *
     * @param { Number } id 音乐id
     * @author yaojunhao
     **/
    currentlyPlayingToLocal(id = null) {
      uni.setStorage({
        key: "currentlyPlaying",
        data: JSON.stringify(id),
        success: (res) => {
          console.log("yaojunhao currentlyPlaying 储存成功", res);
        },
      });
      this.currentlyPlaying = id;
    },
    /**
     * 设置当前音乐播放状态
     *
     * @param { Boolean } item 播放状态
     * @author yaojunhao
     **/
    musicStateToLocal(item = false) {
      this.musicState = item;
    },
    /**
     * 播放歌曲
     *
     * @param { Number } id 歌曲或者歌单 id
     * @param { Boolean } songOrSonglist  歌曲还是歌单（默认 true 歌曲）false 歌单
     * @author yaojunhao
     **/
    async playSongList(id, songOrSonglist = true) {
      console.log("yaojunhao 播放歌曲", id, songOrSonglist);
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
        this.allPlayListToLocal(allPlayList.songs);
        console.log("yaojunhao 播放列表", allPlayList.songs);
        // 播放第一首歌曲
        PlaySong.playSong(songData.songs[0].id);
      }
    },
  },
  getters: {},
  persist: true,
});

export default useSongStore;
