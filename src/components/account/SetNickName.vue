<template lang="pug">
  #setNickName
    v-headBar(title="设置昵称")
    v-spliter(height="0.7")
    .input-item
      .form-group
        label.control-label 昵称
        input.control-input(placeholder="设置昵称" type="text" v-model="nickName")
    v-spliter(height="0.7")
    .input-item
      .form-group
        input.btn.btn-login(:class="{'disabled': !nickName || nickName === oldNickName}" type="button" value="确认修改" @click="doSetNickName()")
</template>

<script>
import HeadBar from '@/components/common/HeadBar'
import Spliter from '@/components/common/Spliter'
import { Toast } from 'mint-ui'
import { OK_STATUS } from '@/config'
import CommonJS from '@/assets/js/common'

export default {
  name: 'setNickName',
  beforeRouteEnter (to, from, next) {
    next()
  },
  components: {
    'v-headBar': HeadBar,
    'v-spliter': Spliter
  },
  created () {
    let account = this.$store.state.account
    this.account = account
    this.nickName = account.nickName === '未设置昵称' ? '' : account.nickName
    this.oldNickName = account.nickName
  },
  data () {
    return {
      account: {},
      nickName: '',
      oldNickName: ''
    }
  },
  watch: {
  },
  methods: {
    doSetNickName () {
      if (this.nickName && this.nickName !== this.oldNickName) {
        this.$http.post('/mobile/user/update_user_info.html', {
          username: this.nickName
        }, {
          timeout: 5000,
          emulateJSON: true
        }).then((response) => {
          response = response.body
          let status = response.status
          if (status === OK_STATUS) {
            this.account.nickName = this.nickName
            CommonJS.setAccount(this, this.account)
            CommonJS.storeAccount(this)
            this.$router.back()
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
  #setNickName
    margin-top: 3.5rem;
</style>
