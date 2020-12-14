<template>
  <van-cell :title="getDetail.aut_name">
    <template #icon>
      <van-image
        width="50px"
        height="50px"
        :src="getDetail.aut_photo"
        round
        style="margin-right:15px"
      />
    </template>
    <template #label>
      <span>{{ getDetail.pubdate | dateFilter }}</span>
    </template>
    <template #default>
      <van-button v-if="!getDetail.is_followed" type="danger" size="small" @click="followed">关注</van-button>
      <van-button v-else type="default" size="small" @click="unFollowed">取消关注</van-button>
    </template>
  </van-cell>
</template>

<script>
//导入关注用户api
import { userFollowed, unUserFollowed } from '../../../api/user'

export default {
  props: ["getDetail"],

  methods: {
    //关注
    async followed() {
      try {
        await userFollowed(this.getDetail.aut_id)
        this.getDetail.is_followed = true
        this.$toast.success('关注成功')
      } catch (error) {
        this.$toast.fail(error.message)
      }
    },

    //取关
    async unFollowed() {
      try {
        await unUserFollowed(this.getDetail.aut_id)
        this.getDetail.is_followed = false
        this.$toast.success('取关成功')
      } catch (error) {
        this.$toast.fail(error.message)
      }
    }
  },
};
</script>

<style></style>
