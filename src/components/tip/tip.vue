<template>
  <transition
    enter-active-class="animated quick fadeIn"
    leave-active-class="animated quick fadeOut">
    <div class="r-tip" v-show="visible" :class="customClass">
      <span class="r-tip-text" v-html="message"></span>
    </div>
  </transition>
</template>
<script type="text/babel">
  export default {
    props: {
      message: String,
      position: {
        type: String,
        default: 'placemiddle'
      },
      className: {
        type: String,
        default: ''
      }
    },

    data () {
      return {
        visible: false
      }
    },

    computed: {
      customClass () {
        var classes = []
        switch (this.position) {
          case 'top':
            classes.push('is-placetop')
            break
          case 'bottom':
            classes.push('is-placebottom')
            break
          default:
            classes.push('is-placemiddle')
        }
        classes.push(this.className)

        return classes.join(' ')
      }
    }
  }
</script>
<style lang="scss">
@import "./../style/fontSize.scss";
@import "./../style/mixin.scss";

.r-tip {
  position: fixed;
  max-width: 80%;
  @include px(padding-top, 20);
  @include px(padding-bottom, 20);
  @include px(padding-left, 40);
  @include px(padding-right, 40);
  @include px(border-radius, 5);
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  box-sizing: border-box;
  text-align: center;
  z-index: 9999;
}
.r-tip-text{
  @include textSize;
  display: block;
  text-align: center;
}
.is-placetop{
  top:50px;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
}
.is-placemiddle{
  top:50%;
  left: 50%;
  -webkit-transform: translate(-50%, -100%);
}
.is-placebottom{
  bottom: 50px;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
}
</style>
