import router from '@/router'
import { getToken } from './auth'

// 不重定向白名单
const whiteList = ['/index']

//权限验证
router.beforeEach((to, from, next) => {
  // let { code, msg } = await API.queryLoginState()
  //存在token
  if (getToken()) {
    //如果是登录页面去首页
    if (to.path === '/index') {
      next({
        path: '/',
      })
    }
    //正常跳转
    else {
      next()
    }
  }
  //不存在token
  else {
    //如果是白名单页面正常跳转
    if (whiteList.includes(to.path)) {
      next()
    }
    //否则跳转登录页面
    else {
      next('/index')
    }
  }
})
