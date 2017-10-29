<template>
  <div class="index">
    <m-swiper height="180px">
      <m-swiper-item class="item">
        <router-link to="/link">asdasd</router-link>
      </m-swiper-item>
      <m-swiper-item class="item">231321313</m-swiper-item>
    </m-swiper>
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
    213213<br />
  </div>
</template>

<script>
import {mSwiper, mSwiperItem} from '../../components/swiper'

export default{
  components: {mSwiper, mSwiperItem},
  data () {
    return {
      swiperActive: 0
    }
  },
  mounted () {
    setTimeout(() => {
      this.swiperActive++
    }, 5200)
  }
}
</script>

<style lang="scss">
.item{
  background-color: #f2f2f2;
  text-align: center;
  a{
    display: block;
    height: 100%
  }
}
</style>
