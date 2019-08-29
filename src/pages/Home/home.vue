<template>
    <section class="msite">
       <!--首页头部-->
       <HeaderTop :title="$store.state.address.name">
          <!--将HeaderTop中solt插槽中left和right替换为span-->
        <router-link to="/search" class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
        </router-link>

        <router-link class="header_login" slot="right" :to="$store.state.userinfo.name||$store.state.userphone?'/person':'/login'">
          <i class="iconfont icon-solid-person" v-if="$store.state.userinfo.name||$store.state.userphone"></i>
          <span class="header_login_text" v-else>登录/注册</span>
        </router-link>
      </HeaderTop>
         <!--首页轮播-->
      <nav class="msite_nav">
        <div class="swiper-container" >
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(items,index) in shopArr" :key="index">
              <a href="javascript:" class="link_to_food" v-for="(item,index) in items" :key="index">
                <div class="food_container">
                     <img :src="baseImg+item.image_url">
                </div>
                <span>{{item.title}}</span>
              </a>
            </div>
          </div>
            <!-- 轮播分页符  -->
          <div class="swiper-pagination"></div>
        </div>
      </nav>
      <ShopList></ShopList>
    </section>
</template>

<script>
import axios from 'axios'
//引入swiper轮播
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import ShopList from '../../components/ShopList/ShopList.vue'
export default {
   data() {
      return {
        baseImg:'http://localhost:4000',
        foodTypeList:[],//轮播图食品分类数组
        leftFoodTypeList:[],//轮播图第一张的食品数组
        rightFoodTypeList:[],//轮播图第二张食品数组
      }
  },
   components:{
      HeaderTop,
      ShopList
  },
  computed: {
    //根据foodTypeList生成二维数组shopArr,小数组中最大元素8个
    shopArr(){
      //准备空二维数组
      const arr=[]
      var minarr=[]
      //遍历this.foodTypeList
      this.foodTypeList.forEach(item => {
        if(minarr.length==8){//当这个小数组的长度=8，代表这个数组满了
          minarr=[]//创建新数组
        }
        if(minarr.length==0){//代表是个新数组
            arr.push(minarr)//将小数组塞到大数组中
        }
        minarr.push(item)//把元素塞到小数组
      });
      // console.log(arr)
      return arr
    }
  },
   mounted(){
      this.getAddress(),
      axios.get('/api/index_category').then(result=>{
            this.foodTypeList=result.data.data//更新state中address数组的数据
            this.leftFoodTypeList=this.foodTypeList.slice(0,8)
            this.rightFoodTypeList=this.foodTypeList.slice(8)
            // console.log(this.foodTypeList)
      })
   },
   methods: {
    getAddress(){
      this.$store.dispatch('getAddress')// 分发消息,触发store中对应的actions调用，参数(消息名，传参数) 
      // console.log(this.$store.state.address)
    }
  },
   watch: {
     foodTypeList(value){
       this.$nextTick(()=>{//解决轮播图循环轮播会变成空白的问题,要写在数据更新之后
       //一旦完成界面更新，立即调用this.$nextTick()
         new Swiper ('.swiper-container', {
        //循环轮播
        loop:true,
        //自动轮播
        autoplay:true,
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
            }
          })
       })
     }
   }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
   @import '../../assets/stylus/mixins.styl'
.msite
  width 100%
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
      .swiper-slide
        display flex
        justify-content center
        align-items flex-start
        flex-wrap wrap
        .link_to_food
          width 25%
          .food_container
            display block
            width 100%
            text-align center
            padding-bottom 10px
            font-size 0
            img
              display inline-block
              width 50px
              height 50px
          span
            display block
            width 100%
            text-align center
            font-size 13px
            color #666
      .swiper-pagination
      >span.swiper-pagination-bullet-active
        /*background #02a774*/
</style>
