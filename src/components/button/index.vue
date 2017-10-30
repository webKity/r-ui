<template>
  <button type="button" class="r-button" @click="click" :class="[radius, type, fluid, size, fill]" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
export default{
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    radius: {
      type: String,
      default: 'radius'
    },
    type: {
      type: String,
      default: 'default'
    },
    fluid: {
      type: String,
      default: ''
    },
    fill: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'normal'
    }
  },
  methods: {
    click () {
      if (this.disabled) return
      this.$emit('click')
    }
  }
}
</script>
<style lang="scss">
@import "./style.scss";
</style>
