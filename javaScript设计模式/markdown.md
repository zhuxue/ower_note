###多太定义
    同一操作作用于不同的操作对象上。可以产生不同的解释和不同的执行结果，字面意思是：给不同的对象发送同一个消息的时候，这些对象会更据
    这个消息分别给出不同的反馈。
```js

var duck = function(){}

duck.prototype.sound(){ 
  console.log( '我是一只鸭子' );
};
var chicken = function() {}

chicken.prototype.sound(){ 
  console.log( '我是一只鸡' );
};


var animalSound = function( animalObj ) {

  if( animalObj ) {
    animalObj.sound()
  }
}
animalSound( new duck() )
animalSound( new chicken() )

```
###策略模式的定义是
    定义一系列算法，把他们封装起来，并且他们可以相互调用替换；使用策略模式可以消灭程序的大片的条件分支语句。
```js

// 这还是传统的面像对象的语言实现的；

    var performanceS = function(){}
    performanceS.prototype.calculate = function ( salary ){

      return salary * 4 ;

}
   var performanceA = function(){}
    performanceA.prototype.calculate = function ( salary ){

      return salary * 3 ;

}
   var performanceB = function(){}
    performanceB.prototype.calculate = function ( salary ){

      return salary * 2 ;

  }
var Bonus = function () {
  this.salary = null     // 定义薪水
  this.strategy = null   // 定义计算策略 
}
Bonus.prototype.setSalary = function(salary){
  this.salary = salary
}
Bonus.prototype.setStrategy = function(strategy){
  this.strategy = strategy
}
Bonus.prototype.getBonus = function(){
  return this.strategy.calculate(this.salary)
}
var bonus = new Bonus();
bonus.setSalary(1000);
bonus.setStrategy(new performanceA())
bonus.getBonus()

// 用 B 策略计算；
bonus.setStrategy(new performanceA())
bonus.getBonus()


// 另一种方法；
var strategies = {
  "s": function ( salary ) {
      return salary*4
  },
  "A": function ( salary ) {
     
      return salary * 3 ;
  },
  "B": function ( salary ) {
      return salary * 3
  }
}
var calculateBonus = function (  level, salary ) {
    return strategies[ level ](salary);
}
console.log( calculateBonus("S",1000) )
console.log( calculateBonus("B",1000) )

```


###代理模式；
    代理模式是为对象提供一个代用品和占位符号，以便控制对它(本体对象)的访问；
    
    
    

 