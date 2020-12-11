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
                <div class="mybox" >
                  <div :class="{mytext: active === index}" @click="cutChannel(index)">{{ item.name }}</div>
                  <van-icon v-show="isShow" name="clear" @click="decreaseChannel(index)"/>
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
            <van-grid-item v-for="item in otherChannel" :key="item.id">
              <template #text>
                <div class="mybox" @click="addChannel(item)">
                  <div>{{item.name}}</div>
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
import { getAllChannel, setChannel } from "../../../api/channel";

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

  computed:{
    //通过计算属性将 allChannelList 中的 channelList 中的不重复元素提取出来
    otherChannel() {
      let arr = this.channelList.map(item => {
        return item.id
      })
      let newArr = this.allChannelList.filter(item => {
        return !arr.includes(item.id)
      })
      return newArr
    }
  },

  methods: {
    //点击编辑事件
    compile() {
      this.isShow = !this.isShow;
    },

    //点击我的频道切换频道事件
    cutChannel(index) {
      this.$emit('update:active',index)
      this.$emit('input', this.$event)
    },

    //封装获取所有频道列表数据
    async allChannel() {
      let res = await getAllChannel()
      this.allChannelList = res.channels
      this.allChannelList.forEach(item => {
        this.$set(item,'article',[])
        this.$set(item,'drapLoading',false)
        this.$set(item,'finished',false)
        this.$set(item,'pullLoading',false)
        this.$set(item,'pre_timestamp',0)
      });
    },

    //点击添加我的频道
    async addChannel(item){
      this.channelList.push(item)
      let use = this.$store.state.user
      //判读是否有有登录，没有登录
      if(!use || !use.token) {
        window.localStorage.setItem('channel',JSON.stringify(this.channelList))
      } else {
        //有登录就保存到服务器
        let channels = this.channelList.slice(1).map((item,index) => {
          return {
            id: item.id,
            seq: index+2
          }
        })
        // console.log(channels);
        //发请求发送服务器
        await setChannel({
          channels
        })
      }
    },

    //点击减少我的频道
    async decreaseChannel(index){
      // console.log(index);
      this.channelList.splice(index,1)
      let use = this.$store.state.user
      //判读是否有有登录，没有登录
      if(!use || !use.token) {
        window.localStorage.setItem('channel',JSON.stringify(this.channelList))
      } else {
        //有登录就保存到服务器
        let channels = this.channelList.slice(1).map((item,index) => {
          return {
            id: item.id,
            seq: index+2
          }
        })
        // console.log(channels);
        //发请求发送服务器
        await setChannel({
          channels
        })
      }
    }
  },

  mounted() {
      //获取所有频道列表数据
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
    right: -8px;
    font-size: 18px;
    color: #000;
  }
}

/deep/.van-grid-item__content {
    padding: 16px 0;
}
</style>
