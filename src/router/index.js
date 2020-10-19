import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const index = () => import('@/views/index') //首页

export default new Router({
  /*
  # 配置如果匹配不到资源，将url指向 index.html， 在 vue-router 的 history 模式下使用，就不会显示404
  location @rewrites {
      rewrite ^(.*)$ /index.html last;
  }
  */
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'index',
      component: index,
    }
  ],
  //在每次新进入一个页面时，都是从0，0处显示页面
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
})
