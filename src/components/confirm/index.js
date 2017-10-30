import Vue from 'vue'
import modal from './../modal'

const ConfirmConstructor = Vue.extend(modal)
ConfirmConstructor.prototype.close = function () {
  this.isShow = false
  this.$el.addEventListener('transitionend', removeDom)
}
let removeDom = event => {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target)
  }
}

let createConfirm = () => {
  return new ConfirmConstructor({
    el: document.createElement('div')
  })
}

let Confirm = (contentHtml) => {
  let confirm = createConfirm()
  let content = confirm.$el.querySelector('.r-modal-content')
  content.innerHTML = contentHtml
  document.body.appendChild(confirm.$el)
  Vue.nextTick(function () {
    confirm.isShow = true
  })
  return confirm
}
Confirm.install = function () {
  Vue.prototype.$confirm = Confirm
}

export default Confirm
