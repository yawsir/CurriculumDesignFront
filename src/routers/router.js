import Vue from 'vue'
import Router from 'vue-router'
import homeChildren from './homeChildren.js'
import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: homeChildren
    },
    {
      path: '*',
      redirect: '/home/order'
    },
    {
      path: '/login',
      component: () => import('../views/Login.vue')
    }
  ]
})
