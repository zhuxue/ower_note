# 07-H5 中 DOM 的变化

## 一 H5 对 DOM 的变化影响

### 1.1 类名与 DOM 操作

H5 新增的方法：

```js
// 通过类名获取元素
document.getElementsByClassName()

// 类名操作
元素节点.classList.remove("div1")   // 删除类
元素节点.classList.add("div1")   // 添加类
元素节点.classList.toggle("div1")   // 切换类

//确定元素中是否包含既定的类名
if (div.classList.contains("bd") && !div.classList.contains("disabled")){
    //执行操作
)

//迭代类名
for (let i = 0, len = div.classList.length; i < len; i++){
    doSomething(div.classList[i]);
}
```

### 1.2 焦点管理

```js
button.focus()
alert(document.hasFocus()) //true 确定文档是否获得了焦点
alert(document.activeElement === button) //true
```

默认情况下，文档刚刚加载完成时， document.activeElement 中保存的是 document.body 元素的引用。文档加载期间， document.activeElement 的值为 null。

### 1.3 HTMLDocument 变化

H5 规范了 readyState 属性，其值有：

- loading，正在加载文档；
- complete，已经加载完文档

H5 规范了 compatMode 属性，用于告知开发人员浏览器采用了哪种渲染模式：

```js
if (document.compatMode == 'CSS1Compat') {
  // 标准模式
  alert('Standards mode')
} else {
  alert('Quirks mode') // 混杂模式
}
```

document.body 很好用，H5 又引入了 document.head 属性。

H5 引入了`document.charset = "UTF-8";`用于设置字符集。如果文档没有使用默认的字符集，那 charset 和 defaultCharset 属性的值可能会不一样，例如：

```js
if (document.charset != document.defaultCharset) {
  alert('Custom character set being used.')
}
```

### 1.4 自定义数据属性

```js
;<div id="myDiv" data-appId="12345" data-myname="Nicholas"></div>

var div = document.getElementById('myDiv')

//取得自定义属性的值
var appId = div.dataset.appId
var myName = div.dataset.myname
//设置值
div.dataset.appId = 23456
div.dataset.myname = 'Michael'
```

### 1.5 innerHTML

H5 支持了 innerHTML 方法。

### 1.6 HTML5 新增属性

```txt
hidden：        hidden属性可以代替CSS样式中的display属性
spellcheck：    表单元素的该属性支持true、false属性值，以判断是否需要浏览器对文本进行校验，如：对拼错的单词进行提示。
disabled：      新属性disabled直接就可以让input无法选择，而老版的html中要使用:disabled="disabled"
```

## 二 H5 原生拖放

### 2.1 拖放事件

在 H5 规范中，拖动元素，将依次触发：`dragstart`，`drag`，`dragend`三个事件。

当某个元素被拖动到一个有效的放置目标上时，将依次触发：`dragenter`，`dragover`，`dragleave/drop`三个事件。如果拖拽元素离开了目标元素位置，则触发 dragleav 事件，如果放置到了目标元素位置，则触发 drop 事件。

### 2.2 自定义放置目标

如果拖动元素经过不允许放置的元素，无论用户如何操作，都不会发生 drop 事件。不过，任何元素都可以被设置为放置目标元素。

设置元素可以放置方式是重写 dragenter、dragover 事件的默认行为：

```js
let droptarget = document.getElementById('droptarget')
EventUtil.addHandler(droptarget, 'dragover', function (event) {
  EventUtil.preventDefault(event)
})

EventUtil.addHandler(droptarget, 'dragenter', function (event) {
  EventUtil.preventDefault(event)
})
```

在 Firefox 中，若拖拽图像，则页面会转向图像文件，若拖拽文本，则会导致无效 URL 错误，所以这里需要取消 Firefox 的 drop 事件的默认行为，阻止其打开 URL：

```js
EventUtil.addHandler(droptarget, 'drop', function (event) {
  EventUtil.preventDefault(event)
})
```

### 2.3 dataTransfer 对象

dataTransfer 对象是拖拽事件对象的属性，用于存储数据：

```js
//设置和接收文本数据
event.dataTransfer.setData('text', 'some text')
var text = event.dataTransfer.getData('text')
//设置和接收 URL
event.dataTransfer.setData('URL', 'http://www.wrox.com/')
var url = event.dataTransfer.getData('URL')
```

### 2.4 可拖动

默认情况下，图像、链接和文本是可以拖动的，也就是说，不用额外编写代码，用户就可以拖动它们。文本只有在被选中的情况下才能拖动，而图像和链接在任何时候都可以拖动。

HTML5 为所有 HTML 元素规定了一个 draggable 属性，表示元素是否可以拖动。图像和链接的 draggable 属性自动被设置成了 true，而其他元素这个属性的默认值都是 false。

## 三 文件对象

H5 中通过 `<input>` 可以得到一个 Files 对象（伪数组）：

```js
let obj = document.querySelector('input') // 必须设置input为 mutipart
obj.onchange = function () {
  // 所有的文件
  console.log(this.files) // 是维数组的原因：input一次可以选择多个文件

  // 读取文件内容！
  let reader = new FileReader()
  reader.readAsText(this.files[0])

  // 文件读取完毕
  reader.onload = function () {
    console.log(this.result)
  }
}
```
