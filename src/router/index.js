import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
// index
import Index from '@/components/Index'
// common
import Home from '@/components/common/Home'
// user
import Login from '@/components/user/Login'
// manage
import Role from '@/components/manage/Role'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/zen-front/',
  routes: [
    {
      path: '/user/',
      component: App,
      children: [
        {
          path: 'login',
          components: {
            default: Login
          }
        }
      ]
    },
    {
      path: '/index/',
      component: Home,
      children: [
        {
          path: '',
          component: Index
        }
      ]
    },
    {
      path: '/manage/',
      component: Home,
      children: [
        {
          path: 'role',
          component: Role
        }
      ]
    }
  ]
})
