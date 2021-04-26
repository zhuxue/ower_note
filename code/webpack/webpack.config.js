const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve (dir) {
    return path.resolve(__dirname, dir)
}


const entries  = require("./build/entry")

const entry_obj =  new entries().get_entries()


module.exports = {
  // JavaScript 执行入口文件
  entry: entry_obj,
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: '[name]-bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
    clean: true,
  },
  target:"web",
  devtool:"source-map", // devtool 配置 Webpack 如何生成 Source Map
  module: {
    rules: [
        {
          test: /\.css$/,
          use: [
              'style-loader',
               {
                loader:'css-loader',
              }
            ],
        },
        {
          test: /\.js$/,
          exclude: path.join(__dirname, '/node_modules'),
          use:['babel-loader'],
        },
       {
         test: /\.ts$/,
         loader: 'ts-loader',
         exclude: /node_modules/,
         options: {
          // 让 tsc 把 vue 文件当成一个 TypeScript 模块去处理，以解决 moudle not found 的问题，tsc 本身不会处理 .vue 结尾的文件
          appendTsSuffixTo: [/\.vue$/],
        }
       },
       {
          test: /\.vue$/,
          use: ['vue-loader'],
          exclude: /node_modules/,
       },
      {
        // 命中 SCSS 文件
        test: /\.scss$/,
        // 使用一组 Loader 去处理 SCSS 文件。
        // 处理顺序为从后到前，即先交给 sass-loader 处理，再把结果交给 css-loader 最后再给 style-loader。
        use: ['style-loader', 'css-loader', 'sass-loader'],
        // 排除 node_modules 目录下的文件
        exclude: path.resolve(__dirname, 'node_modules'),
    },

    ]
  },
  resolve:{    // webpack 在启动配置后会从配置入口模块出发，找出所有的依赖的模块，Resolve 配置webpack 如何寻找模块对应的文件，（配置文件寻址的方式）
    alias:{
      "@":resolve("src"),    // 给模块打包寻址映射一个新的路径，目的是方便es6模块引入路径简单；
    },
    extensions: ['.ts', '.js', '.vue','.json'],  //  在导入语句没有带文件的后缀时，Webpack 会自动带上后缀去尝试访问文件是否存在，同名的情况下，默认先访问.ts文件；
    modules:["node_modules"], // 配置先从那个地方先加载第三方模块，主要是有可能自己写的三方模块会被大量运用，可以直接用import 导入问价名，主要目的方便代码维护；
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'), //配置 DevServer HTTP 服务器的文件目录，默认当前执行的目录，通常是项目的跟目录。 如果有额外的文件需要被DevServer 服务，此例子就是把服务配置在 public 目录上；
    compress: true, // 判断是否启用gzip；
    port: 9000,
    host:'0.0.0.0',  // 配置目的能够在局域网中，网页能够被使用；
    openPage:'zhuxue.html',
    open:true,  // 配置后是否打index.html;
    historyApiFallback:true, // 用于方便使用 html5使用 history 的单页面应用；这个应用要求任何应服务器在针对任何命中的路由时，都要返回一个对应的Html，浏览器端的 JavaScript 代码会从 URL 里解析出当前页面的状态，显示出对应的界面。
  },
  plugins:[
      // make sure to include the plugin for the magic
      new VueLoaderPlugin(),
      ...new entries().get_html_plugs()


  ], // 用于扩展webpack功能，// 目前这一块还不太熟悉；

};



