<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>
<style lang="less">
 #app {
    height: 100%;
  }
.van-nav-bar {
  background-color: #1989fa !important;
  .van-nav-bar__title {
    color: #fff;
  }
  /deep/.van-nav-bar__left {
    .van-icon {
      color: #fff;
    }
  }
}
</style>
