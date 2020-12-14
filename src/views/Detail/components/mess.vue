<template>
  <div class="mess">
    <van-cell>
      <template #title>
        <div class="bottom">
          <div class="ipt">
            <van-field placeholder="请输入用户名">
              <template #left-icon>
                <van-icon name="edit" />
              </template>
            </van-field>
          </div>
          <div>
            <van-button style="margin:0 20px" type="primary">发送</van-button>
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
export default {};
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
