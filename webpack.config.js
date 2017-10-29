const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.gif', '.png', '.jpeg', ',svg']
  },
  output: {
    filename: './dist/bundle.js',
  },
  plugins: getPlugins(),
  module: {
    rules: [{
      test: /\.js(x)?$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }, {
      test: /\.s?css$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require('autoprefixer')()
            ]
          }
        }]
      })
    }, {
      test: /\.(gif|png|jpe?g|svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: '/dist/'
          }
        }
      ]
    }]
  }
}
function getPlugins () {
  return [].concat([
    new ExtractTextPlugin('./dist/main.css'),
    // 开发环境所需要的plugin
    new webpack.SourceMapDevToolPlugin({
      include: /\.js(x)?$/,
      filename: '[name].js.map'
    })
  ])
}
