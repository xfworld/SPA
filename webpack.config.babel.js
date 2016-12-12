// Webpack
import webpack from 'webpack';

// Path
import path from 'path';

// HTML Webpack plugin
import HtmlWebpackPlugin from 'html-webpack-plugin';
// clean Webpack plugin
import CleanWebpackPlugin from 'clean-webpack-plugin';

// // Copy Webpack plugin
// import CopyWebpackPlugin from 'copy-webpack-plugin';
//  css loader: ExtractTextPlugin.extract('style', 'css!stylus')
//import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
    entry: "./src/main/index.js", //入口文件,
    output: { //打包输出的文件
        // path: __dirname,
        // filename: "bundle.js"
        path: path.join(__dirname, 'dist'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        //publicPath: './dist/', //模板、样式、脚本、图片等资源对应的server上的路径
        //  filename: '[name].js', //每个页面对应的主js的生成配置
        //      chunkFilename: '[id].chunk.js', // chunk生成的配置 chunkhash
        filename: '[name].[hash:8].bundle.js',
        chunkFilename: '[id].[hash:8].bundle.js',
        sourceMapFilename:'[file].map'
    },
    //外部依赖 不参与编译
    externals: {

    },
    module: {
        loaders: [{
            test: /\.hbs$/,
            exclude: /node_modules/,
            loader: 'handlebars-loader',
            query:{
              name:'hbs/[name].[ext]',
              debug:true
            }
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
            // loader: 'file-loader' url-loader
            loader: 'url-loader?limit=10000&name=fonts/[hash:8].[name].[ext]'
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loader: 'url-loader',
            query: {
                limit: 8192,
                name: 'images/[hash:8].[name].[ext]'
            }
        }]
    },
    resolve: { // 现在你require文件的时候可以直接使用require('file')，不用使用require('file.coffee')
        extensions: ['', '.js', '.json', '.css']
    },
    node: {
        fs: 'empty'
    },
    watch:true,
    debug: true,
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/main/index.html',
            filename: 'index.html',
            //  chunks: ['index'], //, 'vendor']
            hash: false,
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            Box: 't3js'
        }),
        new webpack.HotModuleReplacementPlugin(), //开启热替换插件
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        //     new ExtractTextPlugin("[name].chunk.css"),   //单独使用style标签加载css并设置其路径
        //  new webpack.optimize.CommonsChunkPlugin('vendor','vendor.[hash:8].bundle.js'), //这是妮第三方库打包生成的文件
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            mangle: false,
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        // new CopyWebpackPlugin([{
        //     from: __dirname + '/src/images',
        // //    to: __dirname + '/dist/images'
        // }]),build
        new CleanWebpackPlugin(['dist'], {
            verbose: true,
            dry: false
        })
    ]
};
