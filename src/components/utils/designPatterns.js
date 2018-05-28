/**
 * 获取单例模式函数
 * @param {*} fn 只执行一次的函数
 */
var getSingle = function (fn) {
  var result
  return function () {
    return result || ( result = fn .apply(this, arguments) )
  }
}

export default {
  getSingle
}