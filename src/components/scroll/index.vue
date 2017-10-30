<template>
  <div ref="scroll" class="r-scroll">
    <slot></slot>
    <slot name="loading">
      <div v-show="isLoading" class="r-scroll-loading">
        <r-loading></r-loading>
      </div>
    </slot>
    <slot name="complate">
      <div v-show="isComplate" class="r-scroll-loading">{{complateText}}</div>
    </slot>
  </div>
</template>

<script>
import rLoading from '../loading'

export default{
  components: {rLoading},
  props: {
    bottomDistance: {
      type: [Number, String],
      default: 70
    },
    complateText: {
      type: String,
      default: '-- 我是个有底线的列表 --'
    }
  },
  data () {
    return {
      isComplate: false,
      isLoading: false,
      scroll: null,
      scrollWrap: null
    }
  },
  watch: {
    isLoading (val) {
      if (val) {
        this.$emit('loadmore')
      }
    }
  },
  methods: {
    init () {
      this.scroll = this.$refs.scroll
      this.scrollWrap = this.scroll.childNodes[0]
      this.scroll.addEventListener('scroll', this.scrollEvent)
      this.$emit('init', this.scroll)
    },
    scrollEvent (e) {
      if (this.isComplate) return
      let scrollTop = this.scroll.scrollTop
      let scrollH = this.scroll.offsetHeight
      let scrollWrapH = this.scrollWrap.offsetHeight
      if (scrollTop + scrollH >= scrollWrapH - this.bottomDistance) {
        this.isLoading = true
      }
    },
    loaded () {
      this.isLoading = false
    },
    compleate () {
      this.isLoading = false
      this.isComplate = true
      this.scroll.removeEventListener('scroll', this.scrollEvent)
    }
  },
  mounted () {
    this.$nextTick(this.init)
  }
}
</script>

<style lang="scss">
@import "./../style/color.scss";
@import "./../style/fontSize.scss";
@import "./../style/mixin.scss";

.r-scroll{
  @include one-screen;
  @include overflow-scroll;
  .r-scroll-loading{
    text-align: center;
    @include px(padding-top, 25);
    @include px(padding-bottom, 25);
    @include textSize;
    color: $darkGrayColor;
  }
}
</style>
