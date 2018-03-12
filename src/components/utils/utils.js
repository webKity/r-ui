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
  },
  resizeImg (str, w, h, defaultImg = 'other/default-room.png') {
    if (!str) return defaultImg
    let oldImg = str.indexOf('?x-oss-process=') >= 0 ? str.split('?x-oss-process=')[0] : str
    let newImg = oldImg + '?x-oss-process=image/resize,m_fill,h_' + h + ',w_' + w
    return newImg
  },
  formatDay (num) {
    if (num === 0) {
      return '星期天'
    } else if (num === 1) {
      return '星期一'
    } else if (num === 2) {
      return '星期二'
    } else if (num === 3) {
      return '星期三'
    } else if (num === 4) {
      return '星期四'
    } else if (num === 5) {
      return '星期五'
    } else if (num === 6) {
      return '星期六'
    }
  }
}

export default utils
