<template>
  <r-modal :isShow="visible">
    <div class="r-dialog">
      <div v-if="title" class="r-dialog-title">{{title}}</div>
      <div class="r-dialog-content">
        <slot name="content"></slot>
      </div>
      <div class="r-dialog-foot">
        <div class="r-dialog-btn" @click="close">取消</div>
        <div class="r-dialog-btn r-dialog-info" @click="ok">提交</div>
      </div>
    </div>
  </r-modal>
</template>
<script>
const rModal = () => import('./../modal')

export default{
  components: {rModal},
  props: {
    title: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    visible () {
      return this.isShow
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    ok () {
      this.$emit('ok')
    }
  }
}
</script>
<style lang="scss">
@import "../style/color.scss";
@import "../style/fontSize.scss";
@import "../style/mixin.scss";
@import "../style/1px.scss";

.r-dialog{
  background-color: $whiteColor;
  @include px(width, 630);
  @include px(border-radius, 10);
  .r-dialog-title{
    @include px(height, 90);
    @include px(line-height, 90);
    @include px(padding-left, 25);
    @include titleSize;
    color: $blackColor;
    @extend .r-1px-b;
  }
  .r-dialog-content{
    @include px(padding, 25);
  }
  .r-dialog-foot{
    overflow: hidden;
    .r-dialog-btn{
      float: left;
      width: 50%;
      @include px(height, 90);
      @include px(line-height, 90);
      @include textSize;
      text-align: center;
      box-sizing: border-box;
      @extend .r-1px-t;
      color: $grayColor;
      &:first-child{
        @extend .r-1px-r;
      }
    }
    .r-dialog-info{
      color: $blueColor;
    }
  }
}
</style>
