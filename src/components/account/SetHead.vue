<template lang="pug">
  #setHead
    v-headBar(title="更改头像")
    ul.headlist
      li.headitem(v-for="head in headList")
        img.headimg(:class="{defaultHead: head === headSelected, active: head === account.headimg}"  :src="getHead(head)" @click="selectHead(head)" v-model="headSelected")
    v-spliter
    .input-item
      .form-group
        input.btn.btn-login(:class="{'disabled': headSelected === ''}" type="button" value="确认更改" @click="doSetHead()")
</template>

<script>
import HeadBar from '@/components/common/HeadBar'
import Spliter from '@/components/common/Spliter'
import { Toast } from 'mint-ui'
import { OK_STATUS, HEAD_LIST } from '@/config'
import CommonJS from '@/assets/js/common'

export default {
  name: 'setHead',
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
  },
  data () {
    return {
      account: {},
      headSelected: '',
      headList: HEAD_LIST
    }
  },
  watch: {
  },
  methods: {
    getHead (head) {
      return '/static/img/head/' + head
    },
    selectHead (head) {
      this.headSelected = head
      if (this.headSelected === this.account.headimg) {
        this.headSelected = ''
      }
    },
    doSetHead () {
      if (this.headSelected) {
        this.$http.post('/mobile/user/update_user_info.html', {
          headimg: this.headSelected
        }, {
          timeout: 5000,
          emulateJSON: true
        }).then((response) => {
          response = response.body
          let status = response.status
          if (status === OK_STATUS) {
            let account = CommonJS.getAccount(this)
            account.headimg = this.headSelected
            CommonJS.setAccount(this, account)
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
  #setHead
    margin-top: 3.5rem;
    .headlist
      padding: 5px;
      .headitem
        display: inline-block;
        margin: 0.2rem;
        @media screen and (min-width: 320px){
          width: calc((100% - 1.8rem) / 4);
        }
        @media screen and (min-width: 375px){
          width: calc((100% - 1.8rem) / 4);
        }
        @media screen and (min-width: 414px){
          width: calc((100% - 2.2rem) / 5);
        }
        @media screen and (min-width: 768px){
          width: calc((100% - 3rem) / 7);
        }
        @media screen and (min-width: 1024px){
          width: calc((100% - 4.2rem) / 10);
        }
        @media screen and (min-width: 1366px){
          width: calc((100% - 4.2rem) / 10);
        }
        .headimg
          box-sizing: border-box;
          padding: 5px;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid transparent;
          &.active
            border: 2px solid #2ab7a2;
          &.defaultHead
            border: 2px solid #f3092c;
</style>
