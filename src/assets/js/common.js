import { ACCOUNT_LSKEY, TOKEN_LSKEY } from '@/config'
import Base64 from 'js-base64'
import { Toast } from 'mint-ui'
import Chart from 'chart.js'

function storeAccount (vm) {
  vm.$store.state.account = getAccount(vm)
}

function removeAccount (vm) {
  vm.$localStorage.remove(ACCOUNT_LSKEY)
  removeToken(vm)
  storeAccount(vm)
}

function setAccount (vm, account) {
  vm.$localStorage.set(ACCOUNT_LSKEY, Base64.Base64.encode(JSON.stringify(account)))
}

function getAccount (vm) {
  let account = vm.$localStorage.get(ACCOUNT_LSKEY)
  if (account) {
    account = Base64.Base64.decode(account)
    return JSON.parse(account)
  }
}

function isLogin (vm) {
  let token = getToken(vm)
  if (token) {
    return true
  }
  return false
}

function getToken (vm) {
  return vm.$localStorage.get(TOKEN_LSKEY)
}

function setToken (vm, token) {
  vm.$localStorage.set(TOKEN_LSKEY, token)
}

function removeToken (vm) {
  vm.$localStorage.remove(TOKEN_LSKEY)
}

function reqTimeOut () {
  Toast({
    message: '请求超时',
    position: 'bottom',
    duration: 1500
  })
}

function toLogin (vm) {
  vm.$router.replace('/user/login')
}

function payStatus (status) {
  if (status === 0) {
    return '已取消'
  } else if (status === 10) {
    return '未付款'
  } else if (status === 20) {
    return '已付款'
  } else if (status === 30) {
    return '交易完成'
  } else if (status === 40) {
    return '交易关闭'
  } else {
    return ''
  }
}

function getRootFontSize () {
  let _html = document.getElementsByTagName('html')[0]
  let style = window.getComputedStyle(_html, null)
  let fontSize = parseInt(style.getPropertyValue('font-size'))
  return fontSize
}

// chart插件
Chart.plugins.register({
  afterDatasetsDraw (chart, easing) {
    let ctx = chart.ctx
    chart.data.datasets.forEach((dataset, i) => {
      let meta = chart.getDatasetMeta(i)
      if (!meta.hidden) {
        meta.data.forEach((element, index) => {
          ctx.fillStyle = 'rgb(0, 0, 0)'
          let fontSize = getRootFontSize()
          fontSize *= 0.8
          let fontStyle = 'normal'
          let fontFamily = 'Helvetica Neue'
          ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily)

          let dataString = dataset.data[index].toString()

          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'

          let padding = fontSize * 0.5
          let position = element.tooltipPosition()
          ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding)
        })
      }
    })
  }
})

export default {
  getAccount,
  setAccount,
  storeAccount,
  removeAccount,
  isLogin,
  setToken,
  getToken,
  removeToken,
  reqTimeOut,
  toLogin,
  payStatus,
  getRootFontSize
}

export {
  getAccount,
  setAccount,
  storeAccount,
  removeAccount,
  isLogin,
  setToken,
  getToken,
  removeToken,
  reqTimeOut,
  toLogin,
  payStatus,
  getRootFontSize
}
