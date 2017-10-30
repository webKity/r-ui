<template>
  <div class="r-select">
    <div class="r-select-label"><span>{{options[active].label}}</span><i class="icon-dropdown"></i></div>
    <select class="r-select-options" v-model="value">
      <option v-for="(item, index) in options" :value="item.value">{{item.label}}</option>
    </select>
  </div>
</template>

<script>
export default{
  props: {
    options: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      activeLabel: '',
      value: '',
      active: 0
    }
  },
  watch: {
    value (v) {
      for (let i = 0, len = this.options.length; i < len; i++) {
        if (v === this.options[i].value) {
          this.active = i
          break
        } else {
          // do nothing
        }
      }
      this.$emit('changeEvent', this.options[this.active])
    }
  },
  created () {
    this.value = this.options[this.active].value
  }
}
</script>
<style lang="scss">
@import "./style";
</style>
