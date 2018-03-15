<template>
  <div class="r-cell container-fluid">
    <div class="row" @click="jumpPage">
      <div class="r-cell-label col-xs-7">{{label}}</div>
      <div class="r-cell-value col-xs-5">{{value}}</div>
      <div v-if="link !== '' || isLink" class="r-cell-link">
        <i class="ricon-more"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  props: {
    label: {
      type: [String, Number, Array, Object],
      default: ''
    },
    value: {
      type: [String, Number, Array, Object],
      default: ''
    },
    link: {
      type: String,
      default: ''
    },
    isLink: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    jumpPage () {
      if (this.link !== '') {
        this.$router.push(this.link)
      }
    }
  }
}
</script>

<style lang="scss">
@import './../style/fontSize.scss';
@import './../style/mixin.scss';
@import './../style/1px.scss';

.r-cell{
  @include textSize;
  @extend .r-1px-b;
  &-label, &-value{
    @include px(padding, 30);
  }
  &-link{
    position: absolute;
    @include px(right, 30);
    top:50%;
    transform: translateY(-50%);
  }
}
</style>
