# 07-异步编程-3-async 与 await

## 一 ES7 的 async/await

Promise 虽然给异步编程带来了便利，但是在大型项目上用起来仍然较为繁琐。ES6 提出的过渡方案 generator 也因为引入了一些新语法而未被社区完全接受。ES7 的 async/await 引入后，JS 的异步编程体验才得到的质的提升。

async/await 语法：

```
async function(){

    // await是等待的意思，等待异步操作返回的结果，会阻塞代码
    let res1 = await 异步操作1(Promise/generator/async);

    // 这时候异步操作2需要等待 res1 的结果获取后才能执行
    let res2 = await 异步操作2(Promise/generator/async);
}
```

基本示例：

```js
async function show(params) {
  console.log('阶段一')

  await new Promise(function (resolve, rejec) {
    setTimeout(function () {
      resolve()
    }, 3000)
  })

  console.log('阶段二')

  await new Promise(function (resolve, rejec) {
    setTimeout(function () {
      resolve()
    }, 2000)
  })

  console.log('阶段三')
}

show()
```

输出结果：

```
阶段一
阶段二
阶段三
```

上面的写法已经符合正常人的顺序思维了，不过要理解的是：async/await 不过是语法糖，并未真正将异步代码同步化！

## 二 async/await 的异常捕获

在 Promise 中，通过 catch 或者 then 的第二个参数捕获异常。在 async 中，通过 try/catch 捕获异常：

```js
const foo = async () => {
  try {
    await fn()
  } catch (e) {
    console.log(e)
  }
}

foo()
```

如果有多个 await 函数，那么只返回第一个捕获到的异常：

```js
function fn1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('fn1 err!')
    }, 1000)
  })
}

function fn2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('fn2 err!')
    }, 1000)
  })
}

const foo = async () => {
  try {
    await fn1()
    await fn2()
  } catch (e) {
    console.log(e) // fn1 err!
  }
}

foo()
```
