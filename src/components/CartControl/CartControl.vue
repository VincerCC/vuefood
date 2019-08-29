<template>
  <div class="cartcontrol">
    <transition name="remove">
      <div class="iconfont icon-remove" v-if="food.count" @click.stop="reduce()"></div>
    </transition>
    <!--food.count有值的时候才显示-->
    <div class="cart-count" v-if="food.count">{{food.count}}</div>
    <div class="iconfont icon-jia" @click.stop="add()"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    props:['food'],
    methods:{
      add(){
        this.$store.dispatch('add',this.food)
      },
      reduce(){
        this.$store.dispatch('reduce',this.food)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import '../../assets/stylus/mixins.styl'
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .icon-remove
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green
    .remove-enter,.remove-leave-to
        opacity 0
        transform translateX(50px)
        transform rotate(90deg)
    .remove-enter-active,.remove-leave-active
        transition: all 0.2s linear;

    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-jia
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color $green
</style>
