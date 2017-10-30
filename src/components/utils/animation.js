import TWEEN from './../libs/js/tween.js'
import assign from 'lodash.assign'

let requestAnimationFrame = window.requestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.msRequestAnimationFrame ||
window.oRequestAnimationFrame ||
function (callback) {
  setTimeout(callback, 1000 / 60)
}

function Animation () {
  this.config = {
    speed: 300,
    update: function () {},
    complete: function () {}
  }
}
Animation.prototype = {
  animate (time) {
    requestAnimationFrame(this.animate.bind(this))
    TWEEN.update(time)
  },
  move (from, to) {
    new TWEEN.Tween(from)
    .to(to, this.config.speed)
    .easing(TWEEN.Easing.Quintic.Out)
    .onUpdate(() => {
      this.config.update.call(this, from)
    })
    .onComplete(this.config.complete)
    .start()
  },
  run (from, to, options) {
    this.config = assign(this.config, options)
    this.move(from, to)
    requestAnimationFrame(this.animate.bind(this))
  }
}

export default Animation
