var path = require('path')

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    mode: 'production',
    entry: {
      app: './src/main.js'
    },
    output: {
      filename: 'js/[name].js',
      library: '[name]Vue',
      chunkFilename: 'js/[name].js'
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
      }
    },
    devServer: {
      historyApiFallback: true,
      noInfo: true,
      overlay: true
    },
    performance: {
      hints: false
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
}

if (process.env.NODE_ENV === 'test') {
  module.exports.devtool = 'inline-cheap-module-source-map'
  // Let compiler set the output
  delete module.exports.output
  // Use absolute paths in sourcemaps (important for debugging via IDE)
  module.exports.output = {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  }
}
