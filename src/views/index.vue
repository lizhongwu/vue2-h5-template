<template>
  <div style="position：fixed;height：100%; overflow-x:hidden;">
    <Header :hasMsg="true" :isBack="false" />
    index
    <Footer />
  </div>
</template>

<script>
import { removeToken, getToken } from '@/utils/auth'
import API from '@/api/index'

export default {
  data () {
    return {

    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
</style>
