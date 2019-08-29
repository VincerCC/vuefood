<template>
    <div class="order">
      <HeaderTop :title="title"></HeaderTop>
      <div class="head">
            <img src="../../../static/images/timg.jpg" alt="">
            <p>刘颖聪</p>
        </div>
        
        <div class="mui-card">
				<div class="mui-card-header">项目名称:外卖小项目</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                    
					<p>	项目框架:Vue 2.X</p>
          <p>	项目脚手架:Vue-cli</p>
          <p> UI 框架:Mint-UI&&MUI</p>
          <p> 打包工具:webpack</p>
					</div>
				</div>
				<!-- <div class="mui-card-footer">页脚</div> -->
		</div>
        <div class="mui-card">
				<div class="mui-card-header">作者：刘颖聪</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                    
					<p>	电话：15219173446</p>
                    <p> 邮箱：858860068@qq.com</p>
              		<h1>扫一扫加我微信</h1>
					<img src="../../../static/images/wechat.jpg" alt="" @click="bigImage">
					</div>
				</div>
		</div>
    </div>
</template>

<script>
//图片预览导入
  import Vue from 'vue'
  import { ImagePreview } from 'vant';
  Vue.use(ImagePreview);
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  export default {
    data(){
      return {
        title:'关于我'
      }
    },
    methods: {
      bigImage(){
        // console.log(this.info.pics)
        ImagePreview({
          images:['../../../static/images/wechat.jpg'],
          showIndicators:true,//图片下边的小圆点
          closeOnPopstate:true//当页面发生改变时自动关闭图片
        })
      }
    },
    components:{
      HeaderTop
    },
    
  }
</script>

<style scoped >
.order{
   width:100%
  }
.head{
  margin-top:45px;
  text-align: center;
}
.head p{
  font-size: 16px
  }
.mui-card{
  text-align: left;
  box-shadow: 0px 0px 5px #999;
  }
.mui-card .mui-card-footer{
	justify-content: flex-start;
	}
.order .head img{
	border-radius: 50%;
	width: 80px;
  height: 80px;
  }
.mui-card h1{
  text-align: center;
  }
.mui-card .thumbs{
  text-align: center;
  }
.thumbs .my-gallery figure{
	display: inline-block;
	margin: 5px;
	}
.thumbs .my-gallery figure img{
	width: 200px;
	height: 200px;
	}
.mui-card-content-inner{
	text-align: center;
	}
.mui-card-content-inner img{
	width: 200px;
	height: 200px;
	}
</style>
