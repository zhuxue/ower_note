# 02-Ajax 使用细节

## 一 Ajax 中的一些细节

### 1.1 GET 与 POST

在使用表单提交请求时，请求参数会被浏览器自动设置好，GET 方式的请求，参数会以 `?username=lisi&password=123` 方式追加到请求地址中，而 POST 方式的请求参数默认会被追加到请求体中，在 Ajax 中也同样有这样的设定。

GET 请求方式：

```js
// 2 设置请求方式、请求地址
let params = "username=lisi&password=123";
xhr.open("get", "http://localhost:3000/getDemo" + "?" + params);
// 3 发送请求
xhr.send();
```

GET 请求方式：

```js
// 2 设置请求方式、请求地址
let params = "username=lisi&password=123";
xhr.open("post", "http://localhost:3000/postDemo");
xhr.setRequestHeader(
  // POST 请求必须设置请求头
  "Content-Type",
  "application/x-www-form-urlencoded"
);
// 3 发送请求：在sen的中发送参数，POST的参数封装在请求体中
xhr.send(params);
```

### 1.2 参数传递方式

在上述案例中，请求的参数都是以字符串形式传递的：`"username=lisi&password=123"`，这种方式其实叫做 URL 编码格式。

通过设置请求头，请求参数的格式可以有多种传递方式：

```js
// URL 编码格式传递："username=lisi&password=123"
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

// JSON 格式传递: {username:"zs","password":"123"}，发送时必须转换为字符串
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(JSON.stringify({ username: "zs", password: "123" }));
```

注意：GET 请求只支持 URL 编码格式。

### 1.3 Ajax 错误处理

```js
xhr.onerror = function () {
  console.log("请求发生错误:", xhr.status);
};
```

### 1.4 Ajax 状态码

在创建 Ajax 对象，配置 Ajax 请求，发送请求，以及接收服务端响应数据过程中，每一个步骤都对应一个数值，即 Ajax 状态码。

```txt
0   请求未初始化（未调用open()）
1   请求已建立，但未发送（未调用send()）
2   请求已发送
3   请求正在处理中，此时一般已经接收到了一部分数据
4   响应完成
```

状态码的获取方式：`xhr.readyState`。状态码改变的监听事件为： `onreadystateChange`。

```js
xhr.onreadystatechange = function () {
  console.log(xhr.readyState); // 依次输出 1 2 3 4
};
xhr.send(params);
```

### 1.5 onload 与 onreadystatechange

```js
onload：              无需判断状态码，只调用一次，不兼容IE低版本
onreadystatechange：  需要判断状态码，会被调用多次，兼容IE低版本
```

## 二 通信协议

### 2.1 JSON

前后端进行数据传输的格式有：XML、JSON 等，JSON 是一种轻量级的数据交换格式。

```js
// 序列化:将对象转换为字符串
let obj = { name: "lisi" };
console.log(JSON.stringify(obj));

// 反序列化:将字符串转换为对象
let str = '{"name": "lisi"}';
console.log(JSON.parse(str));
```

## 三 一些开发问题

### 3.1 IE 中的请求缓存问题

IE8 中，请求的信息会被缓存下来，所以后续的星球会先从浏览器中直接获取结果，如果在这之间服务端出现了数据变化，Ajax 的获取到的数据却不会做响应变更。

解决方案：

```js
// 在请求地址的后面添加请求参数，每一次请求中的请求参数都不相同
xhr.open("get", "http://www.demo.com?t=" + Math.random());
```
