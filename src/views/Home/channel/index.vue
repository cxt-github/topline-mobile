<template>
  <van-popup
    position="bottom"
    :value="value"
    :style="{ height: '90%' }"
    @input="$emit('input', $event)"
  >
    <!-- 我的频道 -->
    <van-cell-group>
      <van-cell>
        <template #title>
          <span style="font-size:16px;">我的频道</span>
          <span style="font-size:12px;color:#B2AAB2;margin-left:10px;"
            >点击进入频道</span
          >
        </template>
        <template #default>
          <button class="my-button" @click="compile">
            {{ isShow ? "完成" : "编辑" }}
          </button>
        </template>
      </van-cell>

      <van-cell>
        <template #title>
          <van-grid :gutter="10">
            <van-grid-item v-for="(item,index) in channelList" :key="item.id">
              <template #text>
                <div class="mybox">
                  <div :class="{mytext: active === index}">{{ item.name }}</div>
                  <van-icon v-show="isShow" name="clear" />
                </div>
              </template>
            </van-grid-item>
          </van-grid>
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 频道推荐 -->
    <van-cell-group>
      <van-cell>
        <template #title>
          <span style="font-size:16px;">频道推荐</span>
          <span style="font-size:12px;color:#B2AAB2;margin-left:10px;"
            >点击进入频道</span
          >
        </template>
      </van-cell>

      <van-cell>
        <template #title>
          <van-grid :gutter="10">
            <van-grid-item v-for="item in allChannelList" :key="item.id">
              <template #text>
                <div class="mybox">
                  <div class="mytext">{{item.name}}</div>
                  <van-icon v-show="isShow" name="clear" />
                </div>
              </template>
            </van-grid-item>
          </van-grid>
        </template>
      </van-cell>
    </van-cell-group>
  </van-popup>
</template>

<script>
//导入频道列表接口
import { getAllChannel } from "../../../api/channel";

export default {
  name: 'channel',
  props: ["value", "channelList", "active"],
  data() {
    return {
      isShow: false,
       //所有频道数据
      allChannelList: [],
    };
  },
  methods: {
    //点击编辑事件
    compile() {
      this.isShow = !this.isShow;
    },

    //封装获取全部频道
    async allChannel() {
        let res = await getAllChannel()
    }
  },

  mounted() {
      this.allChannel()
  },
};
</script>

<style lang="less" scoped>
.my-button {
  font-size: 14px;
  color: #f85a5a;
  background-color: #fff;
  border: 1px solid #f85a5a;
  border-radius: 15px;
  padding: 2px 13px;
}

.mybox {
  color: #222;
  position: relative;
  font-size: 12px;
  width: 100%;
  height: 100%;
  text-align: center;

  .mytext{
      color: red;
  }

  .van-icon {
    position: absolute;
    top: -24px;
    right: -16px;
    font-size: 18px;
    color: #000;
  }
}

/deep/.van-grid-item__content {
    padding: 16px 0;
}
</style>
