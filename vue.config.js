const packageName = require('./package.json').name;

module.exports = {
    devServer: {
        https: false,
        proxy:{
            '/' :{
                target: 'https://manager-test.mypaas.com/',
                changeOrigin: true,
            }
        }
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