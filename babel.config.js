const plugins = []

//生产环境
if (process.env.NODE_ENV === 'production') {
  //去掉console
  plugins.push('transform-remove-console')
}

//按需引入vant
plugins.push([
  'import',
  {
    libraryName: 'vant',
    libraryDirectory: 'es',
    style: true
  }
])

module.exports = {
  presets: ['@vue/app'],
  plugins: plugins
}
