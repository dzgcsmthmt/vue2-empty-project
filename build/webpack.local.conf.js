const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const webpack = require("webpack");
const path = require("path");
const param = require("./config/param/local");
//MiniCssExtractPlugin这个组件hot reload error，肯定是版本原因，找不到解决方案，使用style loader
const config = {
    mode: "development",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"],
            },
        ],
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, "../dist"),
            publicPath: "/",
        },
        historyApiFallback: true,
        host: "0.0.0.0",
        port: 8888,
        compress: true,
        hot: true,
        client: {
            overlay: { errors: true, warnings: false, runtimeErrors: false },
        },
        proxy: {
            "/apis": {
                target: `https://api-gw-test.pkulaw.com/mobile-server/chatgpt/`,
                changeOrigin: true,
                ws: false,
                pathRewrite: {
                    "^/apis": "",
                },
                buffer: false,
            },
            "/pkulawAPI": {
                target: `https://test1.pkulaw.com`,
                changeOrigin: true,
                ws: false,
                pathRewrite: {
                    "^/pkulawAPI": "",
                },
            },
            "/logsapis": {
                target: `https://userlogs.pkulaw.com`,
                changeOrigin: true,
                ws: false,
                pathRewrite: {
                    "^/logsapis": "",
                },
            },
            // 直接调用左凯瑞接口
            "/aiapis": {
                target: `https://test1.pkulaw.com`,
                changeOrigin: true,
                ws: false,
                pathRewrite: {
                    "^/aiapis": "",
                },
            },
        },
    },
    devtool: "eval-cheap-module-source-map",
    plugins: [new webpack.DefinePlugin(param)],
};

module.exports = merge(common, config);
