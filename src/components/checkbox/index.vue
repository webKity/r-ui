<template>
  <div class="r-checkbox">
    <div class="r-checkbox-label">
      {{label}}
    </div>
    <div class="r-checkbox-list">
      <div v-for="(item, index) in options" class="r-checkbox-item" :class="{'active': item.isSelect}" :key="index" @click="toggleSelect(item)">{{item.label}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '多选'
    },
    options: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    toggleSelect (item) {
      item.isSelect = !item.isSelect
      this.$emit('change', item)
    }
  }
}
</script>

<style lang="scss">
@import "./style.scss";
</style>
