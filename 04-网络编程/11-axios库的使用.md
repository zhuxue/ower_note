# 02-axios 库的使用

## 一 axios 概述

axios 是基于 Promise 实现的网络数据交互库，可用于浏览器、NodeJS 的 HTTP 客户端 中！

示例：

```js

```

axios 能够拦截请求和响应，自动转换 JSON 数据。

## 二 axios 详细使用

==TODO==

## 三 axios 的拦截器

示例：

```js
// 拦截请求
axios.interceptors.request.use(
  function (config) {
    // config 中包含了大量的请求信息，比如 url，可以依据config，对不同请求做限定
    config.headers.mytoken = '*Dwdl&d!'
    return config
  },
  function (err) {
    console.log(err)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  function (res) {
    // res 中包含了所有响应结果
    return res.data
  },
  function (err) {
    console.log(err)
  }
)
```

同理
