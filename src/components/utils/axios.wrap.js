import Vue from 'vue'
import axios from 'axios'

var Axios = function () {}
Axios.install = function () {
  Vue.prototype.$http = axios
}
export default Axios
