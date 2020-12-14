<template>
  <div class="mess">
    <van-cell>
      <template #title>
        <div class="bottom">
          <div class="ipt">
            <van-field v-model="value" placeholder="请输入用户名">
              <template #left-icon>
                <van-icon name="edit" />
              </template>
            </van-field>
          </div>
          <div>
            <van-button style="margin:0 20px" type="primary" @click="sendMsg">发送</van-button>
          </div>
          <div class="start">
            <van-icon name="star-o" />
          </div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
//添加品论api
import { addComment } from '../../../api/comment'

export default {
  props:['getDetail'],
  data() {
    return {
      value:'',
    }
  },

  methods: {
    //发送
    async sendMsg() {
      let res = await addComment({
        target: this.getDetail.art_id,
        content: this.value,
      })
      this.$emit('setComment',res)
      this.value = ''
    }
  },
};
</script>

<style lang="less" scoped>
.mess {
  position:fixed;
  bottom:-1px;
  left: 0;
  background-color: #fff;
  .bottom {
    display: flex;
    align-items: center;
    .ipt{
      flex: 1;
      .van-field {
        background-color: #eee;
        border-radius: 20px;
      }
    }
    .start {
      font-size: 24px;
      color: #ccc;
    }
  }
}
</style>
