// 系统配置文件，包含常量等信息

// 保存在本地存储的账户信息
const ACCOUNT_LSKEY = '_account'
const TOKEN_LSKEY = '_token'
// 本地存储配置
const localStorage = {
  // _account: {
  //   type: Object,
  //   default () {
  //     return null
  //   }
  // }
}
// 返回成功的标志
const OK_STATUS = 0
// 未登录标志
const NOLOGIN_STATUS = 10

// 系统默认头像集合
const HEAD_LIST = [
  'headimg1.jpg',
  'headimg2.jpg',
  'headimg3.jpg',
  'headimg4.jpg',
  'headimg5.jpg',
  'headimg6.jpg',
  'headimg7.jpg',
  'headimg8.jpg',
  'headimg9.jpg',
  'headimg10.jpg',
  'headimg11.jpg',
  'headimg12.jpg'
]

export {
  ACCOUNT_LSKEY,
  TOKEN_LSKEY,
  OK_STATUS,
  NOLOGIN_STATUS,
  localStorage,
  HEAD_LIST
}
