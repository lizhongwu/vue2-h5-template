const postcssPxtorem = require('postcss-pxtorem')
const autoprefixer = require('autoprefixer')

const plugins = []

module.exports = {
  plugins: [
    ...plugins,
    autoprefixer,
    postcssPxtorem({
      rootValue: 100, //换算的基数
      selectorBlackList: ['van'], //忽略转换正则匹配项
      propList: ['*']
    })
  ]
}
