var webpackConfig = require('./webpack.config.js')
var path = require('path')

function resolve (...dir) {
  return path.join(__dirname, ...dir)
}

module.exports = {
  configureWebpack: webpackConfig,
  filenameHashing: false,
  outputDir: resolve('..', 'base', 'static'),
  css: {
    extract: {
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css'
    }
  },
  transpileDependencies: [
    'bootstrap-vue'
  ],
  // delete HTML related webpack plugins
  chainWebpack: config => {
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  }
}
