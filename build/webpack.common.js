const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
console.log(path.resolve(__dirname, "../src"));
module.exports = {
    entry: path.resolve(__dirname, "../src/index.js"),
    output: {
        filename: "[name].[contenthash:8].js",
        path: path.resolve(__dirname, "../dist"),
        clean: true,
        publicPath: "/",
    },
    resolve: {
        extensions: [".js", ".vue", ".json"],
        alias: {
            vue$: "vue/dist/vue.esm.js", // 设置Vue模块的别名，这里指向了运行时版本（runtime only）
            "@": path.resolve(__dirname, "../src"),
        },
    },
    stats: "errors-warnings",
    module: {
        rules: [
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: "vue-loader",
            },
            {
                test: /\.(png|svg|jpg|gif|jpeg|webp|avif)$/,
                type: "asset/resource",
                generator: {
                    filename: "img/[hash:8][ext][query]",
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[hash:8][ext][query]",
                },
            },
            {
                test: /\.(js|ts)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                },
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            inject: "body",
            scriptLoading: "blocking",
            template: path.resolve(__dirname, "../public/index.html"),
            minify: true,
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                libs: {
                    name: "vendor-libs",
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                compo: {
                    name: "compo-commons",
                    test: /[\\/]src[\\/]components[\\/]common[\\/]/,
                    minChunks: 3, // 最小公用次数
                    priority: 10,
                    reuseExistingChunk: true,
                },
                vue: {
                    name: "vue",
                    test: /[\\/]node_modules[\\/]vue/,
                    priority: 5,
                },
                elementUI: {
                    // elementUI 单独拆包
                    name: "chunk-elementUI",
                    test: /[\\/]node_modules[\\/]element-ui[\\/]/,
                    priority: 10,
                },
            },
        },
    },
};
