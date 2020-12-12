<template>
  <div class="search">
      <!-- 搜索框 -->
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
      <!-- 联想框 -->
      <van-cell title="单元格" icon="search" />
      <!-- 历史记录 -->
      <van-cell title="历史记录" >
          <template #default>
              <van-icon name="delete" />
          </template>
      </van-cell>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
  .search {
      /deep/.van-search {
          background-color:#1989fa;
          .van-search__action{
              color: #fff;
          }
      }
      .van-icon{
          color: #000;
      }
  }
</style>
