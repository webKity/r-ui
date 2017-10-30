<template>
  <div class="r-swiper-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$nextTick(() => {
      this.$parent.init()
    })
  },
  beforeDestroy () {
    const $parent = this.$parent
    this.$nextTick(() => {
      $parent.destroy()
    })
  }
}
</script>

<style lang="scss">
.r-swiper-item{
  position: absolute;
  left:0;
  top:0;
  width: 100%;
  height: 100%;
}
</style>
