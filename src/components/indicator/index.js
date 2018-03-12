import Vue from 'vue'
import element from './indicator.vue'

const IndicatorConstructor = Vue.extend(element)
IndicatorConstructor.prototype.open = function () {
  document.body.appendChild(this.$el)
  this.visible = true
}
IndicatorConstructor.prototype.close = function () {
  this.visible = false
  this.$el.addEventListener('transitionend', removeDom)
}

let removeDom = event => {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target)
  }
}

let Indicator = () => {
  let indicator = new IndicatorConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(indicator.$el)
  return indicator
}
Indicator.install = function () {
  Vue.prototype.$indicator = new Indicator()
}

export default Indicator
