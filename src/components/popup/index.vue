<template>
  <transition
    v-on:before-enter="beforeEnter"
    v-on:after-enter="afterEnter"
    v-on:before-leave="beforeLeave"
    v-on:after-leave="afterLeave"
    :enter-active-class="enterClass"
    :leave-active-class="leaveClass">
    <div v-show="isShow" class="r-popup" ref="content">
      <slot></slot>
    </div>
  </transition>
</template>
<script>
export default{
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: 'right' // right,left,bottom,top
    },
    speed: {
      type: Number,
      default: 300
    }
  },
  data () {
    return {
      parentEl: null,
      aniObj: {
        enter: 'slideInRight',
        leave: 'slideOutRight'
      }
    }
  },
  computed: {
    enterClass () {
      let aniClass = `animated ${this.aniObj.enter}`
      return aniClass
    },
    leaveClass () {
      let aniClass = `animated ${this.aniObj.leave}`
      return aniClass
    }
  },
  methods: {
    beforeEnter () {
      this.$emit('beforeEnter')
      this.parentEl = this.parentEl || (document.querySelector('.r-page-content') ? document.querySelector('.r-page-content')
      : document.querySelector('body'))
      this.parentEl.style.overflow = 'hidden'
    },
    afterEnter () {
      this.$emit('enter')
    },
    beforeLeave () {
      this.$emit('beforeLeave')
    },
    afterLeave () {
      this.parentEl.style.overflow = 'auto'
      this.$emit('leave')
    },
    delay (ms) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
      })
    },
    getStart () {
      if (this.direction === 'right') {
        return {
          enter: 'slideInRight',
          leave: 'slideOutRight'
        }
      } else if (this.direction === 'left') {
        return {
          enter: 'slideInLeft',
          leave: 'slideOutLeft'
        }
      } else if (this.direction === 'bottom') {
        return {
          enter: 'slideInUp',
          leave: 'slideOutDown'
        }
      } else if (this.direction === 'top') {
        return {
          enter: 'slideInDown',
          leave: 'slideOutUp'
        }
      } else if (this.direction === 'pop') {
        return {
          enter: 'popIn',
          leave: 'popOut'
        }
      } else {
        return {
          enter: 'slideInRight',
          leave: 'slideOutRight'
        }
      }
    }
  },
  created () {
    this.aniObj = this.getStart()
  }
}
</script>

<style lang="scss">
@import "../style/color.scss";
@import "../style/fontSize.scss";
@import "../style/mixin.scss";

.r-popup{
  @include one-screen;
  position: fixed;
  background-color: $lightGrayColor;
  z-index: 9999;
}
</style>
