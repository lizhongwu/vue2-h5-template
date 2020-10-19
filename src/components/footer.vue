<template>
  <div class="footer">
    <!-- 底部 -->
    <div :class="{cur: active==0}" class="item">
      <div class="icon icon1"></div>首页
    </div>
    <div :class="{cur: active==1}" class="item">
      <div class="icon icon2"></div>我的
    </div>
    <!-- 底部结束 -->
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Number,
      default() {
        return 0
      }
    }
  }
}
</script>

<style lang="less" scoped>
.footer {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 99px;
  border-top: 1px solid #c4e1ff;
  background: #fff;

  .item {
    box-sizing: border-box;
    width: 50%;
    height: 99px;
    text-align: center;
    font-size: 20px;
    color: #c6c6c6;
    border-bottom: 4px solid transparent;

    .icon {
      margin: 12px auto 0;

      &.icon1 {
        width: 46px;
        height: 46px;
        background: url('../assets/index.png');
        background-size: cover;
      }

      &.icon2 {
        width: 35px;
        height: 44px;
        background: url('../assets/my.png');
        background-size: cover;
      }
    }

    &.cur {
      color: #2e8cda;
      border-bottom: 4px solid #117ec6;

      .icon {
        &.icon1 {
          background: url('../assets/index_cur.png');
          background-size: cover;
        }

        &.icon2 {
          background: url('../assets/my_cur.png');
          background-size: cover;
        }
      }
    }
  }
}
</style>