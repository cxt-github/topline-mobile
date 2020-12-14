<template>
  <div class="comment">
    <van-cell
      :title="item.aut_name"
      v-for="(item, index) in commentList"
      :key="index"
    >
      <template #icon>
        <van-image
          width="50px"
          height="50px"
          :src="item.aut_photo"
          round
          style="margin-right:15px"
        />
      </template>
      <template #label>
        <div>{{ item.content }}</div>
        <div>
          <span>{{ item.pubdate | timeFilter }}</span>
          <span style="margin-left: 10px;">回复({{ item.reply_count }})</span>
        </div>
      </template>
      <template #right-icon>
        <div>
          <van-icon name="good-job-o" />
          <span style="margin-left: 7px;">{{ item.like_count }}</span>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: ["commentList"],
};
</script>

<style lang="less" scoped>
.comment {
  padding-bottom: 64px;

  .van-cell__label {
    color: #000;
  }
}
</style>
