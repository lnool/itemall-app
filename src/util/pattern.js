// 密码:长度6-18位  字符串类型：数字 英文 特殊符号且必须包含数字及英文
export const PASSWORD = {
  test: /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*]{6,18}$/,
  msg: '密码长度6-18，必须包含数字英文'
}
// 手机号
export const PHONE = {
  test: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
  msg: '手机号格式不正确'
}

// 昵称
export const NICKNAME = {
  test: /^([\u4e00-\u9fa5|[a-zA-Z]){2,13}$/,
  msg: '昵称格式不正确'
}

// 邮箱
export const EMAIL = {
  test: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  msg: '邮箱格式不正确'
}

// 验证码
export const CODE = {
  test: /^[0-9]{6}$/,
  msg: '验证码格式不正确'
}