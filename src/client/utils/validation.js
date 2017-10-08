
// RegExp methods
const regMap = {
  // Check mobile
  mobile: /^1[34578]\d{9}$/,
  // Check password
  password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/,
  // Enterprise name
  enterPriseName: new RegExp('^[\u4E00-\u9FA5\uf900-\ufa2d]{2,20}$'),
  // Orgnization code
  orgnizationCode: new RegExp('^[0-9]{9}$'),
  // Legal name
  legalName: new RegExp('^[\u4E00-\u9FA5\uf900-\ufa2d]{2,5}$')
}

// Mobile
const mobile = (rule, value, callback) => {
  if (!value || value === '') {
    callback(new Error('请输入手机号'))
  } else {
    if (!regMap.mobile.test(value)) {
      return callback(new Error('手机号码格式不正确'))
    }
  }
  callback()
}

// Password
const password = (rule, value, callback, confirmFunction) => {
  if (!value || value === '') {
    callback(new Error('请输入密码'))
  } else if (!regMap.password.test(value)) {
    callback(new Error('密码不符合规则'))
  } else {
    if (typeof confirmFunction === 'function') {
      confirmFunction()
    }
    callback()
  }
}

// Confirm Password
const confirmPassword = (rule, value, callback, password) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== password) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}

// Enterprise name
const companName = (rule, value, callback) => {
  if (!regMap.enterPriseName.test(value)) {
    return callback(new Error('请输入正确的企业名称'))
  }
  callback()
}

// Orgnization Code
const organizationCode = (rule, value, callback) => {
  if (!regMap.orgnizationCode.test(value)) {
    return callback(new Error('机构代码输入不正确'))
  }
  callback()
}

// Legal name
const legalPerson = (rule, value, callback) => {
  if (!regMap.legalName.test(value)) {
    return callback(new Error('法人名称输入不正确'))
  }
  callback()
}

export default {
  regMap,
  mobile,
  companName,
  organizationCode,
  legalPerson,
  password,
  confirmPassword
}
