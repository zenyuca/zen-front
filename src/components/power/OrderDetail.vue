<template lang="pug">
  #orderDetail
    v-headBar(title="订单详情" :addon="addon")
    v-spliter(height="0.7")
    .content(v-show="order.amount")
      .user
        img.headimg(:src="getHead()")
        .nickName {{account.nickName}}
      .amount {{order.amount}}
        span.unit 元
      .status {{order.status}}
    v-spliter(height="0.5")
    ul.normal-list(v-show="order.amount")
      li.row
        label.normal-label 创建时间
        span.normal-value(v-show="order.createTime") {{order.createTime | date('%Y-%m-%d %H:%M:%s')}}
      li.row
        label.normal-label 订单号
        span.normal-value(v-show="order.orderNo") {{order.orderNo}}
    v-spliter(height="0.5")
</template>

<script>
import HeadBar from '@/components/common/HeadBar'
import FootBar from '@/components/common/FootBar'
import Spliter from '@/components/common/Spliter'
import { Toast } from 'mint-ui'
import { OK_STATUS } from '@/config'
import CommonJS from '@/assets/js/common'

export default {
  name: 'orderDetail',
  components: {
    'v-headBar': HeadBar,
    'v-footBar': FootBar,
    'v-spliter': Spliter
  },
  created () {
    this.order = this.account.order
    this.order.status = CommonJS.payStatus(this.order.status)
  },
  data () {
    return {
      account: this.$store.state.account,
      order: {},
      addon: {
        title: '我的',
        route: '/account/'
      }
    }
  },
  methods: {
    getHead () {
      return '/static/img/head/' + this.account.headimg
    },
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
  #orderDetail
    margin-top: 3.5rem;
    .content
      text-align: center;
      padding: 1rem 0;
      .user
        .headimg
          display: inline-block;
          width: 2rem;
          border-radius: 50%;
          vertical-align: middle;
        .nickName
          display: inline-block;
          margin-left: 0.5rem;
          font-size: 1rem;
          font-weight: 500;
          vertical-align: middle;
          margin-top: 0.2rem;
      .amount
        margin-top: 1rem;
        font-size: 3rem;
        .unit
          font-size: 1.5rem;
          margin-left: 0.3rem;
      .status
        margin-top: 0.5rem;
        font-size: 0.9rem;
        color: #827d7d;
</style>
