/*
 * 验证函数包含常用各种类型的验证正则
 * */
function Rules () {
  var self = this
  self.config = {}
}
// 验证是否有字母
Rules.prototype.isLetter = function (value) {
  var reg = /[A-Za-z]/g
  if (reg.test(value)) {
    return true
  } else {
    return false
  }
}
// 验证是否有数字
Rules.prototype.isNum = function (value) {
  var reg = /\d/g
  if (reg.test(value)) {
    return true
  } else {
    return false
  }
}
// 验证是否是正整数
Rules.prototype.isInt = function (value) {
  var reg = /^[1-9]*[1-9][0-9]*$/
  if (reg.test(value)) {
    return true
  } else {
    return false
  }
}
// 验证是是一位小数
Rules.prototype.isFloat = function (value) {
  var reg = /^\d+\.?\d{0,1}$/
  if (reg.test(value)) {
    return true
  } else {
    return false
  }
}
// 验证是两位小数
Rules.prototype.isDouble = function (value) {
  var reg = /^\d+\.?\d{0,2}$/
  if (reg.test(value)) {
    return true
  } else {
    return false
  }
}
// 验证是否有汉字
Rules.prototype.isChinese = function (value) {
  var reg = /^[\u4e00-\u9fa5]{0,}$/
  if (reg.test(value)) {
    return true
  } else {
    return false
  }
}
// 验证是否有中文标点符号
Rules.prototype.isChinesePunctuation = function (value) {
  var reg = /[^uFF00-uFFFF]/g
  if (reg.test(value)) {
    return true
  } else {
    return false
  }
}
// 验证是否有空格
Rules.prototype.isSpace = function (value) {
  if (value.indexOf(' ') >= 0) {
    return true
  } else {
    return false
  }
}
// 验证是否有下划线
Rules.prototype.isUnderline = function (value) {
  if (value.indexOf('_') >= 0) {
    return true
  } else {
    return false
  }
}
// 验证是否是电话
Rules.prototype.isTel = function (value) {
  var reg = /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/
  if (reg.test(value)) {
    return true
  } else {
    return false
  }
}
// 验证是否是手机号
Rules.prototype.isPhone = function (value) {
  var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/
  if (reg.test(value)) {
    return true
  } else {
    return false
  }
}
// 验证是否是邮箱
Rules.prototype.isEmail = function (value) {
  var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  if (reg.test(value)) {
    return true
  } else {
    return false
  }
}
//  验证是否是身份证
Rules.prototype.isPersonNum = function (value) {
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (reg.test(value)) {
    return true
  } else {
    return false
  }
}
//  验证是否是密码，验证规则：由字母、数字、特殊字符（不包含空格）组成，且必须包含字母、数字、特殊字符中的两种类型
Rules.prototype.isPassword = function (value) {
  var self = this
  var rule = false
  rule = (self.isLetter(value) && self.isNum(value) && !self.isSpace(value)) ||
  (self.isLetter(value) && self.isPunctuation(value) && !self.isSpace(value)) ||
  (self.isNum(value) && self.isPunctuation(value) && !self.isSpace(value)) ||
  (self.isLetter(value) && self.isNum(value) && self.isPunctuation(value) && !self.isSpace(value))
  if (rule) {
    return true
  } else {
    return false
  }
}
export default new Rules()
