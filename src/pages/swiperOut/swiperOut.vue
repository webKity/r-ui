<template>
  <r-page class="swiper-out">
    <r-head slot="head" @click.native="$router.go(-1)">SwiperOut</r-head>
    <r-swiper-out slot="content" @onremove="removeHandler">
      <div class="title">
        您想要看代码具体的实现思路，请看<a href="https://juejin.im/post/5ab89b895188255583593bf0">《干货--手把手撸vue移动UI框架： 滑动删除》</a>
      </div>
      <r-swiper-out-item data-id="1">
        内容一
      </r-swiper-out-item>
      <r-swiper-out-item data-id="2">
        内容二
      </r-swiper-out-item>
      <r-swiper-out-item data-id="3">
        内容三
      </r-swiper-out-item>
      <r-swiper-out-item data-id="4">
        内容四
      </r-swiper-out-item>
      <r-swiper-out-item data-id="5">
        内容五
      </r-swiper-out-item>
      <r-swiper-out-item data-id="6">
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
  },
  methods: {
    removeHandler (el) {
      let id = el.getAttribute('data-id')
      console.log(id)
    }
  }
}
</script>

<style lang="scss">
@import './../../components/style/fontSize.scss';
@import './../../components/style/mixin.scss';
@import './../../components/style/1px.scss';

.swiper-out{
  @include textSize;
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
