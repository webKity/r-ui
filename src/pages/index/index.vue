<template>
  <r-page>
    <r-head slot="head">DEMO</r-head>
    <div slot="content" class="index">
      <div class="list">
        <r-cell label="slideMenu" link="/slideMenu"></r-cell>
        <r-cell label="swiper" link="/swiper"></r-cell>
        <r-cell label="loadmore" link="/loadmore"></r-cell>
        <r-cell label="swiperOut" link="/swiperOut"></r-cell>
      </div>
    </div>
  </r-page>
</template>

<script>
const rPage = () => import('./../../components/page')
const rHead = () => import('./../../components/head')
const rCell = () => import('./../../components/cell')

export default{
  components: {
    rPage,
    rHead,
    rCell
  }
}
</script>

<style lang="scss">
@import './../../components/style/color.scss';
@import './../../components/style/fontSize.scss';
@import './../../components/style/mixin.scss';
@import './../../components/style/1px.scss';

.index{
  background-color: $whiteColor;
  .list{
    .item{
      @include textSize;
      @include px(padding, 30);
      @extend .r-1px-r;
      @extend .r-1px-b;
      text-align: center;
    }
  }
}
</style>
