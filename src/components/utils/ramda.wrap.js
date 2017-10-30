import Vue from 'vue'
import R from 'ramda'

var Ramda = function () {}
Ramda.install = function () {
  Vue.prototype.$R = R
}
export default Ramda
