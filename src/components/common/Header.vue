<template lang="pug">
  #header
    .logo 寂静之声
    .user 欢迎 {{account.userLoginname}} 
      span.logout(@click="dologout()") 退出
</template>

<script>
import { Toast } from 'mint-ui'
import { OK_STATUS } from '@/config'

export default {
  name: 'header',
  components: {
  },
  created () {
    this.account = this.$store.state.account
  },
  data () {
    return {
      account: {}
    }
  },
  methods: {
    dologout () {
      this.$http.post('/api/user/logout.json', {
        userLoginname: this.account.userLoginname,
        userLoginpass: this.account.userLoginpass
      }, {
        timeout: 5000,
        emulateJSON: true
      }).then((response) => {
        response = response.body
        let status = response.status
        if (status === OK_STATUS) {
          this.$router.replace('/user/login')
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
  #header
    color: #fff;
    background-color: #272822;
    font-size: 1rem;
    .logo
      display: inline-block;
      letter-spacing: 0.1rem;
      width: 9.5rem;
      height: 3.5rem;
      line-height: 3.5rem;
      margin-left: 1.5rem;
    .user
      font-size: 0.7rem;
      float: right;
      height: 3.5rem;
      line-height: 3.5rem;
      margin-right: 1.5rem;
      .logout
        font-size: 0.6rem;
        cursor: pointer;
        &:hover
         color: #C9F2FC; 
</style>
