<template>
  <div>
    <canvas :height="height" :width="width" id="componentRegCode"></canvas>
  </div>
</template>

<script>
import RegCode from '@/utils/regcode'
export default {
  props: {
    width: {
      type: Number,
      default() {
        return 70
      }
    },
    height: {
      type: Number,
      default() {
        return 40
      }
    },
    // 线条宽度
    lineWidth: {
      type: Number,
      default() {
        return 0.5
      }
    },
    // 线条数量
    lineNum: {
      type: Number,
      default() {
        return 2
      }
    },
    // 点的数量
    dotNum: {
      type: Number,
      default() {
        return 10
      }
    },
    // 点的半径
    dotR: {
      type: Number,
      default() {
        return 1
      }
    },
    // 前景色区间
    foregroundColor: {
      type: Array,
      default() {
        return [10, 80]
      }
    },
    // 背景色区间
    backgroundColor: {
      type: Array,
      default() {
        return [150, 250]
      }
    },
    // 字体大小
    fontSize: {
      type: Number,
      default() {
        return 20
      }
    },
    // 字体类型
    fontFamily: {
      type: String,
      default() {
        return 'Georgia'
      }
    },
    // 字体绘制方法，fill/stroke
    fontStyle: {
      type: String,
      default() {
        return 'fill'
      }
    },
    // 验证码因子
    content: {
      type: String,
      default() {
        return 'acdefhijkmnpwxyABCDEFGHJKMNPQWXY12345789'
      }
    },
    // 验证码长度
    len: {
      type: Number,
      default() {
        return 4
      }
    }
  },
  mounted() {
    let reg = new RegCode({
      lineWidth: this.lineWidth, // 线条宽度
      lineNum: this.lineNum, // 线条数量
      dotNum: this.dotNum, // 点的数量
      dotR: this.dotR, // 点的半径
      foregroundColor: this.foregroundColor, // 前景色区间
      backgroundColor: this.backgroundColor, // 背景色区间
      fontSize: this.fontSize, // 字体大小
      fontFamily: this.fontFamily, // 字体类型
      fontStyle: this.fontStyle, // 字体绘制方法，fill/stroke
      content: this.content, // 验证码因子
      len: this.len // 验证码长度
    }) // 不传值，统一走默认值
    reg.draw(document.querySelector('#componentRegCode'), r => {
      //像父组件传值
      this.$emit('regCodeEvent', r)
    })
  }
}
</script>