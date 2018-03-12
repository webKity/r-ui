<template>
  <div class="r-collapse">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      accordion: Boolean,
      value: {
        type: [Array, String, Number],
        default: []
      }
    },
    data () {
      return {
        isCanClick: true,
        activeNames: this.value
      }
    },
    watch: {
      value (value) {
        this.activeNames = value
      }
    },
    methods: {
      handleItemClick (item) {
        if (!this.isCanClick) return
        this.isCanClick = false
        setTimeout(() => {
          this.isCanClick = true
        }, 400)
        this.activeNames = this.activeNames === item.name ? '' : item.name
        this.$emit('change', this.activeNames)
      }
    },
    created () {
      this.$on('itemClick', this.handleItemClick)
    }
  }
</script>
