<template>
  <div v-show="isShow" class="r-backtop" @click="backTop">
    <i class="icon-top"></i><br />
    <span>顶部</span>
  </div>
</template>

<script>
import Ani from './../utils/animation.js'

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
        this.el.addEventListener('scroll', this.isShowFun)
      }
    }
  },
  methods: {
    backTop () {
      var top = this.el.scrollTop
      let from = {y: top}
      let to = {y: 0}
      let ani = new Ani()
      ani.run(from, to, {
        update: this.updateScrollTop
      })
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
