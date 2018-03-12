<template>
  <div class="r-page">
    <div class="r-page-head" ref="head">
      <slot name="head"></slot>
    </div>
    <div class="r-page-content" :style="{marginTop: headHeight + 'px', height: contentHeight + 'px'}" ref="content">
      <div class="r-page-wrap" ref="wrap">
        <slot name="content"></slot>
      </div>
      <r-backtop :el="wrap"></r-backtop>
    </div>
    <div class="r-page-foot" ref="foot">
      <slot name="foot"></slot>
    </div>
  </div>
</template>

<script>
import rBacktop from './../backtop'

export default {
  components: {rBacktop},
  data () {
    return {
      headHeight: 0,
      contentHeight: 0,
      footHeight: 0,
      wrap: null
    }
  },
  methods: {
    computWH () {
      this.headHeight = this.$refs.head.offsetHeight
      this.footHeight = this.$refs.foot.offsetHeight
      this.contentHeight = window.innerHeight - this.headHeight - this.footHeight
    },
    resize () {
      setTimeout(this.computWH, 400)
    },
    init () {
      this.computWH()
      window.addEventListener('resize', this.resize)
      this.$nextTick(() => {
        this.wrap = this.$refs.wrap
      })
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resize)
  }
}
</script>

<style lang="scss">
@import "./style";
</style>
