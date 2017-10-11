import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
    },
    {
      path: '/class',
      name: 'classindex',
      component: () => import('@/pages/class/index')
    },
     {
      path: '/Health-room',
      name: 'Health-roomindex',
      component: () => import('@/pages/Health-room/index')
    }, 
    {
      path: '/kitchen',
      name: 'kitchenindex',
      component: () => import('@/pages/kitchen/index')
    }, 
    // {
    //   path: '*',
    //   name: "default",
    //   component: classindex
    // }
  ]
})
