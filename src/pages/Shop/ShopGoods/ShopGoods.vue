<template>
    <div>
      <div>
        <div class="goods">
          <div class="menu-wrapper">
            <div class="content">
            <ul>
              <!--下面的li是显示食物分类列表-->
              <li class="menu-item " v-for="(item,index) in $store.state.goods" :key="index" :class="{current:index==currentIndex}" @click="clickMenuItem(index)">
              <!--<li class="menu-item current">-->
                <span class="text bottom-border-1px">
                <img class="icon" :src="item.icon" :style="item.icon?'block':'display:none'" v-if="item.icon">
                {{item.name}}
                </span>
              </li>
            </ul>
            </div>
          </div>
          <div class="foods-wrapper">
            <div class="content" ref="foodTop">
            <ul v-for="(item,index) in $store.state.goods" :key="index">
              <li class="food-list-hook">
                <h1 class="title">{{item.name}}</h1>
                  <ul v-for="(food,index) in item.foods" :key="index" @click="showfood(food)">
                    <!--下面的li是显示某一个分类列表的食物列表-->
                    <li class="food-item bottom-border-1px">
                      <div class="icon">
                        <img width="57" height="57" :src="food.icon">
                      </div>
                      <div class="content">
                        <h2 class="name">{{food.name}}</h2>
                        <p class="desc">{{food.description}}</p>
                        <div class="extra">
                          <span class="count">月售 {{food.sellCount}} 份</span>
                          <span>好评率 {{food.rating}}%</span>
                        </div>
                        <div class="price">
                          <span class="now">￥{{food.price}}</span>
                          <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                        </div>
                        <div class="cartcontrol-wrapper">
                          <CartControl :food="food"></CartControl>
                          <!--将food传给子组件CartControl-->
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        <ShopCart></ShopCart>
        </div>
        <Food :food="food" ref="Food"></Food>
      </div>
    </div>
</template>



<script>
  import BScroll from 'better-scroll'//引入better-scroll后需要在列表显示之后,创建new BScroll(wrapper)
  import Food from '../../../components/Food/Food'
  import CartControl from '../../../components/CartControl/CartControl.vue'
  import ShopCart from '../../../components/ShopCart/ShopCart'
  export default {
    data () {
      return {
        getShopGoods:[],
        scrollY:0,//右侧列表滑动的实时Y坐标
        tops:[],//所有右侧分类li的top值
        Fscroll:'',
        food:{},//点击后得到food,
        
      }
    },
    mounted() {
      this.$store.dispatch('getShopGoods')
    },
    components:{
      Food,
      CartControl,
      ShopCart
    },
    computed: {//计算属性执行时机，1.初始化执行一次 2.相关数据发生变化执行
      currentIndex(){//得到当前分类的下标
        //先得到相关的条件数据scroll,tops
        var scrollY=this.scrollY
        var tops=this.tops
        //根据条件计算产生结果
          var index=tops.findIndex((item,index)=>{
            //当前scrollY>=当前top&&当前scrollY<下一个top
            return scrollY>=item&&scrollY<tops[index+1]
          })
        //返回结果
        return index
      }
    },
    watch: {
     '$store.state.goods'(value){
       this.$nextTick(()=>{// 在数据列表显示之后创建new BScroll(wrapper)
       //一旦完成界面更新，立即调用this.$nextTick()
        let Mwrapper = document.querySelector('.menu-wrapper')
        let Fwrapper = document.querySelector('.foods-wrapper')
        let Mscroll = new BScroll(Mwrapper,{
        click:true
        })
        this.Fscroll = new BScroll(Fwrapper,{//右侧列表滑动
        probeType:3,
        click:true
//需要知道滚动的位置。
// 当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；
// 当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；
// 当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。
// 如果没有设置该值， 其默认值为 0，即不派发 scroll 事件。
        })
        //给右侧列表绑定scroll监听
        this.Fscroll.on('scroll',(event)=>{
          // 收集滑动的scrollY值
          this.scrollY=Math.abs(event.y)
          // console.log(event.x,event.y)
          // console.log(this.scrollY)
        })
        
        //1.初始化tops
        var tops=[]
        var top=0
        tops.push(top)
        //2.收集：先找到右侧分类的li
        var lis=document.getElementsByClassName('food-list-hook')
        for(var i=0;i<lis.length;i++){
          //计算所有li的top值，分别保存到tops数组中
          top+=lis[i].clientHeight
          tops.push(top)
        }
        //3.更新数据
        this.tops=tops
        console.log(this.tops)
       })
     }
   },
   methods: {
      clickMenuItem(index){
        console.log(index)
        
        //点击左侧分类，使右侧滑动到 对应的位置
        var y=this.tops[index]
        this.scrollY=y
        this.Fscroll.scrollTo(0,-y)
      },
      showfood(food){
        //设置food
        this.food=food
        //显示food食物详情组件
        //父组件如何调用子组件的方法：在子组件的标签中用ref=""标识，然后通过this.$refs.Food.toggle()
        this.$refs.Food.toggle()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import '../../../assets/stylus/mixins.styl'
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 100%
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
