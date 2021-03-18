# 05-节流阀与`$`函数

## 一 节流阀

当类似 onkeydown 事件触发时，用户不停的按按按键，会反复触发，为了保证只触发一次，需要添加节流阀：

```js
//按下1-9这几个数字键，能触发对应的mouseenter事件
$(document).on('keydown', function (e) {
  if (flag) {
    flag = false
    //获取到按下的键
    let code = e.keyCode
    if (code >= 49 && code <= 57) {
      //触发对应的li的mouseenter事件
      $('.nav li')
        .eq(code - 49)
        .mouseenter()
    }
  }
})

$(document).on('keyup', function (e) {
  flag = true

  //获取到按下的键
  let code = e.keyCode
  if (code >= 49 && code <= 57) {
    //触发对应的li的mouseenter事件
    $('.nav li')
      .eq(code - 49)
      .mouseleave()
  }
})
```

## 二 `$` 方法

`$`下的方法大多数为工具类方法，不仅可以给 jQuery 使用，也可以给原生 JS 使用，调用方式统一为：`$.方法()`

```js
// 拷贝
$.extend(target, result) // 浅拷贝：源对象的中的复杂数据类型只拷贝地址。同一层的数据如果有冲突会被合并
$.extend(true, target, result) // 深拷贝：完全把数据重新赋值一份给target

type() //判断类型，比如时间对象返回Date，而typeof返回的都是Object。

trim() // 去除空白

inArray() //类似indexOf();

proxy() //改变this指向

parseJSON() //将字符串数据转换成json对象

makeArray() //将类数组转换成真正的数组

map()

each()
```
