<template lang="pug">
  #buyPowerDetail
    v-headBar(title="购电明细")
    v-spliter(height="0.7")
    ul.content(v-show="detail.totalPrice")
      li.row
        .header.buyPower
          .wrapper
            span.title {{detail.totalPrice}}
            span.label 总购电（元）
        .footer {{detail.starttime}} 起
      li.row
        .header.leftMoney
          .wrapper
            span.title {{account.leftMoney}}
            span.label 电费余额（元）
        .footer {{detail.endtime}} 止
    v-spliter(height="0.5")
    .detail-label(v-show="detail.list") 最近一年明细
    ul.normal-list(v-show="detail.list")
      li.row(v-for="item in detail.list")
        label.normal-label {{item.time}}
        span.normal-value {{item.amount}}
</template>

<script>
import HeadBar from '@/components/common/HeadBar'
import FootBar from '@/components/common/FootBar'
import Spliter from '@/components/common/Spliter'
import { Toast } from 'mint-ui'
import { OK_STATUS } from '@/config'

export default {
  name: 'buyPowerDetail',
  components: {
    'v-headBar': HeadBar,
    'v-footBar': FootBar,
    'v-spliter': Spliter
  },
  created () {
    this.getDetailInfo()
    window.addEventListener('resize', this.fixPosition, true)
  },
  mounted () {
  },
  destroyed () {
    window.removeEventListener('resize', this.fixPosition, true)
  },
  data () {
    return {
      account: this.$store.state.account,
      detail: {}
    }
  },
  methods: {
    getDetailInfo () {
      this.$http.post('/mobile/order/buy_eleLogByYear.html', {
      }, {
        timeout: 5000,
        emulateJSON: true
      }).then((response) => {
        response = response.body
        let status = response.status
        if (status === OK_STATUS) {
          this.detail = response.data
          this.fixPosition()
        }
      }, (response) => {
        Toast({
          message: '请求超时',
          position: 'bottom',
          duration: 1500
        })
      })
    },
    fixPosition () {
      this.$nextTick(() => {
        let node = document.getElementsByClassName('wrapper')
        for (let i = 0; i < node.length; i++) {
          let e = node[i]
          let w = e.offsetWidth
          let childNode = e.childNodes
          let h = 0
          for (let j = 0; j < childNode.length; j++) {
            let numNode = childNode[0]
            let count = numNode.innerHTML.length
            count = count < 4 ? 4 : count
            numNode.style.fontSize = (w / count) * (16 / 10) + 'px'
            h += numNode.offsetHeight
          }
          let padding = (w - h) / 2
          e.style.padding = padding + 'px 0'
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
  #buyPowerDetail
    margin-top: 3.5rem;
    .content
      text-align: center;
      padding: 0 1rem 1rem 1rem;
      .row
        display: inline-block;
        margin-right: 1rem;
        margin-top: 1rem;
        &:last-child
          margin-right: 0;
        .header
          width: w = calc(100% - 1rem);
          padding-top: w;
          border-radius: 50%;
          position: relative;
          &.buyPower
            color: #EE7968;
            border: 0.8rem solid #EE7968;
            width: w = calc(100% - 1.5rem);
            padding-top: w;
          &.leftMoney
            color: #13AAB3;
            border: 0.8rem solid #13AAB3;
          .wrapper
            position: absolute;
            left: 0.8rem;
            top: 0.8rem;
            right: 0.8rem;
            bottom: 0.8rem;
            .title
              display: inline-block;
            .label
              display: inline-block;
              font-size: 0.8rem;
              color: #000000;
        .footer
          font-size: 0.8rem;
          margin-top: 0.8rem;
    .detail-label
      padding: 1rem;
      font-size: 1.1rem;
    .normal-list
      font-size: 0.8rem;
      .normal-value
        font-size: 0.8rem;
</style>
