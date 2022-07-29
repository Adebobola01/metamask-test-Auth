const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
    mode: "development",
    // resolve: {
    //     alias: {
    //         path: require.resolve("path-browserify"),
    //     },
    // },
    entry: "./src/App.js",
    devtool: "inline-source-map",
    devServer: {
        static: "./src",
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/dist",
        chunkFilename: "[id].[chunkhash].js",
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
            },
        ],
    },
    optimization: {
        runtimeChunk: "single",
    },
    plugins: [new NodePolyfillPlugin()],
};
