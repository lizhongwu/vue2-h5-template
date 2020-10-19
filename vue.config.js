/*
https://github.com/staven630/vue-cli3-config
*/
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
//gzip
const CompressionWebpackPlugin = require('compression-webpack-plugin')
//压缩图片
const ImageminPlugin = require('imagemin-webpack-plugin').default
//转发路径
const PROXY_URL = 'http://127.0.0.1:3737'
//cdn预加载使用
//左侧是我们自己引入时候要用的，右侧是开发依赖库的主人定义的不能修改
const externals = {
  vue: 'Vue',
  axios: 'axios',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  'js-cookie': 'Cookies',
  vant: 'vant'
}

//cdn 地址
const cdn = {
  js: [
    'https://cdn.bootcss.com/vue/2.5.21/vue.min.js',
    'https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js',
    'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
    'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
    'https://cdn.bootcss.com/js-cookie/2.2.0/js.cookie.min.js',
    'https://cdn.jsdelivr.net/npm/vant@2.0.1/lib/vant.min.js'
  ],
  css: ['https://cdn.jsdelivr.net/npm/vant@2.0.1/lib/index.css']
}

// 是否使用gzip
const productionGzip = true
// 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css']

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? 'dist' : './',
  //如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  /*
  是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
  更多细节可查阅：配合 webpack > 链式操作 https://cli.vuejs.org/zh/guide/webpack.html#%E9%93%BE%E5%BC%8F%E6%93%8D%E4%BD%9C-%E9%AB%98%E7%BA%A7
  */
  chainWebpack: config => {
    //添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('~assets', resolve('src/assets'))
      .set('~components', resolve('src/components'))

    //添加CDN参数到htmlWebpackPlugin配置中
    config.plugin('html').tap(args => {
      //生产环境
      if (process.env.NODE_ENV === 'production') {
        args[0].cdn = cdn
      }
      return args
    })
  },
  // 修改webpack config, 使其不打包externals下的资源
  configureWebpack: defaultConfig => {
    const config = {}

    //生产环境
    if (process.env.NODE_ENV === 'production') {
      //生产环境npm包转CDN
      config.externals = externals
      config.plugins = []
      /*
      构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
      nginx配置：
      gzip on;
      gzip_static on;
      gzip_min_length 1024;
      gzip_buffers 4 16k;
      gzip_comp_level 2;
      gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php application/vnd.ms-fontobject font/ttf font/opentype font/x-woff image/svg+xml;
      gzip_vary off;
      gzip_disable "MSIE [1-6]\.";
      */
      productionGzip &&
        config.plugins.push(
          new CompressionWebpackPlugin({
            test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
            threshold: 10240,
            minRatio: 0.8
          })
        )

      //压缩图片
      config.plugins.push(
        new ImageminPlugin({
          pngquant: {
            quality: 90
          }
        })
      )
    }

    //开发环境
    if (process.env.NODE_ENV === 'development') {
      //关闭host check，方便使用ngrok之类的内网转发工具
      config.devServer = {
        disableHostCheck: true
      }
    }

    return config
  },
  //如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。
  devServer: {
    //修改后需要重启服务
    proxy: PROXY_URL,
    historyApiFallback: true
  }
}
