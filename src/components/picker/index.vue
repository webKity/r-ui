<template>
  <div ref="parentEl" class="r-picker-box" style="display:none;">
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut">
      <div v-show="visible" class="r-picker-bg"></div>
    </transition>
    <transition
      v-on:before-enter="beforeEnter"
      v-on:after-leave="afterLeave"
      enter-active-class="animated slideInUp"
      leave-active-class="animated slideOutDown">
      <div v-show="visible" class="r-picker-content">
        <div class="r-picker-control">
          <div class="r-picker-calcle" @click="close">取消</div>
          <div class="r-picker-title">{{title}}</div>
          <div class="r-picker-ok" @click="ok">确定</div>
        </div>
        <div class="r-picker-items">
          <slot></slot>
        </div>
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
    },
    title: {
      type: String,
      default: '选择器'
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
    ok () {
      this.$emit('select', this.value)
      this.close()
    },
    change (child) {
      if (child.name !== '') {
        this.value[child.name] = child.pickValue
      } else {
        this.value[child._uid] = child.pickValue
      }
    }
  },
  created () {
    this.$on('itemInput', this.change)
  }
}
</script>
<style lang="scss">
@import "../style/color.scss";
@import "../style/fontSize.scss";
@import "../style/mixin.scss";
@import "../style/1px.scss";

.r-picker-box {
  position: fixed;
  left:0;
  bottom: 0;
  width:100%;
  height: 100%;
  z-index: 9999;
  .r-picker-bg{
    @include one-screen;
    background-color: rgba(0,0,0,.4)
  }
  .r-picker-content{
    position: absolute;
    bottom: 0;
    left:0;
    width:100%;
    @include px(height, 512);
    .r-picker-control{
      @include px(height, 85);
      @include px(line-height, 85);
      background-color: $whiteColor;
      @extend .r-1px-b;
      .r-picker-calcle, .r-picker-ok, .r-picker-title{
        float: left;
        text-align: center;
        @include textSize;
      }
      .r-picker-calcle, .r-picker-ok{
        @include px(width, 120);
        color: $primaryColor;
      }
      .r-picker-title{
        @include px(width, 510);
        color: $darkGrayColor;
      }
    }
    .r-picker-items{
      display: flex;
    }
  }
}
</style>
