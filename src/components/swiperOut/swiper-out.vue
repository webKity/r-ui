<template>
  <ul class="r-swiper-out" ref="swiperOut">
    <slot></slot>
  </ul>
</template>

<script>
export default{
  methods: {
    childRemove (childNode) {
      this.$refs.swiperOut.removeChild(childNode)
    }
  },
  created () {
    this.$on('childRemove', this.childRemove)
  }
}
</script>

<style lang="scss">
.r-swiper-out{
	position: relative;
	width: 100%;
	overflow: hidden;
}
</style>
