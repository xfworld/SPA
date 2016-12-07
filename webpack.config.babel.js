// Webpack
import webpack from 'webpack';

// Path
import path from 'path';

// HTML Webpack plugin
import HtmlWebpackPlugin from 'html-webpack-plugin';

// // Copy Webpack plugin
// import CopyWebpackPlugin from 'copy-webpack-plugin';

export default {
    entry: "./es6/main.js", //入口文件
    output: { //打包输出的文件
        // path: __dirname,
        // filename: "bundle.js"
        path: path.join(__dirname, 'dist'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        //  publicPath: 'dist/', //模板、样式、脚本、图片等资源对应的server上的路径
        filename: 'js/[name].js', //每个页面对应的主js的生成配置
        chunkFilename: 'js/[id].chunk.js' // chunk生成的配置
    },
    module: {
        loaders: [{
            test: /\.handlebars$/,
            loader: 'handlebars-loader',
        }, {
            //test: path.join(__dirname, 'es6'),
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015'],
                plugins: ['transform-runtime']
            }
        }]
    },
    resolve: { // 现在你require文件的时候可以直接使用require('file')，不用使用require('file.coffee')
        extensions: ['', '.js', '.json']
    },
    node: {
        fs: 'empty'
    },
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
    //    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'), //这是妮第三方库打包生成的文件
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            mangle: false,
            compress: {
                warnings: false
            }
        })
    ]
};
