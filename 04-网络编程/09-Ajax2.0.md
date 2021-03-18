# 06-AJax2.0

## 一 Ajax2.0 概念

早期的 ajax 技术不支持异步文件上传，在后面更新了 ajax2.0 版本 支持文件上传了 但需要借助一个对象----FormData 对象。

Ajax2.0 大体的步骤跟以前是一样的 但也是有一点小区别：

- Ajax 里不需要设置请求头，它内部已经自动设置了
- 需要创建一个 FormData 对象，并且传入表单
- 表单是不给“提交”按钮的，没有 submit 按钮时 button 按钮相当于 submit 按钮

## 二 FormData

### 2.1 FormData 概念

FormData 接口提供了一种表示表单数据的键值对 key/value 的构造方式，并且可以轻松的将数据通过 XMLHttpRequest.send() 方法发送出去，本接口和此方法都相当简单直接。如果送出时的编码类型被设为 "multipart/form-data"，它会使用和表单一样的格式。

遗憾的是 FormData 只有 IE10 以上才支持。

### 2.2 使用 FormData

我们可以直接使用 FormData 对象来构建参数：

```js
let formData = new FormData()
formData.append('username', 'Chris')
```

也可以直接通过表单形式构建：

```html
<!--ajax2.0 无需action、method等-->
<form id="form">
  <input type="text" name="username" />
  <input type="passsword" name="password" />
  <input type="button" id="btn" value="提交" />
</form>
<script>
  let formData = new FormData(document.querySelector('#form'))
  // formData 中会自动填充上表单中的键值对数据
</script>
```

### 2.3 FormData 相关方法

FormData 中的数据设置与获取：

```js
formData.get('key') // 获取
formData.set('key', 'value') // 设置
formData.delete('key') // 删除
formData.append('key', 'value') // 追加
```

### 2.4 提交 FormData 数据到后台

```js
let btn = document.querySelector('#btn')
btn.onclick = function () {
  let formData = new FormData(document.querySelector('#form'))
  let xhr = new XMLHttpRequest()
  xhr.open('post', 'http://localhost:3000/formDatDemo')
  // 无需设置请求头
  xhr.send(formData)
  xhr.onload = function () {
    console.log(xhr.responseText)
  }
}
```

### 2.5 文件上传

FormData 上传文件是以二进制数据格式上传的。

```js
// 增加用户选择的文件
formData.append('myFile', this.files[0])
```

注意：上传文件时，其请求头会被自动设置为 `multipart/data`

上传的进度展示：

```js
xhr.upload.onprogress = function (ev) {
  bar.style.width = (ev.loaded / ev.total) * 100 + '%'
}
```

## 二 Ajax2.0 的跨域

## 三 fetch

fetch 是 W3C 最新的标准网络 API，因为 XMLHttpRequest 其实是一个设计粗糙的 API，但是 fetch 在很多浏览器中支持度较低。

示例：

```js
fetch('/test1').then(res => {
  console.log(res)
})
```

贴士：fetch 请求默认不会懈怠 cookie，需要设置：

```js
fetch(cur, {
  credentials: 'include',
})
```

## Axios
