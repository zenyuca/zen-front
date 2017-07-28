<template lang="pug">
  #role
    .widget-box
      .widget-toolbar
        ul
          li.item
            button.btn.btn-primary() 查询
          li.item
            button.btn.btn-primary() 添加
          li.item
            button.btn.btn-primary() 修改
          li.item
            button.btn.btn-danger() 删除
      .widget-header.header-color-blue
        | 路灯信息
      .widget-body
        .widget-main.no-padding
          table.table.table-bordered.table-hover.table-striped
            thead
              tr
                th
                th 路灯编号
                th 路灯名称
                th 路灯地址
                th 经度
                th 纬度
                th 所属楼栋
                th 路灯状态
                th 创建时间
            tbody
              tr
                td.text-center
                  label.radio-inline
                    input#inlineRadio1(type="radio", name="inlineRadioOptions", value="option1")
                td.danger ${light.number }
                td ${light.name }
                td ${light.address }
                td ${light.lng }
                td ${light.lat }
                td ${building.name }
                td ${type.name }
                td ${light.createTime }
              tr
                td.text-center
                  label.radio-inline
                    input#inlineRadio1(type="radio", name="inlineRadioOptions", value="option1")
                td ${light.number }
                td ${light.name }
                td ${light.address }
                td ${light.lng }
                td ${light.lat }
                td ${building.name }
                td ${type.name }
                td ${light.createTime }
              tr
                td.text-center
                  label.radio-inline
                    input#inlineRadio1(type="radio", name="inlineRadioOptions", value="option1")
                td ${light.number }
                td ${light.name }
                td ${light.address }
                td ${light.lng }
                td ${light.lat }
                td ${building.name }
                td ${type.name }
                td ${light.createTime }

</template>

<script>
import { Toast } from 'mint-ui'
import { OK_STATUS } from '@/config'

export default {
  name: 'login',
  beforeRouteEnter (to, from, next) {
    next()
  },
  components: {
  },
  created () {
  },
  data () {
    return {
      login: {
        username: '',
        pwd: ''
      },
      loginPass: false,
      rememberpwd: false
    }
  },
  watch: {
    login: {
      handler (curVal, oldVal) {
        if (curVal.username === '') {
          curVal.pwd = ''
        }
        this.loginValidator()
      },
      deep: true
    }
  },
  methods: {
    dologin () {
      if (this.loginPass) {
        this.$http.post('/api/user/login.json', {
          userLoginname: this.login.username,
          userLoginpass: this.login.pwd
        }, {
          timeout: 5000,
          emulateJSON: true
        }).then((response) => {
          response = response.body
          let status = response.status
          if (status === OK_STATUS) {
            this.$store.state.menus = response.data.menuList
            this.$store.state.account = response.data.user
            this.$router.push('/index/')
          } else {
            Toast({
              message: response.msg,
              position: 'bottom',
              duration: 1500
            })
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
    loginValidator () {
      if (this.login.username) {
        this.loginPass = this.login.username.length !== 0
      }
      if (this.loginPass) {
        this.loginPass = this.login.pwd.length !== 0
      }
    },
    format (value) {
      return value.toLowerCase()
    }
  }
}
</script>

<style lang="stylus">
  #role
    // .toolbar
    //   padding: 20px;
    //   width: 100%;
    //   .item
    //     display: inline-block;
    //     margin-right: 10px;
    //     &:last-child
    //       margin-right: 0;
    // .content
    //   padding: 20px;
    //   width: 100%;
</style>
