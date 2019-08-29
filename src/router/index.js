import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../pages/Home/home.vue'
import order from '../pages/Order/order.vue'
import search from '../pages/Search/search.vue'
import person from '../pages/Person/person.vue'
import Login from '../pages/Login/Login.vue'
import shop from '../pages/Shop/Shop.vue'
import shopgoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import shopinfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import shoprating from '../pages/Shop/ShopRating/ShopRating.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes:[//配置路由规则
		{path:'/',redirect:'/home'},
        {path:'/home',component:home,meta:{showFooter:true}},
        //meta:{showFooter:true}可以用来标识这里需要显示footer组件，在App.vue用过v-show="$route.meta.showFooter"控制显示
        {path:'/order',component:order,meta:{showFooter:true}},
        {path:'/search',component:search,meta:{showFooter:true}},
        {path:'/person',component:person,meta:{showFooter:true}},
        {path:'/login',component:Login},
        {path:'/shop',component:shop,
        children:[
            {path:'/shop/goods',component:shopgoods},
            {path:'/shop/info',component:shopinfo},
            {path:'/shop/rating',component:shoprating},
            {path:'',redirect:'/shop/goods'}
        ]}
    ],
    linkActiveClass:'mui-active'//设置路由高亮
})
