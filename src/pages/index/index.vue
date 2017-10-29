<template>
  <div class="index">
    <m-swiper height="180px">
      <m-swiper-item class="item">asdasd</m-swiper-item>
      <m-swiper-item class="item">231321313</m-swiper-item>
    </m-swiper>
  </div>
</template>

<script>
import {mSwiper, mSwiperItem} from '../../components/swiper'

export default{
  components: {mSwiper, mSwiperItem}
}
</script>

<style lang="scss">
.item{
  background-color: #f2f2f2;
  text-align: center;
}
</style>
