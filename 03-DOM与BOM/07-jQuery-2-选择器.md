# 02-jQuery 选择器

## 一 jQuery 的基本选择器

### 1.1 基本选择器

```js
// id选择器
$('#btn')

// 类选择器
$('.btn')

// 标签选择器
$('div')

// 交集选择器
$('.red.green') // 选择class为red且green的元素

// 并集选择器
$('.red,.green') // 选择class为red或green的元素
```

### 1.2 层级选择器

```js
// 后代选择器（空格）
$('#ul li') // 选择id为ul的元素的所有后代li

// 子代选择器（>）
$('#ul > li') // 选择id为ul的元素的直系后代li
```

### 1.3 筛选选择器

常见的筛选选择器：

```js
// 选择第一个元素
$('ul li:first') // 获取第一个li元素

// 选择最后一个元素
$('ul li:last') // 获取最后一个li元素

// 选择匹配索引的元素，索引从0开始
$('ul li:eq(2)') // 选择索引号为2的li

// 选择匹配奇数索引元素
$('ul li:odd') // 选择奇数索引的的li

// 选择匹配偶数索引元素
$('ul li:even') // 选择偶数索引的的li
```

## 三 筛选方法

```js
// find() 查找所有后代元素
$('#j_wrap').find('li').css('color', 'red')

// children() 查找直接子代元素
$('#j_wrap').children('ul').css('color', 'red')

// parent() 查找父元素
$('#j_liItem').parent('ul').css('color', 'red') //选择id为j_liItem的父元素

// parents() 查找所有祖先节点:传入参数具备筛选功能（只有复合参数的祖先节点）
$('#j_liItem').parents('ul').css('color', 'red') //选择id为j_liItem的所有祖先元素

// siblings() 查找所有兄弟元素,不包括自己
$('#j_liItem').siblings().css('color', 'red')

// 查找所有兄弟节点：
nextAll() // 查找当前元素之后的所有兄弟元素
nextUntil() // 作用同上，可以传入参数，查找到指定位置
prevAll() // 查找当前元素之前的所有兄弟元素
prevUntil() // 作用同上，可以传入参数，查找到指定位置

// offsetParent() 获取有定位的父级
offsetParent()

// eq(index) 查找指定元素的第index个元素
$('li').eq(2).css('color', 'red') //选择所有li元素中的第二个

// 返回选择元素集合从第 start-end 位置的元素
slice(start, end)
```
