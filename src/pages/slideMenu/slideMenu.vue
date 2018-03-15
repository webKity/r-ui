<template>
  <r-slide-menu class="slide-menu">
    <div slot="menu">我是菜单我是菜单我是菜单我是菜单我是菜单</div>
    <r-page class="slide-menu">
      <r-head slot="head" @click.native="$router.go(-1)">SlideMenu</r-head>
      <div slot="content">
        我是正文正文
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
