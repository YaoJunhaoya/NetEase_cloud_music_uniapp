import { defineStore } from "pinia";

// 这里存的都是歌曲有关
const useSongStore = defineStore("songStore", {
  state: () => ({
    // 获取所有播放列表
    allPlayList:
      uni.getStorage({
        key: "allPlayList",
        success: (res) => {
          console.log("yaojunhao allPlayList 获取成功", res);
        },
      }) || [],
  }),
  actions: {
    //把所有播放列表存储在本地
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
  },
  getters: {},
  persist: true,
});

export default useSongStore;
