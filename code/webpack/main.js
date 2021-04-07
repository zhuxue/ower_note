require("./main.css")
// 通过 CommonJS 规范导入 show 函数
import show  from "./show";
import {zx, es6_F} from "@/test"
// 执行 show 函数
show('Webpack');
show(zx);

const p1 = new Promise(function(resolve,reject){
    resolve('success1');
    resolve('success2');
});
const p2 = new Promise(function(resolve,reject){
    resolve('success3');
    reject('reject');
});
p1.then(function(value){
    console.log(value); // success1
});
p2.then(function(value){
    console.log(value); // success3
});

console.log(Object.assign({a:1},{b:1}))
es6_F("我是你大爷")