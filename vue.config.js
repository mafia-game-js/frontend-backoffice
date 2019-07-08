const path = require('path')
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, './src'))
      .set('api', path.resolve(__dirname, './src/api'))
      .set('npm', path.resolve(__dirname, './node_modules'))
      .set('assets', path.resolve(__dirname, './src/assets'))
      .set('models', path.resolve(__dirname, './src/models'))
      .set('components', path.resolve(__dirname, './src/components'))
      .set('common', path.resolve(__dirname, './src/components/common'))
  }
}
