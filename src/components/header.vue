<template>
  <!-- 头部 -->
  <div class="header">
    <!-- 返回 -->
    <div :isBack="isBack" class="back" v-if="isBack">返回</div>
    <!-- 标题 -->
    <div class="title">{{ title }}</div>
    <!-- 消息 -->
    <div class="message" v-if="hasMsg"></div>
  </div>
</template>

<script>
export default {
  created() {},
  props: {
    title: {
      type: String,
      default() {
        return '高龄认证平台'
      }
    },
    isBack: {
      type: Boolean,
      default() {
        return true
      }
    },
    hasMsg: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    toBack() {
      this.$router.back()
    },
    toMessage() {
      this.$router.push('/message')
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  position: relative;
  width: 100%;
  height: 88px;
  line-height: 88px;
  background: #2e8cda;
  font-size: 32px;
  color: #fff;
}

.back {
  position: relative;
  float: left;
  margin-left: 57px;

  &::before {
    content: '';
    position: absolute;
    top: 28px;
    left: -30px;
    width: 17px;
    height: 30px;
    background: url('../assets/back.png');
    background-size: cover;
  }
}

.title {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.message {
  float: right;
  margin-top: 24px;
  margin-right: 40px;
  width: 41px;
  height: 41px;
  background: url('../assets/notice.png');
  background-size: cover;
}
</style>
