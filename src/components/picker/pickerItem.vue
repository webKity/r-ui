<template>
  <div class="r-picker-item">
    <div class="r-picker-line"></div>
    <div class="r-picker-list">
      <ul class="r-picker-ul" ref="list">
        <li class="r-picker-list-item" v-for="el,index in renderData " :class="{'hidden':setHidden(el.index)}" :key="index">{{typeof el.value === 'string' ? el.value : el.value[label]}}</li>
      </ul>
    </div>
    <ul class="r-picker-wheel" ref="wheel">
      <li class="r-picker-wheel-item"
      :class="{'hidden':setHidden(el.index)}" :style="setWheelItemDeg(el.index)"
      :index="el.index"
      v-for="el,index in renderData "
      :key="index">{{typeof el.value === 'string' ? el.value : el.value[label]}}</li>
    </ul>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        lineHeight: 34,
        spin: {start: -9, end: 9, branch: 9},
        finger: {startY: 0, lastY: 0, startTime: 0, lastTime: 0, transformY: 0},
        pickValue: '',
        timeout: null
      }
    },
    props: {
      speed: {
        type: Number,
        default: 600
      },
      coefficient: {
        type: Number,
        default: 0.8
      },
      deg: {
        type: Number,
        default: 20
      },
      name: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        default: 'label'
      },
      listData: {
        type: Array,
        required: true
      },
      type: {
        type: String,
        default: 'line'
      },
      value: {}
    },
    computed: {
      renderData () {
        let temp = []
        for (let k = this.spin.start; k <= this.spin.end; k++) {
          let data = {
            value: this.getSpinData(k),
            index: k
          }
          temp.push(data)
        }
        return temp
      }
    },
    watch: {
      listData (val) {
        this.setStyle(-0)
        clearTimeout(this.timeout)
        this.timeout = null
        this.timeout = setTimeout(() => {
          this.setWheelDeg(0)
          this.setListTransform()
          this.updateSpin(0)
          this.getPickValue(0)
        }, this.speed)
      }
    },
    mounted () {
      /* 事件绑定 */
      this.$el.addEventListener('touchstart', this.itemTouchStart)
      this.$el.addEventListener('touchmove', this.itemTouchMove)
      this.$el.addEventListener('touchend', this.itemTouchEnd)
      /* 初始化状态 */
      let index = this.listData.indexOf(this.value)
      if (index === -1) {
        console.warn('当前初始值不存在，请检查后listData范围！！')
        this.setListTransform()
        this.getPickValue(0)
      } else {
        let move = index * this.lineHeight
        /* 因为往上滑动所以是负 */
        this.setStyle(-move)
        this.setListTransform(-move, -move)
      }
    },
    methods: {
      /* 根据type 控制滚轮显示效果 */
      setHidden (index) {
        if (this.type === 'line') {
          return index < 0 || index > this.listData.length - 1
        } else {
          return false
        }
      },
      setWheelItemDeg (index) {
        return {
          transform: `rotate3d(1, 0, 0, ${-index * this.deg % 360}deg) translate3d(0px, 0px, 100px)`
        }
      },
      setWheelDeg (updateDeg, type, time = this.speed) {
        if (type === 'end') {
          this.$refs.wheel.style.webkitTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`
          this.$refs.wheel.style.webkitTransform = `rotate3d(1, 0, 0, ${updateDeg}deg)`
        } else {
          this.$refs.wheel.style.webkitTransition = ''
          this.$refs.wheel.style.webkitTransform = `rotate3d(1, 0, 0, ${updateDeg}deg)`
        }
      },
      setListTransform (translateY = 0, marginTop = 0, type, time = this.speed) {
        if (type === 'end') {
          this.$refs.list.style.webkitTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`
          this.$refs.list.style.webkitTransform = `translateY(${translateY - this.spin.branch * this.lineHeight}px)`
          this.$refs.list.style.marginTop = `${-marginTop}px`
          this.$refs.list.setAttribute('scroll', translateY)
        } else {
          this.$refs.list.style.webkitTransition = ''
          this.$refs.list.style.webkitTransform = `translateY(${translateY - this.spin.branch * this.lineHeight}px)`
          this.$refs.list.style.marginTop = `${-marginTop}px`
          this.$refs.list.setAttribute('scroll', translateY)
        }
      },
      itemTouchStart (event) {
        let finger = event.changedTouches[0]
        this.finger.startY = finger.pageY
        this.finger.startTime = event.timestamp || Date.now()
        this.finger.transformY = this.$refs.list.getAttribute('scroll')
        event.preventDefault()
      },
      itemTouchMove (event) {
        let finger = event.changedTouches[0]
        this.finger.lastY = finger.pageY
        this.finger.lastTime = event.timestamp || Date.now()
        /* 设置css */
        let move = (this.finger.lastY - this.finger.startY) * this.coefficient
        this.setStyle(move)
        event.preventDefault()
      },
      itemTouchEnd (event) {
        let finger = event.changedTouches[0]
        this.finger.lastY = finger.pageY
        this.finger.lastTime = event.timestamp || Date.now()
        let move = (this.finger.lastY - this.finger.startY) * this.coefficient
        /* 计算速度 */
        /* 速度计算说明
         * 当时间小于300毫秒 最后的移动距离等于 move + 减速运动距离
         * */
        let time = this.finger.lastTime - this.finger.startTime
        let v = move / time
        /* 减速加速度a */
        let a = 1.8
        /* 设置css */
        if (time <= 300) {
          move = v * a * time
          time = this.speed + time * a
          this.setStyle(move, 'end', time)
        } else {
          this.setStyle(move, 'end')
        }
      },
      /* 设置css */
      setStyle (move, type, time) {
        const singleHeight = this.lineHeight
        const deg = this.deg
        const singleDeg = deg / singleHeight
        let currentListMove = this.finger.transformY
        let updateMove = move + Number(currentListMove)
        /* 根据滚轮类型 line or cycle 判断 updateMove最大距离 */
        if (this.type === 'line') {
          if (updateMove > 0) {
            updateMove = 0
          }
          if (updateMove < -(this.listData.length - 1) * singleHeight) {
            updateMove = -(this.listData.length - 1) * singleHeight
          }
        }
        let updateDeg = -updateMove * singleDeg
        let spinAim = Math.round(updateDeg / this.deg)
        let margin = Math.round(updateMove / singleHeight) * singleHeight // 如果不这么写 会导致没有滚动效果
        /* 计算touchEnd移动的整数距离 */
        let endMove = margin
        let endDeg = Math.round(updateDeg / deg) * deg
        if (type === 'end') {
          this.setListTransform(endMove, margin, type, time)
          this.setWheelDeg(endDeg, type, time)
          /* 设置$emit 延迟 */
          setTimeout(() => this.getPickValue(endMove), this.speed)
        } else {
          this.setListTransform(updateMove, margin)
          this.setWheelDeg(updateDeg)
        }
        this.updateSpin(spinAim)
      },
      /* 更新spin */
      updateSpin (spinAim) {
        this.spin.start = this.spin.branch * -1 + spinAim
        this.spin.end = this.spin.start + this.spin.branch * 2
      },
      /* 获取spin 数据 */
      getSpinData (index) {
        index = index % this.listData.length
        return this.listData[index >= 0 ? index : index + this.listData.length]
      },
      /* 获取选中值 */
      getPickValue (move) {
        let index = Math.abs(move / this.lineHeight)
        this.pickValue = this.getSpinData(index)
        this.$parent.$emit('itemInput', this)
        this.$emit('change', this.pickValue)
      }
    },
    created () {
      this.lineHeight = this.lineHeight * document.querySelector('html').getAttribute('data-dpr')
    },
    beforeDestroy () {
      this.$el.removeEventListener('touchstart', this.itemTouchStart)
      this.$el.removeEventListener('touchmove', this.itemTouchMove)
      this.$el.removeEventListener('touchend', this.itemTouchEnd)
    }
  }
</script>
<style lang="scss">
@import "./style.scss";
</style>
