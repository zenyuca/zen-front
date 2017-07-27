<template lang="pug">
  #settings
    v-headBar(title="设置")
    v-spliter(height="0.7")
    ul.normal-list
      li.row
        label.normal-label 账号
        span.normal-value {{account.phone}}
      li.row
        label.normal-label 昵称
        router-link.arrow.el-icon-arrow-right(to="/account/setNickName" tag="i")
        span.normal-value {{account.nickName}}
      li.row
        label.normal-label 更改头像
        router-link.arrow.el-icon-arrow-right(to="/account/setHead" tag="i")
    v-spliter(height="1")
    ul.normal-list
      li.row
        label.normal-label 修改密码
        router-link.arrow.el-icon-arrow-right(to="/account/setNewpwd" tag="i")
    v-spliter(height="1")
    .input-item
      .form-group
        input.btn.btn-login( type="button" value="退出登录" @click="dologout()") 
</template>

<script>
import HeadBar from '@/components/common/HeadBar'
import FootBar from '@/components/common/FootBar'
import Spliter from '@/components/common/Spliter'
import { Toast } from 'mint-ui'
import { OK_STATUS } from '@/config'
import CommonJS from '@/assets/js/common'

export default {
  name: 'settings',
  components: {
    'v-headBar': HeadBar,
    'v-footBar': FootBar,
    'v-spliter': Spliter
  },
  created () {
    let account = this.$store.state.account
    this.account = account
  },
  data () {
    return {
      account: {}
    }
  },
  methods: {
    dologout () {
      this.$http.post('/mobile/user/login_out.html', {
        phone: this.account.phone
      }, {
        timeout: 5000,
        emulateJSON: true
      }).then((response) => {
        response = response.body
        let status = response.status
        if (status === OK_STATUS) {
          CommonJS.removeToken(this)
          this.$router.replace('/user/login')
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
  #settings
    margin-top: 3.5rem;
</style>
