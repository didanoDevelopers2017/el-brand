// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/classscreennew'
import ElementUI from 'element-ui'
import axios from 'axios'

import 'element-ui/lib/theme-default/index.css'
import './common/style.css'
Vue.use(ElementUI)
Vue.prototype.$http = axios
Vue.http = axios

// 数据获取失败处理
Vue.http.interceptors.response.use(function (response) {
  if (response.data.success) {
    return response
  } else {
    return Promise.reject(response)
  }
}, function (error) {
  return Promise.reject(error)
})
// 数据获取失败处理

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App}
})
