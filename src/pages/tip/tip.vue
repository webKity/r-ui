<template>
  <div class="tip">
    弹窗提示组件演示
  </div>
</template>

<script>
export default {
  mounted () {
    setTimeout(() => {
      this.$tip('你好呀')
    }, 500)
  }
}
</script>

<style lang="scss">
@import './../../components/style/fontSize.scss';
.tip{
  @include textSize;
}
</style>

