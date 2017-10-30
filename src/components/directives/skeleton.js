// 在main中：Vue.directive('skeleton', skeleton)全局注册使用
import './../style/components/skeleton.css'

export default {
  bind (el, binding, vnode) {
    el.className = el.className + ' r-skeleton'
    let coverEl = document.createElement('div')
    coverEl.className = 'r-skeleton-block'
    el.appendChild(coverEl)
  },
  update (el, binding, vnode) {
    setTimeout(() => {
      el.className = el.className.replace(' r-skeleton', '')
      let skeletonEl = el.querySelector('.r-skeleton-block')
      if (skeletonEl) {
        el.removeChild(skeletonEl)
      }
    }, 500)
  }
}
