# 01-DOM 概述

## 一 理解浏览器内的 JavaScript

ECMAScript 是 JavaScript 的语法核心，但是仅仅有语法，没有一些具体的 API 帮助，JS 也只是一个玩具。在浏览器环境中，浏览器为 JavaScript 提供了两大对象 DOM、BOM，让 JavaScript 能够游刃有余的操作浏览器相关特性。

如图所示：

![JavaScript组成](../images/javascript/02-1-01-01.svg)

所以 JavaScript 包含三个方面：

- ECMAScript：JavaScript 语法标准，如：类型、关键字、基本对象等，有 ES5、ES6(即 ES2015)、ES7(即 ES2016)，后续皆以年代为规范的名称
- DOM：`Document Object Model`，JavaScript 操作网页元素的 API
- BOM：`Browser Object Model`，JavaScript 操作浏览器部分功能的 API

> API：Application Programming Interface，即用用程序编程接口，是包装好后提供给开发人员使用的工具

有了浏览器为 JavaScript 提供的 DOM、BOM 对象，就能完成对网页中任何功能的开发。但由于浏览器厂商、版本的不同，DOM 和 BOM 对象的一些 API 往往使用方式不同，或者不兼容。现在 DOM 和 BOM 已经被纳入 HTML5 规范，相信未来会逐渐统一。

> HTML5： HTML5 并不仅仅是 HTML4 的升级改进，而是设定了专门针对 Web 平台 API 的一系列规范，包括：视频、音频、图像、动画以及与设备的交互，将 Web 带入了一个成熟的应用平台。

## 二 DOM 简介

### 2.1 DOM 概念

HTML 加载完毕后，渲染引擎会在内存中把 HTML 文档，生成一个 DOM 树，即文档对象模型（DOM，Document Object Model）。DOM 是针对 HTML、XML 的 API 接口，描绘了一个层次化的树，允许开发人员对其进行增删改查。

书写示例：

```html
<body>
  <script>
    // 入口函数：页面的结构、样式、节点等加载完毕后才去执行函数体。
    window.onload = function () {
      console.log('hello DOM')
      console.log(document) // 查看 document 文档对象
    }
  </script>
</body>
```

上述示例中输出的 document 对象，其实就是整个 HTML 文档，如图所示：

![dom](../images/dom/01.png)

注意：DOM 中所有的 API 都挂载在了 `window` 这个对象上，为了方便，window 可以忽略不写。

### 2.2 DOM 的级别

DOM 经过了 Level 1 到现在 Level 4 的发展，每次级别的提升，都是 W3C 组织增加了一些 DOM 的操作方法！

## 三 script 标签

### 3.1 script 标签引入方式

JavaScript 的代码要被书写于脚本标签中，但是 HTML5 和 HTML4 的脚本标签规范不尽一致：

- HTML4 规范：`<script type="application/javascript"> </script>`
- HTML5 规范：`<script> </script>`

脚本标签有三种书写位置：

```html
<!-- 直接在html网页中书写代码，HelloWorld中使用了内嵌式 -->
<script>
  console.log('Hello World!')
</script>

<!-- 推荐方式。代码位于专门的js文件，由脚本标签引入 -->
<script src="./hello.js"></script>

<!-- 极度不推荐。代码直接书写于html标签中 -->
<button onclick="fn()">登录</button>
```

一般推荐使用外联式，因为这样可以显著**提升代码的课维护性**，并能**让 JS 文件在浏览器中获得缓存**。

注意：script 标签中的代码不能出现 `</script>`，需要转义为：`<\/script>`

### 3.2 script 元素的一些属性

script 标签常用的属性有：

- src：表示要包含的外部文件。
- type：表示脚本语言类型，默认都是`type="application/javascript"`，该属性已经替代了 `language` 属性。
- defer：立即下载脚本，延迟到文档解析后执行。该属性值对外部文件有效。写法：`defer="defer"`，H5 中简写为：`defer`。
- async：立即下载脚本，且不阻止其他页面动作。该属性只对外部文件有效。写法：`sync="sync"`，H5 中简写为：`sync`。

注意：`type="application/module"`表示可以出现 import 和 export 关键字，代码被作为 ES6 模块使用。

### 3.3 script 元素的位置

在传统做法中，所有的 script 元素都应该放在页面的 head 元素中，如下所示：

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="./demo1.js"></script>
    <script src="./demo2.js"></script>
  </head>

  <body></body>
</html>
```

在 head 中引入 JS 外部文件，将会导致必须等到所有 JS 代码都被下载解析、执行完成后，才能呈现页面内容（body 标签），这样会严重影响用户体验，如果脚本文件过大，会导致网页打开时候出现一片空白。

为了避免上述现象，可以将 script 元素放在页面的底部：

```html
<!DOCTYPE html>
<html>
  <head> </head>

  <body>
    <script src="./demo1.js"></script>
    <script src="./demo2.js"></script>
  </body>
</html>
```

贴士：多个脚本在引入时，会按照引入顺序依次执行。defer 属性支持下，可以将 js 放在顶部，且多个 JS 文件在下载后会按照顺序执行，但是大多浏览器都不支持顺序执行！！sync 属性由于是异步下载，更不可能按照顺序执行了！所以为了保证顺序，可以不使用 defer、async，把标签都统一放在 body 底部即可！

### 3.4 defer 延迟脚本

defer 属性表示告诉浏览器立即下载 JS 外部文件，但是会延迟执行 JS，即脚本会被延迟到整个页面都解析完毕后再运行。

```html
<script src="./demo1.js" defer="defer"></script>
<script src="./demo2.js" defer="defer"></script>
```

此时这个 script 元素即使在 head 元素中，脚本的执行仍然需要等到网页完全呈现后才会执行。在 HTML5 规范中，上述 2 个脚本需要按照顺序进行延迟执行，但是现实往往不尽人意，他们的执行顺序并不固定，所以在使用延迟脚本时，推荐 html 页面中只包含一个延迟脚本。

### 3.5 async 异步脚本

**async 属性的作用是告诉浏览器不必等待脚本的下载、执行，可以直接加载页面！**

异步脚本 async 属性是 H5 中的规范，该属性与 defer 类似，会告诉浏览器立即下载文件，但是 async 脚本用于不让页面等待两个脚本的下载执行，同时也不保证执行的顺序。所以如果要引入多个异步脚本，要确保他们互相之间不再依赖！也建议异步脚本不要在加载期间修改 DOM。

```html
<script src="./demo1.js" async></script>
<script src="./demo2.js" async></script>
```

注意：

- 异步脚本 async 一定会在页面的 load 事件前执行，但可能会在 DOMContentLoaded 事件触发前、后都有可能执行
- 延迟脚本 defer 在 H5 规范中要求要先于 DOMContentLoaded 事件执行，但是现实中不一定！
