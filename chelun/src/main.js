// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入路由
import router from '@/router/index'
// 引入store
import store from '@/store/index'
//引入vant
import { Popup, Picker } from 'vant'
Vue.config.productionTip = false
Vue.use(Popup);
Vue.use(Picker);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
