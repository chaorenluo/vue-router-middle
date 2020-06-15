### vue-router的中间件
#### npm install vue-router-middle --save安装
#### 使用方法
import {routerMiddle，addGlobalMiddle} from 'vue-router-middle'　　

router为new Router()的对象，routerMiddle(router)

addGlobalMiddle（）方法可以添加全局中间件

addGlobalMiddle((routing, next)=>{
  console.log("我是全局中间件",routing);
  next()
})

export default {  
  name: 'Home1',  
  middleware:[(routing, next)=>{  
　  console.log("中间件一")  
    next()  
  },(routing, next)=>{  
　　console.log("中间件二")  
　　next()  
　}],  
}  


middleware 为一个数组，你可以添加任意多个中间件但是要执行下一个中间件必须要next()

#### 参数说明
routing对象里面包含 to from router 
to为当前要跳转的路径
from为上一个页面的路径
router路由对象

next为执行下一个中间件 如果不执行页面不会加载，也不会执行下一个中间件。

