<template>
  <van-cell :title="getDetail.aut_name">
    <template #icon>
      <van-image
        width="50px"
        height="50px"
        :src="getDetail.aut_photo"
        round
        style="margin-right:15px"
      />
    </template>
    <template #label>
      <span>{{ getDetail.pubdate | dateFilter }}</span>
    </template>
    <template #default>
      <van-button type="danger" size="small">关注</van-button>
    </template>
  </van-cell>
</template>

<script>
export default {
  props: ["getDetail"],
};
</script>

<style></style>
