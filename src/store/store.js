/*vuex的核心管理模块*/ 
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{//在需要用的地方，在模板(html代码)中用$store.state.xxx使用数据，在js中要加上this
        latitude:40.10038,//纬度
        longitude:116.36867,//经度
        userinfo:{name:'',pwd:null},//模拟初始账号密码
        userphone:'',
        address:[],//经纬度信息
        shopList:[],//首页商家列表
        goods:[],//食物列表
        ratings:[],//商家评论
        info:{},//商家信息
        cartFoods:[],//购物车中食物的列表
    },//状态、数据
    mutations:{
        //更新地址信息
        getAddress(state,getaddress){//mutations接收actions传过来的参数
            state.address=getaddress//更新state中address数组的数据
        },
        //更新商品列表
        getShopList(state,getshoplist){
            state.shopList=getshoplist
        },
        setUserInfo(state,user){
            state.userinfo.name=user.name
            state.userinfo.pwd=user.pwd
        },
        setUserPhone(state,userphone){
            state.userphone=userphone
        },
        signOut(state){
            state.userinfo={}
            state.userphone=''
        },
        //更新info信息
        getShopInfo(state,Info){
            state.info=Info
        },
        //更新goods信息
        getShopGoods(state,Goods){
            state.goods=Goods
        },
        //更新ratings信息
        getShopRating(state,Rating){
            state.ratings=Rating
        },
        add(state,food){
            if(!food.count){
                //food.count=1//新增一个属性count，这样写是没有数据绑定效果的，需要用Vue.set(对象,'属性名',属性值)
                Vue.set(food,'count',1)
                //将food添加到cartFoods中
                state.cartFoods.push(food)
            }else{
                food.count++
            }
        },
        reduce(state,food){
            if(food.count>0){
                food.count--
                if(food.count==0){
                    //计算出当前food在cartFoods的下标
                    var index = state.cartFoods.indexOf(food)
                    //将food从cartFoods中移除
                    state.cartFoods.splice(index,1)
                }
            }
        },
        clearAllFood(state){
            //先遍历cartFoods，将里边的count设置为0
            state.cartFoods.forEach(item=>item.count=0)
            //然后将cartFoods设置为空数组
           state.cartFoods=[]
        }
        

    },//包含多个更新state数据的对象
    actions:{
        //异步获取地址信息
        getAddress({commit,state}){
            // var geohash = state.latitude+','+state.longitude
            axios.get('/api/position/'+state.latitude+','+state.longitude).then(result=>{
                var getaddress=result.data.data//将接受到的数据保存起来，通过commit传参数给mutations
                commit('getAddress',getaddress)
            })
            
        },
        //异步获取商品信息
        getShopList({commit,state}){
            axios.get('/api/shops?latitude='+state.latitude+'&longitude='+state.longitude).then(result=>{
                var getshoplist=result.data.data
                commit('getShopList',getshoplist)
            })
        },
        setUserInfo({commit},user){
            commit('setUserInfo',user)
        },
        setUserPhone({commit},userphone){
            commit('setUserPhone',userphone)
        },
        signOut({commit}){
            commit('signOut')
        },
        //异步获取mock的Info模拟数据
        getShopInfo({commit}){
            axios.get('/info').then(result=>{
                console.log(result.data.data)
                var Info=result.data.data
                commit('getShopInfo',Info)
            })
        },
        //异步获取mock的 模拟数据
        getShopGoods({commit}){
            axios.get('/goods').then(result=>{
                console.log(result.data.data)
                var Goods=result.data.data
                commit('getShopGoods',Goods)
            })
        },
        //异步获取mock的rating模拟数据
        getShopRating({commit}){
            axios.get('/ratings').then(result=>{
                console.log(result.data.data)
                var Rating=result.data.data
                commit('getShopRating',Rating)
            })
        },
        add({commit},food){
            commit('add',food)
        },
        reduce({commit},food){
            commit('reduce',food)
        },
        clearAllFood({commit}){
            commit('clearAllFood')
        }
       
    },//对应事件函数的对象
    getters:{
       totalCount(state){
           //根据cartFoods统计count总数
           return state.cartFoods.reduce((item,food)=>item+food.count,0)
        },
       totalPrice(state){
        //根据cartFoods统计总价
        return state.cartFoods.reduce((item,food)=>item+food.count*food.price,0)
        },
        getAgreeRatingSize(state){
            //根据ratings统计好评和差评
            return state.ratings.reduce((item,rating)=>item+(rating.rateType==0?1:0),0)
        }
    }//计算属性
})
