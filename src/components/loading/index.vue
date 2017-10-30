<template>
  <div class="r-loading-container">
    <img src="./loading.gif">
  </div>
</template>
<script>
  const COMPONENT_NAME = 'loading'

  export default {
    name: COMPONENT_NAME
  }
</script>
<style lang="scss">
.r-loading-container{
  display: inline-block;
  img{
    width: 20px;
    height: 20px;
    display: block;
  }
}
</style>
