<template>
  <transition name="fade">
    <div class="r-tip" v-if="visible">
      <span class="r-tip-text" v-html="message"></span>
    </div>
  </transition>
</template>
<script type="text/babel">
  export default {
    props: {
      message: String
    },

    data () {
      return {
        visible: false
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
  left: 50%;
  top: 50%;
  transform: translate(-50%, -100%);
}
.r-tip-text{
  @include textSize;
  display: block;
  text-align: center;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
