<template>
  <div class="my">
    <!-- 导航栏 -->
    <van-nav-bar title="我的" fixed left-arrow @click-left="$router.back()" />
    <!-- 头部 -->
    <van-cell class="head">
      <template>
        <!-- 头部上部 -->
        <div class="userMsg">
          <div class="leftimg">
            <van-image round :src="userDataObj.poto" />
          </div>
          <div class="name">
            <van-cell :title="userDataObj.name">
              <template slot="label">
                <van-button round type="primary" size="mini"
                  >申请认证</van-button
                >
              </template>
            </van-cell>
          </div>
          <div class="read">
            <div class="book">
              <van-image :src="userDataObj.poto" />
            </div>
            <div class="name">
              <van-cell>
                <template slot="title">
                  <div class="today">今日阅读</div>
                </template>
                <template slot="label">
                  <div class="min">5分钟</div>
                </template>
              </van-cell>
            </div>
          </div>
        </div>
        <!-- 头部下部 -->
        <van-grid :column-num="3" :border="false">
          <van-grid-item icon="photo-o" text="动态">
            <template slot="icon"> {{userDataObj.art_count}} </template>
          </van-grid-item>
          <van-grid-item icon="photo-o" text="关注">
            <template slot="icon"> {{userDataObj.follow_count}} </template>
          </van-grid-item>
          <van-grid-item icon="photo-o" text="粉丝">
            <template slot="icon"> {{userDataObj.fans_count}} </template>
          </van-grid-item>
        </van-grid>
      </template>
    </van-cell>
    <!-- 操作 -->
    <van-grid column-num="3" :border="false">
      <van-grid-item icon="star-o" text="收藏" />
      <van-grid-item icon="clock-o" text="历史" />
      <van-grid-item icon="records" text="作品" />
    </van-grid>
    <!-- 选项 -->
    <van-cell-group>
      <van-cell title="用户反馈" is-link />
      <van-cell title="小智同学" is-link to="/chat" />
      <van-cell title="系统设置" is-link />
    </van-cell-group>
  </div>
</template>

<script>
//导入获取用户自己信息api
import { userData } from '../../api/user'
export default {
  name: 'my',

  data() {
    return {
      userDataObj: {}, //自己信息
    }
  },

  methods: {
    //获取用户自己信息
    async userData() {
      const res = await userData()
      this.userDataObj = res
    },

  },

  created() {
    this.userData()

  },
};
</script>

<style lang="less" scoped>
.head {
  margin-top: 46px;
  padding: 10px 0px 10px 16px;
}
.userMsg {
  display: flex;
  position: relative;
  .leftimg {
    .van-image {
      width: 70px;
      height: 70px;
    }
  }
  .read {
    background-color: #3981c9;
    align-items: center;
    display: flex;
    position: absolute;
    right: 0;
    top: 10px;
    width: 100px;
    height: 45px;
    padding: 2px 0px;
    border-radius: 33px 0 0 33px;
    .book {
      margin-left: 10px;
      .van-image {
        width: 20px;
        height: 20px;
      }
    }
    .name {
      /deep/.van-cell {
        background-color: #3981c9;
        padding: 0;
        margin-left: 10px;
      }
      .today {
        font-size: 12px;
      }
    }
  }
}
</style>