import Vue from 'vue'
import Router from 'vue-router'
import Admin from './views/Admin'
import manage from 'components/admin/manage.routes'
import updateQuestion from 'components/admin/updateQuestion/updateQuestion.routes'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/admin',
      component: Admin,
      children: [manage, updateQuestion]
    }
  ]
})
