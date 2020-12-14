<template>
  <van-cell>
    <template #title>
      <div class="mystart">
        <van-button type="danger" size="small" style="margin-right: 10%">
          <van-icon name="like" />
          <span>点赞</span>
        </van-button>
        <van-button type="default" size="small">
          <van-icon name="like-o" />
          <span>不喜欢</span>
        </van-button>
      </div>
    </template>
  </van-cell>
</template>

<script>
export default {
  props: ["getDetail"],
};
</script>

<style lang="less" scoped>
.mystart {
  text-align: center;
  button {
    border-radius: 4px;
    span {
      margin-left: 4px;
    }
  }
}
</style>
