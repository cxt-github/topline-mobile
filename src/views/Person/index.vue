<template>
  <div class="person">
    <van-nav-bar
      title="个人信息"
      right-text="保存"
      left-arrow
      @click-left="$router.back()"
      @click-right="onClickRight"
      fixed
    />
    <van-cell-group>
      <van-cell title="头像" is-link>
        <template #default>
          <van-image round width="25px" height="25px" :src="personData.photo" />
        </template>
      </van-cell>
      <van-cell
        title="昵称"
        is-link
        :value="personData.name"
        @click="alterName"
      />
      <van-cell title="介绍" is-link />
      <van-cell
        title="性别"
        is-link
        :value="personData.gender === 1 ? '女' : '男'"
        @click="alterGender"
      />
      <van-cell
        title="生日"
        is-link
        :value="personData.birthday === '' ? '待完善' : personData.birthday"
      />
    </van-cell-group>
    <!-- 弹出层：昵称 -->
    <van-popup v-model="showName" position="bottom" :style="{ height: '30%' }">
      <van-field
        v-model="personData.name"
        label="修改昵称"
        placeholder="请输入用户名"
      />
    </van-popup>
    <!-- 弹出层：性别 -->
    <van-popup
      v-model="showGender"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-picker :columns="columns" @change="onChange" />
    </van-popup>
  </div>
</template>

<script>
//导入获取用户个人资料api
import { perData, compileData } from "../../api/user";
export default {
  name: "person",
  data() {
    return {
      personData: {}, //个人资料
      showName: false,
      showGender: false,
      columns: ["请选择", "男", "女"],

    };
  },

  methods: {
    //保存
    async onClickRight() {
      console.log("保存");
      try {
        await compileData({
        name: this.personData.name,
        gender: this.personData.gender
      })
        this.$toast.success('修改成功')
      } catch (error) {
        this.$toast.fail('修改失败');
      }
      
    },

    //获取用户个人资料
    async perData() {
      const res = await perData();
      this.personData = res;
    },

    //修改昵称
    alterName() {
      this.showName = true;
    },

    //修改性别
    alterGender() {
      this.showGender = true;
    },

    //性别改变事件
    onChange(picker, value, index) {
      this.personData.gender = index - 1;
    },
  },

  created() {
    this.perData();
  },
};
</script>

<style lang="less" scoped>
.person {
  margin-top: 46px;
}
</style>
