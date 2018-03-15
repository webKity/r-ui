<template>
  <div v-if="isShow" class="r-backtop" @click="backTop">
    <i class="icon-top"></i><br />
    <span>顶部</span>
  </div>
</template>

<script>
import { tween, easing } from 'popmotion'

export default{
  props: {
    el: null
  },
  data () {
    return {
      isShow: false,
      minTop: 500
    }
  },
  watch: {
    el (val) {
      if (val) {
        val.addEventListener('scroll', this.isShowFun)
      }
    }
  },
  methods: {
    backTop () {
      var top = this.el.scrollTop
      let from = {y: top}
      let to = {y: 0}
      tween({
        from: from,
        to: to,
        ease: easing.easeInOut,
        duration: 600
      }).start(this.updateScrollTop)
    },
    updateScrollTop (rs) {
      this.el.scrollTop = rs.y
    },
    isShowFun () {
      var top = this.el.scrollTop
      if (top > this.minTop) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  }
}
</script>

<style lang="scss">
@import "./style";
</style>
