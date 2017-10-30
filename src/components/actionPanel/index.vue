<template>
  <div ref="parentEl" class="r-action-card" style="display:none;">
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut">
      <div v-show="visible" class="r-action-card-bg" @click="cancle"></div>
    </transition>
    <transition
      v-on:before-enter="beforeEnter"
      v-on:after-leave="afterLeave"
      enter-active-class="animated slideInUp"
      leave-active-class="animated slideOutDown">
      <div v-show="visible" class="r-action-card-content">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default{
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      parentEl: null,
      value: {}
    }
  },
  computed: {
    visible () {
      return this.isShow
    }
  },
  methods: {
    beforeEnter () {
      this.parentEl = this.parentEl || this.$refs.parentEl
      this.parentEl.style.display = 'block'
    },
    afterLeave () {
      this.parentEl.style.display = 'none'
    },
    close () {
      this.visible = false
      this.$emit('close')
    },
    cancle () {
      this.$emit('cancle')
      this.close()
    }
  }
}
</script>

<style lang="scss">
@import "../style/color.scss";
@import "../style/fontSize.scss";
@import "../style/mixin.scss";
@import "../style/1px.scss";

.r-action-card {
  position: fixed;
  left:0;
  bottom: 0;
  width:100%;
  height: 100%;
  z-index: 9999;
  .r-action-card-bg{
    @include one-screen;
    background-color: rgba(0,0,0,.4)
  }
  .r-action-card-content{
    position: absolute;
    bottom: 0;
    left:0;
    display: inline-block;
  }
}
</style>
