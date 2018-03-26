<template>
  <r-page class="swiper-out">
    <r-head slot="head" @click.native="$router.go(-1)">SwiperOut</r-head>
    <r-swiper-out slot="content">
      <r-swiper-out-item>
        内容一
      </r-swiper-out-item>
      <r-swiper-out-item>
        内容二
      </r-swiper-out-item>
      <r-swiper-out-item>
        内容三
      </r-swiper-out-item>
      <r-swiper-out-item>
        内容四
      </r-swiper-out-item>
      <r-swiper-out-item>
        内容五
      </r-swiper-out-item>
      <r-swiper-out-item>
        内容六
      </r-swiper-out-item>
    </r-swiper-out>
  </r-page>
</template>

<script>
import {rSwiperOut, rSwiperOutItem} from '../../components/swiperOut'
const rPage = () => import('./../../components/page')
const rHead = () => import('./../../components/head')

export default{
  components: {
    rPage,
    rHead,
    rSwiperOut,
    rSwiperOutItem
  }
}
</script>

<style lang="scss">
@import './../../components/style/fontSize.scss';
@import './../../components/style/mixin.scss';
@import './../../components/style/1px.scss';

.swiper-out{
  .r-swiper-out-item{
    @include textSize;
    @include px(height, 85);
    @include px(line-height, 85);
    @include px(padding-left, 20);
    @extend .r-1px-b;
  }
  .r-swiper-out-item-btn{
    @include px(height, 85);
    @include px(line-height, 85);
  }
}
</style>
