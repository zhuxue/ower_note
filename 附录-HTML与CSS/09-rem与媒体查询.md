# 02-rem 与媒体查询

## 一 rem

### 1.1 rem 适配布局概念

px 是一个实际的像素大小，rem（root em）、em 都是相对大小：

- em：相对于父元素的字体大小。比如父元素的字体为 5px，子元素为 2em，则子元素的字体为 10px。
- rem：相对于 html 根元素字体大小（默认为 16px）。比如 html 设置了 `font-size=10px`，若某个非根元素设置 `width:2rem;` 换算为 px 就是 20px。

当使用 rem 作为单位时，只要 html 元素中的字体大小发生改变，那么整体的布局就会相应发生改变，其适配的核心方案是随着屏幕的变化，字体发生相应变化，界面进行等比例缩放。

rem 可以用来解决布局中一些大小问题，如：

- 传统布局、flex 布局中，文字都不能随着屏幕大小变化而变化
- 流式布局和 flex 布局主要针对宽度进行布局，高度不能很好的定义
- 在屏幕发生变化时，元素的宽高不能很好的进行等比例缩放

### 1.2 rem 实现方式一：js 控制

自动改变字体大小的 js：

```js
;(function (doc, win) {
  let docElement = doc.documentElement
  let resizeEvent =
    'orientationchange' in window ? 'orientationchange' : 'resize'

  let recalc = function () {
    let clientWidth = docElement.clientWidth
    if (!clientWidth) return

    // 设计稿基准为750px
    if (clientWidth >= 750) {
      docElement.style.fontSize = '100px'
    } else {
      docElement.style.fontSize = 100 * (clientWidth / 750) + 'px'
    }
  }

  if (!doc.addEventListener) return
  win.addEventListener(resizeEvent, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
```

有了该脚本，只需要将设计稿（750px）量出的像素值除以 100 即可得到 rem 的值.这里要注意，html 根元素的字体大小改变会引起一个 bug：图片与文件间距会出现变化，可以为 body 设置固定大小即可：

```html
<style>
  * {
    margin: 0;
    padding: 0;
  }
  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
  }

  .header {
    background: #ff5555;
    height: 0.82rem;
    width: 100%;
  }
</style>

<body>
  <div class="header"></div>

  <script>
    ;(function (doc, win) {
      let docElement = doc.documentElement
      let resizeEvent =
        'orientationchange' in window ? 'orientationchange' : 'resize'
      let recalc = function () {
        let clientWidth = docElement.clientWidth
        if (!clientWidth) return
        if (clientWidth >= 750) {
          docElement.style.fontSize = '100px'
        } else {
          docElement.style.fontSize = 100 * (clientWidth / 750) + 'px'
        }
      }

      if (!doc.addEventListener) return
      win.addEventListener(resizeEvent, recalc, false)
      doc.addEventListener('DOMContentLoaded', recalc, false)
    })(document, window)
  </script>
</body>
```

### 1.3 rem 实现方式二：vw 布局

vw 布局可以看做的是 rem 的进化版，比上述 js 控制的方式更加简单，但是只兼容 iOS8、Android4.4 以上系统。

vw 布局即：

```html
<style>
  html {
    <!-- 设计稿分为100份： 100/750*100 -->
    font-size: 13.33333333vw;
  }
</style>
```

vw 即表示 1%的屏幕宽度，设计稿如果是 750px，则屏幕一共是 100vw，1px 就是 0.1333333vw。为了方便计算，放大 100 倍，如果 html 是 100px，则 1px 就是 0.13333333vw，100px 就是 13.333333vw

## 二 媒体查询

媒体查询（Media Query）是 CSS3 引入的新技术，可以针对不同的屏幕尺寸设置不同的样式，在重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面！

示例：

```css
/*
声明媒体查询：@media
参数一：mediatype，媒体类型，值有：
        all：用于所有设备
        print：用于打印机和打印预览
        screen：用于电脑、平板、手机等

参数二： 用于连接参数1与参数二，为 and not only 等值
        and：可以将多个媒体特性连接到一起，即： 且
        not：排除某个媒体类型，即：非，可以省略
        only：指定某个特性的特性，可以省略
参数三： media feature 特性，必须有小括号包含
        width: 可视区宽度
        min-width：可视区最小宽度
        max-width：可视区最大宽度
*/
@media screen and (max-width: 800px) {
  /* 在屏幕中，且设置最大宽度为800px */
  body {
    background-color: pink;
  }
}

@media screen and (max-width: 500px) {
  body {
    background-color: green;
  }
}
```

## 三 rem 与媒体查询配合实现移动端布局

### 3.1

配合使用案例：

```css
@media and (min-width: 320px) {
  html {
    font-size: 50px;
  }
}

@media and (min-width: 540px) and (max-width: 600px) {
  html {
    font-size: 100px;
  }
}

@media and (min-width: 640px) {
  html {
    font-size: 100px;
  }
}
```

当样式繁多时，使用媒体查询引入资源可以更好的实现移动端布局：

```html
/* 针对不同的屏幕尺寸，引入不同的css资源 */
<link
  rel="stylesheet"
  href="./small.css"
  media="screen and (min-width:320px)"
/>
<link rel="stylesheet" href="./big.css" media="screen and (min-width:640px)" />
```

### 3.2 rem 在企业中的实践方案

目前有两种常见的实践方案：

- less+媒体查询+rem：一般采用标准尺寸 750px，页面元素的 rem 值=750 像素下的 px 值/html 文字大小
- flexible.js+rem：更简便，该库由淘宝推出，有了其支持，不再需要对不同屏幕进行媒体查询。其原理是将当前设备划分为了 10 等份，在不同设备下比例一致。如当前设计稿是 750px，那么只需要把 html 的字体设置为 750px/10 即可，当前元素的 rem 值就是：页面元素的 px 值/75，其他的交给了库自己运算

贴士：vscode 插件 cssrem 可以快速帮助运算。
