# 02-Koa2-1-基本使用

## 一 Koa 简介

Koa 是 express 团队全新打造的更轻量级的 web 框架，内部没有任何功能模块封装，甚至没有路由模块，源码仅仅只有几千行。Koa 仅仅提供了简单的请求响应封装、中间件模型。

与 Express 不同的是：Koa 的请求、响应对象都被包装进了 context 对象中，且 Koa 的中间件模型是洋葱模型。

示例：

```js
const koa = require('koa')

let app = new koa()

app.use(ctx => {
  ctx.body = 'hello world'
})

app.listen(3000)
```

koa 将 node 的 Request 和 Response 对象封装进了 Context 对象中，所以也可以把 Context 对象称为一次对话的上下文。Context 对象内部封装的常见属性：

```js
ctx // Context对象，包含 req、res
ctx.request
ctx.response
ctx.status
ctx.throw(500) // 页面会抛出状态码为500的错误页面

this // Context对象也可以直接写为this
this.request
this.response
```

Koa 与 Express 的不同：

- Express 内部支持路由，Koa 没有路由管理
- Express 的中间件模型是传统的顺序式，而 Koa 是洋葱模型

## 二 koa 的中间件

### 2.1 koa 中间件 demo

中间件函数是一个带有 ctx 和 next 两个参数的简单函数。next 用于将中间件的执行权交给下游的中间件。

```js
const koa = require('koa')

let app = new koa()

app.use((ctx, next) => {
  console.log('执行中间件1')
  next()
  console.log('next之后的代码1')
  ctx.body = 'hello world2'
})

app.use((ctx, next) => {
  console.log('执行中间件2')
  ctx.body = 'hello world2'
  next()
  console.log('next之后的代码2')
})

app.listen(3000)
```

执行结果：按照顺序执行了中间件代码，再按反方向执行一遍 next 之后的代码，web 界面也输出的是 hello world2：

```txt
执行中间件1
执行中间件2
next之后的代码2
next之后的代码1
```

上述的执行方式，称之为洋葱模型：
![洋葱模型](/images/node/yangchong.png)

Koa 中间件相比 Express 中间件：按照洋葱模型执行，中间件无论写在什么位置，都会先执行。

## 三 中间件应用

### 3.1 koa-compose 组合中间件

如果需要将中间件组合使用，可以使用 koa-compose

```js
function middleware1(ctx, next) {
  console.log('midlle1...')
  next()
}

function middleware2(ctx, next) {
  console.log('midlle2...')
  next()
}

const all = compose([middleware1, middleware2])

app.use(all)
```

### 3.2 koa 常用中间件

- koa-bodyparser:获取 POST 请求参数
- koa-router:路由中间件
- koa-static:静态文件目录
- koa-views:加载模板文件

综合案例：

```js
const koa = require('koa')
const path = require('path')
const ejs = require('ejs')
const views = require('koa-views')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const Router = require('koa-router')
const favicon = require('koa-favicon')

const app = new koa()
const router = new Router()

//加载静态资源
app.use(static(path.join(__dirname, 'static')))

//favicon
app.use(favicon(__dirname + '/static/favicon.ico'))

// 加载ejs模板引擎:ejs后缀方式
// app.use(views(path.join(__dirname, './views'), {
//     extension: 'ejs'
// }));

// 加载ejs模板引擎:html后缀方式
app.use(
  views(path.join(__dirname, 'views'), {
    map: { html: 'ejs' },
  })
)

//post解析中间件
app.use(bodyParser())

//路由->渲染模板
router.get('/', async (ctx, next) => {
  await ctx.render('test', {
    msg: 'hello',
  })
})
router.post('/', (ctx, next) => {
  let data = ctx.request.body
  console.log(JSON.stringify(data))
  ctx.body = data
})

app.use(router.routes()) //启动路由中间件
app.use(router.allowedMethods()) //根据ctx.status设置响应头

//支持链式写法
// app.use(router.routes()).use(router.allowedMethods());

app.listen(3000)
```

## 一 koa-router 创建路由

```js
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router({
  prefix: '/test', //路由前缀---全局的
})

router.get('/', function (ctx, next) {
  ctx.body = 'index....'
})
router.get('/todo', function (ctx, next) {
  ctx.body = 'todo....'
})

app.use(router.routes()) //启动路由中间件
app.use(router.allowedMethods()) //根据ctx.status设置响应头

app.listen(3000)
```

## 二 路由设计

### 1.1 路由前缀

```js
let home = new Router() //子路由
let page = new Router() //子路由

home
  .get('/test', async ctx => {
    //http://localhost:8000/home/test
    ctx.body = 'home test...'
  })
  .get('/todo', async ctx => {
    //http://localhost:8000/home/todo
    ctx.body = 'home todo...'
  })

page.get('/test', async ctx => {
  ctx.body = 'page router...'
})

//父路由
let router = new Router()

//装载子路由
router.use('/home', home.routes())
router.use('/page', page.routes())
```

### 1.2 RESTful 规范

关于 RESTful：koa-router 作者推荐使用该风格，即所有的事物都应该被抽象为资源，每个资源对应唯一的 URL

比如对 url 的增删改查：

```txt
/users                  # post方式：新增用户
/users/:id              # delete方式：删除用户
/users/:id              # put方式：修改用户
/users/:id              # get方式：获取用户
```

### 1.3 router.all()

router.all() 可以用来模糊匹配

```js
router.get('/', async (ctx, next) => {
  console.log('111')
  ctx.response.body = '111'
  await next() // 如果 注释该段，则不执行all
  console.log('222')
})

router.all('/', async (ctx, next) => {
  console.log('all...111')
  await next()
  console.log('all...222')
})
```

### 1.4 多中间件处理方式

```js
router.get('/', middleware, midlleware, ctx => {})
```

### 1.5 嵌套路由

嵌套路由也可以实现类似路由前缀的功能，但是能够额外添加动态参数

```js
const userRouter = new Router()
const userAction = new Router()

userAction.get('/:pid', (ctx, next) => {
  console.log('/:pid')
})

// /user/123/login/123    /user/123/login
userRouter.use(
  '/user/:fid/login',
  userAction.routes(),
  userAction.allowedMethods()
)

app.use(userRouter.routes())
```

## 三 请求处理

### 3.1 GET 请求

```js
app.use(async function (ctx) {
  // console.log(ctx.request);
  // console.log(ctx.req);
  console.log(ctx.url) //login?name=lisi
  console.log(ctx.request.query) //{ name: 'lisi' }
  console.log(ctx.query) //{ name: 'lisi' }
  console.log(ctx.querystring) //name=lisi
  ctx.body = 'hello'
})
```

### 3.2 动态路由 /

使用 /: 接收参数

```JavaScript
router.get('/news/:id/:name', async (ctx)=>{
// localhost:3000/news/1/lisi 输出{"id":"1","name":"lisi"}
    ctx.body = ctx.params;
});
```

### 3.3 POST 请求

```js
app.use(async function (ctx) {
  if (ctx.url == '/' && ctx.method == 'GET') {
    let html = `<form action="/" method="post">
    <input type="text" id="username" name="username" value="">
    <input type="text" id="password" name="password" value="">
    <input type="submit" value="登录">
</form>`
    ctx.body = html
  } else if (ctx.url == '/' && ctx.method == 'POST') {
    let parseData = await parsePostData(ctx)
    ctx.body = parseData
  } else {
    ctx.body = '404'
  }
})

//解析post方法
function parsePostData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postdata = ''
      ctx.req.on('data', data => {
        postdata += data
      })
      ctx.req.addListener('end', function () {
        resolve(postdata)
      })
    } catch (error) {
      reject(error)
    }
  })
}

//转换为json方法
function parseQueryStr(queryStr) {
  let queryData = {}
  let queryStrList = queryStr.split('&')
  console.log(queryStrList)
  for (let [index, queryStr] of queryStrList.entries()) {
    let itemList = queryStr.split('=')
    console.log(itemList)
    queryData[itemList[0]] = decodeURIComponent(itemList[1])
  }
  return queryData
}
```

### 2.4 koa-bodyparser 中间件处理 post

```js
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const app = new Koa()

app.use(bodyParser())
app.use(async ctx => {
  if (ctx.url == '/' && ctx.method == 'GET') {
    let html = `<form action="/" method="post">
    <input type="text" id="username" name="username" value="">
    <input type="text" id="password" name="password" value="">
    <input type="submit" value="登录">
</form>`
    ctx.body = html
  } else if (ctx.url == '/' && ctx.method == 'POST') {
    let postData = ctx.request.body
    ctx.body = postData
  } else {
    ctx.body = '404' //{"username":"22222","password":"22555"}
  }
})
app.listen(8001)
```

## 一 洋葱模型应用

### 1.1 next 函数

next() 函数就是在其内部调用下一个中间件函数，返回的其实是一个 Promise 对象，该对象内部包裹了下一个中间件的返回结果：

```js
app.use((ctx, next) => {
  console.log(1)
  const p = next() // 通过 p.then() 即可获取 aaa 结果
  console.log(p)
  console.log(2)
})

app.use((ctx, next) => {
  console.log(3)
  next()
  console.log(4)
  return 'aaa'
})
```

输出结果为：

```txt
1
3
4
Promise { 'aaa' }
2
```

### 1.2 async/await 的使用

Koa2 原生支持了 async/await，在采用该语法糖后，如果不注意会造成中间件的加载错误：

```js
app.use(async (ctx, next) => {
  console.log(1)
  const p = await next() // 通过 p.then() 即可获取 aaa 结果
  console.log(p)
  console.log(2)
})

app.use(async (ctx, next) => {
  console.log(3)
  await next()
  console.log(4)
  return 'aaa'
})
```

上述代码运行的顺序是符合洋葱模型的，输出结果为：

```txt
1
3
4
'aaa'
2
```

async 关键字的意义就是将返回结果包装为 Promise，而 await 能够实现类似线程阻塞的功能。

### 1.3 注意事项

使用 async/await 后，如果一部分中间件忘记添加了该关键字，则容易出现顺序异常：

```js
app.use((ctx, next) => {
  console.log(1)
  next()
  console.log(2)
})

app.use(async (ctx, next) => {
  console.log(3)
  await next()
  console.log(4)
})
```

输出的结果为不再是`1342`，而是：

```txt
1
3
2
4
```

这是因为第二个中间件函数内部的 next() 使用了 await 进行阻塞，直接将下一个要执行的中间件函数运行结束。这便不是洋葱模型了，如果要保证洋葱模型，推荐全部使用 async 包裹，next 函数使用 await 阻塞。

## 二 洋葱模型的意义

为什么 Koa 被称为下一代 web 框架？本质上是舍弃了路由之后更基础的设计理念，以及洋葱模型带来的便利。

比如现在需要知道所有中间件加载的时间，可以直接在第一个中间件的 next 之后获取时间：

```js
// 第一个中间件
app.use(async (ctx, next) => {
  console.time()
  await next()
  // next 之后的代码表示 中间件已经全部执行完毕了
  console.timeEnd()
})
```

此时在 Express 中就没有这么多顺利了。

## 三 Koa 中间件源码阅读

koa 的中间件：

中间件的本质是一个函数，在 koa 中，该函数通常具有 ctx 和 next 两个参数，分别表示封装好的 req/res 对象以及下一个要执行的中间件，当有多个中间件的时候，本质上是一种嵌套调用，就像洋葱。

koa 和 express 都是用 app.use()来加载中间件，但是内部实现大不相同，koa 的源码文件 Application.js 中定义了 use 方法：

```js
use(fn){
    //....
    this.middleware.push(fn);
    return this;
}
```

koa 在 application.js 中维护了一个 middleware 的数组，如果有新的中间件被加载，就 push 到这个数组中。
