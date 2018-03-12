
<template>
  <div class="r-message-code">
    <r-button class="r-message-btn" type="red" fill="fill" fluid="fluid" size="big"
      @click="getCode"
      :disabled="hasGetCode">
      {{ getCodeBtnMsg }}
    </r-button>
  </div>
</template>
<script>
import rules from './../utils/validataRules'
import rButton from './../button'

export default {
  props: {
    serverUrl: {
      type: String,
      default: ''
    },
    phone: {
      type: [Number, String],
      default: ''
    }
  },
  components: {
    rButton
  },
  data () {
    return {
      hasGetCode: false,
      getCodeBtnMsg: '获取验证码',
      totleTime: 60
    }
  },
  methods: {
    async getCode () {
      var that = this
      if (that.serverUrl === '') {
        that.$tip('请填写获取验证码地址')
      } else if (that.phone === '') {
        that.$tip('请输入手机号')
      } else if (!rules.isPhone(that.phone)) {
        that.$tip('您的手机号格式不正确，请重新输入')
      } else {
        that.$http.post(that.serverUrl, {
          phone: that.phone
        }).then((response) => {
          that.$emit('send', response)
          that.countDown()
        }, (response) => {
          that.$tip('服务器内部异常(' + that.serverUrl + '：' + response.status + ')')
          console.log(response)
        })
      }
    },
    countDown () {
      var that = this
      that.getCodeBtnMsg = '(' + that.totleTime + 's)重新获取'
      that.hasGetCode = true
      var set = setInterval(function () {
        that.totleTime--
        if (that.totleTime === 0) {
          that.getCodeBtnMsg = '重新获取'
          that.hasGetCode = false
          that.totleTime = 60
          clearInterval(set)
          return
        }
        that.getCodeBtnMsg = '(' + that.totleTime + 's)重新获取'
      }, 1000)
    }
  }
}
</script>
<style lang="scss">
.r-message-code{
  display: inline-block;
  width: 100%;
  .r-message-btn.r-button{
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
