import Vue from 'vue'
import element from './tip.vue'

const TipConstructor = Vue.extend(element)
let tipPool = []

TipConstructor.prototype.close = function () {
  this.visible = false
  returnAnInstance(this)
}
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

let Tip = (options = {}) => {
  let duration = options.duration || 2000

  let instance = getAnInstance()
  clearTimeout(instance.timer)
  instance.message = typeof options === 'string' ? options : options.message

  document.body.appendChild(instance.$el)
  Vue.nextTick(function () {
    instance.visible = true
    instance.timer = setTimeout(function () {
      instance.close()
    }, duration)
  })
  return instance
}
Tip.install = function () {
  Vue.prototype.$tip = Tip
}

export default Tip
