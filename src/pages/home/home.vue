<template>
  <view class="home">
    <!-- 有无登录 -->
    <view class="whether_there_is_login_or_not">
      <view v-if="showSearch" class="hint" @tap="goLogIN"
        >暂未登录，点击前往登录</view
      >
      <!-- 没有登录不显示 -->
      <view v-else class="home_title">
        <text class="greet_sb">早上好</text>
        <up-search
          class="home_title_search"
          v-model="searchContent"
          :showAction="false"
        ></up-search>
      </view>
    </view>
    <!-- 轮播图 -->
    <view class="swiper">
      <up-swiper
        :list="swiperListPicUrl"
        previousMargin="30"
        nextMargin="30"
        circular
        radius="5"
        interval="3500"
        indicator
        bgColor="#ffffff"
        @click="swiperClick"
      >
      </up-swiper>
      <!-- <image :src="swiperList[0]" mode="scaleToFill" /> -->
    </view>
    <!-- 推荐歌单 -->
    <view class="recommend_song_list_title">
      <text class="recommend_song_list_title_text">推荐歌单</text>
      <scroll-view class="recommend_song_list" scroll-x enable-flex>
        <YaoPicture
          v-for="(item, index) in recommendSongList"
          :key="index"
          :picUrl="item.picUrl"
          :picName="item.name"
          :songOrSonglist="false"
          :id="item.id"
        ></YaoPicture>
      </scroll-view>
    </view>
  </view>
</template>

<script setup>
import YaoSkipUtil from "../../utils/skip";
import YaoToolUtil from "../../utils/tool";
import RecommendedSong from "../../api/recommended/song";
import YaoMusicUtil from "../../utils/music";

import { onMounted, ref, reactive } from "vue";

// 是否显示搜索和未登录提示框
let showSearch = ref(true);
// 搜索框内容
let searchContent = ref("");

/**
 * 暂未登录，点击前往登录
 *
 * @author yaojunhao
 **/
function goLogIN() {
  console.log("点击事件");
  YaoSkipUtil.navigateTo("../../pages/logIn/logIn");
}

// 轮播图数据
let swiperList = ref([]);
// 轮播图 图片数据
let swiperListPicUrl = ref([]);
/**
 * 轮播图点击事件
 *
 * @author yaojunhao
 **/
function swiperClick(index) {
  console.log("yaojunhao 轮播图点击事件", index);
  console.log("yaojunhao 轮播图点击图片数据", swiperList.value[index]);
}

/**
 * 获取推荐新音乐
 *
 * @author yaojunhao
 **/
async function RecommendNewSong() {
  const { data } = await RecommendedSong.getRecommendNewSong(10);
  console.log("yaojunhao 获取推荐新音乐返回数据", data);

  // 获取轮播图数据
  swiperList.value = YaoToolUtil.deepClone(data).result;
  console.log("yaojunhao swiperList", swiperList.value);

  // 获取轮播图 图片数据
  swiperListPicUrl.value = YaoToolUtil.deepClone(data).result.map(
    (item) => item.picUrl
  );
  console.log("yaojunhao 轮播图 图片数据", swiperListPicUrl.value);
}

// 推荐歌单数据
let recommendSongList = ref([]);
/**
 * 获取推荐歌单
 *
 * @author yaojunhao
 **/
async function RecommendSongList() {
  const { data } = await RecommendedSong.getRecommendSongList(10);
  console.log("yaojunhao 获取推荐歌单返回数据", data);
  recommendSongList.value = YaoToolUtil.deepClone(data).result;
  console.log("yaojunhao recommendSongList", recommendSongList.value);
}

// 挂载时
onMounted(async () => {
  // 获取推荐新音乐
  RecommendNewSong();
  // 获取推荐歌单
  RecommendSongList();
});
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  .whether_there_is_login_or_not {
    width: 100%;
    .hint {
      width: 100%;
      text-align: center;
      background-color: #99999999;
    }
    .home_title {
      width: calc(100% - 20px);
      margin: 5px 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .greet_sb {
        width: 90px;
        margin-right: 10px;
        font-size: 20px;
        font-weight: 600;
      }
      .home_title_search {
        width: calc(100% - 100px);
      }
    }
  }
  .swiper {
    width: 100%;
  }
  .recommend_song_list_title {
    width: 100%;
    margin: 20px 0;
    .recommend_song_list_title_text {
      width: 100%;
      margin-left: 10px;
      font-weight: 600;
      font-size: 20px;
    }
    .recommend_song_list {
      width: 100%;
      height: 130px;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
    }
  }
}
</style>
