<template>
  <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">
    <div v-show="visible" class="r-indicator">
      <r-loading></r-loading>
    </div>
  </transition>

</template>

<script>
import rLoading from '../loading'

export default{
  components: {rLoading},
  data () {
    return {
      visible: false
    }
  }
}
</script>

<style lang="scss">
@import "./../style/color.scss";
@import "./../style/fontSize.scss";
@import "./../style/mixin.scss";

.r-indicator{
  position: absolute;
  left: 50%;
  top: 50%;
  @include px(padding, 30);
  @include px(border-radius, 10);
  background-color: rgba(0,0,0,.7);
  transform: translate(-50%, -50%);
}
</style>
