

function Vue(options) {
  this.name = "zhuxue"

  console.log( this )

  this._init(options);

}


function initMixin( Vue ) {
  Vue.prototype._init = function (options) {
    console.log(options)

  }
}




// initMixin(Vue);

//
// console.log(Vue)


// let p = new Vue({"zhuxue":"我是你大爷"});
//
// console.log(p.__proto__ === Vue.prototype)




