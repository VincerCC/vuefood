<template>
  <div >
      <div class="ratings" ref="ratings">
      <div class="ratings-content">
        <div class="overview">
          <div class="overview-left">
            <h1 class="score">{{info.score}}</h1>
            <div class="title">综合评分</div>
            <div class="rank">高于周边商家{{info.rankRate}}%</div>
          </div>
          <div class="overview-right">
            <div class="score-wrapper">
              <span class="title">服务态度</span>
              <Star :rating="info.serviceScore" :size="36" />
              <span class="score">{{info.serviceScore}}</span>
            </div>
            <div class="score-wrapper">
              <span class="title">商品评分</span>
              <Star :rating="info.foodScore" :size="36" />
              <span class="score">{{info.foodScore}}</span>
            </div>
            <div class="delivery-wrapper">
              <span class="title">送达时间</span>
              <span class="delivery">{{info.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
      <div class="split"></div>
      <div class="ratingselect">
        <div class="rating-type border-1px">
          <span class="block positive " :class="{active:selectType==2}" @click="setSeclectType(2)">
            全部<span class="count">{{$store.state.ratings.length}}</span>
          </span>
          <span class="block positive" :class="{active:selectType==0}" @click="setSeclectType(0)">
          满意<span class="count">{{getAgreeRatingSize}}</span>
          </span>
          <span class="block negative" :class="{active:selectType==1}" @click="setSeclectType(1)">
          不满意<span class="count">{{$store.state.ratings.length-getAgreeRatingSize}}</span>
          </span>
        </div>
        <div class="switch" :class="{on:OnlyContentRatings}" @click="toggleOnlyContent">
          <span class="iconfont icon-duigou"></span>
          <span class="text">只看有内容的评价</span>
        </div>
      </div>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(item,index) in filterRatings" :key="index">
            <div class="avatar">
              <img width="28" height="28"
            :src="item.avatar">
            </div>
          <div class="content">
            <h1 class="name">{{item.username}}</h1>
            <div class="star-wrapper">
              <Star :rating="item.score" :size="24" />
              <span class="delivery">{{item.deliveryTime}}</span>
            </div>
            <p class="text">{{item.text}}</p>
            <div class="recommend">
              <span class="iconfont " :class="item.rateType==0?'icon-tuijian':'icon-tucao-tianchong'"></span>
              <span class="item" v-for="(num,index) in item.recommend" :key="index">{{num}}</span>
            </div>
            <div class="time">{{item.rateTime|dateString}}</div>
          </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import Star from '../../../components/Stars/star'
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  export default {
    data () {
      return {
          OnlyContentRatings:true,//true代表勾选只看带文本内容的
          selectType:2,//0代表好评，1代表差评，2代表全部
          getAgreeRatingSize:''
      }
    },
    mounted() {
      this.$store.dispatch('getShopRating')
    },
    methods:{
      setSeclectType(num){
        this.selectType=num
      },
      toggleOnlyContent(){
        this.OnlyContentRatings=!this.OnlyContentRatings
      }
    },
    components:{
      Star
    },
    watch: {
      '$store.state.ratings'(value){
        this.$nextTick(()=>{
          let wrapper = document.querySelector('.ratings')
          let scroll = new BScroll(wrapper,{
          click:true
          })
        })
      }
    },
    computed: {
      ...mapState(['info']),
      filterRatings(){//过滤好评和差评
        //得到相关的数据
        var ratings=this.$store.state.ratings
        var OnlyContentRatings=this.OnlyContentRatings
        var selectType=this.selectType
        this.getAgreeRatingSize=this.$store.getters.getAgreeRatingSize//将过滤出来的好评数量赋给data保存
        //过滤计算并返回新数组
        return ratings.filter((item,index)=>{
          /*
            条件1：selectType=0/1/2
                   rateType=0/1
            条件2：OnlyContentRatings=true/false
                   text评论的文本：空串/不空
                   OnlyContentRatings=true要求text评论的文本不为空
                   OnlyContentRatings==false，不用管text是否为空
          */
          if(selectType===2){
            if(OnlyContentRatings==false){
              return true
            }else{
              if(item.text!=''){
                return true
              }
            }
            //如果选中的是全部，并且没有勾选√，直接返回原数组，不用管有没有文本
            //如果选中的是全部，并且有勾选√，判断item.text是否为空，返回text不为空的数组
          }
          if(selectType===0){
            if(OnlyContentRatings==false){
              return item.rateType == 0
            }else{
              if(item.text!=''){
                return item.rateType == 0
              }
            }
            //如果选中的是好评，并且没有勾选√，直接返回原数组，不用管有没有文本
            //如果选中的是好评，并且有勾选√，判断item.text是否为空，返回text不为空的数组
          }
          if(selectType===1){
            if(OnlyContentRatings==false){
              return item.rateType == 1
            }else{
              if(item.text!=''){
                return item.rateType == 1
              }
            }
            //如果选中的是差评，并且没有勾选√，直接返回原数组，不用管有没有文本
            //如果选中的是差评，并且有勾选√，判断item.text是否为空，返回text不为空的数组
          }
        })
      }
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import '../../../assets/stylus/mixins.styl'
  .ratings
    position: absolute
    top: 195px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    background: #fff
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            margin: 0 12px
            vertical-align: top
          .score
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
        .delivery-wrapper
          font-size: 0
          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          .delivery
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153, 159)
  .split
    width: 100%
    height: 16px
    border-top: 1px solid rgba(7, 17, 27, 0.1)
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    background: #f3f5f7
  .ratingselect
    .rating-type
      padding: 18px 0
      margin: 0 18px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size: 0
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        font-size: 12px
        color: rgb(77, 85, 93)
        background: rgba(77, 85, 93, 0.2)
        &.active
          background: #ff6700
          color: #fff
        .count
          margin-left: 2px
          font-size: 8px
    .switch
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0
      &.on
        .icon-duigou
          color: #ff6700
      .icon-duigou
        display: inline-block
        vertical-align: top
        margin-right: 4px
        font-size: 24px
      .text
        display: inline-block
        vertical-align: top
        font-size: 12px
  .rating-wrapper
    padding: 0 18px
    padding-bottom 20px
    .rating-item
      display: flex
      padding: 18px 0
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      .avatar
        flex: 0 0 28px
        width: 28px
        margin-right: 12px
        img
          border-radius: 50%
      .content
        position: relative
        flex: 1
        .name
          margin-bottom: 4px
          line-height: 12px
          font-size: 15px
          color: rgb(7, 17, 27)
        .star-wrapper
          margin-bottom: 6px
          font-size: 0
          line-height: 10px
          .star
            display: inline-block
            margin-right: 6px
            vertical-align: top
          .delivery
            display: inline-block
            vertical-align: top
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
        .text
          margin-bottom: 8px
          line-height: 18px
          color: rgb(7, 17, 27)
          font-size: 12px
        .recommend
          line-height: 16px
          font-size: 0
          .item
            display: inline-block
            margin: 0 8px 4px 0
            font-size: 9px
          .icon-tuijian
            color: $yellow
            display: inline-block
            margin: 0 8px 4px 0
            font-size: 16px
          .icon-tucao-tianchong
            display: inline-block
            margin: 0 8px 4px 0
            font-size: 9px
            color: rgb(147, 153, 159)
          .item
            padding: 0 6px
            border: 1px solid rgba(7, 17, 27, 0.1)
            border-radius: 1px
            color: rgb(147, 153, 159)
            background: #fff
        .time
          position: absolute
          top: 0
          right: 0
          line-height: 12px
          font-size: 10px
          color: rgb(147, 153, 159)
</style>
