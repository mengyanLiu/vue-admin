const path = require('path');
module.exports = {
     // 查阅 https://github.com/vuejs/vue-cli/tree/dev/docs/zh/config
    // 项目部署的基础路径,我们默认假设你的应用将会部署在域名的根部，比如 https://www.my-app.com/
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    // 输出文件目录
    outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
    // 有效的值：`true` | `false` | `"error"`设置为 `"error"` 时，检查出的错误会触发编译失败。
    lintOnSave: false, //Default: true
    
    // 对内部的 webpack 配置进行更细粒度的修改。
    chainWebpack: config => {
     
    },
    configureWebpack: config => {
      config.resolve ={//配置解析别名 
       extensions: ['.js','.json','.vue'],
      alias:{
      '@' : path.resolve(__dirname, './src'),
      '@c' : path.resolve(__dirname, './src/commonents')
      }
      }
    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    
    // CSS 相关选项
    css: {
        extract: true, //Default: 生产环境下是 true，开发环境下是 false  
        // 项目package.json查看@vue/cli-service版本号进行配置
        // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。
        sourceMap: false,
      
        loaderOptions: {
          sass:{
            additionalData: '@import "./src/styles/main.scss";'
          }
        }, //Default: {}
        //modules: false,
         // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。设置为 true 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
    },
    //  parallel: require('os').cpus().length > 1, //Default: require('os').cpus().length > 1
    //  pwa: {},
    //  // 配置 webpack-dev-server。
    // //  devServer: {
    // //     open: false,
    // //     host: '0.0.0.0',
    // //     port: 8088,
    // //     https: false,
    // //     hot: true,
    // //     proxy: null, // 设置代理 string | Object
        
        
    // // },
    
    // pluginOptions:{}
}