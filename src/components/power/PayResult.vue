<template lang="pug">
  #payResult
    v-headBar(title="支付结果" :showBack="false")
    .timer {{time}}
    .spinner
      .spinner-container.container1
        .circle1
        .circle2
        .circle3
        .circle4
      .spinner-container.container2
        .circle1
        .circle2
        .circle3
        .circle4
      .spinner-container.container2
        .circle1
        .circle2
        .circle3
        .circle4
</template>

<script>
import HeadBar from '@/components/common/HeadBar'
import Spliter from '@/components/common/Spliter'
import { Toast } from 'mint-ui'
import { OK_STATUS } from '@/config'
import CommonJS from '@/assets/js/common'
export default {
  name: 'payResult',
  components: {
    'v-headBar': HeadBar,
    'v-spliter': Spliter
  },
  created () {
    this.interval = setInterval(() => {
      this.time--
      this.orderNo = this.$route.query.out_trade_no
      if (this.time > 0) {
        this.doPay()
      } else {
        this.rmInterval()
        this.toDetail()
      }
    }, 1000)
  },
  destroyed () {
    this.rmInterval()
  },
  data () {
    return {
      time: 5,
      orderNo: '',
      interval: null
    }
  },
  methods: {
    doPay () {
      this.$http.post('/mobile/order/query_orderStatus.html', {
        orderNo: this.orderNo,
        noIndicator: true
      }, {
        timeout: 5000,
        emulateJSON: true
      }).then((response) => {
        response = response.body
        this.result = response
        let status = response.status
        if (status === OK_STATUS) {
          if (response.data.status === 20 || response.data.status === 30) {
            let account = CommonJS.getAccount(this)
            account.leftMoney = response.data.accountBalance
            CommonJS.setAccount(this, account)
            CommonJS.storeAccount(this)
            this.rmInterval()
            this.toDetail()
          }
        }
      }, (response) => {
        Toast({
          message: '请求超时',
          position: 'bottom',
          duration: 1500
        })
      })
    },
    toDetail () {
      this.$http.post('/mobile/order/query_orderDetail.html', {
        orderNo: this.orderNo,
        noIndicator: true
      }, {
        timeout: 5000,
        emulateJSON: true
      }).then((response) => {
        response = response.body
        let status = response.status
        if (status === OK_STATUS) {
          let account = CommonJS.getAccount(this)
          account.order = response.data
          CommonJS.setAccount(this, account)
          CommonJS.storeAccount(this)
          this.$router.push('/power/orderDetail')
        }
      }, (response) => {
        Toast({
          message: '请求超时',
          position: 'bottom',
          duration: 1500
        })
      })
    },
    rmInterval () {
      window.clearInterval(this.interval)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
  #payResult
    margin-top: 3.5rem;

  .wait{
      z-index: 0;
      position: absolute;
      text-align: center;
      margin-top: 20%;
      width: 100%;
      height: 10rem;
      font-size: 20px;
  }
  .timer{
      width: 7rem;
      height: 7rem;
      z-index: 10;
      left: calc((100% - 7rem) / 2);
      top: 10rem;
      position: absolute;
      font-size: 3rem;
      text-align: center;
      line-height: 7rem;
  }
  .spinner {
      z-index: 1;
      left: calc((100% - 7rem) / 2);
      top: 10rem;
      width: 7rem;
      height: 7rem;
      position: absolute;
  }

  .container1 > div, .container2 > div, .container3 > div {
      width: 0.9rem;
      height: 0.9rem;
      background-color: #333;

      border-radius: 100%;
      position: absolute;
      -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
      animation: bouncedelay 1.2s infinite ease-in-out;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
  }

  .spinner .spinner-container {
      position: absolute;
      width: 100%;
      height: 100%;
  }

  .container2 {
      -webkit-transform: rotateZ(45deg);
      transform: rotateZ(45deg);
  }

  .container3 {
      -webkit-transform: rotateZ(90deg);
      transform: rotateZ(90deg);
  }

  .circle1 { top: 0; left: 0; }
  .circle2 { top: 0; right: 0; }
  .circle3 { right: 0; bottom: 0; }
  .circle4 { left: 0; bottom: 0; }

  .container2 .circle1 {
      -webkit-animation-delay: -1.1s;
      animation-delay: -1.1s;
  }

  .container3 .circle1 {
      -webkit-animation-delay: -1.0s;
      animation-delay: -1.0s;
  }

  .container1 .circle2 {
      -webkit-animation-delay: -0.9s;
      animation-delay: -0.9s;
  }

  .container2 .circle2 {
      -webkit-animation-delay: -0.8s;
      animation-delay: -0.8s;
  }

  .container3 .circle2 {
      -webkit-animation-delay: -0.7s;
      animation-delay: -0.7s;
  }

  .container1 .circle3 {
      -webkit-animation-delay: -0.6s;
      animation-delay: -0.6s;
  }

  .container2 .circle3 {
      -webkit-animation-delay: -0.5s;
      animation-delay: -0.5s;
  }

  .container3 .circle3 {
      -webkit-animation-delay: -0.4s;
      animation-delay: -0.4s;
  }

  .container1 .circle4 {
      -webkit-animation-delay: -0.3s;
      animation-delay: -0.3s;
  }

  .container2 .circle4 {
      -webkit-animation-delay: -0.2s;
      animation-delay: -0.2s;
  }

  .container3 .circle4 {
      -webkit-animation-delay: -0.1s;
      animation-delay: -0.1s;
  }

  @-webkit-keyframes bouncedelay {
      0%, 80%, 100% { -webkit-transform: scale(0.0) }
      40% { -webkit-transform: scale(1.0) }
  }

  @keyframes bouncedelay {
      0%, 80%, 100% {
          transform: scale(0.0);
          -webkit-transform: scale(0.0);
      } 40% {
            transform: scale(1.0);
            -webkit-transform: scale(1.0);
        }
  }

  // #payResult
</style>
