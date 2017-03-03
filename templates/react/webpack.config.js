var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: 'custom-entry-point',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
    publicPath: '/static/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/i,
        loader: 'babel-loader'
      }
    ]
  }
}
