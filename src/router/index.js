import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
// index
import Index from '@/components/Index'
// common
import Home from '@/components/common/Home'
// // user
import Login from '@/components/user/Login'
// import Register from '@/components/user/Register'
// import Losepwd from '@/components/user/Losepwd'
// import Setpwd from '@/components/user/Setpwd'
// // me
// import Me from '@/components/account/Me'
// import Settings from '@/components/account/Settings'
// import SetNewpwd from '@/components/account/SetNewpwd'
// import SetHead from '@/components/account/SetHead'
// import SetNickName from '@/components/account/SetNickName'
// // power
// import PowerCount from '@/components/power/PowerCount'
// import PowerPay from '@/components/power/PowerPay'
// import PayResult from '@/components/power/PayResult'
// import OrderDetail from '@/components/power/OrderDetail'
// // record
// import BuyPowerDetail from '@/components/record/BuyPowerDetail'
// // history
// import History from '@/components/record/History'

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
    }
  ]
})
