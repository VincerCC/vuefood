<template>
  <div :class="'star star-'+size">
  <!-- <div class="star star-24"> -->
    <span v-for="(item,index) in starsArr" :class="'star-item '+item" :key="index"></span>
    <!-- <span class="star-item on"></span>
    <span class="star-item on"></span>
    <span class="star-item on"></span>
    <span class="star-item half"></span>
    <span class="star-item off"></span> -->
  </div>
</template>
<script>
  export default {
    props: ['rating','size'],//rating评分,size尺寸大小
    data(){
      return{
        score:0,
        starsArr:[]
      }
    },
    mounted() {
      var starsArr=[]
        this.score=this.rating
        var num= Math.floor(this.score)//得到评分的整数部分，floor为向下取整
//        console.log(num)
        if(num>=1){//评分>1加一个全星
          for(var i=0;i<num;i++){
            this.starsArr.push('on')
          }
        }
        if(this.score*10-num*10>=5){//小数部分>=0.5，添加半星
          this.starsArr.push('half')
        }
        while(this.starsArr.length<5){//剩下的星全为灰星
          this.starsArr.push('off')
        }
        
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import '../../assets/stylus/mixins.styl'
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./img/star48_on')
        &.half
          bg-image('./img/star48_half')
        &.off
          bg-image('./img/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./img/star36_on')
        &.half
          bg-image('./img/star36_half')
        &.off
          bg-image('./img/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./img/star24_on')
        &.half
          bg-image('./img/star24_half')
        &.off
          bg-image('./img/star24_off')
</style>
