
// 测试js构造器的原理；


function test_new_cunstruct() {


  function Person( name ){
    this.name = name;
    // 闭包自执行函数；
    (function f( _this) {
      //console.log(_this.name)
    })(this)
  }

  Person.prototype.getName = function(){
    console.log("****************")
    console.log(this);
    return this.name;
  }

  var objectFactory = function() {
    var obj = new Object(), // 从 Object.prototype 上克隆一个空的对象
        Constructor = [].shift.call(arguments); // 取得外部传入的构造器，此例是 Person
        obj.__proto__ = Constructor.prototype; // 指向正确的原型
        var ret = Constructor.apply(obj, arguments);
        return typeof ret === 'object' ? ret : obj;
  }

  var a = objectFactory( Person, 'sven' );





}


test_new_cunstruct();




var mult = (function(){
      var cache = {};
      return function(){
      var args = Array.prototype.join.call( arguments, ',' );
      // console.log(args)
      if ( args in cache ){
          // console.log()
          return cache[ args ];
      }
      var a = 1;
      for ( var i = 0, l = arguments.length; i < l; i++ ){
          a = a * arguments[i];
      }
      return cache[ args ] = a;
    }
})();
// console.log(mult(1,2,4,5));


function zx_11(...args) {
  console.log(args);
}
zx_11(1,2,3,4,5,6)


// console.log(new  test_new_cunstruct().tx )
test_new_cunstruct.prototype.tx1 = "我是你大爷"
// console.log(  typeof new  test_new_cunstruct())






let  a = function(){}

a.prototype.a = 1 ;

// console.log( new a().a ) ;


/***
 *  函数 流的代码实现
 */

var throttle  = function ( fn, interval ) {
  var _self = fn,
      timer,
      firstTime = true;

  return function () {
    var args = arguments,
        _me   = this;
    if(firstTime){
      _self.apply(_me,args);
      return firstTime = false;
    }
    if( timer ) {

        return false;

    }


    timer = setTimeout( function () {

      clearTimeout( timer );

      timer = null ;

      _self.apply( _me, args );
      },interval || 500);



  }

}

throttle(function () {
  console.log(1);
},500)




// 单利模式;


const testSingle =  function (html) {

  if(this.insance) return this.insance;

  this.insance = new creatDiv(html)
  return this.insance

}

function creatDiv(html) {

  console.log(html)

}

let AA = testSingle("注册")


let bb  = testSingle("zhangxing")

var Singleton = function(name){
  this.name = name;
  this.instance = null;
  console.log(this.tt);
}

Singleton.prototype.getName = function(){

  return this.name;

};
Singleton.prototype.getInstance = function (name) {
  if(!this.instance) {
    this.instance = new Singleton(name)
  }
  return this.instance;
}
Singleton.tt = function(){
  console.log("我是世界主宰");
}

console.log(new Singleton("123").tt())



















