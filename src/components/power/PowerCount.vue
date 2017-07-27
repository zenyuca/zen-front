<template lang="pug">
  #powerCount
    v-headBar(title="电量电费")
    v-spliter(height="0.5")
    .content
      .money {{account.leftMoney}}
      .label 剩余电费（元）
    v-spliter(height="0.5")
    .input-item
      .form-group
        input.btn.btn-blue(type="button" value="一键购电" @click="doBuy()")  
</template>

<script>
import HeadBar from '@/components/common/HeadBar'
import Spliter from '@/components/common/Spliter'

export default {
  name: 'powerCount',
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
      account: {}
    }
  },
  methods: {
    doBuy () {
      this.$router.push('/power/powerPay')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
  #powerCount
    margin-top: 3.5rem;
    .content
      text-align: center;
      .money
        font-size: 3.8rem;
        color: #15a9b3;
        margin: 1rem 0 0.5rem 0;
      .label
        margin-bottom: 1rem;
        font-size: 0.95rem;
</style>
