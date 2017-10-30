<template>
  <div class="index">
    <r-swiper height="180px">
      <r-swiper-item class="item">
        <router-link to="/link">asdasd</router-link>
      </r-swiper-item>
      <r-swiper-item class="item">231321313</r-swiper-item>
    </r-swiper>
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
import {rSwiper, rSwiperItem} from '../../components/swiper'

export default{
  components: {rSwiper, rSwiperItem},
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
