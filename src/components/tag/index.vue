<template>
  <div class="r-tag" :class="theme">
    <slot class="r-tag-label">{{label}}</slot>
  </div>
</template>

<script>
export default{
  props: {
    theme: {
      type: String,
      default: 'default'
    },
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
@import "./style";
</style>
