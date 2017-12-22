import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Health-roomindex',
      component: () => import('@/pages/Health-room/home')
    }
  ]
})
