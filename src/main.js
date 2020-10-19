import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import fastClick from 'fastclick'
//import './utils/permission'
import './utils/rem'
import './vant/index'
import VueScroller from 'vue-scroller'

Vue.config.productionTip = false

fastClick.attach(document.body)
Vue.use(VueScroller)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
