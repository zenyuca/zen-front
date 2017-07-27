<template lang="pug">
  #index
</template>

<script>
import Header from '@/components/common/Header'

export default {
  name: 'index',
  components: {
    'v-header': Header
  },
  created () {
    this.account = this.$store.state.account
  },
  data () {
    return {
      addon: {
        title: '设置',
        route: '/account/settings'
      },
      account: {}
    }
  },
  methods: {
    getHead () {
      return '/static/img/head/' + this.account.headimg
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
  #index
    margin-top: 3.5rem;
</style>
