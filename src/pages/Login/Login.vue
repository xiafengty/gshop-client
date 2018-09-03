<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:LoginWay}" @click="getLoginWay(true)">短信登录</a>
          <a href="javascript:;" :class="{on:!LoginWay}" @click="getLoginWay(false)">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:LoginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!isRightPhone || computedTime>0" class="get_verification"
                  :class="{right_phone_number:isRightPhone}"     @click.prevent="sendCode"
              >{{computedTime>0? `已发送(${computedTime}s)`:"发送验证码"}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!LoginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input :type="isShowPwd?'text':'password'" maxlength="8" placeholder="密码" v-model="pwd">
                <div class="switch_button" :class="isShowPwd?'off':'on'" @click="isShowPwd=!isShowPwd">
                  <div class="switch_circle" :class="isShowPwd?'right':''"></div>
                  <span class="switch_text">
                    {{isShowPwd?'off':'on'}}
                  </span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha"
                     @click="updateCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="goBack">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>
<script>
  import {Toast, MessageBox} from 'mint-ui'
  import {reqSendcode,reqLoginPwd,reqLoginSms} from "../../api";
  export default {
    data(){
      return {
        LoginWay:true,  // true 短信  false用户名
        phone:"",   //电话号码
        code:"",
        name:"",
        pwd:"",
        src:"",
        captcha:"", //图片验证码
        computedTime:0, //剩余倒计时时间
        isShowPwd:false, //是否显示密码
      }
    },
    computed:{
      isRightPhone(){
        return /^1\d{10}$/.test(this.phone);
      },
      isRightCode(){
        return /^\d{6}$/.test(this.code)
      }
    },
    methods:{
      /*登录方式*/
      getLoginWay(LoginWay){
        this.LoginWay=LoginWay;
      },
      /*发送短信验证码*/
      async sendCode(){
        this.computedTime=30;
        let interverId=setInterval(()=>{
          this.computedTime--;
          if(this.computedTime<=0){
            clearInterval(interverId);
          }
        },1000);
        const result = await reqSendcode(this.phone);
        if(result.code===0){
          Toast('发送成功');
        }else{
          MessageBox("发送失败，请稍后重试！");
          this.computedTime=0;
        }
      },
      /*登录验证*/
      async login(){
        let result;
        if(this.LoginWay){  //短信验证
          const {isRightPhone,isRightCode,phone,code} = this;
          if(!isRightPhone){
            Toast("请输入正确的手机号！");
            return;
          }
          if(!isRightCode){
            Toast("请输入正确的验证码！");
            return;
          }
          result = await reqLoginSms({phone,code});
        }else {
          const {name,pwd,captcha} = this;
          if(!name){
            Toast("请输入用户名");
            return;
          }else if(!pwd){
            Toast("请输入密码");
            return;
          }else if(!captcha){
            Toast("请输入验证码");
            return;
          }
          result = await reqLoginPwd({name,pwd,captcha});
        }
        if(result.code===0){
            const userInfo =result.data;
            this.$store.dispatch("saveUserInfo",{userInfo});
            Toast("登录成功");
            this.$router.replace("/profile");
        }else{
          Toast(result.msg);
        }

      },
      updateCaptcha(e){
         e.target.src="http://localhost:4000/captcha?time="+Date.now();
      },
      goBack(){
        this.$router.back();
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          float left
          &:first-child
            margin-right 40px
            margin-left 75px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
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
              &.right_phone_number
                color: black
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
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle

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
                  transform translateX(27px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
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
