<template>
  <van-popup
    :value="value"
    @input="$emit('input', $event)"
    :style="{ width: '80%' }"
    :round="true"
  >
    <!-- 更多操作 -->
    <van-cell-group v-if="!isItem">
      <van-cell title="隐藏消息" />
      <van-cell title="举报" is-link @click="isItem = true" />
      <van-cell title="拉黑" />
    </van-cell-group>

    <!-- 举报类型 -->
    <van-cell-group v-if="isItem">
      <van-cell icon="arrow-left" @click="isItem=false"/>
      <van-cell v-for="(item,index) in itemList" :key="index" :title="item.name"  />
    </van-cell-group>
  </van-popup>
</template>

<script>
export default {
  name: "more",
  props: ["value"],
  data() {
    return {
      //控制举报的隐藏与显示
      isItem: false,
      itemList: [
        { value: 0, name: "其他问题" },
        { value: 1, name: "标题夸张" },
        { value: 2, name: "低俗色情" },
        { value: 3, name: "错别字多" },
        { value: 4, name: "旧闻重复" },
        { value: 5, name: "广告软文" },
        { value: 6, name: "内容不实" },
        { value: 7, name: "涉嫌违法犯罪" },
        { value: 8, name: "侵权" },
      ],
    };
  },
};
</script>

<style></style>
