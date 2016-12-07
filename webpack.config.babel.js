// Webpack
import webpack from 'webpack';

// Path
import path from 'path';

// HTML Webpack plugin
import HtmlWebpackPlugin from 'html-webpack-plugin';

// // Copy Webpack plugin
// import CopyWebpackPlugin from 'copy-webpack-plugin';
//  css
//import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
    entry: "./es6/main.js", //入口文件,
    output: { //打包输出的文件
        // path: __dirname,
        // filename: "bundle.js"
        path: path.join(__dirname, 'dist'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        //  publicPath: 'dist/', //模板、样式、脚本、图片等资源对应的server上的路径
        filename: '[name].js', //每个页面对应的主js的生成配置
        chunkFilename: '[id].chunk.js', // chunk生成的配置
        sourceMapFilename:'[file].map'
    },
    //外部依赖 不参与编译
    externals:{

    },
    module: {
        loaders: [{
            test: /\.handlebars$/,
            exclude: /node_modules/,
            loader: 'handlebars-loader',
        }, {
            //test: path.join(__dirname, 'es6'),
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015'],
                //  plugins: ['transform-runtime']
            }
        }, { // 配置css加载，用sass的话，就配置sass的加载器就好
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, { // 配置字体文件加载
            test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            loader: 'file-loader'
        }]
    },
    resolve: { // 现在你require文件的时候可以直接使用require('file')，不用使用require('file.coffee')
        extensions: ['', '.js', '.json']
    },
    node: {
        fs: 'empty'
    },
    debug: true,
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: './index.html',
            chunks: ['main', 'vendor'],
            hash: true,
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
           new webpack.HotModuleReplacementPlugin(), //开启热替换插件
           new webpack.NoErrorsPlugin(),
           new webpack.optimize.OccurenceOrderPlugin(),
      //     new ExtractTextPlugin("[name].chunk.css"),   //单独使用style标签加载css并设置其路径
        new webpack.optimize.CommonsChunkPlugin('vendor.bundle.js',3), //这是妮第三方库打包生成的文件
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: false,
        //     mangle: false,
        //     compress: {
        //         warnings: false
        //     }
        // })
        //,
        // new CopyWebpackPlugin([{
        //     from: __dirname + '/assets',
        //     to: __dirname + '/dist/assets'
        // }])
    ]
};
