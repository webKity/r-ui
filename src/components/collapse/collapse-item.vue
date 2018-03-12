<template>
  <div class="r-collapse-item">
    <div class="r-collapse-item-head-box">
      <div class="r-collapse-item-head" @click="changeShow">
        <div class="r-collapse-item-head-left">{{ title }}</div>
        <div class="r-collapse-item-head-right">
          <div class="r-collapse-item-cell" :class="{'r-collapse-item-cell-rotate': isActive}"></div>
        </div>
      </div>
    </div>
    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-on:after-leave="afterLeave">
      <div v-show="isActive" class="r-collapse-item-content">
        <div class="r-collapse-item-content-box">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    },
    name: {
      type: String,
      default: ''
    },
    isActive: false
  },
  data () {
    return {
      duration: 400
    }
  },
  methods: {
    changeShow () {
      this.$parent.$emit('itemClick', this)
    },
    beforeEnter (el) {
      el.style.height = 0
    },
    enter (el, done) {
      let that = this
      velocity(el, {
        height: el.scrollHeight + 'px'
      }, {
        duration: that.duration,
        complete: done
      })
    },
    afterEnter (el) {
      el.style.height = ''
    },
    beforeLeave (el) {
      el.style.height = el.scrollHeight + 'px'
    },
    leave (el, done) {
      let that = this
      velocity(el, {
        height: '0px'
      }, {
        duration: that.duration,
        complete: done
      })
    },
    afterLeave (el) {
      el.style.height = ''
    }
  }
}
</script>
<style>
.r-collapse .r-collapse-item{margin-top:-1px}
.r-collapse-item-head-box{background-color:#fff;padding-left:15px}
.r-collapse-item-head{padding:8px 15px 8px 0;height:100%;overflow:hidden;font-size:15px;color:#333;}
.r-collapse-item:last-child .r-collapse-item-head{border-bottom: none}
.r-collapse-item:first-child .r-collapse-item-head{border-top: none}
.r-collapse-item-head-left{float:left;width:90%;text-align:left;}
.r-collapse-item-head-right{float:left;width:10%;text-align:right;}
.r-collapse-item-content{padding:0 15px;overflow:hidden;box-sizing: content-box;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);-webkit-backface-visibility: hidden;backface-visibility: hidden;-webkit-perspective: 1000;perspective: 1000;}
.r-collapse-item-content-box{padding:15px 0}
.r-collapse-item-cell{display:inline-block;width:10px;height:10px;border-top:1px solid #ccc;border-right:1px solid #ccc;-webkit-transform:rotate(45deg);transform:rotate(45deg);-webkit-transition:all .3s;transition: all .3s; will-change:transform;}
.r-collapse-item-cell-rotate{-webkit-transform:rotate(135deg);transform:rotate(135deg);}
</style>
