# 01-fetch 的简单使用

## 一 fetch 概述

fetch 是新的网络数据交互标准，功能、性能更加强大，可以看到 Ajax 的升级版。

fetch 是基于 Promise 实现的：

```js
fetch(url)
    .then(fn1)
    .then(fn2)
    ...
    .catch(fn)
```

示例：

```js
fetch("http://localhost:3000/getDemo")
  .then(function (data) {
    return data.text(); // text() 返回Promise实例对象,包装的是真实的后台返回数据
  })
  .then(function (data) {
    console.log("请求到的数据：", data);
  });
```

## 二 fetch 的详细解释

### 2.1 get 请求

只需要注明请求时候的方式即可，其实默认就是使用 get 方式请求的

```js
fetch("http://localhost:3000/getDemo", {
  method: "get",
});
```

请求的地址仍然支持 `?id=123`这样拼接，也支持 REST 风格的 `user/123`。

### 2.2 post 请求

url 编码形式：

```js
fetch("http://localhost:3000/postDemo", {
  method: "post",
  body: "id=1001&pwd=123",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});
```

json 形式：

```js
fetch("http://localhost:3000/postDemo", {
  method: "post",
  body: JSON.stringif({
    id: 1001,
  }),
  headers: {
    "Content-Type": "application/json",
  },
});
```

### 2.3 响应结果

依据后台响应数据格式的不同，fetch 也需要做不同的应对，如果返回结果是 json 格式：

```js
fetch("http://localhost:3000/postDemo", {
  method: "post",
  body: "id=1001&pwd=123",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
}).then(function (data) {
  return data.json();
});
```
