<template>
  <!-- <div class="mint-tabbar is-fixed">
    <router-link to="./home" class="mint-tab-item active">
      <div class="mint-tab-item-icon"><i class="iconfont icon-u"></i></div>
      <div class="mint-tab-item-label">外卖</div>
    </router-link>
    <router-link to="./search" class="mint-tab-item">
      <div class="mint-tab-item-icon"><i class="iconfont icon-sousuo"></i></div>
      <div class="mint-tab-item-label">发现</div>
    </router-link>
    <router-link to="./order" class="mint-tab-item">
      <div class="mint-tab-item-icon "><i class="iconfont icon-dingdan"></i></div>
      <div class="mint-tab-item-label">订单</div>
    </router-link>
    <router-link to="./person" class="mint-tab-item">
      <div class="mint-tab-item-icon"><i class="iconfont icon-solid-person"></i></div>
      <div class="mint-tab-item-label">我的</div>
    </router-link> 
</div> -->


<nav class="mui-bar mui-bar-tab">
			<router-link to="./home" class="mui-tab-item">
                <i class="mui-icon iconfont icon-u"></i>
				<span class="mui-tab-label">外卖</span>
			</router-link>
			<router-link to="./search" class="mui-tab-item">
                <i class="mui-icon iconfont icon-sousuo"></i>
				<span class="mui-tab-label">发现</span>
			</router-link>
			<router-link to="./order" class="mui-tab-item">
                <i class="mui-icon iconfont icon-dingdan"></i>
				<span class="mui-tab-label">关于我</span>
			</router-link>
			<router-link to="./person" class="mui-tab-item">
                <i class="mui-icon iconfont icon-solid-person"></i>
				<span class="mui-tab-label">我的</span>
			</router-link>
</nav>
</template>

<script>
export default {
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.mui-bar-tab .mui-tab-item.mui-active
    color #FF6700

</style>
