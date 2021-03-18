# 03-数据类型-4-引用类型 Object

## 一 引用类型

引用类型在 JavaScript 中通过 `typeof` 获得的结果是 `object`，即引用类型变量存储的值，其实是一个对象，把数据与功能组织到一起的结构，该变量既能存储一定的数据，也保留了一定的行为供用户使用。

示例：

```js
// 基本类型
let num1 = 10
let num2 = a
num1 = 11
console.log(num2) // 10

// 引用类型
let arr = [1, 2, 3]
let arr2 = arr
arr[0] = 9
console.log(arr2) // [ 9, 2, 3 ]
```

在上述示例中：

- 数据类型 a 是基础数据类型，在赋值给 b 时，是重新申请的内存，并将值拷贝过来进行存储。
- 数据类型 arr 是引用类型，在复制给 arr2 时，也重新申请内存，但是拷贝过来的是 arr 的内存地址，而不是地址指向的值

引用类型存储的数据其实是真实数据在内存中的地址。

## 二 初识 Object 类

在 JS 数据类型中，Object 类型即是引用类型，其实就是一组数据和功能的合集，通过 new 操作符获取该合集具体的一个实例：

```js
let obj = new Object() // 没有参数时()可以省略，但是不推荐！
```

基于 Object 类型还有一些衍生的引用类型，如：Array、Function、Date、Math 等。所以 Object 与 Java 中的 java.lang.Object 类非常相似，也是派生其他对象的`基类`，即是所有类的祖先！

每个 Object 类的实例都有如下属性和方法：

- `constructor`：用于创建当前对象实例的函数。在前面的例子中，这个属性的值就是 Object()函数。
- `hasOwnProperty(propertyName)`：用于判断当前对象实例上是否存在给定的属性。
- `isPrototypeOf(object)`：用于判断当前对象是否为另一个对象的原型。
- `propertyIsEnumerable(propertyName)`：用于判断给定的属性是否可以使用 for-in 语句枚举。
- `toLocaleString()`：返回对象的字符串，该字符串反映对象所在的本地化执行环境。
- `toString()`：返回对象的字符串。
- `valueOf()`：返回对象对应的字符串、数值或布尔值表示。通常与 toString()的返回值相同。

Object 类型会在面向对象章节详细介绍。
