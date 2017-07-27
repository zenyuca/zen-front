<template lang="pug">
  #setNewpwd
    v-headBar(title="设置新密码")
    v-spliter(height="0.7")
    .input-item
      .form-group
        label.control-label 原密码
        input.control-input(placeholder="当前使用的密码" type="password" v-model="newpwd.originpwd")
    .input-item
      .form-group
        label.control-label 新密码
        input.control-input(placeholder="请输入6-15位字符" type="password" v-model="newpwd.pwd")
    .input-item
      .form-group
        label.control-label 确认密码
        input.control-input(placeholder="再次输入密码" type="password" v-model="newpwd.repwd")
    .input-item
      .form-group
        input.btn.btn-login(:class="{'disabled': !newpwdPass}" type="button" value="确认修改" @click="donewpwd()")
</template>

<script>
import HeadBar from '@/components/common/HeadBar'
import Spliter from '@/components/common/Spliter'
import { Toast } from 'mint-ui'
import { OK_STATUS } from '@/config'
import CommonJS from '@/assets/js/common'

export default {
  name: 'setNewpwd',
  beforeRouteEnter (to, from, next) {
    if (from.path === '/account/settings') {
      next()
    } else {
      next('/account/settings')
    }
  },
  components: {
    'v-headBar': HeadBar,
    'v-spliter': Spliter
  },
  data () {
    return {
      newpwd: {
        originpwd: '',
        pwd: '',
        repwd: ''
      },
      newpwdPass: false
    }
  },
  watch: {
    newpwd: {
      handler (curVal, oldVal) {
        this.newpwdValidator()
      },
      deep: true
    }
  },
  methods: {
    donewpwd () {
      if (this.newpwdPass) {
        if (this.newpwd.pwd !== this.newpwd.repwd) {
          Toast({
            message: '确认密码与新密码不一致',
            position: 'bottom',
            duration: 1500
          })
        } else {
          this.$http.post('/mobile/user/edit_pwd.html', {
            pwd: this.newpwd.pwd,
            c_pwd: this.newpwd.repwd,
            o_pwd: this.newpwd.originpwd
          }, {
            timeout: 5000,
            emulateJSON: true
          }).then((response) => {
            response = response.body
            let status = response.status
            if (status === OK_STATUS) {
              let account = CommonJS.getAccount(this)
              account.pwd = ''
              account.rememberpwd = false
              CommonJS.setAccount(this, account)
              CommonJS.storeAccount(this)
              CommonJS.removeToken(this)
              CommonJS.toLogin(this)
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
    },
    newpwdValidator () {
      this.newpwdPass = /^[0-9_a-zA-Z]{6,15}$/.test(this.newpwd.originpwd)
      if (this.newpwdPass) {
        this.newpwdPass = /^[0-9_a-zA-Z]{6,15}$/.test(this.newpwd.pwd)
      }
      if (this.newpwdPass) {
        this.newpwdPass = /^[0-9_a-zA-Z]{6,15}$/.test(this.newpwd.repwd)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
  #setNewpwd
    margin-top: 3.5rem;
</style>
