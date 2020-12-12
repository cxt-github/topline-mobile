<template>
  <div class="list">
    <van-nav-bar title="搜索列表" left-arrow @click-left="$router.back()"/>
    <van-cell-group>
      <van-cell title="单元格" >
        <template #label>
          <span>描述信息</span>
          <van-grid :column-num="3">
            <van-grid-item text="评论" />
            <van-grid-item text="点赞" />
            <van-grid-item text="收藏" />
          </van-grid>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      
    }
  },
  methods:{
    
  }
};
</script>

<style lang="less" scoped>
.list {
  /deep/.van-nav-bar__left {
    .van-icon {
      color: #fff;
    }
  }
}
</style>
