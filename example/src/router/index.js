import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Home1 from '../views/home1.vue'
import {routerMiddle,addGlobalMiddle} from 'vue-router-middle'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/s1',
    name: 'Home1',
    component: Home1
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

routerMiddle(router);
addGlobalMiddle((routing, next)=>{
  console.log("我是全局中间件",routing);
  next()
})

export default router
