<template>
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">好吃外卖</h2>
          <div class="login_header_title">
            <!--当msg为true时，代表添加on样式类，高亮短信登录-->
            <a href="javascript:;" :class="{on:msg}" @click="msg=true">短信登录</a>
            <a href="javascript:;" :class="{on:!msg}" @click="msg=false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form @submit.prevent="login">
            <!--短信登录界面div,msg为true时，显示短信登录div-->
            <div :class="{on:msg}">
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                <button class="get_verification" :disabled="!rightPhone" :class="{right_phone:rightPhone}" @click.prevent="getCode">{{computeTime>0?'已发送('+computeTime+')s':'获取验证码'}}</button>
                <!--right_phone为样式类名，当rightPhone为true时，黑体字。
                    而rightPhone根据v-model="phone"中phone是否符合正则来确定，所以rightPhone要在计算属性得到
                    :disabled="!rightPhone"代表当输入为正确手机号时候，才能点击
                    @click.prevent="getCode"点击之后，取消提交表单的默认行为-->
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="6" placeholder="验证码" v-model="code">
              </section>
              <section class="login_hint">
                温馨提示：未注册好吃外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
             <!--密码登录界面div,msg为false时，显示密码登录div-->
            <div :class="{on:!msg}">
              <section>
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                </section>
                <section class="login_verification">
                  <!-- <input :type="circleFlag?'tel':'password'" maxlength="8" placeholder="密码" v-model="pwd"> -->
                  <input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-show="showPwdFlag">
                  <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-show="!showPwdFlag">
                  <div class="switch_button" :class="showPwdFlag?'on':'off'" @click="showPwdFlag=!showPwdFlag">
                  <!-- @click="showPwdFlag=!showPwdFlag" ，刚开始默认showPwdFlag为false不显示密码，点击后取反，为显示密码
                       :class="showPwdFlag?'on':'off'" 刚开始showPwdFlag为false，按钮灰色，为不显示密码，点击后showPwdFlag为true，按钮变色，为显示密码-->
                    <div class="switch_circle" :class="{right:showPwdFlag}"></div>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="4" placeholder="验证码" v-model="captcha">
                  <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha" ref="img">
                </section>
              </section>
            </div>
            <button class="login_submit">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont icon-jiantou-copy"></i>
        </a>
      </div>
    </section>
</template>

<script>
  import { Toast } from 'mint-ui';
  //导入mint-ui的弹窗功能
  import axios from 'axios'
  export default {
      data(){
        return{
          msg:true,//true代表短信登录，false代表密码登录
          phone:'',//手机
          code:'',//短信验证码
          name:'',//登录名
          pwd:'',//登录密码
          captcha:'',//验证码
          computeTime:0,//计时
          showPwdFlag:false,//是否显示密码，true为显示，false不显示
        }
      },
      methods: {
        getCode(){
          //启动倒计时
          //运用了循环定时器
          if(this.computeTime==0){//如果computeTime=0,代表当前没有在计时
            this.computeTime=30
          var Interval=setInterval(()=>{
      //这样会有bug，就是倒计时中再次点击会重新倒计时，而且倒数计时速度会越来越快
            this.computeTime--
            if(this.computeTime==0){
              //停止计时
              clearInterval(Interval)
            }
          },1000)
        }
      //     this.computeTime=30
      //     var Interval=setInterval(()=>{
      // //这样会有bug，就是倒计时中再次点击会重新倒计时，而且倒数计时速度会越来越快,需要在外层判断当前有没有定时器，有就不用重新开
      //       this.computeTime--
      //       if(this.computeTime==0){
      //         //停止计时
      //         clearInterval(Interval)
      //       }
      //     },1000)
        },
        login(){//前台验证表单信息
          if(this.msg==true){//true代表短信登录，false代表密码登录
            var phone=this.phone
            var code=this.code
            var rightPhone=this.rightPhone
            if(rightPhone==false){
              //手机号不正确
              Toast({
                message: '手机号不正确',
                duration: 2000
              });
              return
            }else if(/^\d{6}$/.test(code)==""){
              //提示验证码必须是6位数字
              Toast({
                message: '验证码必须是6位数字',
                duration: 2000
              });
              return
            }
            //保存用户输入的手机号到vuex
            var userphone=this.phone
            this.$store.dispatch('setUserPhone',userphone)
            //路由页面跳转
                this.$router.replace('/person')
          }else{
            //密码登录
            var name=this.name
            var pwd=this.pwd
            var captcha=this.captcha
            if(name==""){
              //用户名必须有
              Toast({
                message: '请输入用户名',
                duration: 2000
              });
            }else if(pwd==""){
              //密码必须有
              Toast({
                message: '请输入密码',
                duration: 2000
              });
            }else if(captcha==""){
              //提示验证码必须有
              Toast({
                message: '请输入验证码',
                duration: 2000
              });
            }
            var user={name:this.name,pwd:this.pwd}
            this.$store.dispatch('setUserInfo',user)
            //用户名密码登陆请求
            if(name==this.$store.state.userinfo.name&&pwd==this.$store.state.userinfo.pwd){
                //路由页面跳转
                this.$router.replace('/person')
            }else{
              Toast({
                message: '账号或者密码错误',
                duration: 2000
              });
            }
          }
        },
        getCaptcha(){//点击后获取新的图片验证码
          this.$refs.img.src="http://localhost:4000/captcha"
        }
      },
      computed: {
        rightPhone(){
          //将this.phone进行正则匹配，匹配是否开头为1，剩下10位数字
          return /^1\d{10}$/.test(this.phone)
        }
      }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import '../../assets/stylus/mixins.styl'
  .loginContainer
    width 100%
    height 100%
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #ff6700
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #ff6700
              font-weight 700
              border-bottom 2px solid #ff6700
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                &.on
                  background #ff6700
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(15px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #ff6700
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #ff6700
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
