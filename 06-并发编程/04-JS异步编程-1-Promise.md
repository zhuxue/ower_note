# 07-异步编程-1-Promise

## 一 Promise 简单使用

### 1.1 回调地狱

异步虽然带来了性能上的好处，但是在代码书写上，会产生回调地狱，如常见的 ajax：

```js
XHR.onreadystatechange = function(){
    if(){
        XHR2.onreadystatechange = function(){

            if(){

                XHR2.onreadystatechange = function(){

                    if(){
                        XHR2.onreadystatechange = function(){

                        }
                    }
                }
            }
        }
    }
}
```

异步的优化方案很多，包括将回调函数命名，全部采用函数名方式调用，优化代码结构。但是这些在书写上都是治标不治本。ECMAScript 提出了三个解决方案：

- Promise 方案：基本的异步解决方案
- generator 生成器方案：ES6 过渡方案
- async/await 方案：ES7 提出的方案，配合 Promise 能够完美解决 JS 异步问题

### 1.2 Promise 示例

```js
// 构造 Promise 时，传入的函数用来修改 Promise 的执行结果，正确与错误的结果分别位于 resolve、reject 中。
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    // 模拟ajax
    let err = null
    let data = { uid: 1001 }
    if (err) {
      reject('发生了错误: ', null)
    }
    resolve(data)
  })
})

// 实例方法 then：用于处理状态改变后的业务
p.then(
  data => {
    console.log(data)
  },
  err => {
    console.log(err)
  }
)

// 输出结果：
// { uid: 1001 }
```

## 二 理解 Promise

### 2.1 then()方法与 catch()方法

then() 方法返回的仍然是一个 Promise 实例，所以可以使用 then 方法进行链式调用：

```js
let flag = false

// 在该函数内执行异步操作，并修改结果的状态值。
let p = new Promise(function (resolve, reject) {
  if (flag) {
    resolve('true...')
  } else {
    reject('false...')
  }
})

p.then(data => {
  console.log('处理成功，结果为：', data)
}).catch(err => {
  // 实例方法 catch： 用于捕获错误
  console.log('处理失败，错误为：', err)
})
```

### 2.2 Promise 状态

每个 Promise 都会经过一个个短暂的生命周期：`未决`，`已决`。

在这个生命周期内，Promise 会有三种可能的状态：

- 未决（unsettled）：表示异步操作尚未结束，此时的 Promise 只有挂起态一种状态
  - 挂起态（pending）此时 Promise 的状态为 ，
- 已决（settled）：此时 Promise 已经执行结束，但是可能绵连执行成功、执行失败两种状态
  - 已完成（fulfilled）：Promise 的异步操作成功结束，对应完成处理函数 `fulfillment handler`
  - 已拒绝（rejected）： Promise 的异步操作未成功结束，可能是由于错误、其他原因导致，对应着错误处理函数 `rejection handler`

### 2.3 Promise 其他 API

- `Promise.all`：参数数组中**所有**Promise 实例的状态为 resolved 或者 rejected 时，调用 then 方法
  - 示例：`Promise.all([fn1, fn2])`
- `Promise.race`：参数数组中**任一**Promise 实例的状态修改，调用 then 方法
  - 示例：`Promise.all([fn1, fn2])`
  - 示例：`Promise.race([fn1, fn2])`

Promise.resolve() / Promise.reject() 可以直接创建一个已决、未决 Promise 实例。

```js
let p = Promise.resolve(42)

p.then(function (value) {
  console.log(value) // 42
})
```

## 四 Promise 拒绝处理争议

Promise 的最大争议是：Promise 被拒绝时，若缺少拒绝处理函数，会静默失败：

```js
let p = Promise.reject(42)

// 此时 p 不会被处理

// 一段时间之后
p.catch(value => {
  // 现在 p 才被处理
  console.log(value)
})
```

在未来的 ES 版本中才会解决该问题，Node 和浏览器目前已经做出了支持：若没有拒绝处理事件，会执行默认的错误处理函数。

- unhandledRejection ： 当一个 Promise 被拒绝，而在事件循环的一个轮次中没有任何拒绝处理函数被调用， 该事件就会被触发；
- rejectionHandled ： 若一个 Promise 被拒绝，并在事件循环的一个轮次之后有了拒绝处理函数被调用，该事件就会被触发。

这两个事件旨在共同帮助识别已被拒绝但未曾被处理 promise。
