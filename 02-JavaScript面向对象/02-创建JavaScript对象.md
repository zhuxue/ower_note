# 02-JavaScript 中的面向对象

## 一 使用直接量创建实例对象

直接量是最简单的实例创建方式：

```js
// 创建实例：
var obj = {
  name: '张学友',
  age: 13,
  run: function () {
    console.log(this.name + '唱歌...')
  },
}

// 操作实例：
p.sing()
```

## 二 使用构造函数与原型创建对象

单独使用构造函数或者单独使用原型都可以创建对象，但是他们都各有弊端。使用构造函数+原型的方式创建对象 JS 推荐的方式之一，其本质其实就是通过类模板 new 出一个实例：

```js
// 首先创建 Person类
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.sing = function () {
  console.log(this.name + '唱歌...')
}

// 再创建 Person类的实例 p
var p = new Person('张学友', 18)

// 操作实例
p.sing()
```

new 创建对象的过程：

- 1 开辟空间，创建一个空对象
- 2 把 this 指向这个空对象
- 3 把空对象的内部原型 指向 构造函数的原型
- 4 如果 new 时候需要传参，将参数赋值给 this
- 5 无论有没有 return，都会默认返回 this，
  - 如果写明 return 了一个引用类型，则产生的对象是该引用类型
  - 如果写明 return 了一个基本类型，则仍然返回 this

伪代码演示 new 过程：

```
     this = {};                          // 1、2
     this.__proto__ = 构造函数.prototype;  // 3
     this.age = 18;                   // 4
     return this;                   // 5
```

也有一部分书籍推荐使用动态原型方式，写起来更美观：

```js
function Person(name, age, job) {
  //属性
  this.name = name
  this.age = age
  this.job = job
  //方法
  if (typeof this.sayName != 'function') {
    Person.prototype.sayName = function () {
      alert(this.name)
    }
  }
}
var friend = new Person('Nicholas', 29, 'Software Engineer')
friend.sayName()
```

当然也可以自定义一个 New()函数来完整的模拟 new 关键字的过程：

```js
function New(func) {
  var res = {} // 声明一个中间对象作为最终返回的实例

  if (func.prototype === null) {
    console.log('非法参数')
    return
  }

  res.__proto__ = func.prototype // 将实例的原型指向构造函数的原型

  // ret为构造函数的执行结果，将构造函数内部的htis指向res实例对象
  var ret = func.apply(res, Array.prototype.slice.call(arguments, 1))

  if ((typeof ret === 'object' || typeof ret === 'function') && ret !== null) {
    return ret
  }

  return res
}
```

## 三 使用 Object 基类创建对象

将 Object 作为构造函数来创建对象：

```js
// 创建了一个空实例 p
var p = new Object()

// 给p添加属性与方法
p.name = '张学友'
p.age = 13
p.sing = function () {
  console.log(this.name + '唱歌...')
}

// 操作实例
p.sing()
```

ES5 的 Object 对象还提供了 create()方法用来创建对象：

```js
var obj = Object.create({
  name: 'lisi',
  age: 13,
})
console.log(obj.name)
```

注意：该方法传入参数为 null 时，会创建一个没有原型的新对象，不会继承任何东西，甚至不能使用`toString()`这样的基础方法，所以创建空对象的方式是：

```js
var obj = Object.create(Object.prototype)
```

## 四 使用工厂模式创建对象

创建对象时，我们往往需要还要对对象进行一系列的加工，这时候可以采用工厂模式：

```js
function createPersonFactory(age) {
  var obj = new Object()
  obj.age = age

  if (age < 18) {
    obj.des = '小孩'
  } else {
    obj.des = '大人'
  }

  obj.run = function () {
    console.log(obj.des + ' 跑步...')
  }

  return obj
}

var p = createPersonFactory(30)
p.run()
```

利用工厂模式创建对象并不是创建对象真正方式，其内部仍然是使用 new 或者直接量等。工厂模式属于软件工程领域的设计模式范畴，体现了软开工程的哲学思想。
