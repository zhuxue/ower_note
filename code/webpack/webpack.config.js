const path = require('path');

module.exports = {
  // JavaScript 执行入口文件
  entry: './main.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
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
        loader: 'awesome-typescript-loader'
       }
    ]
  },
  resolve:{
    alias:{
      "@":"./src/dd"
    },
    extensions: ['.ts', '.js', '.json']
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'), //配置 DevServer HTTP 服务器的文件目录，默认当前执行的目录，通常是项目的跟目录。 如果有额外的文件需要被DevServer 服务，此例子就是把服务配置在 public 目录上；
    compress: true, // 判断是否启用gzip；
    port: 9000,
    open:true,  // 配置后是否打index.html;
    historyApiFallback:true, // 用于方便使用 html5使用 history 的单页面应用；这个应用要求任何应服务器在针对任何命中的路由时，都要返回一个对应的Html，浏览器端的 JavaScript 代码会从 URL 里解析出当前页面的状态，显示出对应的界面。

  },


};