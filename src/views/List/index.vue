<template>
  <div class="list">
    <van-nav-bar
      title="搜索列表"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell-group>
        <van-cell
          :title="item.aut_name"
          v-for="(item, index) in getArticlesList"
          :key="index"
        >
          <template #label>
            <span @click="articlesDetails(item.art_id)">{{ item.title }}</span>
            <van-grid :column-num="3" :border="false">
              <van-grid-item text="评论" @click="comment" />
              <van-grid-item text="点赞" />
              <van-grid-item text="收藏" />
            </van-grid>
          </template>
        </van-cell>
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
//导入搜索关键字文章api
import { searchKeyArticles } from "../../api/articles";

export default {
  name: "list",
  data() {
    return {
      getArticlesList: [], //保存搜索关键字文章数据
      loading: false,
      finished: false,
      page: 0, //保存页数
      per_page: 10, //设置页容量
      key: this.$route.params.key,
    };
  },

  methods: {
    async onLoad() {
      this.page++;
      let res = await searchKeyArticles({
        page: this.page,
        per_page: this.per_page,
        key: this.key,
      });
      this.getArticlesList = [...this.getArticlesList, ...res.results];
      //判断是否加载完毕
      if (this.getArticlesList.length === res.total_count) {
        this.finished = true;
      }
      this.loading = false;
    },

    //评论
    comment() {
      // 判断用户是否登录
      // debugger
      // let use = this.$store.state.user;
      // if (!use || !use.token) {
      //   this.$dialog
      //     .confirm({
      //       title: "注意",
      //       message: "要进行当前操作需要登录",
      //     })
      //     .then(() => {
      //       //没有登录直接跳转到登录页面
      //       this.$router.push("/login");
      //     })
      //     .catch(() => {});
      //   return;
      // }
      let login = this.$login()
      if(login === null) return
      console.log(1111);
    },

    //
    articlesDetails(artid){
      // 用户是否登录
       let login = this.$login()
      if(login === null) return
      this.$router.push(`/detail/${artid}`)
    }
  },
};
</script>

<style lang="less" scoped>
.list {
  margin-top: 46px;
}
</style>
