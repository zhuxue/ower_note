



function Type() { };

var	types = [
	new Array,
    [],
	new Boolean,
    true,        // remains unchanged
	new Date,
	new Error,
	new Function,
	function(){},
	Math,
	new Number,
	1,           // remains unchanged
	new Object,
	{},
	new RegExp,
	/(?:)/,
	new String,
	"test"       // remains unchanged
];

for(var i = 0; i < types.length; i++) {
	types[i].constructor = Type;
	types[i] = [ types[i].constructor, types[i] instanceof Type, types[i].toString() ];
};

console.log( types );



// 木易杨
function Foo() {
    this.value = 42;
}
Foo.prototype = {
    method: function() {}
};

function Bar() {}

// 设置 Bar 的 prototype 属性为 Foo 的实例对象
Bar.prototype = new Foo();
Bar.prototype.foo = 'Hello World';


// true

// // 修正 Bar.prototype.constructor 为 Bar 本身
// Bar.prototype.constructor = Bar;

var test = new Bar() // 创建 Bar 的一个新实例

console.log(test)



function Person(name, age) {
  this.name = name
  this.age = age
  this.gender = '男'
}

Person.prototype.nation = '汉'

Person.prototype.say = function() {
  console.log(`My name is ${this.age}`);
}


var person = new Person('小明', 25)

console.log(person)




function Person(name, age) {
  this.name = name
  this.age = age
  this.gender = '男'
}

Person.prototype.nation = '汉'

Person.prototype.say = function() {
  console.log(`My name is ${this.age}`)
}

var person = New(Person, '小明', 25)

function New() {
  var obj = {}
  Constructor = [].shift.call(arguments) // 获取arguments第一个参数：构造函数
  console.log(Constructor)
  // 注意：此时的arguments参数在shift()方法的截取后只剩下两个元素
  obj.__proto__ = Constructor.prototype // 把构造函数的原型赋值给obj对象
  console.log(arguments)
  Constructor.apply(obj, arguments) // 改变够着函数指针，指向obj，这是刚才上面说到的访问构造函数里面的属性和方法的方式
  return obj
}

console.log(person)











