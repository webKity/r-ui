<template>
  <div class="r-upload">
    <div class="r-upload-wrap">
      <slot>
        <div class="r-upload-btn">
          <i class="icon-camera"></i>
          <div class="r-upload-tip">{{tip}}</div>
        </div>
      </slot>
      <div v-show="isShowProgress" class="r-upload-progress" :style="progressStyle"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tip: {
      type: String,
      default: '请上传图片'
    },
    uploadAction: {
      type: String,
      default: ''
    },
    multi: {
      type: Boolean,
      default: false
    },
    other: {
      type: [String, Array, Object],
      default: ''
    }
  },
  data () {
    return {
      root: '',
      fileQueue: [],
      policy: null,
      isShowProgress: false,
      progress: 0
    }
  },
  computed: {
    progressStyle () {
      let styleObj = {}
      styleObj.width = this.progress + '%'
      return styleObj
    }
  }
}
</script>
<style lang="scss">
@import "./../style/color.scss";
@import "./../style/fontSize.scss";
@import "./../style/mixin.scss";

.r-upload{
  @include one-screen;
  display: inline-block;
  .r-upload-wrap{
    @include one-screen;
    text-align: center;
    display: inline-block;
    .r-upload-btn{
      display: inline-block;
      text-align: center;
      color: $grayColor;
      cursor: pointer;
      i{
        @include h5Size;
        @include px(margin-top, 55);
      }
      .tip{
        @include textSize;
      }
    }
  }
  .r-upload-progress{
    @include one-screen;
    background-color: rgba($primaryColor, .65);
    width:0;
    transition: width .3s;
  }
}
</style>
