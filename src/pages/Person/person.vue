<template>
    <section class="profile">
      <HeaderTop :title="title"></HeaderTop>
      <section class="profile-number">
        <router-link :to="$store.state.userinfo.name||$store.state.userphone?'/home':'/login'" class="profile-link">
          <div class="profile_image">
            <span class="iconfont icon-tubiaozhizuomoban"></span>
          </div>
          <div class="user-info">
            <p class="user-info-top" v-if="!$store.state.userphone">{{$store.state.userinfo.name||'登录/注册'}}</p>
            <p>
                <span class="user-icon">
                  <i class="iconfont icon-shouji icon-shouji"></i>
                </span>
              <span class="icon-mobile-number">{{$store.state.userphone||'暂无绑定手机号'}}</span>
            </p>
          </div>
          <span class="arrow">
              <i class="iconfont icon-arrow-right"></i>
            </span>
        </router-link>
      </section>
      <section class="profile_info_data border-1px">
        <ul class="info_data_list">
          <a href="javascript:" class="info_data_link">
            <span class="info_data_top"><span>0.00</span>元</span>
            <span class="info_data_bottom">我的余额</span>
          </a>
          <a href="javascript:" class="info_data_link">
            <span class="info_data_top"><span>0</span>个</span>
            <span class="info_data_bottom">我的优惠</span>
          </a>
          <a href="javascript:" class="info_data_link">
            <span class="info_data_top"><span>0</span>分</span>
            <span class="info_data_bottom">我的积分</span>
          </a>
        </ul>
      </section>
      <section class="profile_my_order">
        <!-- 我的订单 -->
        <a href='javascript:' class="my_order">
          <div class="my_order_div">
            <i class="iconfont icon-dingdan"></i>
            <span>我的订单</span>
          </div>
        </a>
        <!-- 积分商城 -->
        <a href='javascript:' class="my_order">
          <div class="my_order_div">
            <i class="iconfont icon-ziyuan"></i>
            <span>积分商城</span>
          </div>
        </a>
        <!-- 外卖会员卡 -->
        <a href="javascript:" class="my_order">

          <div class="my_order_div">
            <i class="iconfont icon-huiyuan"></i>
            <span>外卖会员卡</span>
          </div>
        </a>
      </section>
      <section class="profile_my_order">
        <!-- 服务中心 -->
        <a href="javascript:" class="my_order">
          <div class="my_order_div">
            <i class="iconfont icon-fuwuzhongxin"></i>
            <span>服务中心</span>
          </div>
        </a>
      </section>
      <mt-button style="margin-top:10px" type="danger" size="large" @click="out" v-if="$store.state.userinfo.name||$store.state.userphone">退出登录</mt-button>
    </section>
</template>

<script>
  import { MessageBox } from 'mint-ui'
  import { Toast } from 'mint-ui';
  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  export default {
    components:{
        HeaderTop
    },
    data(){
        return {
            title:'我的'
        }
    },
    methods: {
      out(){
        MessageBox.confirm('确定退出吗?').then(
          action => {
          // console.log("点了确认")
          this.$store.dispatch("signOut")
          Toast('退出成功!')
          },
          action => {
          console.log("点了取消")
          })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
@import '../../assets/stylus/mixins.styl'
.profile //我的
  width 100%
  overflow hidden
  .profile-number
    margin-top 45.5px
    .profile-link
      clearFix()
      position relative
      display block
      background #FF6700
      padding 20px 10px
      .profile_image
        float left
        width 60px
        height 60px
        border-radius 50%
        overflow hidden
        background-color #bfa
        .icon-tubiaozhizuomoban
          height 100%
          position relative 
          top 20px
          background #e4e4e4
          font-size 62px
      .user-info
        float left
        margin-top 8px
        margin-left 15px
        p
          font-weight: 700
          font-size 18px
          color #fff
          &.user-info-top
            padding-bottom 8px
          .user-icon
            display inline-block
            margin-left -15px
            margin-right 5px
            width 20px
            height 20px
            .icon-shouji
              font-size 30px
              vertical-align text-top
              color #e4e4e4
          .icon-mobile-number
            font-size 14px
            color #fff
      .arrow
        width 12px
        height 12px
        position absolute
        right 15px
        top 40%
        .icon-arrow-right
          color #A0A0A0
          font-size 19px
  .profile_info_data
    bottom-border-1px(#e4e4e4)
    width 100%
    background #fff
    overflow hidden
    .info_data_list
      clearFix()
      .info_data_link
        float left
        width 33%
        text-align center
        border-right 1px solid #f1f1f1
        .info_data_top
          display block
          width 100%
          font-size 14px
          color #333
          padding 15px 5px 10px
          span
            display inline-block
            font-size 30px
            color #f90
            font-weight 700
            line-height 30px
        .info_data_bottom
          display inline-block
          font-size 14px
          color #666
          font-weight 400
          padding-bottom 10px
      .info_data_link:nth-of-type(2)
        .info_data_top
          span
            color #ff5f3e
      .info_data_link:nth-of-type(3)
        border 0
        .info_data_top
          span
            color #6ac20b
  .profile_my_order
    margin-top 10px
    background #fff
    .my_order
      display flex
      align-items center
      >span
        display flex
        align-items center
        width 20px
        height 20px
        >.iconfont
          margin-left -10px
          font-size 30px
        .icon-order-s
          color #02a774
        .icon-jifen
          color #ff5f3e
        .icon-vip
          color #f90
        .icon-fuwu
          color #02a774
      .my_order_div
        width 100%
        border-bottom 1px solid #f1f1f1
        padding 18px 10px 18px 0
        font-size 16px
        color #333
        display flex
        justify-content flex-start
        i
            color #ff6700
            margin-left 20px
        span
          margin-left 10px
          display block
        .my_order_icon
          width 10px
          height 10px
          .icon-jiantou1
            color #bbb
            font-size 10px
</style>
