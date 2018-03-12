<template>
  <div v-show="isShow" class="r-tree-select container-fluid" :style="{height: height + 'px', top: showTop + 'px'}">
    <transition name="fade">
      <div v-show="isShowContent" class="bg" @click="close"></div>
    </transition>
    <transition
    v-on:beforeEnter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave">
      <div v-show="isShowContent" class="wrap row" ref="wrap" :style="{top: top + 'px'}">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import Ani from '../utils/animation'
import rButton from './../button'

export default{
  props: {
    control: {
      type: HTMLDivElement,
      default: null
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  components: {rButton},
  data () {
    return {
      isShowContent: false,
      winH: 0,
      height: 0,
      showTop: 0,
      top: 0
    }
  },
  watch: {
    isShow (val) {
      if (val) {
        this.isShowContent = true
      }
    }
  },
  methods: {
    init () {
      this.showTop = this.control.offsetTop + this.control.offsetHeight
      this.winH = window.innerHeight
      this.height = this.winH - this.showTop
    },
    beforeEnter () {
      this.init()
      this.top = -this.height
      document.querySelector('.r-page-content').style.overflow = 'hidden'
    },
    enter (el, done) {
      let from = {y: this.top}
      let to = {y: 0}
      let ani = new Ani()
      ani.run(from, to, {
        update: this.changeTop,
        complete: done
      })
    },
    leave (el, done) {
      let _this = this
      let from = {y: 0}
      let to = {y: -this.$refs.wrap.offsetHeight}
      let ani = new Ani()
      ani.run(from, to, {
        update: this.changeTop,
        complete () {
          document.querySelector('.r-page-content').style.overflow = 'auto'
          _this.$emit('closeEvent')
          done()
        }
      })
    },
    changeTop (rs) {
      this.top = rs.y
    },
    close () {
      this.isShowContent = false
    }
  }
}
</script>
<style lang="scss">
@import "./style";
</style>
