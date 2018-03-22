<template>
  <transition
  @leave="leave"
  @after-leave="afterLeave">
    <li v-if="!isDelete" class="r-swiper-out-item"
    :style="itemStyle">
      <div class="r-swiper-out-item-content" ref="content"
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend">
        <slot></slot>
      </div>
      <div class="r-swiper-out-item-btns" ref="btns">
        <slot name="btns">
          <div class="r-swiper-out-item-btn" @click="delItem">删除</div>
        </slot>
    	</div>
    </li>
  </transition>
</template>

<script>
import { tween, easing } from 'popmotion'

export default{
  props: {
    duration: {
      type: [Number, String],
      default: 300
    }
  },
  data () {
    return {
      speed: 0,
      startX: 0,
      translateX: 0,
      oldPoint: null,
      isDelete: false,
      itemHeight: 0,
      contentHeight: 0,
      btnsWidth: 0
    }
  },
  computed: {
    itemStyle () {
      return {
        height: `${this.itemHeight}px`,
        transform: `translate3d(${this.translateX}px, 0, 0)`,
        transition: `all ${this.speed}ms`
      }
    }
  },
  methods: {
    touchstart (e) {
      this.oldPoint = e.touches[0]
      this.speed = 0
      this.startX = this.translateX
    },
    touchmove (e) {
      let moveX = e.touches[0].pageX - this.oldPoint.pageX
      let moveY = e.touches[0].pageY - this.oldPoint.pageY
      if (Math.abs(moveX) < Math.abs(moveY) || Math.abs(moveX) < 20 || Math.abs(moveY) > 30) return

      e.preventDefault()
      moveX = this.startX * 1 + moveX * 1

      if (moveX < -this.btnsWidth) {
        moveX = -this.btnsWidth
      } else if (moveX > 0) {
        moveX = 0
      }

      this.translateX = moveX
    },
    touchend (e) {
      let moveX = -this.translateX > 30 ? -this.btnsWidth : 0
      this.speed = this.duration
      this.translateX = moveX
    },
    delItem () {
      this.isDelete = true
    },
    leave () {
      tween({
        from: {h: this.contentHeight},
        to: {h: 0},
        ease: easing.easeInOut,
        duration: this.speed
      }).start(this.updateItemHeight)
    },
    updateItemHeight (rs) {
      this.itemHeight = rs.h
    },
    afterLeave () {
      this.$parent.$emit('childRemove', this.$vnode.elm)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.itemHeight = this.contentHeight = this.$refs.content.offsetHeight
      this.btnsWidth = this.$refs.btns.offsetWidth
    })
  }
}
</script>

<style lang="scss">
.r-swiper-out-item{
  position: relative;
  &-btns{
    display: inline-block;
		position: absolute;
		right: 0;
		top:0;
		height: 100%;
		transform: translateX(100%);
  }
  &-btn{
    background-color: red;
		color: #fff;
		width: 100px;
		text-align: center;
  }
}
</style>
