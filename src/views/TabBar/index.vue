<template>
  <div class="tabber">
    <!-- 首页 -->
    <router-view></router-view>
    <!-- 作用：封装底部的tabbar -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/home">搜页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/search">搜索</van-tabbar-item>
      <van-tabbar-item icon="play-circle-o">视频</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style lang="less" scoped>
</style>
