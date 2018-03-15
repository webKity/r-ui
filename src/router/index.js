import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('@/pages/index/index.vue')
const SlideMenu = () => import('@/pages/slideMenu/slideMenu.vue')
const Swiper = () => import('@/pages/swiper/swiper.vue')
const Loadmore = () => import('@/pages/loadmore/loadmore.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'index', component: Index},
    {path: '/slideMenu', name: 'slideMenu', component: SlideMenu},
    {path: '/swiper', name: 'swiper', component: Swiper},
    {path: '/loadmore', name: 'loadmore', component: Loadmore}
  ]
})
