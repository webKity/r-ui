<template>
  <div class="r-modal" ref="parentEl">
    <transition
      enter-active-class="animated quick fadeIn"
      leave-active-class="animated quick fadeOut">
      <div v-show="visible" class="r-modal-bg"></div>
    </transition>
    <transition
      v-on:before-enter="beforeEnter"
      v-on:after-leave="afterLeave"
      enter-active-class="animated quick modalScaleIn"
      leave-active-class="animated quick modalScaleOut">
      <div v-show="visible" class="r-modal-content">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      parentEl: null
    }
  },
  computed: {
    visible () {
      return this.isShow
    }
  },
  methods: {
    beforeEnter () {
      this.parentEl.style.display = 'block'
    },
    afterLeave () {
      this.parentEl.style.display = 'none'
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.parentEl = this.parentEl || this.$refs.parentEl
      this.parentEl.style.display = this.visible ? 'block' : 'none'
    })
  }
}
</script>
<style lang="scss">
@import "../style/color.scss";
@import "../style/fontSize.scss";
@import "../style/mixin.scss";

.r-modal{
  @include one-screen;
  position: fixed;
  z-index: 9999;
  .r-modal-bg{
    @include one-screen;
    background-color: rgba(0,0,0,.5);
    will-change: opacity;
  }
  .r-modal-content{
    position: absolute;
    left:50%;
    top:50%;
    will-change: transform, opacity;
    transform: translateX(-50%) translateY(-60%) translateZ(0) scale(1);
  }
  .modalScaleIn {
    animation-name: modalScaleIn;
  }
  .modalScaleOut {
    animation-name: modalScaleOut;
  }
  @keyframes modalScaleIn {
    0% {
      opacity: 0;
      transform: translateX(-50%) translateY(-60%) translateZ(0) scale3d(0.5, 0.5, 0.5);
    }

    100% {
      opacity: 1;
      transform: translateX(-50%) translateY(-60%) translateZ(0) scale3d(1, 1, 1);
    }
  }
  @keyframes modalScaleOut {
    0% {
      opacity: 1;
      transform: translateX(-50%) translateY(-60%) translateZ(0) scale3d(1, 1, 1);
    }

    100% {
      opacity: 0;
      transform: translateX(-50%) translateY(-60%) translateZ(0) scale3d(0.5, 0.5, 0.5);
    }
  }
}
</style>
