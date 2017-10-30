<template>
  <div class="r-video">
    <video controls :poster="poster" :src="src" width="100%" height="100%" ref='video'></video>
  </div>
</template>

<script>
export default{
  props: {
    src: {
      type: String,
      default: ''
    },
    poster: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      player: null,
      isPlay: false
    }
  },
  methods: {
    init () {
      this.player = this.$refs.video
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

.r-video{
  @include one-screen;
  background-color: $blackColor;
  .poster{
    @include one-screen;
    @include back-size;
  }
  .play-btn{
    position: absolute;
    left: 50%;
    top:50%;
    @include px(width, 75);
    transform: translate(-50%, -50%);
  }
}
</style>
