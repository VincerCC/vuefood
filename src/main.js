// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import '../node_modules/mint-ui/lib/style.css'
//按需导入按钮组件
import { Button } from 'mint-ui';
Vue.component(Button.name, Button);

//导入MUI库
import '../static/MUI/css/mui.min.css'
import '../static/MUI/css/icons-extra.css'
//引入store
import store from './store/store'
Vue.config.productionTip = false

//引入mockServer.js
import './mock/mockServer'

//加载过滤器
import './filters/index'



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render:c=>c(App),
  store
})
