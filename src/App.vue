<template>
  <div id="app">
    <router-view/>
    <Tabbar v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import Tabbar from '../src/components/Tabbar/tabbar'
export default {
  components:{
    Tabbar
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus"> 

</style>
