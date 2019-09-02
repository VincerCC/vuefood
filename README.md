前言

后台接口有一部分是从网上down下来的，另一部分是用mock模拟。


### 项目预览：

一个仿外卖的vue单页应用程序Web App（spa），包含常见的功能
1. app首页及导航页
![img](https://github.com/VincerCC/vuefood/blob/master/image/app%E9%A6%96%E9%A1%B5.png)
2. 商品列表&购物车&商品详情
![img](https://github.com/VincerCC/vuefood/blob/master/image/%E5%95%86%E5%93%81%E5%88%97%E8%A1%A8.png)
3. 短信登录&账号密码登录
![img](https://github.com/VincerCC/vuefood/blob/master/image/%E7%99%BB%E5%BD%95%E7%95%8C%E9%9D%A2.png)
4. 评论&商家信息&商家图片
![img](https://github.com/VincerCC/vuefood/blob/master/image/%E8%AF%84%E8%AE%BA%26%E5%95%86%E5%AE%B6%E4%BF%A1%E6%81%AF%26%E5%95%86%E5%AE%B6%E5%9B%BE%E7%89%87.png)

### 项目启动
下载下来后，在vuefood中的vue-take-server根路径中打开cmd运行
```
npm start //启动后台接口数据
```
然后在vuefood根路径下运行
```
npm i     //安装依赖
```
然后在vuefood根路径下运行 
```
npm run dev     
```

##尝试在手机端进行项目的预览 
1. 保证手机和开发项目的电脑处于同一wifi环境中，也就是说手机可以访问到电脑IP 
2. 打开自己的项目中package.json本间，在dev脚本中添加--host指令，把当前电脑的wifi IP地址设置为--host的指令值 
    --如何查看自己电脑所处wifi的IP呢，在cmd中运行 ipconfig，查看无线网ip地址 
3. 设置好后重新run项目，将得到页面的地址输入到手机浏览器

## src下文件分类
1. api：与后台交互模块文件夹
2. assets：通用资源文件夹
3. components：组件文件夹(非路由组件)
4. pages：路由组件文件夹
5. router：路由器文件夹
6. store：vuex相关模块文件夹
7. filters：过滤器文件夹
8. App.vue：应用根组件
9. main.js：入口js文件



## 关于字体图标

1. 阿里巴巴去加入购物车（svg格式）
2. 在index.html中添加link标签
3. 把购物车中的整体链接粘贴到link标签中
4. 通过类名来使用
5. 要使用2个类名，第一个是固定为icon-font，第二个就是字体的类名

# 项目开始

## 安装stylus

```
cnpm install stylus -D
cnpm install stylus-loader -D
```

- 测试

把App.vue文件的style里面加上 lang="stylus" ，启动npm run dev ，完美运行


根据目录结构创建底部和路由的vue文件


## 公共样式文件(共用样式)

1. 按项目目录重新创建
2. 在common中创建stylus文件夹，创建mixins.styl
3. 在vue模版中，给style增加  lang="stylus" rel="stylesheet/stylus"
4. 在static文件夹中创建style文件夹，创建reset.css


## index.html的移动端配置

- viewport

  ```html
  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">
  ```

- 解决0.3s延时

在head标签上面添加

```javascript
<script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>

<script>
	if ('addEventListener' in document) {
		document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
		}, false);
	}
	if(!window.Promise) {
		document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-		promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
	}
</script>
```


## 路由搭建

### 思路重点（自己需要感受的逻辑）

1. main.js 是主入口文件
2. App.vue 文件作为大的外层架子，所有的内容都在app.vue 上面呈现。
3. main.js 的 el 控制 index.html
4. main.js 引入 App.vue 文件，实例化一个Vue
5. 通过 render ，让 App.vue 的内容 ，全替换掉 index.html 里 ID 为 app 的 div 区域
6. App.vue 里面，自然要把路由的 view 放进去了


### 安装

```
npm install vue-router
```

### 引入（在main.js）

```javascript
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router/router.js'

tips:
//挂载到实例上
//一旦配置了router
//就多了2个标签和2个属性
//router-view router-link
//$route   $router  
```

### 配置路由

（在 router.js 中引入路由模版，很简单就不说了）

### App.vue

分析：

1. 页面由2个部分组成，上面是路由，下面的底部导航
2. 引入底部vue文件，挂载到conponents属性中



## 组件tabbar.vue

这是App底部的导航，使用MUI框架

1. 将MUI库粘贴到static文件夹目录下

2. 在main.js中引入MUI
```
//导入MUI库
import '../static/MUI/css/mui.min.css'
import '../static/MUI/css/icons-extra.css'
```
3. 然后把MUI的html复制到 tabbar.vue 里，同时把a标签换成 router-link ，因为要点击控制router ，恰好a标签的更改也不会产生样式的变化

4. 图标使用阿里巴巴矢量库的图标，用
 ```
<i class="mui-icon iconfont icon-u"></i>//注意这里必须需要有mui-icon类名，否则图标和文字不能上下显示
 ```


5. 控制高亮颜色变化
```
    .mui-bar-tab .mui-tab-item.mui-active
        color #FF6700
```


5. 控制点击不同路由会高亮对应的图标
	方法一：可以在router文件夹下边的index.js中，配置linkActiveClass:'mui-active'，推荐使用，比较方便
	方法二：可以在tabbar.vue的route-link中绑定class，:class="{active:'/home'==$route.path}",
			然后在样式中加上.active
  								color #FF6700

6. 完成

## 切换——4个路由页面的


Msite.vue

Order.vue

Search.vue

Profile.vue

## 组件home.vue
一、头部使用组件HeadTop.vue

由于顶部导航的内容有变化，可以看作和路由是一体的，所以可以提取成一个模块，提高复用性

1. 新建一个 HeadTop.vue
2. 让其它路由页面引入 HeadTop.vue
3.使用slot插槽（vue内置语法）

HeadTop.vue 这个头部导航，根据每个路由不同，内容也变化，所以单独提取出来以后，要通过组件之间props传值的方式，把父组件的title传给 HeadTop.vue。

如：

①.Order.vue

```javascript
<template>
    <section class="order">
      <HeaderTop :title="title"></HeaderTop>
      <section class="order_no_login">
        <img src="./img/order/person.png">
        <h3>登录后查看外卖订单</h3>
        <button>立即登陆</button>
      </section>
    </section>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  export default {
    data(){
      return {
        title:'订单列表'
      }
    },
    components:{
      HeaderTop
    }
  }
</script>
```
②.HeaderTop.vue

```javascript

<template>
  <header class="header">
    <slot name="left"></slot>
<!--slot插槽，可以传递标签-->
    <span class="header_title">
      <span class="header_title_text ellipsis">{{title}}</span>
    </span>

    <slot name="right"></slot>
  </header>

</template>

<script>
  export default {
    data(){
      return {}
    },
    props:['title']
  }
</script>
```
二、轮播区域使用swiper插件（首页轮播滑动插件）
   ```
   npm install swiper
   ```

2. 在需要使用的页面（home.vue）引入

   ```javascript
   import Swiper from 'swiper'
   import 'swiper/dist/css/swiper.min.css'
   ```

3. html结构如下

   ```html
   <div class="swiper-container">
       <div class="swiper-wrapper">
           <div class="swiper-slide">Slide 1</div>
           <div class="swiper-slide">Slide 2</div>
           <div class="swiper-slide">Slide 3</div>
       </div>
       <!-- 如果需要分页器 -->
       <div class="swiper-pagination"></div>
       
       <!-- 如果需要导航按钮 -->
       <div class="swiper-button-prev"></div>
       <div class="swiper-button-next"></div>
       
       <!-- 如果需要滚动条 -->
       <div class="swiper-scrollbar"></div>
   </div>
   ```

4. 在页面（home.vue）添加一个钩子函数，初始化Swiper

   ```javascript
   mounted(){
     new Swiper ('.swiper-container', {
       loop: true,
       // 如果需要分页器
       pagination: {
         el: '.swiper-pagination',
       }
     })
   }
   ```

三、## 组件ShopList.vue（把首页的 ShopList 商家列表单独提取出来）

1. 新建文件，在components新建ShopList
2. 在home.vue中引入 ShopList.vue ，并注册成组件，在模版中使用


## Login.vue

> tips
>
> - 要了解 $router 相关的常用方法，如$router.back() 

1. 新建文件，Login.vue页面

2. 制作一个左上角回退的功能
  给左上角的<增加一个点击 $router.back() 回退方法
   ```html
   <a href="javascript:" class="go_back" @click="$router.back()">
     <i class="iconfont icon-jiantou-copy"></i>
   </a>
   ```

3. 制作一个在Login页面底部导航不显示的功能

   - 配置路由的时候，加上mata属性

     ```js
     routes:[//配置路由规则
		    {path:'/',redirect:'/home'},
        {path:'/home',component:home,meta:{showFooter:true}},
        //meta:{showFooter:true}可以用来标识这里需要显示footer组件，在App.vue用过v-show="$route.meta.showFooter"控制显示
        {path:'/order',component:order,meta:{showFooter:true}},
        {path:'/search',component:search,meta:{showFooter:true}},
        {path:'/person',component:person,meta:{showFooter:true}},
        {path:'/login',component:Login}]
     ```

   - 在App.vue 中，给底部导航组件，添加v-show，属性为$router.meta设置的布尔值

   - 这样一来，在 FooterGuide 组件中，有v-show来控制底部导航组件是否显示

    ```html
    <Tabbar v-show="$route.meta.showFooter"/>
    ```

##  

### 切换登陆方式

显示哪种登录方式是用class中的“on”来控制的

思路：

1. 使用msg来控制加不加on类名
msg:true代表短信登录，false代表密码登录

```
   js
   //data中声明msg:true
   :class="{on:msg}"   
   :class="{on:!msg}"
```
   css这里是控制div输入框的显示隐藏
```
		.login_content
				>form
				>div
					display none
					&.on
					display block
```

2. 短信登陆界面ON，密码界面登陆的就取反

   ```js
            当msg为true时，代表添加on样式类，高亮短信登录
            <a href="javascript:;" :class="{on:msg}" @click="msg=true">短信登录</a>
            <a href="javascript:;" :class="{on:!msg}" @click="msg=false">密码登录</a>
   ```
   css这里是控制点击之后短信登录/密码登录的高亮
  ```
      .on
          color #ff6700
          font-weight 700
          border-bottom 2px solid #ff6700
  ```
3. 同样，下面的关联div也是如此，使用同一个msg就可以了
```
<!--短信登录界面div,msg为true时，显示短信登录div-->
<div :class="{on:msg}"></div>
<!--密码登录界面div,msg为false时，显示密码登录div-->
<div :class="{on:!msg}"></div>
```

 ### 手机号验证

1. 给手机号input添加一个v-model="phone"（为什么呢？因为接口文档的里面是phone，这样后面提交请求的服务器验证手机号是否存在时方便）

   ```js
   <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
   ```

2. 如果手机号输入格式正确，那么获取验证码的颜色由灰变为黑，

   - right_phone为样式类名，当rightPhone为true时，显示黑体字。
    而rightPhone根据v-model="phone"中phone是否符合正则来确定，所以rightPhone要在计算属性得到
    ```
    template
    <button class="get_verification" :disabled="!rightPhone" :class="{right_phone:rightPhone}" @click.prevent="getCode">{{computeTime>0?'已发送('+computeTime+')s':'获取验证码'}}</button>
    ```
    
    ```
    JS
   computed: {
        rightPhone(){
          //将this.phone进行正则匹配，匹配是否开头为1，剩下10位数字
          return /^1\d{10}$/.test(this.phone)
        }
      },
    ```
   - :disabled="!rightPhone"代表当输入为正确手机号时候，才能点击
   -  @click.prevent="getCode"点击之后，取消提交表单的默认行为


### 触发“获取验证码”显示，并且增加倒计时

> ```js
> //模版
> <button class="get_verification" :disabled="!rightPhone" :class="{right_phone:rightPhone}" >@click.prevent="getCode">{{computeTime>0?'已发送('+computeTime+')s':'获取验证码'}}</button>
> //代码
> methods: {
>       getCode(){
>         this.computeTime=30
>          var Interval=setInterval(()=>{
> //这样会有bug，就是倒计时中再次点击会重新倒计时，而且倒数计时速度会越来越快,需要在外层判断当前有没有定时器，有就不用重新开
>            this.computeTime--
>           if(this.computeTime==0){
>              //停止计时
>              clearInterval(Interval)
>            }
>          },1000)
>   }
> ```
>
> 正确的代码：
```
methods: {
       getCode(){
           //启动倒计时
          //运用了循环定时器
          if(this.computeTime==0){
         //如果computeTime=0,代表当前没有在计时
           this.computeTime=30
           var Interval=setInterval(()=>{
      //这样会有bug，就是倒计时中再次点击会重新倒计时，而且倒数计时速度会越来越快
            this.computeTime--
            if(this.computeTime==0){
              //停止计时
              clearInterval(Interval)
            }
          },1000)
          //发送ajax请求向指定手机号发送验证码短信
        }
       }
```



### 密码的显示/隐藏切换 
在按钮上绑定事件
1. @click="showPwdFlag=!showPwdFlag" ，刚开始默认showPwdFlag为false不显示密码，点击后取反，为显示密码
2. :class="showPwdFlag?'on':'off'" 刚开始showPwdFlag为false，按钮灰色，为不显示密码，点击后showPwdFlag为true，按钮变色，为显示密码
```
 <div class="switch_button" :class="showPwdFlag?'on':'off'" @click="showPwdFlag=!showPwdFlag">
  <div class="switch_circle" :class="{right:showPwdFlag}"></div>
 </div>
```

1. 圆球的移动，通过添加right类控制
当showPwdFlag为true时，代表按钮在左边，不用移动,当showPwdFlag为false时，代表按钮在右边，要移动小球，添加right类
```
css
.right
                    transform translateX(15px)
```
2. 开关背景的变色，通过该添加on/off类控制
//当showPwdFlag为true时，代表按钮在左边，为不显示密码，添加off类为#fff色
//当showPwdFlag为false时，代表按钮在右边，为显示密码，添加on类为#ff6700色
```
css
.off
  background #fff
.on
  background #ff6700
```
3. 控制密码显示和隐藏，实际上就是控制input标签的type属性为password还是text
```
//html代码
<input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-show="showPwdFlag">
<input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-show="!showPwdFlag">
//当showPwdFlag为true时，代表按钮在左边，为不显示密码，也就是显示第一个input
//当showPwdFlag为false时，代表按钮在右边，为显示密码，也就是显示第二个input
```

### 点击登陆后的弹窗验证提示

1. 安装mint-ui组件库 
```
npm install mint-ui -S
```
2. 在需要用的组件中引入

   ```js
   import { Toast } from 'mint-ui';
  //导入mint-ui的弹窗功能
   ```
3. 使用Toast
```
 Toast({
    message: '提示信息',
    duration: 2000//控制多少秒消失
  });
```


实施：

1. 点击 button 登陆按钮，会提交form表单，因为登陆按钮是在form表单内的，需要阻止表单的提交，并且让表单提交后进入一个方法

   ```html 
   <form @submit.parent="login">
   ```

4. 写 login 登陆验证方法

   - 需要判断的手机号、密码、用户名等用v-model双向绑定，变量名要和接口的键一样，同时在data中声明

     ```
     手机号 phone
     短信验证码 code
     账号 name
     密码 pwd
     图片验证码 captcha
     
     ```

   - 进入login方法中，判断哪种登陆方式，进行验证，用之前data中的msg属性来控制，msg为true的时候，为手机短信登陆，false的时候为账号密码登陆，所以用msg来作为if判断的条件

     ```
     login(){//前台验证表单信息
          if(this.msg==true){//true代表短信登录，false代表密码登录
            var phone=this.phone
            var code=this.code
            var rightPhone=this.rightPhone
            if(this.rightPhone==false){
              //手机号不正确
              Toast({
                message: '手机号不正确',
                duration: 2000
              });
            }else if(/^\d{6}$/.test(code)==""){
              //提示验证码必须是6位数字
              Toast({
                message: '验证码必须是6位数字',
                duration: 2000
              });
            }
          }else{//密码登录
            var name=this.name
            var pwd=this.pwd
            var captcha=this.captcha
            if(name==""){
              //用户名必须有
              Toast({
                message: '请输入用户名',
                duration: 2000
              });
            }else if(pwd==""){
              //密码必须有
              Toast({
                message: '请输入密码',
                duration: 2000
              });
            }else if(captcha==""){
              //提示验证码必须有
              Toast({
                message: '请输入验证码',
                duration: 2000
              });
            }
          }
        }
     
     ```

### 点击验证码，更新验证码
1. 这里没有必要用axios去发请求，可以在验证码的img标签中src属性中设置路径
   ``` 
   <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha" ref="img">
   ```

2. 给验证码按钮点击事件增加一个getCaptcha事件
3. getCaptcha中再次更新src

   ```
    getCaptcha(){//点击后获取新的图片验证码
      this.$refs.img.src="http://localhost:4000/captcha"
    }
   
   ```
### 获取短信验证码，因为我没有短信验证码的API接口，所以这个功能没有完成，在短信登录界面只要输入了内容就能点击登录进去

### 账号密码登录，我也没有账号密码相关API，随便输入账号密码即可
### 账号密码注册并登录，你输入的账号密码会被保存到vuex中，当做注册成功

###将登录状态存入vuex，来修改登录后，几个地方的显示“未登录”的地方
1. home中的‘登录/注册’，通过:to="$store.state.userinfo.name||$store.state.userphone?'/person':'/login'"，
   设置当登录之后显示一个图标，并且点这个地方会跳转到person界面。
   当没登录的时候显示'登录/注册'，点击后跳转到login界面
```
<router-link class="header_login" slot="right" 
:to="$store.state.userinfo.name||$store.state.userphone?'/person':'/login'">
<i class="iconfont icon-solid-person" v-if="$store.state.userinfo.name||$store.state.userphone"></i>
 <span class="header_login_text" v-else>登录/注册</span>
</router-link>
```
2. person中的‘登录/注册’
```
:to="$store.state.userinfo.name||$store.state.userphone?'/home':'/login'"
```
(1)设置当登录之后点这个地方会跳转到home界面。
(2)当没登录的时候点击后跳转到login界面
  ```
   <p class="user-info-top" v-if="!$store.state.userphone">{{$store.state.userinfo.name||'登录/注册'}}</p>
  ```
(3)当用手机登录之后，即！$store.state.userphone为！true，所以v-if控制不显示这个p标签，只显示一条手机信息{{$store.state.userphone||'暂无绑定手机号'}}

(4)当用账号密码登录之后，！$store.state.userphone为！false，所以v-if控制显示这个p,又因为$store.state.userinfo.name为true，显示name，不显示'登录/注册'

(5)没登录的时候，显示'登录/注册'
```
完整代码
<router-link :to="$store.state.userinfo.name||$store.state.userphone?'/home':'/login'" class="profile-link">
  <div class="profile_image">
    <span class="iconfont icon-tubiaozhizuomoban"></span>
  </div>
  <div class="user-info">
    <p class="user-info-top" v-if="!$store.state.userphone">{{$store.state.userinfo.name||'登录/注册'}}</p>
    <p>
        <span class="user-icon">
          <i class="iconfont icon-shouji icon-shouji"></i>
        </span>
        <span class="icon-mobile-number">{{$store.state.userphone||'暂无绑定手机号'}}</span>
    </p>
  </div>
  <span class="arrow">
    <i class="iconfont icon-arrow-right"></i>
  </span>
</router-link>
```

### 退出登录
1. 用mint-ui实现按钮
```
main.js
//引入button
import { Button } from 'mint-ui';
Vue.component(Button.name, Button);
```
2. 给<mt-button @click="out">退出登录</mt-button>绑定事件，通过mint-ui实现弹窗
  ```
  person.vue中
  import { MessageBox } from 'mint-ui'

  export default {
      components:{
          HeaderTop
      },
      data(){
          return {
              title:'我的'
          }
      },
      methods: {
        out(){
          MessageBox.confirm('确定退出吗?').then(
            action => {//确认的回调
            // console.log("点了确认")
            },
            action => {//取消的回调
            console.log("点了取消")
            })
        }
      },
    }
  ```
3. v-if实现登录之后才显示退出登录按钮，未登录不显示，代码如下
```
person.vue中
<mt-button style="margin-top:10px" type="danger" size="large" @click="out" 
v-if="$store.state.userinfo.name||$store.state.userphone">退出登录</mt-button>
```
4. 实现登录后点击退出按钮，点击弹出框的确认后退出登录
(1) 在store.js中
```
 mutations:{}中
  signOut(state){
            state.userinfo={}
            state.userphone=''
        }
```
  ```
    actions:{}中
      signOut({commit}){
            commit('signOut')
      }
  ```
    ```
    person.vue中的点击事件中
          this.$store.dispatch("signOut")
    ```
5. 至此，完成退出登录功能


##  

### axios相关配置
1. 安装axios
```
 npm i --save axios
```
2. 在需要用的组件中引入	
```
import axios from 'axios'
```
3. 关于API接口文档：
	（1）首先接口需要设置为4000，然后需要在vue-take-server根目录下进入cmd运行npm start
	（2）直接get(http://localhost:4000/index_category)会报跨域的错误
	（3）解决跨域问题：需要在config下的index.js中的proxyTable中增加配置如下
  ```
			proxyTable: {
				'/api': {//匹配所有以/api开头的的请求路径
						target: 'http://localhost:4000',//将/api路径替换为http://localhost:4000
						changeOrigin: true,//支持跨域
						pathRewrite: {//重写路径，去掉开头的/api
							'^/api': ''
						}
					}
				}
  ```
	（4）之后在get的时候要用get(/api/index_category)，才能成功接收到数据

## 创建git相关

1. 在项目目录中使用git bash 初始化git
```
git init 
```
2. 设置全局签名
```
git config --global user.name xxxxx 
git config --global user.email xxxxxx@qq.com  //查看签名使用命令    cat ~/.gitconfig 
```
3. 将目前的项目初始放进git暂存区、本地库

```
git add . //存入到暂存区 

git commit -m "初始化项目结构" //存入本底库 
```

4. 创建git分支，名为dev，并移动到分支处进行开发
 ```
git branch dev //查看分支 git branch -v 绿色代表当前分支 git checkout dev 
 ```
5. 创建git远程库，在github中new project，名为vuefood

6. 创建远程地址别名

   ```
   git remote add origin git remote add origin https://github.com/VincerCC/vuefoodapp.git
   ```

7. 把项目推送到git中

   ```
   git push -u origin master
   ```

## vuex管理后台拿到的数据

1. 安装vuex   npm install --save vuex
2. 在store文件夹下创建文件store.js
3. 在main.js中引入store.js
      引入 
      ```
      import store from './store/store'
      ```
      注册store   
      ```
      new Vue({
                    el: '#app',
                    router,
                    render:c=>c(App),
                    store
                  })
     ```
4. store.js模板
  ```
    /*vuex的核心管理模块*/ 
    import Vue from 'vue'
    import Vuex from 'vuex'
    import axios from 'axios'
    Vue.use(Vuex)

    export default new Vuex.Store({
        state:{
          latitude:40.10038,//纬度
          longitude:116.36867,//经度
          address:[]
            //在需要用的地方，在模板(html代码)中用$store.state.xxx使用这个数据，在js中要加上this
        },//状态、数据
        mutations:{
           getAddress(state,getaddress){//mutations接收actions传过来的参数
            state.address=getaddress//更新state中address数组的数据
        },
        },//包含多个更新state数据的对象
        actions:{
          getAddress({commit,state}){
            axios.get('/api/position/'+state.latitude+','+state.longitude).then(result=>{
                var getaddress=result.data.data//将接受到的数据保存起来，通过commit传参数给mutations
                commit('getAddress',getaddress)
            })
            
        },
            //这里可以发送axios异步请求
        },//对应事件函数的对象
        getters:{
          
        }//计算属性
    })
  ```

5. 在需要用数据的vue组件中，通过this.$store.dispatch('getAddress')，分发消息，然后就可以用this.$store.state.address获取到数据

## 动态获取到轮播图图片后发现循环轮播会出现空白
1. 解决办法：
  ```
    watch: {//监视图片数组foodTypeList的改变
      foodTypeList(value){
        this.$nextTick(()=>{//解决轮播图循环轮播会变成空白的问题
        //一旦完成界面更新，立即调用this.$nextTick()
          new Swiper ('.swiper-container', {
          //循环轮播
          loop:true,
          //自动轮播
          autoplay:true,
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          }
        })
        })
      }

## MOCK

### 用mock.js模拟接口数据

1. 安装

   ```
   npm i mockjs -S
   
   ```

2. 现在想要使用mock模拟一个服务器

3. 创建一个mockServer.js文件

4. 在 mockServer.js 引入mock、data.json

   ```
   import Mock from 'mockjs'
   import data from './data.json'
   
   ```

5. 在 mockServer.js 指定一个url和模版，只要访问了这个url，就会返回这个模版（详见官方文档）

   ```
   Mock.mock('/data',data)
   
   ```

6. 在main.js主文件中引入mock.js文件

   ```
   import './mock/mockServer'
   
   ```

7. 此时发送给一个ajax请求，result.data的内容，就是data.json里面的内容

   ```
   this.$axios.get('/data').then((res)=>{
     console.log(res.data)
   }
   
   ```

   > tips: mock会拦截ajax请求，所以请求的时候url不需要代理



### 优化mock接口

1. 让请求的不同地址，返回对应的接口，什么意思呢：目前的接口如下

2. 接口内有商家信息、食物、评价（就是对应了3个子路由组件）

3. 根据不同的请求url，返回不同的接口（其实就是方便调用），为什么要加是code这个键呢，为了模仿真实接口的格式

   ```js
   把 Mock.mock('/data',data) 改成
   Mock.mock('/info',{code:0,data:data.info})
   Mock.mock('/goods',{code:0,data:data.goods})
   Mock.mock('/ratings',{code:0,data:data.ratings})
   ```

4. store.js 中

     ```
     state中
        goods:[],
        ratings:[],
        info:{}

     mutations中
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
        }

     actions中
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
        }
     ```


## Shop.vue页面


此页面有3个子路由：

- ShopGoods
- ShopRating
- ShopInfo

### 路由配置

1. 配置router


2. 创建pages目录下Shop文件夹和Shop.vue

3. 配置shop的子路由，ShopHead、shopInfo、shopGoods、shopRating

4. 在pages文件夹下创建ShopHead、ShopInfo、ShopGoods、ShopRating文件夹，同时创建同名vue文件

5. 在components文件夹下创建ShopHead同时创建同名vue文件

6. 在router.js中配置Shop子路由，并设置Shop页面的子路由重定向

   ```js
   {path:'/shop',component:shop,
      children:[
        {path:'/shop/goods',component:shopgoods},
        {path:'/shop/info',component:shopinfo},
        {path:'/shop/rating',component:shoprating},
        {path:'',redirect:'/shop/goods'}
    ]}
   ```
7. 在Shop.vue下引入4个子路由，并注册
```
--引入
import ShopHead from '../../components/ShopHead/ShopHead'
import ShopInfo from '../../pages/Shop/ShopInfo/ShopInfo'
import ShopGoods from '../../pages/Shop/ShopGoods/ShopGoods'
import ShopRating from '../../pages/Shop/ShopRating/ShopRating'

--注册
components:{
  ShopHead,
  ShopInfo,
  ShopGoods,
  ShopRating
}
```
8. 在Shop.vue中给ShopInfo,ShopGoods,ShopRating添加路由高亮样式，因为我在Tabbar中使用了修改linkActiveClass的方法，故在此无法使用，需要用:class="{active:'/shop/goods'==$route.path}的方式，这是通过判断这个路由路径是不是等于当前显示的路由路径去动态添加active类
```
<router-link to="/shop/goods" :class="{active:'/shop/goods'==$route.path}" replace>点餐</router-link>
```

### 头部子组件ShopHead
  1. 在Shop.vue中引入并注册ShopHead.vue

  2. 把信息渲染到标签

  3. 在ShopHead的钩子mounted中分发实现调用mock模拟数据

     ```js
     mounted:function () {
        this.$store.dispatch('getShopInfo')
     }
     ```

  4. 把数据通过$store.state.info.xxx渲染到标签中

  5.注意：这里$store.state.info.supports[0]会报错误，Cannot read property '0' of undefined"
  原因是这是异步数据，先显示info的初始值info:{}，过一会才会显示数据
  --解决办法：info有数据的时候才解析，使用v-if="$store.state.info.supports"控制

  6.将不同颜色存到数组中，用来控制不同优惠对应的不同颜色
  ```
   :class="colorArr[$store.state.info.supports[index].type]"

  data中声明数组
    colorArr:['activity-green','activity-red','activity-orange']
 
  ```

  7. 点击名称显示名称详情页面，在data中声明shopShow=false，然后在名称上绑定@click="shopShow=!shopShow"，最后在关闭icon上绑定@click="shopShow=!shopShow"

  8. 点击优惠显示优惠详情页面，在data中声明shopPortShow=false，然后在名称上绑定@click="shopPortShow=!shopPortShow"，最后在关闭icon上绑定@click="shopPortShow=!shopPortShow"


### better-scroll——滑动插件

1. 安装

   ```
   npm install better-scroll -S
   
   ```

2. 在使用文件中（ShopGoods）引入

   ```
   import BScroll from 'better-scroll'
   
   ```

3. 在分发数据之后才能调用 better-scroll ，因为要state.shopGoods里面有数据并且v-for渲染到页面再实例化  better-scroll，才有效果


4. 那么什么时候state.shopGoods里有数据呢？就是分发完毕的时候，$store.state.goods改变的时候，监视getShopGoods,当他初始化完成立即调用初始化better-scroll的语句

   ```js
   watch: {
     '$store.state.goods'(value){
       this.$nextTick(()=>{//在数据列表显示之后创建new BScroll(wrapper)
       //一旦完成界面更新，立即调用this.$nextTick()
        let Mwrapper = document.querySelector('.menu-wrapper')
        let Fwrapper = document.querySelector('.foods-wrapper')
        let Mscroll = new BScroll(Mwrapper)
        let Fscroll = new BScroll(Fwrapper)
       })
     }
   }
   ```

### 左侧导航和右侧列表移动互相关联

1. 左侧有个current类，来控制颜色变白的选中效果

2. 目标功能：

3. - 点击左侧分类，右边列表可以移动到分类位置、
   - 滑动右侧列表，左侧分类响应变化

4. 分析

5. - current类作为左侧导航选中的标识类名，给左侧li绑定  :class="{current:index==currentIndex}",然后在computed中定义currentIndex
   - 让滑动的数值与右侧列表渲染好了之后的标题距离顶部的数值计算，于是：
   - 滑动的数值：scrollY、列表渲染好了之后的标题距离顶部的数值：top

6. 在滑动过程中获取到 scrollY 
```
js  watch中
  let Fscroll = new BScroll(Fwrapper,{//右侧列表滑动
        probeType:3,
        click:true
        //需要知道滚动的位置。
        // 当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；
        // 当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；
        // 当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。
        // 如果没有设置该值，其默认值为 0，即不派发 scroll 事件。
        })
        //给右侧列表绑定scroll监听
        Fscroll.on('scroll',(event)=>{
          // 收集滑动的scrollY值，因为往下滚动为负数，所以取正数
          this.scrollY=Math.abs(event.y)
          // console.log(event.x,event.y)
          // console.log(this.scrollY)
        })
```

7. - 基础的参数配置示例

   - better-scroll 中有很多事件，用法都是通过 实例.on 来使用

   - better-scroll 中拥有的事件，通过上面的 实例.on 来使用

   - 为了拿到滑动过程中的Y轴的值，需要用到scroll事件

   - on出一个scroll事件

   - 至此右侧滑动可以实时检测Y轴的变化

8. 列表渲染好了之后的标题距离顶部的数值：tops


- 找到所有分类的标签li

1. 初始化tops
        var tops=[]
        var top=0 //刚开始top为0可以先加到数组中
        tops.push(top)
2. 收集：先找到右侧分类的li
        var lis=document.getElementsByClassName('food-list-hook')
        for(var i=0;i< lis.length; i++) {
3. 计算所有li的top值，分别保存到tops数组中
          top+=lis[i].clientHeight
          tops.push(top)
        }
4. 更新数据
        this.tops=tops
        console.log(this.tops)
  
 
  > 也可以使用 Array.prototype.slice.call(lis) 把伪数组转为真数组
  >
  > ```js
  > var lis=document.getElementsByClassName('food-list-hook')
  > Array.prototype.slice.call(lis).forEach((item)=>{
  >   top+=lis[item].clientHeight
  >   tops.push(top)
  > })
  > ```



- 检测scrollY的变化，来找到scrollY在哪个tops之间

1. find（）方法，来找到大于scrollY值的那个li标签top的值
2. 思路：设置一个计算方法，让index===currentIndex的时候给对应的index增加current类名

   - 给标签设置一个绑定的class属性（注意currentIndex是个计算方法，这里不能加括号）

     ```html
     <li class="menu-item" :class="{current:index===currentIndex}">
     ```

3. 创建一个计算函数 currentIndex 

  ```js
  currentIndex(){//得到当前分类的下标
        //先得到相关的条件数据scroll,tops
        // var scrollY=this.scrollY
        // var tops=this.tops
        const {scrollY,tops}=this
        //根据条件计算产生结果
          var index=tops.findIndex((item,index)=>{
            //item是当前的top值  
            //当前scrollY>=当前top&&当前scrollY<下一个top
            return scrollY>=item&&scrollY<tops[index+1]
          })
        //返回结果
        return index
      }
  ```

4. 点击左侧分类导航，右侧直接跳转过去

   - better-scroll有个scrollTo方法

   - 在data中声明一个Fscroll变量

   - ```js
     data () {
       return {
         Fscroll:''
       }
     }
     ```

   - 更改实例化bett-scrool的时候付给的let变量

     ```js
     let foodScroll = new BScroll('.foods-wrapper',{
       probeType:2
     })
     ===>
     this.Fscroll = new BScroll('.foods-wrapper',{
       probeType:2
     })
     ```

   - 在methods中创建clickMenuItem方法

   - ```
     methods:{
       clickMenuItem(index){
           
       }
     }
     
     ```

   - 在htmll标签中给左侧分类导航增加点击方法

   - ```html
     <li class="menu-item" :class="{current:index===indexCurrent}" @click="clickMenuItem(index)">
     ```

   - 通过形参下标，来获取到tops数组中的current值，拿这个值去进行better-scroll中的scrollTo方法来移动，注意time参数的单位是毫秒

   - ```js
     clickMenuItem(index){
      var y=this.tops[index]
      this.scrollY=y
      this.Fscroll.scrollTo(0,-y)
     }
     ```

   > tips：新增的属性是没有属性绑定的（Vue中是这样的，意思就是一个对象，没有事先声明，.出来的属性，不会进行双向绑定），新增加的属性要用Vue.set内置方法来添加，就会有双向绑定


### CartControl组件——增右侧shopGoods中的加减功能

思路：

1. shopGoods中引入 CartControl组件
2. 加减组件在每一个食物中都有，那么子组件 CartControl就可以在父组件遍历渲染的时候，在v-for范围内拿到每一个food对象（food对象就是vuex中state.shopGoods遍历后的里面的每一个food元素）
3. 在CartControl组件中的加减，通过vuex管理，来给food对象新增count属性

实施

1. 在components文件夹中新建CartControl组件
2. 模版
3. 在shopGoods中挂载CartControl组件


1. 给减号增加动画

   ```html
   <transition name="remove">
     <div class="iconfont icon-remove_circle_outline" v-if="flag"></div>
   </transition>
   
   //style
   .remove-enter,.remove-leave-to
       opacity 0
       transform translateX(50px)
       transform rotate(90deg)
   .remove-enter-active,.remove-leave-active
       transition: all 0.2s linear;
   ```
2. 通过给减号和文本框增加v-if="food.count"控制减号和数字框在food.count为0时候不显示

3. 父组件ShopGoods传food对象给CartControl子组件 
```
父组件
<CartControl :food="food"></CartControl>
子组件
props:['food'],
```

4. 因为food是父组件中遍历shopGoods中的一个元素，现在要给food新增加一个count属性，来计算加减组件的值，food是隶属于state.ShopGoods中的，所以要操纵vuex，那么，就需要写一套vuex的更改数据： 

  -1. 首先在CartControl中给加号减号绑定点击事件
  ```
  减
  <div class="iconfont icon-remove" v-if="food.count" @click="reduce()"></div>
  加
  <div class="iconfont icon-jia" @click="add()"></div>
  ```
  -2. 在methods中定义事件,将this.food传过去,并且分发消息到actions
   ```
   add(){
      this.$store.dispatch('add',this.food)
    },
   reduce(){
      this.$store.dispatch('reduce',this.food)
    }
   ```

   -3. 在store中定义状态管理方法
    ```
    actions中
        add({commit},food){
            commit('add',food)
        },
        reduce({commit},food){
            commit('reduce',food)
        }

    mutations中
        add(state,food){
            if(!food.count){
                //food.count=1//新增一个属性count，这样写是没有数据绑定效果的，需要用Vue.set(对象,'属性名',属性值)
                Vue.set(food,'count',1)
            }else{
                food.count++
            }
        },
        reduce(state,food){
            if(food.count>0){
                food.count--
            }
        }
    ```
> tips：设置好后发现没有food.count数据双向绑定,原因是,新增的属性是没有属性绑定的（Vue中是这样的，意思就是一个对象，没有事先声明，.出来的属性，不会进行双向绑定），新增加的属性要用Vue.set内置方法来添加，就会有双向绑定,Vue.set(对象,'属性名',属性值)
  

## Food.vue组件
1. 在ShopGoods.vue中引入Food.vue，并且注册
2. 在ShopGoods中，在右侧每一个li上绑定方法，传递food过去
  ```
   @click="showfood(food)"
  ```
3. data中声明food:{},methods中定义方法
   ```
   showfood(food){
      //设置food
      this.food=food
      //显示food组件
      //父组件如何调用子组件的方法：在子组件的标签中用ref=""标识，然后通过this.$refs.Food.toggle()
      this.$refs.Food.toggle()
    }
   ```
4. 在Food.vue中,设置点击右边每一项，弹出对应的详情，通过在Food.vue的最外层div中v-if="showflag"。然后在data中初始化showflag为false，
   然后在在methods中定义toggle方法，控制显示隐藏
   ```
   toggle(){
        this.showflag=!this.showflag
      }
   ```
6. 在Food中通过props接受ShopGoods传过来额food进行渲染
7. 绑定事件后发现CartCotrol组件中，点-和+号也能弹出商品详情，这是因为-和+冒泡事件到=了，通过.stop阻止
```
<div class="iconfont icon-remove" v-if="food.count" @click.stop="reduce()"></div>
<div class="iconfont icon-jia" @click.stop="add()"></div>
```
8. 这时还没有绑定隐藏的点击事件，可以在商品详情的左上角<上绑定，和背景上绑定@click="toggle"


## ShopCart.vue购物车组件
1. 在ShopCart中引入ShopCart.vue，并且components注册成标签
2. 思路：
  -1. ShopCart需要拿到食物food对象中count属性>0的对象，然后组成一个数组，来遍历到模版中——这就需要用到vuex，把数组存储到      vuex中
  -2. 需要显示共计多少件商品，以及购物车总价——要用到vuex的getter
3. 实现：
        -1. state中声明cartFoods:[]
        -2. 在store的mutation中，修改add和ruduce方法
          ```
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
        }
          ```
        -3.在getters中定义计算属性计算总数和总价格
        ```
          totalCount(state){
            //根据cartFoods统计count总数
            return state.cartFoods.reduce((item,food)=>item+food.count,0)
          },
          totalPrice(state){
            //根据cartFoods统计总价
            return state.cartFoods.reduce((item,food)=>item+food.count*food.price,0)
        }
        ```
4. 在ShopCart中通过v-for="(item,index) in $store.state.cartFoods"进行渲染
5. 在computed中定义计算属性,得到加入购物车总数量已经总价格
         ```
          totalCount(){
            return this.$store.getters.totalCount
          },
          totalPrice(){
            return this.$store.getters.totalPrice
          }
         ```
6. 可以通过{{totalPrice}}、{{totalCount}}分别将总价格和总数量显示到下边的购物车中

7. 设置下边购物车，显示购物车的列表，可以通过在左边的盒子上绑定点击事件,以及绑定在背景区域控制打开列表后点击背景区域会隐藏
        ```
        <div class="content-left" @click="isShow"></div>
        <div class="list-mask" v-show="showComputed" @click="isShow"></div>
        ```
8. 在methods中
        ```
        isShow(){
          if(this.$store.getters.totalCount>0){
          this.flag=!this.flag
          }
        }
        ```
9. 这里通过v-show="计算属性"来控制显示隐藏v-show="showComputed"
        ```
        showComputed(){
          if(this.$store.getters.totalCount==0){
            this.flag=false
            return false
          }
          return this.flag
        }
        ```
10. 当购物车没有食物时，购物车图标是灰的，一旦有食物，就是绿的（用highlight类名来控制）

  购物车图标的标签，绑定class属性，当计算属性totalCount()的返回值大于0的时候，增加highlight类名，否则为空

  ```
  :class="{highlight:totalCount>0}"

  ```

11. 还差几元起送

代码结构

- 当满足起送金额时，not-enough改为enough

> 注意一点，计算函数的名称不能和data中的变量名相同

- 1. 在标签结构中，绑定deliveryPrince()计算函数，监测起送价-总金额，把结果赋给delivery

   ```html
   <div class="pay" :class="payClass">
      {{payText}}
   </div>
   ```

- 2. 计算函数

   ```js
      payClass(){
        var totalPrice=this.totalPrice//当前总价
        var minprice=this.$store.state.info.minPrice//获得最小起送价
        return totalPrice>=minprice?'enough':'not-enough'
      },
      payText(){
        var totalPrice=this.totalPrice
        var minprice=this.$store.state.info.minPrice
        if(totalPrice==0){
          return "￥"+minprice+"元起送"
        }else if(totalPrice<minprice){
          return "差￥"+(minprice-totalPrice)+"元送"
        }else{
          return "去结算"
        }
      },
   ```
12. 清空购物车功能
  -1. 清空购物车其实就是更新store状态
  -2. 在actions中
      ```
        clearAllFood({commit}){
            commit('clearAllFood')
          }
      ```
  -3. 在mutations中
      ```
       clearAllFood(state){
            //先遍历cartFoods，将里边的count设置为0
            state.cartFoods.forEach(item=>item.count=0)
            //然后将cartFoods设置为空数组
           state.cartFoods=[]
        }
      ```
  -4. 在ShopCat.vue中给清空绑定事件@click="clearAllFood"
      ```
      methods中
        clearAllFood(){
         MessageBox.confirm('确定清空购物车吗?').then(
          action => {
          // console.log("点了确认")
          this.$store.dispatch('clearAllFood')
          Toast('已清空!')
          })
        }
      ```

## shopRating组件

1. 模版

2. 钩子函数mounted中分发action

   ```js
   mounted() {
       this.$store.dispatch('getShopRating')
   }
   ```

3. computed中映射state中的info(除了可以使用this.$store.state.info，也可以用这种方式获取到info)
   ```js
   ...mapState(['info'])
   ```

4. 去标签汇总渲染数据

5. 引入better-scroll

   ```js
   import BScroll from 'better-scroll'
   ```

6. 监测$store.state.ratings如果有变动，就new一个滑动实例

   - 类ratings是最外层的div，自己根据标签结构就可以判断抓取哪一个div作为滑动实例

   ```js
   watch: {
      '$store.state.ratings'(value){
        this.$nextTick(()=>{
          let wrapper = document.querySelector('.ratings')
          let scroll = new BScroll(wrapper,{
          click:true
          })
        })
      }
    }
   ```

### 评论筛选

思路

1. 给全部、满意、不满意增加一个点击方法，传入2、0、1来做区分
   - 全部：2
   - 满意：0
   - 不满意：1
2. 满意与否是根据ratings.rateType属性，
   - 0代表满意
   - 1代表不满意

实施

1. 声明变量selectType，记录满意情况，默认全部

   - 全部：2
   - 满意：1
   - 不满意：0

   ```
   selectType:2,//0代表好评，1代表差评，2代表全部
   
   ```
  声明变量OnlyContentRatings，记录勾选情况，默认勾选


   ```
   OnlyContentRatings:true,//true代表勾选只看带文本内容的
   
   ```
2. 创建toggleComment()方法

   ```js
   setSeclectType(num){
        this.selectType=num
      }
   ```

3. 给全部、满意、不满意增加对应的setSeclectType点击事件，来改变变量selectType的值

   ```
   @click="setSeclectType(2)"全部
   @click="setSeclectType(0)"满意
   @click="setSeclectType(1)"不满意
   
   ```

4. 给全部、满意、不满意绑定对应的类，用selectType等于不同的值，来控制选中效果

   ```
   :class="{active:selectType===2}
   :class="{active:selectType===0}
   :class="{active:selectType===1}
   ```

5. 给勾选的元素绑定事件
  ```
  模板：
      <div class="switch" :class="{on:OnlyContentRatings}" @click="toggleOnlyContent">
        <span class="iconfont icon-duigou"></span>
        <span class="text">只看有内容的评价</span>
      </div>

  JS：
      toggleOnlyContent(){
        this.OnlyContentRatings=!this.OnlyContentRatings
      }
  ```
6. 通过判断OnlyContentRatings是否为true添加样式，true为勾选
  

6. 创建一个计算属性，用fliter()函数来控制ratings的返回值，所以为什么上面要声明selectType变量和OnlyContentRatings变量，就是来触发计算属性的运行

   ```js
   filterRatings(){//过滤好评和差评
        //得到相关的数据
        var ratings=this.$store.state.ratings
        var OnlyContentRatings=this.OnlyContentRatings
        var selectType=this.selectType
        this.getAgreeRatingSize=this.$store.getters.getAgreeRatingSize//将过滤出来的好评的数量数量赋给data保存
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
   ```

## shopInfo组件

1. 引入info数据

   ```
   ...mapState(['info'])
   
   ```

2. 在表现中渲染数据

3. 在钩子mounted中给相关div创建垂直滑动，以及给图片水平滑动

   ```
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
   
   ```
4. 安装图片缩略图插件vant
  ```
  npm i vant -S
  ```
5. babel-plugin-import 是一款 babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式
  ```
  npm i babel-plugin-import -D
  ```
6. 在.babelrc 中添加配置
  ```
  "plugins": [
    ["import", {
      "libraryName": "vant",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
  ```
7. 在需要使用的组件中引入
  ```
  import Vue from 'vue';
  //导入vant的图片预览功能
  import { ImagePreview } from 'vant';
  Vue.use(ImagePreview);
  ```
8. 实现缩略图功能代码
  ```
  在图片上绑定点击事件@click="getImgArr"
  getImgArr(){
        // console.log(this.info.pics)
        ImagePreview({
          images:this.info.pics,
          showIndicators:true,//图片下边的小圆点
          closeOnPopstate:true//当页面发生改变时自动关闭图片
        })
  }
  ```
## 缓存路由组件
 keep-alive是缓存路由组件的作用，不至于切换路由的时候将之前的状态重新更新

在Shop.vue中给路由增加缓存标签

```
<keep-alive>
        <router-view></router-view>
</keep-alive>

```



## 回退优化

> tips:
>
> 路由组件跳转默认为push方式，到时回退的体验有时很差，可以在标签中加上replace，来让路由默认使用replace方式跳转
>
> ```html
> <router-link to="/index" replace><router-link>
> ```

## 时间日期过滤器

1. 安装

   ```
   npm install --save moment
   
   ```

2. 创建自定义过滤器模块文件: filters/index.js

   ```js
   import moment from 'moment'
   import Vue from 'vue'
   
   Vue.filter('dateString', function (value, format) {
   return moment(value).format(format || 'YYYY-MM-DD HH:mm:ss')
   })
   ```

3. 去main.js中加载模块

   ```js
   import './filters' // 加载自定义过滤器
   ```

4. 找到需要过滤的时间，使用过滤器

   ```html
   <div class="time">{{item.rateTime | dateString}}</div>