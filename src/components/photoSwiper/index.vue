<template>
  <div class="pswp r-photo-swiper" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="pswp__bg"></div>
    <div class="pswp__scroll-wrap">
      <div class="pswp__container">
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>
      <div class="pswp__ui">
        <div class="pswp__top-bar">
          <div class="pswp__counter"></div>
          <div class="close-btn"><i class="icon-close"></i></div>
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
          <div class="pswp__share-tooltip"></div>
        </div>
        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>
      </div>
    </div>
    <div class="r-photo-swiper-bar" @click="close"></div>
  </div>
</template>

<script>
import PhotoSwipe from 'photoswipe/dist/photoswipe'
import UI from 'photoswipe/dist/photoswipe-ui-default'
import objectAssign from 'object-assign'
export default {
  name: 'previewer',
  computed: {
    imgs () {
      return this.list.map(one => {
        if (!one.msrc) {
          one.msrc = one.src
        }
        if (typeof one.w === 'undefined') {
          one.w = 0
          one.h = 0
        }
        return one
      })
    }
  },
  methods: {
    init (index) {
      const self = this
      const showItem = this.imgs[index]
      if (!showItem.w || !showItem.h || showItem.w < 5 || showItem.h < 5) {
        const img = new Image()
        img.onload = function () {
          showItem.w = this.width
          showItem.h = this.height
          self._init(index)
        }
        img.src = showItem.src
      } else {
        this._init(index)
      }
    },
    _init (index) {
      const self = this
      let options = objectAssign({
        history: false,
        shareEl: false,
        tapToClose: true,
        index: index
      }, this.options)
      this.photoswipe = new PhotoSwipe(this.$el, UI, this.imgs, options)
      this.photoswipe.listen('gettingData', function (index, item) {
        if (!item.w || !item.h || item.w < 1 || item.h < 1) {
          const img = new Image()
          img.onload = function () {
            item.w = this.width
            item.h = this.height
            self.photoswipe.updateSize(true)
          }
          img.src = item.src
        }
      })
      this.photoswipe.init()
      this._bind()
    },
    show (index) {
      this.init(index)
    },
    goTo (index) {
      this.photoswipe.goTo(index)
    },
    prev () {
      this.photoswipe.prev()
    },
    next () {
      this.photoswipe.next()
    },
    close () {
      this.photoswipe.close()
    },
    _bind () {
      this.photoswipe.listen('close', () => {
        this.$emit('close')
      })
      this.photoswipe.listen('beforeChange', () => {
        this.$emit('beforeChange')
      })
      this.photoswipe.listen('afterChange', () => {
        let index = this.photoswipe.getCurrentIndex()
        console.log(index)
        this.$emit('afterChange', index)
      })
    }
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      default: 0
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="scss">
@import "../style/color.scss";
@import "../style/fontSize.scss";
@import "../style/mixin.scss";
@import '~photoswipe/dist/photoswipe.css';
@import '~photoswipe/dist/default-skin/default-skin.css';

.r-photo-swiper{
  .pswp__bg, .pswp__top-bar{
    background-color: #313131;
  }
  .pswp__top-bar{
    @include px(padding-top, 25);
    .pswp__counter{
      position: fixed;
      top: auto;
      left: 50%;
      @include textSize;
      @include px(margin-left, 25);
      @include px(padding-top, 25);
      @include px(bottom, 80);
      @include px(margin-left, -50);
    }
    .close-btn{
      float: right;
      color: $whiteColor;
      @include h6Size;@include px(width, 44);
      @include px(height, 44);
      @include px(margin-right, 25);
    }
    .pswp__preloader{
      display: none;
    }
  }
  .r-photo-swiper-bar{
    position: absolute;
    left:0;
    width: 100%;
    @include px(top, 25);
    @include px(height, 100);
  }
}
</style>
