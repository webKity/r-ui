<template>
  <div class="r-head">
    <div class="r-head-back" @click="$emit('back')">
      <i class="ricon-back"></i>
    </div>
    <div class="r-head-title">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
@import "./../style/color.scss";
@import "./../style/fontSize.scss";
@import "./../style/mixin.scss";
@import "./../style/1px.scss";

.r-head{
  width:100%;
  @include px(height, 100);
  z-index: 1;
  background-color: $whiteColor;
  color: $blackColor;
  @include titleSize;
  @extend .r-1px-b;
  .r-head-back{
    position: absolute;
    left:0;
    top:0;
    @include px(padding, 20);
    text-align: center;
    @include h5Size;
  }
  .r-head-title{
    @include px(width, 550);
    @include px(margin-left, 100);
    @include px(height, 100);
    @include px(line-height, 100);
    text-align: center;
    @include ellipsis;
  }
  .r-head-close{
    position: absolute;
    right:0;
    top:0;
    @include px(padding, 25);
    text-align: center;
  }
}
</style>
