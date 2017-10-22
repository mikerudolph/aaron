const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssLoaderOpts = {
  minimize: false,
  sourceMap: true,
  url: false
};

const htmlLoaderOps = {
  filename: '../index.html',
  template: './html/index.ejs',
  hash: true
};

const config = {
  watch: true,
  devtool: 'source-map',
  context: path.resolve(__dirname, 'src'),
  entry: { index: [ './js/index.js', './scss/index.scss' ]},
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/js')
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: [
          {
            loader: 'css-loader',
            options: cssLoaderOpts
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      })
    }]
  },
  plugins: [
    new HtmlWebpackPlugin(htmlLoaderOps),
    new ExtractTextPlugin({
      filename: (getPath) => {
        return getPath('../css/[name].css');
      },
      allChunks: true
    })
  ]
};

if (process.env.ENVIRONMENT === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = config;
