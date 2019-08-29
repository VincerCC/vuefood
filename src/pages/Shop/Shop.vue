<template>
    <div>
     <ShopHead></ShopHead>
      <div class="tab">
        <div class="tab-item ">
          <router-link to="/shop/goods" :class="{active:'/shop/goods'==$route.path}" replace>点餐</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/shop/rating" :class="{active:'/shop/rating'==$route.path}" replace>评价</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/shop/info" :class="{active:'/shop/info'==$route.path}" replace >商家</router-link>
        </div>
      </div>
      <keep-alive>
        <router-view></router-view>        
      </keep-alive>
      <!--keep-alive是缓存路由组件的作用，不至于切换路由的时候将之前的状态重新更新-->
    </div>
</template>

<script>
  import ShopHead from '../../components/ShopHead/ShopHead'
  import ShopInfo from '../../pages/Shop/ShopInfo/ShopInfo'
  import ShopGoods from '../../pages/Shop/ShopGoods/ShopGoods'
  import ShopRating from '../../pages/Shop/ShopRating/ShopRating'
  export default {
    data () {
      return {
        msg: "Hello Vue.js"
      }
    },
    components:{
      ShopHead,
      ShopInfo,
      ShopGoods,
      ShopRating
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import '../../assets/stylus/mixins.styl'
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    z-index: 39
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        color #7e8c8d
        &.active
          color #ff6700
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #ff6700
</style>

