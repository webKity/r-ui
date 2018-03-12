import Vue from 'vue'
import R from 'ramda'
import throttle from 'lodash.throttle'

R.throttle = throttle
var Ramda = function () {}
Ramda.install = function () {
  Vue.prototype.$R = R
}
export default Ramda
