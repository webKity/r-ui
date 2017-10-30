import Vue from 'vue'
import element from './tip.vue'

const TipConstructor = Vue.extend(element)
let tipPool = []

let getAnInstance = () => {
  if (tipPool.length > 0) {
    let instance = tipPool[0]
    tipPool.splice(0, 1)
    return instance
  }
  return new TipConstructor({
    el: document.createElement('div')
  })
}

let returnAnInstance = instance => {
  if (instance) {
    tipPool.push(instance)
  }
}

let removeDom = event => {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target)
  }
}

TipConstructor.prototype.close = function () {
  this.visible = false
  this.$el.addEventListener('transitionend', removeDom)
  this.closed = true
  returnAnInstance(this)
}

let Tip = (options = {}) => {
  let duration = options.duration || 2000

  let instance = getAnInstance()
  instance.closed = false
  clearTimeout(instance.timer)
  instance.message = typeof options === 'string' ? options : options.message
  instance.position = options.position || 'middle'
  instance.className = options.className || ''

  document.body.appendChild(instance.$el)
  Vue.nextTick(function () {
    instance.visible = true
    instance.$el.removeEventListener('transitionend', removeDom)
    instance.timer = setTimeout(function () {
      if (instance.closed) return
      instance.close()
    }, duration)
  })
  return instance
}
Tip.install = function () {
  Vue.prototype.$tip = Tip
}

export default Tip
