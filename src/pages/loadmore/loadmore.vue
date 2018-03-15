<template>
  <r-page class="loadmore">
    <r-head slot="head" @click.native="$router.go(-1)">loadmore</r-head>
    <r-scroll slot="content" ref="scroll" @loadmore="queryDate">
      <div class="item" v-for="(item, index) in list">{{item}}</div>
    </r-scroll>
  </r-page>
</template>

<script>
const rPage = () => import('./../../components/page')
const rHead = () => import('./../../components/head')
const rScroll = () => import('./../../components/scroll')

function timeout (ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done')
  })
}

export default{
  components: {rPage, rHead, rScroll},
  data () {
    return {
      i: 0,
      list: []
    }
  },
  methods: {
    async queryDate () {
      await timeout(500)
      let i = this.i
      let data = []
      for (let j = 0; j < 40; j++) {
        data.push(i + j)
        this.i = this.i + 1
      }
      this.list = this.list.concat(data)
      // 调用组件中的loaded函数，如果数据加载完成后记得调用组件的compleate函数
      if (this.i < 80) {
        this.$refs.scroll.loaded()
      } else {
        this.$refs.scroll.compleate()
      }
    }
  },
  mounted () {
    this.queryDate()
  }
}
</script>

<style lang="scss">
.item{
  background-color: #f2f2f2;
  border-bottom: 1px solid #fff;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
</style>
