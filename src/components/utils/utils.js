let utils = {
  getWindowInf () {
    let win = {}
    win.w = document.documentElement.clientWidth
    win.h = document.documentElement.clientHeight
    return win
  },
  isClickCurentEl (className, el) {
    try {
      if (el.nodeType !== 'undefined' && el.nodeType !== 1 && el.nodeType !== 9) {
        console.error('isClickCurentEl：第二个参数不是DOM节点，请传入正确的DOM节点！')
        return false
      }
      while (el && el.nodeType !== 9) {
        if (el.className.indexOf(className) >= 0) return true
        el = el.parentNode
      }
      return false
    } catch (e) {}
  }
}

export default utils
