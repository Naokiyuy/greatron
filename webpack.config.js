const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin =  require('uglifyjs-webpack-plugin');
const AggressiveMergingPlugin = require('webpack/lib/optimize/AggressiveMergingPlugin');

const env = process.env.NODE_ENV || 'development';

const getPlugins = function () {
  return [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, env == 'production' ? 'app/index.tpl.html' : env == 'demo' ? 'app/index-demo.tpl.html' : 'app/index-dev.tpl.html'),
      inject: 'body',
      filename: 'index.html'
    }),
    new CopyWebpackPlugin([
      {
        from: 'app/assets/img/',
        to: 'assets/img/'
      }
    ]),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify(env)}
    }),
    new UglifyJsPlugin(),
    new AggressiveMergingPlugin({
      minSizeReduce: 1.1
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ];
};


const getEntry = function () {
  return {
    common: ['react', 'react-dom', 'react-intl', 'react-redux', 'react-router', 'react-router-redux', 'jquery', 'bootstrap', 'lodash', 'moment', 'intl'],
    app: ['babel-polyfill', path.join(__dirname, 'app/index.js')]
  }
};

const getLoaders = function (isDev) {
  return [
    {
      test: /\.(js|jsx)?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          plugins: [
            'transform-runtime',
            'add-module-exports',
            'transform-decorators-legacy',
            'babel-plugin-transform-strict-mode'
          ],
          presets: ['es2015', 'react', 'stage-0']
        }
      }],
    },
    {test: /\.css|scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader']},
    {test: /\.(ttf|eot)/, use: [{loader: 'file-loader', query: {name: 'assets/[name]-[hash].[ext]', limit: 8192}}]},
    {test: /\.(woff|woff2)/, use: [{loader: 'url-loader', query: {name: 'assets/[name]-[hash].[ext]', limit: 8192}}]},
    {test: /\.(mp4)/, use: [{loader: 'file-loader', query: {name: 'assets/[name]-[hash].[ext]', limit: 8192}}]},
    {
      test: /\.(png|jpg|jpeg|gif|svg)/,
      use: [
        {loader: 'url-loader', query: {name: 'assets/[name]-[hash].[ext]', limit: 8192}}
      ]
    },
    {test: /\.html$/, use: [{loader: 'html-loader'}]},
    {test: /\.xml$/, use: [{loader: 'xml-loader'}]},
    {test: /bootstrap.+\.(jsx|js)$/, use: [{loader: 'imports-loader?jQuery=jquery,$=jquery,this=>window'}]}
  ];
};

module.exports = {
  name: 'app',
  mode: 'production',
  devtool: false,
  entry: getEntry(),
  output: {
    path: path.join(__dirname, 'public/'),
    filename: 'assets/[name]-[chunkhash].js',
    publicPath: '/'
  },
  module: {
    rules: getLoaders()
  },
  resolve: {
    modules: [path.resolve(__dirname, "app"), "node_modules"],
    extensions: ['.json', '.js', '.jsx']
  },
  plugins: getPlugins(),
  target: 'web',
  optimization: {
    occurrenceOrder: true,
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
