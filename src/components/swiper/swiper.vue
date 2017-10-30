<template>
  <div ref="swiper" class="r-swiper" :style="{height: _height}">
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
      isMoving: false,
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
      this.items = this.container.querySelectorAll('.r-swiper-item')
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
      e.preventDefault()
      this.isMoving = true
      this.move.x = e.changedTouches[0].pageX
      this.move.y = e.changedTouches[0].pageY
      let distanceX = this.move.x - this.start.x
      let distanceY = this.move.y - this.start.y
      if (Math.abs(distanceY) > Math.abs(distanceX)) {
        this.container.removeEventListener('touchend', this.moveEnd)
      } else {
        if ((this.active === 0 && distanceX > 0) || (this.active === (this.items.length - 1) && distanceX < 0)) {
          distanceX = distanceX * this.resistance
        }
        this.setTransform(distanceX)
        this.container.addEventListener('touchend', this.moveEnd)
      }
    },
    moveEnd (e) {
      if (this.isMoving) {
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
        this.reset()
        this.isMoving = false
      }
    },
    next () {
      let index = this.active + 1
      this.go(index)
    },
    prev () {
      let index = this.active - 1
      this.go(index)
    },
    go (index) {
      this.active = index
      if (this.active < 0) {
        this.active = 0
      } else if (this.active > this.items.length - 1) {
        this.active = this.items.length - 1
      }
      this.setTransition()
      this.setTransform()
    },
    reset () {
      this.start.x = 0
      this.start.y = 0
      this.move.x = 0
      this.move.y = 0
    },
    back () {
      this.setTransition()
      this.setTransform()
    },
    destroy () {
      this.setTransition('none')
      this.removeEvent()
    }
  }
}
</script>

<style lang="scss">
@import "../style/color.scss";
@import "../style/fontSize.scss";
@import "../style/mixin.scss";

.r-swiper{
  position: relative;
  overflow: hidden;
  .indicator{
    position: absolute;
    @include px(right, 20);
    @include px(bottom, 20);
    @include px(width, 80);
    @include px(height, 80);
    @include px(line-height, 80);
    @include px(border-radius, 40);
    text-align: center;
    background-color: rgba(0,0,0,.5);
    color: $whiteColor;
    @include linkSize;
  }
}
</style>
