import path from 'path';
import webpack from 'webpack';
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getPlugins = function (environment, isDev) {
  return [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/index-dev.tpl.html'),
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: isDev
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ];
};

const getEntry = function () {
  return {
    app: [
      'babel-polyfill',
      'webpack-hot-middleware/client?reload=true',
      path.join(__dirname, 'app/index.js')
    ]
  }
};

const getLoaders = function () {
  return [
    {
      test: /\.(js|jsx)?$/,
      exclude: /node_modules/,
      include: [
        path.join(__dirname, "app")
      ],
      loader: 'babel-loader',
      query: {
        cacheDirectory: true,
        plugins: [
          'transform-runtime',
          'add-module-exports',
          'transform-decorators-legacy',
          'babel-plugin-transform-strict-mode',
          'react-hot-loader/babel'
        ],
        presets: ['es2015', 'react', 'stage-0']
      }
    },
    {test: /\.css$/, loader: 'style-loader!css-loader'},
    {test: /\.(ttf|eot)/, loader: 'file-loader', query: {name: 'assets/[name]-[hash].[ext]', limit: 8192}},
    {test: /\.(mp4)/, use: [{loader: 'file-loader', query: {name: 'assets/[name]-[hash].[ext]', limit: 8192}}]},
    {test: /\.(woff|woff2)/, loader: 'url-loader', query: {name: 'assets/[name]-[hash].[ext]', limit: 8192}},
    {
      test: /\.(png|jpg|jpeg|gif|svg)/,
      loader: 'url-loader',
      query: {name: 'assets/[name]-[hash].[ext]', limit: 8192}
    },
    {test: /\.html$/, loader: 'html-loader'},
    {test: /\.xml$/, loader: 'xml-loader'},
    {test: /bootstrap.+\.(jsx|js)$/, loader: 'imports-loader?jQuery=jquery,$=jquery,this=>window'}
  ];
};

export default {
  name: 'app',
  mode: 'development',
  cache: true,
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true
  },
  entry: getEntry(),
  output: {
    path: path.join(__dirname, 'public/'),
    filename: 'assets/[name]-[hash].js',
    publicPath: '/'
  },
  module: {
    rules: getLoaders()
  },
  resolve: {
    modules: [path.resolve(__dirname, "app"), "node_modules"],
    extensions: ['.json', '.js', '.jsx'],
    unsafeCache: true
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
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2
        },
        default: {
          minChunks: 2,
          reuseExistingChunk: true
        }
      }
    }
  }
};
