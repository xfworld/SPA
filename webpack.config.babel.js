// Webpack
import webpack from 'webpack';

// Path
import path from 'path';

// // HTML Webpack plugin
// import HtmlWebpackPlugin from 'html-webpack-plugin';
//
// // Copy Webpack plugin
// import CopyWebpackPlugin from 'copy-webpack-plugin';

export default {
  entry: "./es6/main.js",//入口文件
  output: {//打包输出的文件
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
				test: /\.handlebars$/,
				loader: 'handlebars-loader',
      },
      {
        //test: path.join(__dirname, 'es6'),
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: {// 现在你require文件的时候可以直接使用require('file')，不用使用require('file.coffee')
    extensions: ['', '.js', '.json']
  },
  node: {
    fs: 'empty'
  }
};
