<template>
  <r-page class="swiper">
    <r-head slot="head" @click.native="$router.go(-1)">Swiper</r-head>
    <div slot="content">
      <div class="title">无自动轮播</div>
      <r-swiper height="7.46667rem" ref="swiper">
        <r-swiper-item v-for="(item, index) in list" :key="index"
        :style="{backgroundImage: 'url('+ item.src +')'}">
        </r-swiper-item>
      </r-swiper>
      <div class="title">有自动轮播</div>
      <r-swiper height="7.46667rem" ref="swiper" autoplay="4000">
        <r-swiper-item v-for="(item, index) in list" :key="index"
        :style="{backgroundImage: 'url('+ item.src +')'}">
        </r-swiper-item>
      </r-swiper>
    </div>
  </r-page>
</template>

<script>
import {rSwiper, rSwiperItem} from './../../components/swiper'
const rPage = () => import('./../../components/page')
const rHead = () => import('./../../components/head')

export default{
  components: {
    rPage,
    rHead,
    rSwiper,
    rSwiperItem
  },
  data () {
    return {
      list: [
        {src: 'http://chzflive.caihome.cn/web/o_1c7390v9q1al1rak17g2v3uhc438?x-oss-process=image/resize,m_fill,h_240,w_320'},
        {src: 'http://chzflive.caihome.cn/web/o_1c7390v9q1al1rak17g2v3uhc438?x-oss-process=image/resize,m_fill,h_240,w_320'},
        {src: 'http://chzflive.caihome.cn/web/o_1c7390v9q1al1rak17g2v3uhc438?x-oss-process=image/resize,m_fill,h_240,w_320'},
        {src: 'http://chzflive.caihome.cn/web/o_1c7390v9q1al1rak17g2v3uhc438?x-oss-process=image/resize,m_fill,h_240,w_320'},
        {src: 'http://chzflive.caihome.cn/web/o_1c7390v9q1al1rak17g2v3uhc438?x-oss-process=image/resize,m_fill,h_240,w_320'},
        {src: 'http://chzflive.caihome.cn/web/o_1c7390v9q1al1rak17g2v3uhc438?x-oss-process=image/resize,m_fill,h_240,w_320'}
      ]
    }
  }
}
</script>

<style lang="scss">
@import './../../components/style/fontSize.scss';
@import './../../components/style/mixin.scss';

.swiper{
  .title{
    @include textSize;
    @include px(padding, 20);
  }
  .r-swiper-item{
    @include back-size;
  }
}
</style>
