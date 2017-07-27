<template lang="pug">
  #login
    b-form.col-xs-11.col-sm-6.col-md-4.col-lg-3.text-center
      b-form-group
        b-form-input(v-model="login.username", type="text", placeholder="用户名")
      b-form-group
        b-form-input(v-model="login.pwd", type="password", placeholder="密码")
      b-form-group
        b-button(variant="primary", @click="dologin()") 登录
</template>

<script>
import { Toast } from 'mint-ui'
import { OK_STATUS } from '@/config'

export default {
  name: 'login',
  beforeRouteEnter (to, from, next) {
    next()
  },
  components: {
  },
  created () {
  },
  data () {
    return {
      login: {
        username: '',
        pwd: ''
      },
      loginPass: false,
      rememberpwd: false
    }
  },
  watch: {
    login: {
      handler (curVal, oldVal) {
        if (curVal.username === '') {
          curVal.pwd = ''
        }
        this.loginValidator()
      },
      deep: true
    }
  },
  methods: {
    dologin () {
      if (this.loginPass) {
        this.$http.post('/api/user/login.json', {
          userLoginname: this.login.username,
          userLoginpass: this.login.pwd
        }, {
          timeout: 5000,
          emulateJSON: true
        }).then((response) => {
          response = response.body
          let status = response.status
          if (status === OK_STATUS) {
            this.$store.state.menus = response.data.menuList
            this.$store.state.account = response.data.user
            this.$router.push('/index/')
          } else {
            Toast({
              message: response.msg,
              position: 'bottom',
              duration: 1500
            })
          }
        }, (response) => {
          Toast({
            message: '请求超时',
            position: 'bottom',
            duration: 1500
          })
        })
      }
    },
    loginValidator () {
      if (this.login.username) {
        this.loginPass = this.login.username.length !== 0
      }
      if (this.loginPass) {
        this.loginPass = this.login.pwd.length !== 0
      }
    },
    format (value) {
      return value.toLowerCase()
    }
  }
}
</script>

<style lang="stylus">
  #login
    display: flex;
    form
      margin: 10rem auto;
      padding: 4rem;
      padding-bottom: 2rem;
      border-radius: 10px;
      border: 1px solid #C0CCDA;
</style>
