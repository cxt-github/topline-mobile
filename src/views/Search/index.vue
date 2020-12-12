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
    <!-- 联想框  -->
    <van-cell-group v-if="keyList.length > 0">
      <van-cell
        icon="search"
        v-for="(item, index) in keyList"
        :key="index"
        @click="onSearch(item.item)"
      >
        <template #title>
          <div v-html="item.colorItem"></div>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <template #default>
          <van-icon name="delete" @click="isShow=true" v-show="!isShow"/>
            <div v-show="isShow">
                <span @click="removeSearch">清除全部</span>
                <span @click="isShow=flse">完成</span>
            </div>
        </template>
      </van-cell>
      <van-cell :title="item" icon="search" v-for="(item,index) in searchList" :key="index" @click="onSearch(item)">
        <template #right-icon>
          <van-icon name="close" v-show="isShow" @click="deleteSearch(index)" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
//导入联想建议API
import { associateSuggest } from "../../api/articles";

export default {
  name: "search",
  data() {
    return {
      key: "", //搜索关键字
      keyList: [], //保存联想关键字
      searchList: JSON.parse(window.localStorage.getItem('search') ) || [], //联想关键字历史记录
      timer: null, //定一个定时器
      isShow: false,
    };
  },

  methods: {
    //完成时触发
    onSearch(item) {
      this.$router.push(`/list/${item}`);
      //添加到数组
      this.searchList.unshift(item)
      //去重
      this.searchList = [...new Set(this.searchList)]
      //保存到本地
      window.localStorage.setItem('search',JSON.stringify(this.searchList))
    },

    //取消出伏
    onCancel() {
      console.log("我已经取消了");
    },

    //清空历史记录
    removeSearch() {
        this.searchList = []
        window.localStorage.removeItem('search')
    },

    //删除单项历史记录
    deleteSearch(index) {
        this.searchList.splice(index,1)
        //保存到本地
        window.localStorage.setItem('search',JSON.stringify(this.searchList))
    }
  },

  watch: {
    //监听key
    key: function(newval, oldval) {
      //清除定时器器
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(async () => {
        //判断newval是否未空
        if (!newval.trim().length) {
          //将联想的数据清空
          this.keyList = [];
          return;
        }
        const res = await associateSuggest(newval);
        const arr = res.options;
        this.keyList = arr.map((item) => {
          return {
            colorItem: item
              .split(newval)
              .join(`<span style="color:red">${newval}</span>`),
            item: item,
          };
        });
      }, 500);
    },
  },
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
  .van-cell__value {
      color: #000;
      span {
          margin-left: 5px;
      }
  }
}
</style>
