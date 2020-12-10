<template>
  <div class="home">
    <van-nav-bar title="首页" :fixed="true" />
    <van-tabs v-model="active">
      <div slot="nav-right" class="my-wap-nav" @click="showPopup">
        <van-icon name="wap-nav" />
      </div>
      <van-tab :title="item.name" v-for="item in channelList" :key="item.id">
        <van-pull-refresh v-model="item.pullLoading" @refresh="onRefresh">
          <van-list
            v-model="item.drapLoading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="(subItem, subindex) in item.article"
              :key="subindex"
              :title="subItem.title"
            >
              <template #label>
                <!-- 图片，用宫格 -->
                <van-grid :column-num="3" :gutter="10" :border="false">
                  <van-grid-item
                    v-for="(value,valindex) in subItem.cover.images"
                    :key="valindex"
                  >
                    <van-image :src="value" />
                  </van-grid-item>
                </van-grid>
                <!-- 用户下方信息 -->
                <div class="mymess">
                  <div class="left">
                    <span>{{ subItem.aut_name }}</span>
                    <span>评论{{ subItem.comm_count }}</span>
                    <span>{{ subItem.pubdate }}</span>
                  </div>
                  <div class="right">
                    <van-icon name="cross" />
                  </div>
                </div>
                <!-- 右边叉叉 -->
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>

    <!-- 弹出层 -->
    <channel v-model="show" :channelList="channelList" :active="active" />
  </div>
</template>

<script>
//导入频道列表接口
import { getChannel } from "../../api/channel";
//导入文章频道列表接口
import { getArticles } from "../../api/articles";
//导入弹出层组件
import channel from "./channel/index";
//导入token
import { getToken } from "../../utils/token";

export default {
  name: "home",
  components: {
    channel,
  },
  data() {
    return {
      active: 0,
      channelList: [], //保护频道数据
      list: [],
      // loading: false,
      // finished: false,
      // refreshing: false,
      show: false, //控制弹出层
    };
  },

  methods: {
    //封装获取频道数据
    async getChannelList() {
      //判断是否有登录
      if (this.$store.state.user) {
        //已登录，去服务器获取用户频道数据
        let res = await getChannel();
        this.channelList = res.channels;
      } else {
        //未登录，先判断是否有localstorage中的频道数据
        const channelCache = JSON.parse(window.localStorage.getItem("channel"));
        if (channelCache) {
          // 如果有缓存数据，直接赋值
          this.channelList = channelCache;
        } else {
          //如果没有
          let res = await getChannel();
          this.channelList = res.channels;
        }
      }
      this.setChannelItem();
    },
    //给频道数据中的内容添加属性
    setChannelItem() {
      this.channelList.forEach((item) => {
        //这里使用this.$set可以向 响应式对象 中添加一个 属性，并确保这个新 属性 同样是响应式的，且触发视图更新。
        //添加文章列表
        // item.article = [];
        this.$set(item,'article',[])
        //动态添加上拉加载更多
        // item.drapLoading = false;
        this.$set(item,'drapLoading',false)
        //上拉加载完毕
        // item.finished = false;
        this.$set(item,'finished',false)
        //下拉刷新
        // item.pullLoading = false;
        this.$set(item,'pullLoading',false)
        //上一次的得到的时间戳
        // item.pre_timestamp = 0;
        this.$set(item,'pre_timestamp',0)
      });
    },

    //页面一道开加载onLoad函数
    async onLoad() {
      //通过channelList的下标得到当前页面的数据channel
      let channel = this.channelList[this.active];
      console.log(channel);
      //判断是否第一次进入
      if (channel.pre_timestamp === 0) {
        //第一次进入
        let res = await getArticles({
          channel_id: channel.id, //当前页面数据的id
          timestamp: new Date().getTime(),
          with_top: 1,
        });
        //将得到的文章数据保存到channel里的article
        channel.article = res.results;
        //将页面上的数据动态变化
        // this.channelList = [...this.channelList];
        //将上一次得到的时间戳保存到channel里的pre_timestamp
        channel.pre_timestamp = res.pre_timestamp;
      } else {
        //第二次进入
        let res = await getArticles({
          channel_id: channel.id, //当前页面数据的id
          timestamp: channel.pre_timestamp,
          with_top: 1,
        });
        //将得到的是数据源进行追加
        channel.article = [...channel.article,...res.results]
        //将页面上的数据动态变化
        // this.channelList = [...this.channelList];
        //将上一次得到的时间戳保存到channel里的pre_timestamp
        channel.pre_timestamp = res.pre_timestamp;
      }
        //将加载的状态设置未false
        channel.drapLoading = false;
    },

    //下拉刷新
    onRefresh() {
      let channel = this.channelList[this.active];
      //重置属性
      channel.article = []
      channel.drapLoading = false
      channel.finished = false
      channel.pre_timestamp = 0
      //刷新状态为false
      channel.pullLoading = false
      //重新加载数据
      this.onLoad()
    },

    showPopup() {
      this.show = true;
    },
  },

  mounted() {
    //获取频道数据
    this.getChannelList();

    //获取文章频道数据
  },
};
</script>

<style lang="less" scoped>
.home {
  margin: 91px 0 0;
}

/deep/.van-tabs__wrap {
  position: fixed;
  top: 47px;
  left: 0px;
  z-index: 999;
  width: 100%;
  background-color: #fff;

  .my-wap-nav {
    font-size: 32px;
    position: fixed;
    top: 51px;
    right: 10px;
  }
}
.mymess {
  display: flex;
  justify-content: space-between;
  .left {
    span {
      margin-right: 10px;
    }
  }
}
/deep/.van-pull-refresh__track {
  margin-bottom: 50px;
}

/deep/.van-tabs__nav--line {
  margin-right: 50px;
}
</style>
