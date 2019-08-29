<template>
  <section class="search">
    <HeaderTop :title="title"></HeaderTop>
    <form class="search_form" >
      <input type="search" placeholder=" 请输入商家名称" class="search_input" >
      <input type="submit" class="search_submit" @click="search">
    </form>
  </section>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import {Toast} from 'mint-ui'
  export default {
    data(){
      return {
        title:'搜索'
      }
    },
    components:{
      HeaderTop
    },
    methods:{
      search(){
        Toast("功能未完成")
      }
    },
    computed:{
     
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import '../../assets/stylus/mixins.styl'
  .search
    width 100%
    height 100%
    overflow hidden
    .search_form
      clearFix()
      margin-top 45px
      background-color #fff
      padding 12px 8px
      input
        height 35px
        padding 0 4px
        border-radius 2px
        font-weight bold
        outline none
        &.search_input
          float left
          width 79%
          border 4px solid #f2f2f2
          font-size 14px
          color #333
          background-color #f2f2f2
        &.search_submit
          float right
          width 18%
          border 4px solid #FF6700
          font-size 16px
          color #fff
          background-color #FF6700
</style>
