<template lang="pug">
  #powerPay
    v-headBar(title="充值购电")
    v-spliter(height="0.5")
    ul.money-list
      li.item(:class="{active: selectCount === 10}" @click="selectCount = 10" v-model="selectCount") 10元
      li.item(:class="{active: selectCount === 20}" @click="selectCount = 20" v-model="selectCount") 20元
      li.item(:class="{active: selectCount === 30}" @click="selectCount = 30" v-model="selectCount") 30元
      li.item(:class="{active: selectCount === 50}" @click="selectCount = 50" v-model="selectCount") 50元
      li.item(:class="{active: selectCount === 100}" @click="selectCount = 100" v-model="selectCount") 100元
      li.item(:class="{active: selectCount === 200}" @click="selectCount = 200" v-model="selectCount") 200元
      li.item(:class="{active: selectCount === 300}" @click="selectCount = 300" v-model="selectCount") 300元
      li.item(:class="{active: selectCount === 400}" @click="selectCount = 400" v-model="selectCount") 400元
      li.item(:class="{active: selectCount === 500}" @click="selectCount = 500" v-model="selectCount") 500元
      li.item(:class="{active: selectCount === 600}" @click="selectCount = 600" v-model="selectCount") 600元
    .html(v-html="result")
    v-spliter(height="0.3")
    .input-item
      .form-group
        label.control-label 其它金额
        input.control-input(placeholder="输入充电金额" type="number" v-model="count")
    v-spliter(height="0.3")
    .input-item
      .form-group
        input.btn.btn-blue(:class="{'disabled': !powerPass}" type="button" value="确认充值" @click="doPay()")
</template>

<script>
import HeadBar from '@/components/common/HeadBar'
import Spliter from '@/components/common/Spliter'
import { Toast } from 'mint-ui'
export default {
  name: 'powerPay',
  components: {
    'v-headBar': HeadBar,
    'v-spliter': Spliter
  },
  data () {
    return {
      count: '',
      selectCount: '',
      result: '',
      powerPass: false
    }
  },
  watch: {
    count (curVal, oldVal) {
      this.powerValidator()
      if (curVal) {
        this.selectCount = ''
      }
    },
    selectCount (curVal, oldVal) {
      this.powerValidator()
      if (curVal) {
        this.count = ''
      }
    }
  },
  methods: {
    doPay () {
      if (this.powerPass) {
        this.$http.post('/mobile/order/recharge.html', {
          payment: this.selectCount || this.count,
          paymentType: 1
        }, {
          timeout: 5000,
          emulateJSON: true
        }).then((response) => {
          response = response.body
          this.result = response
          this.$nextTick(() => {
            document.forms[0].submit()
          })
        }, (response) => {
          Toast({
            message: '请求超时',
            position: 'bottom',
            duration: 1500
          })
        })
      }
    },
    powerValidator () {
      if (this.selectCount || /^\d+(\.\d{1,2})?$/.test(this.count)) {
        this.powerPass = true
        this.count = parseFloat(this.count)
      } else {
        this.powerPass = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
  #powerPay
    margin-top: 3.5rem;
    .money-list
      margin: 0 0.5rem;
      .item
        display: inline-block;
        text-align: center;
        width: calc((100% - 5px) / 4)
        border: 1px solid #15A9B3;
        border-right: none;
        height: 3.5rem;
        line-height: 3.5rem;
        margin: 1rem 0;
        color: #15a9b3;
        font-size: 1.1rem;
        font-weight: 500;
        &:nth-child(4n), &:last-child
          border-right: 1px solid #15A9B3;
        &.active
          color: #ffffff;
          background-color: #15A9B3;
</style>
