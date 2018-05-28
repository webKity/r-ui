<template>
  <r-slide-menu class="slide-menu">
    <div slot="menu">我是菜单我是菜单我是菜单我是菜单我是菜单</div>
    <r-page class="slide-menu">
      <r-head slot="head" @click.native="$router.go(-1)">SlideMenu</r-head>
      <div slot="content">
        我是正文正文。您想要看代码具体的实现思路，请看<a href="https://juejin.im/post/5aa0e412f265da239235e9f0">《干货--手把手撸vue移动UI框架：侧边菜单》</a>
      </div>
    </r-page>
  </r-slide-menu>
</template>

<script>
const rPage = () => import('./../../components/page')
const rHead = () => import('./../../components/head')
const rSlideMenu = () => import('./../../components/slideMenu')

export default{
  components: {
    rPage,
    rHead,
    rSlideMenu
  }
}
</script>

<style lang="scss">
@import './../../components/style/fontSize.scss';

.slide-menu{
  @include textSize;
}
</style>
