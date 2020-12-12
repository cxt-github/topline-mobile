<template>
  <div class="search">
    <!-- 搜索框 -->
    <van-search
      v-model="key"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch(key)"
      @cancel="onCancel"
    />
    <!-- 联想框 -->
    <van-cell
      icon="search"
      v-for="(item, index) in keyList"
      :key="index"
      @click="onSearch(item)"
    >
      <template #title>
        <div v-html="item"></div>
      </template>
    </van-cell>
    <!-- 历史记录 -->
    <van-cell title="历史记录">
      <template #default>
        <van-icon name="delete" />
      </template>
    </van-cell>
  </div>
</template>

<script>
//导入联想建议API
import { associateSuggest } from '../../api/articles'

export default {
    name: 'search',
    data() {
        return {
            key: '', //搜索关键字
            keyList: [], //保存联想关键字
            saveKey: [], //联想关键字历史记录
            timer: null, //定一个定时器
        }
    },

    methods:{
        //完成时触发
        onSearch(key){
            this.$router.push(`/list/${key}`)
        },

        //取消出伏
        onCancel() {
            console.log('我已经取消了')
        },
    },

    watch:{
        //监听key
        key: function (newval,oldval){
            //清除定时器器
            if(this.timer) {
                clearTimeout(this.timer)
            }
            this.timer = setTimeout(async ()=>{
                //判断newval是否未空
                if(!newval.trim().length) {
                //将联想的数据清空
                this.keyList = []
                return
            }
            const res = await associateSuggest(newval)
            const arr = res.options
            this.keyList = arr.map(item => {
                return item.split(newval).join(`<span style="color:red">${newval}</span>`)
            });
            },500)
        }
    }
};
</script>

<style lang="less" scoped>
.search {
  /deep/.van-search {
    background-color: #1989fa;
    .van-search__action {
      color: #fff;
    }
  }
  .van-icon {
    color: #000;
  }
}
</style>
