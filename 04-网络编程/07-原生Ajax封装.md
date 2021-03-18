# 03-原生 Ajax 封装

## 一 原生 Ajax 封装

### 1.1 封装函数

```js
function ajax(options) {
  // 参数校验

  // 创建 xhr 对象：只支持IE8及以上
  let xhr = new XMLHttpRequest()

  // 构造参数:options.params 必须是json
  let params = ''

  if (options.type === 'GET') {
    for (let item in options.data) {
      params += item + '=' + options.params[item] + '&'
    }
    params = params.substr(0, params.length - 1) // 截取参数字符串最后的 &
    options.url = options.url + '?' + params
    params = null
  }

  if (options.type === 'POST') {
    params = JSON.stringify(options.params)
  }

  // 打开
  xhr.open(options.type, options.url)
  if (options.type === 'POST') {
    if (options.header['Content-Type']) {
      xhr.setRequestHeader('Content-Type', options.header['Content-Type'])
    } else {
      xhr.setRequestHeader('Content-Type', 'application/json')
    }
  }

  // 发送
  xhr.send(params)

  // 响应
  xhr.onload = function () {
    // 判断是否要转换服务端返回的数据
    let res = xhr.responseText
    if (xhr.getResponseHeader('Content-Type').includes('applications/json')) {
      res = JSON.parse(xhr.responseText)
    }

    if (xhr.status == 200 || (xhr.status >= 400 && xhr.status < 500)) {
      options.success(res, xhr)
    } else {
      options.error(res, xhr)
    }
  }
}
```

### 1.2 使用示例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <button id="btn">点击执行Ajax</button>
    <script src="ajax.js"></script>
    <script>
      let btn = document.querySelector('#btn')
      btn.onclick = function () {
        let baseURL = 'http://localhost:3000'
        let options = {
          type: 'POST',
          url: baseURL + '/postDemo',
          params: {
            uid: '1001',
            sex: 1,
          },
          header: {
            'Content-Type': 'application/json',
          },
          success: function (res) {
            console.log('success:', res)
          },
          error: function (res) {
            console.log('error:', res)
          },
        }
        ajax(options)
      }
    </script>
  </body>
</html>
```
