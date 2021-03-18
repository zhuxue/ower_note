# 01-BOM 概述

## 一 BOM 简介

BOM 是浏览器为开发者提供的 JavaScript 浏览器对象模型（Browser Object Modle），主要针对浏览器窗口、子窗口（frame）。

BOM 提供的一些常见操作：

- navigator 对象：提供浏览器本身的信息
- location 对象：提供加载页面的信息
- performance 对象：提供浏览器内存、时间统计等信息
- 支持 cookie
- 自持 Ajax

## 二 window 对象的使用

### 2.1 window 对象简介

BOM 的核心对象是 window，代表了浏览器的一个实例，也是浏览器的顶级对象，包括 DOM 的实例 document 也挂载在该对象上。

```js
let age = 29
function sayAge() {
  alert(this.age)
}

console.log(window.age) //29
window.sayAge() //29
```

window 对象上挂载的主要对象有：document、location、navigation、screen、history。在书写挂载在 window 上的成员时，window 可以省略。

### 2.2 window 的成员使用

注意：

- 在 window 上定义的属性可以使用 delete 删除，但是直接定义的全局变量不能使用 delete 删除。
- 在 window 上访问未定义的属性，只是一次查询，不会报错，但是其他地方直接使用未定义的变量，如：`var num = oldNum`，若 oldNum 未定义则报错！

```js
var age = 29
window.color = 'red'

//在 IE 8 中抛出错误，在其他所有浏览器中都返回 false
delete window.age

//在 IE 8 中抛出错误，在其他所有浏览器中都返回 true
delete window.color //returns true

alert(window.age) //29
alert(window.color) //undefined
```

使用 var 语句添加的 window 属性有一个名为[[Configurable]]的特性，这个特性的值被设置为 false，因此这样定义的属性不可以通过 delete 操作符删除，所以 IE8 中使用 delete 删除 window 属性的语句会抛出错误，IE9 及更高版本不会抛出错误。

## 三 window 对象的常见事件

### 3.1 窗口加载事件 load

我们推荐 `<script>` 标签卸载页面的底部，这是因为网页是从上往下加载的，DOM 对象未加载完毕，就直接在脚本内操作 DOM 会造成异常。

但是 window 对象提供了 onload 事件，即页面加载完毕触发该事件，可以让脚本代码的位置更灵活随意，但是相应的，所有的脚本代码就需要在该事件的回调函数中书写了：

```js
// onlaod：加载完图像、脚本、css等后调用
window.onload = function () {
  // 当前页面的所有业务代码
}
```

注意：load 事件只能写一次，多次书写只会以最后一个 onload 事件的回调函数为准。如果不想受到这个限制，可以使用 addEventListener。

### 3.2 DOM 加载事件 DOMContentLoaded

DOMContentLoaded 事件只会在 DOM 加载完成时触发，不包括 CSS、图片、flash 等。可以用于图片很多的页面（load 事件触发慢）。

注意：该事件不支持 IE8。

### 3.3 窗口大小改变事件 resize

```js
widnow.onresize = function () {}
```

## 四 window 常见成员

### 4.1 定时器 setTimeout setTimeinterval

setTimeout：多少毫秒后执行参数函数

```js
setTimeout(() => {}, 1000)
```

setTimeinterval：每多少毫秒执行一次参数函数

```js
setTimeinterval(() => {}, 1000)
```

贴士：依据常理，参数函数支持函数名的方式传入，但是这里还可以传入 `函数名()` 的形式，笔者匪夷所思，更不提倡。

定时器可以以表达式方式进行取名，用于区分不同的定时器，也能更好的实现定时器的清除：

```js
let timer = setTimeout(() => {}, 1000)
clearTimeout(timer) // 对应的还有 clearInterval()
```

> 回调函数：类似定时器里的参数函数，只有在执行了一系列操作后，才会调用的函数。

### 4.2 console

控制台的三个打印方法：

```js
console.log('打印日志')
console.warn('打印警告')
console.error('打印错误')
```

### 4.3 open() 打开窗口

```js
//等同于< a href="http://www.wrox.com" target="topFrame"></a>
window.open('http://www.wrox.com/', 'topFrame')
```

### 4.4 窗口位置

IE、 Safari、 Opera 和 Chrome 都提供了 screenLeft 和 screenTop 属性，分别用于表示窗口相对于屏幕左边和上边的位置。 Firefox 则在 screenX 和 screenY 属性中提供相同的窗口位置信息， Safari 和 Chrome 也同时支持这两个属性。

使用下列代码可以跨浏览器取得窗口左边和上边的位置:

```js
let leftPos =
  typeof window.screenLeft == 'number' ? window.screenLeft : window.screenX

let topPos =
  typeof window.screenTop == 'number' ? window.screenTop : window.screenY
```

IE、 Opera 中， screenLeft 和 screenTop 中保存的是从屏幕左边和上边到由 window 对象表示的页面可见区域的距离。换句话说，如果 window 对象是
最外层对象，而且浏览器窗口紧贴屏幕最上端——即 y 轴坐标为 0，那么 screenTop 的值就是位于页面可见区域上方的浏览器工具栏的像素高度。但是，在 Chrome、 Firefox 和 Safari 中， screenY 或 screenTop 中保存的是整个浏览器窗口相对于屏幕的坐标值，即在窗口的 y 轴坐标为 0 时返回 0。

Firefox、 Safari 和 Chrome 始终返回页面中每个框架的 top.screenX 和 top.screenY 值。即使在页面由于被设置了外边距而发生偏移的情况下，相对于 window 对象使用 screenX 和 screenY 每次也都会返回相同的值。而 IE 和 Opera 则会给出框架相对于屏幕边界的精确坐标值。

所以无法在跨浏览器的条件下取得窗口左边和上边的精确坐标值。moveTo()和 moveBy()方法倒是有可能将窗口精确地移动到一个新位置：

```js
//将窗口移动到屏幕左上角
window.moveTo(0, 0)
//将窗向下移动 100 像素
window.moveBy(0, 100)
//将窗口移动到(200,300)
window.moveTo(200, 300)
//将窗口向左移动 50 像素
window.moveBy(-50, 0)
```

注意：这两个方法可能会被浏览器禁用；而且，在 Opera 和 IE 7（及更高版本）中默认就是禁用的。另外，这两个方法都不适用于框架，只能对最外层的 window 对象使用。

## 五 frame

如果页面中包含框架，则每个框架都有自己的 window 对象，并且保存在 frames 集合中：

```js
<frameset rows="160,*">
    <frame src="frame.htm" name="topFrame">
    <frameset cols="50%,50%">
        <frame src="anotherframe.htm" name="leftFrame">
        <frame src="yetanotherframe.htm" name="rightFrame">
    </frameset>
</frameset>
```

上述页面可以通过
window.frames[0]或者 window.frames["topFrame"]来引用上方的框架。与窗口相关的对象还有：

- top：指向最外层框架，即浏览器窗口，上述代码最好使用 top，而不是 window
- parent：始终指向当前框架的
  直接上层框架
