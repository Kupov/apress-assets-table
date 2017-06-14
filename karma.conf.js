const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'test/**/*Spec.js',
      'test/**/*Spec.jsx',
      './node_modules/phantomjs-polyfill-find/find-polyfill.js',
      './node_modules/babel-polyfill/dist/polyfill.js',
    ],
    preprocessors: {
      'test/**/*Spec.js': ['webpack'],
      'test/**/*Spec.jsx': ['webpack']
    },
    reporters: ["spec"],
    specReporter: {
      maxLogLines: 5,
      suppressErrorSummary: false,
      suppressFailed: false,
      suppressPassed: false,
      suppressSkipped: true,
      showSpecTiming: true,
      failFast: true
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity,
    webpack: {
      devtool: 'source-map',
      module: {
        loaders: [{
          test: /\.js|jsx$/,
          exclude: /node_modules/,
          loaders: ['babel-loader'],
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.scss|.sass$/,
          loader: ExtractTextPlugin.extract('style', 'css!resolve-url!sass'),
        }]
      },
      watch: true,
      plugins: [
        new ExtractTextPlugin('[name].css', {allChunks: true})
      ]
    },
    webpackServer: {
      noInfo: true,
    },
  })
}
