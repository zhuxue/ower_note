
const glob = require('glob');

const path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');


class Entries {

    constructor(  pattern = path.join(__dirname,"../","src/page/**/main.js") ) {

       this.pattern =  pattern;

    }

    get_entries() {
         let entries = {} ;
         let files_array =  glob.sync(this.pattern);

         files_array.forEach( ( filePath ) => {
               var split = filePath.split('/');
               var name = split[split.length - 2];
               entries[name] =  filePath ;

         });
         return entries ;

    }

    get_html_plugs() {

      let entries = this.get_entries();

      let html_plug = [];

      Object.keys(entries).forEach(function (name) {
         let plug =  new HtmlWebpackPlugin({
            title:"伤心太平洋1",
            template: path.join(__dirname, "../", '/public/index2.html'), // 指定 模板页面，将来会根据指定的页面路径，去生成内存中的 页面
            chunks: [name], // 指定生成的页面的名称
            filename: name + ".html",
            hash:true,
         })
         html_plug.push(plug);
      });

      console.log(html_plug)
      return html_plug ;
    }

}

module.exports = Entries








// console.log(glob.sync(pattern))