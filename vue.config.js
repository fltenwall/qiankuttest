const packageName = require('./package.json').name;

module.exports = {
    devServer : {
        port : 10000,
        headers : {
            'Access-Control-Allow-origin' : '*'
        },
    },
    // 自定义 webpack 配置
    configureWebpack: {
        resolve: {},
        // alias: {
        //     "@": resolve("src"),
        // },
        output: {
            library: 'qiankuttest',
            libraryTarget: 'umd',
            // libraryTarget: 'window',
            jsonpFunction: `webpackJsonp_${packageName}`,
          },
    },

}