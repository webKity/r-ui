<template>
  <div ref="swiper" class="m-swiper" :style="{height: _height}">
    <slot></slot>
    <div class="indicator">{{active + 1 + '/' + items.length}}</div>
  </div>
</template>

<script>
let R = require('ramda')
let mapIndexed = R.addIndex(R.map)

export default{
  props: {
    height: {
      type: [Number, String],
      default: 'auto'
    }
  },
  data () {
    return {
      _width: 0,
      duration: 300,
      container: null,
      items: [],
      active: 0,
      sensitivity: 60, // 触发切换的阈值
      resistance: 0.3, // 阻力系数
      start: {
        x: 0,
        y: 0
      },
      move: {
        x: 0,
        y: 0
      }
    }
  },
  computed: {
    _height () {
      if (typeof this.height === 'number') {
        return this.height + 'px'
      } else {
        return this.height
      }
    }
  },
  methods: {
    init () {
      this.container = this.$refs.swiper
      this.items = this.container.querySelectorAll('.m-swiper-item')
      this.updateItemWidth()
      this.setTransform()
      this.setTransition('none')
      this.bindEvent()
    },
    updateItemWidth () {
      this._width = this.container.offsetWidth || document.documentElement.offsetWidth
    },
    setTransform (offset) {
      offset = offset || 0
      mapIndexed((item, i) => {
        let distance = (i - this.active) * this._width + offset
        let transform = `translate3d(${distance}px, 0, 0)`
        item.style.webkitTransform = transform
        item.style.transform = transform
      })(this.items)
    },
    setTransition (duration) {
      duration = duration || this.duration
      duration = typeof duration === 'number' ? (duration + 'ms') : duration
      R.map((item) => {
        item.style.webkitTransition = duration
        item.style.transition = duration
      })(this.items)
    },
    bindEvent () {
      this.container.addEventListener('touchstart', this.moveStart)
      this.container.addEventListener('touchmove', this.moving)
    },
    removeEvent () {
      this.container.removeEventListener('touchstart', this.moveStart)
      this.container.removeEventListener('touchmove', this.moving)
    },
    moveStart (e) {
      this.start.x = e.changedTouches[0].pageX
      this.start.y = e.changedTouches[0].pageY
      this.setTransition('none')
    },
    moving (e) {
      this.move.x = e.changedTouches[0].pageX
      this.move.y = e.changedTouches[0].pageY
      let distanceX = this.move.x - this.start.x
      let distanceY = this.move.y - this.start.y
      if (Math.abs(distanceY) > Math.abs(distanceX)) {
        this.container.removeEventListener('touchend', this.moveEnd)
      } else {
        e.preventDefault()
        if ((this.active === 0 && distanceX > 0) || (this.active === (this.items.length - 1) && distanceX < 0)) {
          distanceX = distanceX * this.resistance
        }
        this.setTransform(distanceX)
        this.container.addEventListener('touchend', this.moveEnd)
      }
    },
    moveEnd (e) {
      let distance = this.move.x - this.start.x
      if (Math.abs(distance) > this.sensitivity) {
        if (distance < 0) {
          this.next()
        } else {
          this.prev()
        }
      } else {
        this.back() // 如果滑动达不到阈值，所有元素重置回之前状态
      }
    },
    next () {
      this.active += 1
      if (this.active > this.items.length - 1) {
        this.active = this.items.length - 1
      }
      this.setTransition()
      this.setTransform()
    },
    prev () {
      this.active -= 1
      if (this.active < 0) {
        this.active = 0
      }
      this.setTransition()
      this.setTransform()
    },
    back () {
      this.move.x = 0
      this.move.y = 0
      this.setTransition()
      this.setTransform()
    },
    destroy () {
      this.setTransition('none')
      this.removeEvent()
    }
  },
  mounted () {
    this.$nextTick(this.init)
  },
  beforeDestroy () {
    this.destroy()
  }
}
</script>

<style lang="scss">
.m-swiper{
  position: relative;
  overflow: hidden;
  .indicator{
    position: absolute;
    right: 10px;
    bottom:10px;
    padding: 10px;
    border-radius: 100%;
    background-color: rgba(0,0,0,.5);
    color: #fff;
    font-size: 14px;
  }
}
</style>
