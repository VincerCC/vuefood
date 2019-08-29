<template>
  <div class="shop-info">
    <div class="info-content">
      <section class="section">
        <h3 class="section-title">配送信息</h3>
        <div class="delivery">
          <div>
            <span class="delivery-icon">好吃专送</span>
            <span>由商家配送提供配送，约{{info.deliveryTime}}分钟送达，距离{{info.distance}}m</span>
          </div>
          <div class="delivery-money">配送费￥{{info.deliveryPrice}}</div>
        </div>
      </section>
      <div class="split"></div>
      <section class="section">
        <h3 class="section-title">活动与服务</h3>
        <div class="activity">
          <div class="activity-item " :class="colorArr[item.type]" v-for="(item,index) in info.supports" :key="index">
            <span class="content-tag">
            <span class="mini-tag">{{item.name}}</span>
            </span>
            <span class="activity-content">{{item.content}}</span>
          </div>
        </div>
      </section>
      <div class="split"></div>
      <section class="section">
        <h3 class="section-title">商家实景</h3>
        <div class="pic-wrapper">
          <ul class="pic-list" ref="ul">
            <li class="pic-item" v-for="(item,index) in info.pics" :key="index">
              <img width="120" height="90" :src="item" @click="getImgArr"/>
            </li>
          </ul>
        </div>
      </section>
      <div class="split"></div>
      <section class="section">
        <h3 class="section-title">商家信息</h3>
        <ul class="detail">
          <li><span class="bold">品类</span> <span>{{info.category}}</span></li>
          <li><span class="bold">商家电话</span> <span>{{info.phone}}</span></li>
          <li><span class="bold">地址</span> <span>{{info.address}}</span></li>
          <li><span class="bold">营业时间</span> <span>{{info.workTime}}</span></li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'
  import axios from 'axios'
  import Vue from 'vue';
  //导入vant的图片预览功能
  import { ImagePreview } from 'vant';
  Vue.use(ImagePreview);
  export default {
    data () {
      return {
       colorArr:['activity-green','activity-red','activity-orange']
      }
    },
    created() {
    },
    methods: {
      getImgArr(){
        // console.log(this.info.pics)
        ImagePreview({
          images:this.info.pics,
          showIndicators:true,//图片下边的小圆点
          closeOnPopstate:true//当页面发生改变时自动关闭图片
        })
      }
    },
    computed:{
      ...mapState(['info'])
    },
    mounted(){
       new BScroll('.shop-info',{//垂直滑动对象
          click:true
          //这里不能用watch监视info的变化，因为刚进来是默认在info组件展示，他已经初始化好了，但是info组件还没初始化
        })
        new BScroll('.pic-wrapper',{//图片水平滑动对象
        click:true,
        scrollX:true
        //现在还不能滑动是因为ul的宽度347，li宽度120*5，即ul宽度没有被li撑开，只需要将ul设置为display：inline-block即可解决
        })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import '../../../assets/stylus/mixins.styl'
  .shop-info
    position: absolute
    top: 195px
    bottom: 0
    left: 0
    width: 100%
    background: #fff;
    overflow: hidden
    .section
      padding 16px 14px 14px
      font-size 16px
      background-color #fff
      color #666
      border-bottom 1px solid #eee
      position relative
      .section-title
        color #000
        font-weight 700
        line-height 16px
        > .iconfont
          float right
          color #ccc
      .delivery
        margin-top 16px
        font-size 13px
        line-height 18px
        .delivery-icon
          width 55px
          font-size 11px
          margin-right 10px
          display inline-block
          text-align center
          color #fff
          background-color #0097ff
          padding 1px 0
          border-radius 4px
        .delivery-money
          margin-top 5px
  .activity
    margin-top 16px
    .activity-item
      margin-bottom 12px
      display flex
      font-size 13px
      align-items center
      &.activity-green
        .content-tag
          background-color rgb(112, 188, 70)
      &.activity-red
        .content-tag
          background-color rgb(240, 115, 115)
      &.activity-orange
        .content-tag
          background-color: rgb(241, 136, 79)
      .content-tag
        display inline-block
        border-radius 2px
        width 36px
        height: 18px
        margin-right 10px
        color #fff
        font-style normal
        position relative
        .mini-tag
          position absolute
          left 0
          top 0
          right -100%
          bottom -100%
          font-size 24px
          transform scale(.5)
          transform-origin 0 0
          display flex
          align-items center
          justify-content center
  .pic-wrapper
    width 100%
    overflow hidden
    white-space nowrap
    margin-top 16px
    .pic-list
      font-size 0
      display inline-block
      .pic-item
        display inline-block
        margin-right: 6px
        width: 120px
        height: 90px
        &:last-child
          margin: 0
  .detail
    margin-bottom -16px
    > li
      display flex
      justify-content space-between
      align-items center
      margin-right -10px
      padding 16px 12px 16px 0
      line-height 16px
      bottom-border-1px(#ddd)
      font-size 13px
      > .bold
        font-weight 700
        color #333
      &:last-child
       border-none()
  .split
    width: 100%
    height: 16px
    border-top: 1px solid rgba(7, 17, 27, 0.1)
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    background: #f3f5f7
</style>
