import Mock from 'mockjs'
import data from './data.json'

//将模拟的数据暴露成接口

//将data中的info暴露到/info中
Mock.mock('/info',{code:0,data:data.info})
//将data中的goods暴露到/goods中
Mock.mock('/goods',{code:0,data:data.goods})
//将data中的ratings暴露到/ratings中
Mock.mock('/ratings',{code:0,data:data.ratings})

