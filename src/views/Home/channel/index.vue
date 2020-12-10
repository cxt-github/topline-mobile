<template>
  <van-popup
    position="bottom"
    :value="value"
    :style="{ height: '90%' }"
    @input="$emit('input', $event)"
  >
    <van-cell-group>
      <van-cell value="内容">
        <template #title>
          <span style="font-size:16px;">我的频道</span>
          <span style="font-size:12px;color:#B2AAB2;margin-left:10px;"
            >点击进入频道</span
          >
        </template>
        <template #default>
          <button class="my-button">编辑</button>
        </template>
      </van-cell>

      <van-cell>
        <template #title>
          <van-grid :gutter="10">
            <van-grid-item
              v-for="value in 8"
              :key="value"
              text="文字"
            />
          </van-grid>
        </template>
      </van-cell>
    </van-cell-group>
  </van-popup>
</template>

<script>
//导入频道列表接口
import { getChannel } from "../../../api/channel";

export default {
  props: ["value"],
  methods:{
      xxx() {
          
          console.log(this.$event);
      }
  }
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
</style>
