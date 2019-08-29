<template>
<div>
    <div class="shopcart">
      <div class="shopcart_content">
        <div class="content-left" @click="isShow">
          <div class="logo-wrapper">
            <div class="logo " :class="{highlight:totalCount>0}">
              <i class="iconfont icon-gouwuche "></i>
            </div>
            <div class="num" v-if="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price " :class="{highlight:totalCount>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{$store.state.info.deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">
            {{payText}}
          </div>
        </div>
      </div>
      <transition name="listMove">
      <div class="shopcart-list" v-show="showComputed">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="clearAllFood">清空</span>
        </div>
        <div class="list-content">
            <ul class="content">
              <li class="food" v-for="(item,index) in $store.state.cartFoods" :key="index">
                <span class="name">{{item.name}}</span>
                <div class="price"><span>￥{{item.price}}</span></div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="item"></CartControl>
                </div>
              </li>
            </ul>
        </div>
      </div>
      </transition>
    </div>
      <div class="list-mask" v-show="showComputed" @click="isShow"></div>
    </div>
</template>
<script>
  import CartControl from '../../components/CartControl/CartControl.vue'
  import BScroll from 'better-scroll'
  import { MessageBox } from 'mint-ui'
  import { Toast } from 'mint-ui';

  export default {
    //ShopCart需要得到所有food.count>0的那一项的数据组合成数组，放到vuex中管理方便存取
    data () {
      return {
        flag:false,
      }
    },
    computed: {
      totalCount(){
        return this.$store.getters.totalCount
      },
      totalPrice(){
        return this.$store.getters.totalPrice
      },
      payClass(){
        var totalPrice=this.totalPrice//当前总价
        var minprice=this.$store.state.info.minPrice
        return totalPrice>=minprice?'enough':'not-enough'
      },
      payText(){
        var totalPrice=this.totalPrice
        var minprice=this.$store.state.info.minPrice
        if(totalPrice==0){
          return "￥"+minprice+"元起送"
        }else if(totalPrice<minprice){
          return "差￥"+(minprice-totalPrice)+"元送"
        }else{
          return "去结算"
        }
      },
      showComputed(){
        if(this.$store.getters.totalCount==0){
          this.flag=false
          return false
        }
        
        if(this.flag==true){
            this.$nextTick(()=>{// 在购物车列表显示之后创建new BScroll(wrapper)
            //一旦购物车显示出来，立即调用this.$nextTick()
            if(!this.scroll){//判断当前有没有this.scroll，没有的话就执行下边的代码
              let wrapper = document.querySelector('.list-content')
              this.scroll = new BScroll(wrapper,{
              click:true
              })
            }else{
              this.scroll.refresh()
              //当第一次打开购物车,里边的商品没形成滚动条
              //在第二次打开的时候加了很多商品进去形成滚动条，这时候并不能滑动马上这个列表，要第二次才能滑动，交互不好
            }
            
//因为这里的点击事件是better-scroll分发的，当我们多点几次购物车的显示消失后，在购物车里面再点加号，不是只加1，而是加好多次1
//解决办法加个if判断，判断是不是已经创建过BScroll，有的话就不再创建
            
          }
        )}
        return this.flag
        }
    },
    methods: {
      isShow(){
        if(this.$store.getters.totalCount>0){
          //如果不加if判断,当刚进来页面购物车没东西的时候，点购物车不会显示，但是再点加的时候会弹出购物车，交互效果不好
        this.flag=!this.flag
        }
      },
      clearAllFood(){
         MessageBox.confirm('确定清空购物车吗?').then(
          action => {
          // console.log("点了确认")
          this.$store.dispatch('clearAllFood')
          Toast('已清空!')
          })
        }
    },
    components:{
      CartControl
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import '../../assets/stylus/mixins.styl'
  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .shopcart_content
      display flex
      background #141d27
      font-size 0
      color rgba(255, 255, 255, 0.4)
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          vertical-align top
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          border-radius 50%
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background #2b343c
            &.highlight
              background $green
          .icon-gouwuche
            line-height 44px
            font-size 24px
            color #fff
            &.highlight
              color #fff
        .num
          position absolute
          top 0
          right 0
          width 24px
          height 16px
          line-height 16px
          text-align center
          border-radius 16px
          font-size 9px
          font-weight 700
          color #ffffff
          background rgb(240, 20, 20)
          box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
      .price
        display inline-block
        vertical-align top
        margin-top 5px
        line-height 24px
        padding-right 12px
        box-sizing border-box
        font-size 16px
        font-weight 700
        color #fff
        &.highlight
          color #fff
      .desc
        display inline-block
        vertical-align bottom
        margin-bottom 15px
        margin-left -45px
        font-size 10px
    .content-right
      flex 0 0 105px
      width 105px
      .pay
        height 48px
        line-height 48px
        text-align center
        font-size 12px
        font-weight 700
        color #fff
        &.not-enough
          background #2b333b
        &.enough
          background #00b43c
          color #fff
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width 16px
          height 16px
          border-radius 50%
          background $green
          transition all 0.4s linear
    .shopcart-list
      position absolute
      left 0
      top 0
      z-index -1
      width 100%
      transform translateY(-100%)
      &.listMove-enter-active, &.listMove-leave-active
        transition transform .3s
      &.listMove-enter, &.listMove-leave-to
        transform translateY(0)
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        .title
          float left
          font-size 14px
          color rgb(7, 17, 27)
        .empty
          float right
          font-size 12px
          color rgb(0, 160, 220)
      .list-content
        padding 0 18px
        max-height 217px
        overflow hidden
        background #fff
        &ul
         position relative
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height 24px
            font-size 14px
            color rgb(7, 17, 27)
          .price
            position absolute
            right 90px
            bottom 12px
            line-height 24px
            font-size 14px
            font-weight 700
            color rgb(240, 20, 20)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 6px
  .list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40
    backdrop-filter blur(10px)
    opacity 1
    background rgba(7, 17, 27, 0.6)
  &.fade-enter-active, &.fade-leave-active
    transition all 0.5s
  &.fade-enter, &.fade-leave-to
    opacity 0
    background rgba(7, 17, 27, 0)
</style>
