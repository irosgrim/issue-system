import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "issueReportingPage" */ '../views/Home.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "adminPage" */ '../views/Admin.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
//   base: '/issue-tracker/',
  routes
})

export default router
