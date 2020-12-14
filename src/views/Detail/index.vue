<template>
  <div class="detail">
    <!-- 导航栏 -->
    <van-nav-bar
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
      fixed
    />

    <!-- 标题部分 -->
    <van-cell>
      <template #title>
        <div class="mytitle">
          {{ getDetail.title }}
        </div>
      </template>
    </van-cell>
    <!-- 作者信息 -->
    <author :getDetail="getDetail" />
    <!-- 文章内容 -->
    <van-cell>
      <template #title>
        <div v-html="getDetail.content"></div>
      </template>
    </van-cell>
    <!-- 点赞&不喜欢 -->
    <like :getDetail="getDetail" />
    <!-- 评论留言 -->
    <comment :commentList="commentList" />
    <!-- 发表评论插件 -->
    <mess :getDetail="getDetail" @setComment="setComment" />
  </div>
</template>

<script>
//获取文章详情api
import { articlesDetails } from "../../api/articles";
//获取评论api
import { getComment } from "../../api/comment";
//导入子组件
import author from "./components/author";
import like from "./components/like";
import comment from "./components/comment";
import mess from "./components/mess";

export default {
  name: "detail",
  data() {
    return {
      artId: this.$route.params.artId, //文章id
      getDetail: {}, //获取文章数据
      commentList: [], //获取文章品论数据
    };
  },

  components: {
    author,
    like,
    comment,
    mess,
  },

  methods: {
    //封装获取文章详情
    async getArticlesDetails() {
      let res = await articlesDetails(this.artId);
      this.getDetail = res;
    },

    //获取评论
    async getCom() {
      let res = await getComment({
        type: "a",
        source: this.artId,
      });
      this.commentList = res.results;
    },

    //mess子组件传过来是数据
    setComment(res) {
        console.log(res);
        this.commentList.unshift(res.new_obj)
    }
  },

  created() {
    this.getArticlesDetails();

    this.getCom();
  },
};
</script>

<style lang="less" scoped>
.detail {
  margin-top: 46px;
  margin-bottom: 160px;

  .mytitle {
    font-size: 20px;
    font-weight: 700;
  }
}
</style>
