<template>
  <van-popup
    :value="value"
    @input="$emit('input', $event)"
    :style="{ width: '80%' }"
    :round="true"
  >
    <!-- 更多操作 -->
    <van-cell-group v-if="!isItem">
      <van-cell title="隐藏消息" @click="NoLike" />
      <van-cell title="举报" is-link @click="isItem = true" />
      <van-cell title="拉黑" @click="blackAuthord"/>
    </van-cell-group>

    <!-- 举报类型 -->
    <van-cell-group v-if="isItem">
      <van-cell icon="arrow-left" @click="isItem = false" />
      <van-cell
        v-for="(item, index) in itemList"
        :key="index"
        :title="item.name"
      />
    </van-cell-group>
  </van-popup>
</template>

<script>
//导入文章不喜欢api
import { dislikeArticles } from "../../../api/articles";
//导入拉黑作者api
import { userBlacklist } from '../../../api/user'

export default {
  name: "more",
  props: ["value", "activeArticleId","authorId"],
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

  methods: {
    //隐藏此消息
    async NoLike() {
      //判断用户是否登录
      let use = this.$store.state.user;
      if (use) { //已经登录
        try {//代表无误执行
        //发请求取关
        await dislikeArticles(this.activeArticleId)
        //传值给父组件，删除文章
        this.$emit("delItem", this.activeArticleId);
        this.$toast.success('取关成功');
        } catch (error) {//代码有误才执行
        this.$toast.fail("取关失败");
        }
      } else { //未登录
        this.$toast.fail('请先登录');
      }
      //关闭弹出层
      this.$emit("input", false);
    },

    //拉黑作者
    async blackAuthord() {
      //判断用户是否登录
      let use = this.$store.state.user;
      if(use) { //已经登录
        let res = await userBlacklist(this.authorId)
        this.$toast.success('成功拉黑作者');
      } else {  //未登录
        this.$toast.fail('请先登录');
      }
      //关闭弹出层
      this.$emit("input", false);
    }
  },
};
</script>

<style></style>
