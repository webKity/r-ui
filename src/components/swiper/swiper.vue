<template>
  <div ref="swiper" class="r-swiper" :style="{height: _height}"
  @touchstart="moveStart"
  @touchmove="moving"
  @touchend="moveEnd">
    <slot></slot>
    <slot name="indicator">
      <div class="indicator">{{(active + 1) +  '/' + items.length}}</div>
    </slot>
  </div>
</template>

<script>
let each = function (ary, callback) {
  for (let i = 0, l = ary.length; i < l; i++) {
    if (callback(ary[i], i) === false) break
  }
}

export default{
  props: {
    autoplay: {
      type: [Number, String],
      default: ''
    },
    height: {
      type: [Number, String],
      default: 'auto'
    }
  },
  data () {
    return {
      isInit: false,
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
      },
      setter: null
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
      // 避免有多个子组件挂载的时候导致的多次初始化
      if (this.isInit) return
      this.isInit = true
      this.container = this.$refs.swiper
      this.items = this.container.querySelectorAll('.r-swiper-item')
      this.updateItemWidth()
      this.setTransform()
      this.setTransition('none')
      this._autoplay()
    },
    updateItemWidth () {
      this._width = this.container.offsetWidth || document.documentElement.offsetWidth
    },
    setTransform (offset) {
      offset = offset || 0
      each(this.items, (item, i) => {
        let distance = (i - this.active) * this._width + offset
        let transform = `translate3d(${distance}px, 0, 0)`
        item.style.webkitTransform = transform
        item.style.transform = transform
      })
    },
    setTransition (duration) {
      duration = duration || this.duration
      duration = typeof duration === 'number' ? (duration + 'ms') : duration
      each(this.items, (item) => {
        item.style.webkitTransition = duration
        item.style.transition = duration
      })
    },
    moveStart (e) {
      this.start.x = e.changedTouches[0].pageX
      this.start.y = e.changedTouches[0].pageY
      this.setTransition('none')
      if (this.setter !== null) {
        this.clearTimer()
      }
    },
    moving (e) {
      e.preventDefault()
      e.stopPropagation()
      let distanceX = e.changedTouches[0].pageX - this.start.x
      let distanceY = e.changedTouches[0].pageY - this.start.y
      if (Math.abs(distanceX) > Math.abs(distanceY)) {
        this.isMoving = true
        this.move.x = this.start.x + distanceX
        this.move.y = this.start.y + distanceY
        if ((this.active === 0 && distanceX > 0) || (this.active === (this.items.length - 1) && distanceX < 0)) {
          distanceX = distanceX * this.resistance
        }
        this.setTransform(distanceX)
      }
    },
    moveEnd (e) {
      if (this.isMoving) {
        e.preventDefault()
        e.stopPropagation()
        let distance = this.move.x - this.start.x
        if (Math.abs(distance) > this.sensitivity) {
          if (distance < 0) {
            this.next()
          } else {
            this.prev()
          }
        } else {
          this.back()
        }
        this.reset()
        this.isMoving = false
        if (this.autoplay !== '') {
          this._autoplay()
        }
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
      this.clearTimer()
    },
    go (index) {
      this.active = index
      if (this.active < 0) {
        this.active = this.isMoving ? 0 : this.items.length - 1
      } else if (this.active > this.items.length - 1) {
        this.active = this.isMoving ? this.items.length - 1 : 0
      }
      this.$emit('change', this.active)
      this.setTransition()
      this.setTransform()
    },
    _autoplay () {
      if (this.autoplay !== '') {
        this.clearTimer()
        this.setter = setTimeout(() => {
          this.next()
          this._autoplay()
        }, this.autoplay * 1)
      }
    },
    clearTimer () {
      clearTimeout(this.setter)
      this.setter = null
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
    right: 3vw;
    bottom: 3vw;
    width: 10vw;
    height: 10vw;
    line-height: 10vw;
    border-radius: 5vw;
    text-align: center;
    background-color: rgba(0,0,0,.5);
    color: $whiteColor;
    @include linkSize;
  }
}
</style>
