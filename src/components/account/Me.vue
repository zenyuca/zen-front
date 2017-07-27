<template lang="pug">
  #me
    v-headBar(title="我的", :addon="addon", :showBack="false")
    .content
      .headinfo
        img.headimg(:src="getHead()")
        .nickname {{account.nickName}}
        .phone {{account.phone}}
      .navbar
        .item
          router-link(to="/power/powerCount" tag="div")
            .row.up
              .icon1.icon-coin-yen
            .row.down
              span 电量电费
        .item
          router-link(to="/record/buyPowerDetail" tag="div")
            .row.up
              .icon2.icon-file-text
            .row.down
              span 购电记录
        .item
          router-link(to="/record/history" tag="div")
            .row.up
              .icon3.icon-briefcase
            .row.down
              span 历史用电
      v-spliter
    //- v-footBar
</template>

<script>
import HeadBar from '@/components/common/HeadBar'
import FootBar from '@/components/common/FootBar'
import Spliter from '@/components/common/Spliter'

export default {
  name: 'me',
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
  #me
    margin-top: 3.5rem;
    .content
      margin-bottom: 4.5rem;
      .headinfo
        padding-bottom: 1rem;
        background: linear-gradient(rgba(162, 228, 255, 0.7), #24a6c3)
        text-align: center;
        .headimg
          width: calc((100% - 1.8rem) / 4);
          max-width: 9rem;
          border-radius: 50%;
          margin-top: 1rem;
        .nickname
          color: #fff;
          margin-top: 1rem;
        .phone
          margin-top: 1rem;
          font-weight: bold;
      .navbar
        width: 100%;
        height: 6.4rem;
        .item
          .row
            &.up
              font-size: 1.6rem;
            &.down
              padding-top: 0.8rem;
              font-size: 0.8rem;
            div
              width: 1.6rem;
              height: 1.6rem;
              display: inline-block;
              border-radius: 50%;
              padding: 0.8rem;
              color: #fff;
            .icon1
              background-color: #f16a34;
            .icon2
              background-color: #188e57;
            .icon3
              background-color: #0487a7;
</style>
