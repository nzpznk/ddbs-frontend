const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const url = require('url')

const path = require('path');

// module.exports = {
//   entry: './src/index.js',
//   output: {
//     filename: 'main.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
// };

module.exports = (options = {}) => ({
  entry: {
    index: './src/index.js'
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'main.js',
    // filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
    // chunkFilename: '[id].js?[chunkhash]',
    // publicPath: options.dev ? '/assets/' : publicPath
  },
  module: {
    rules: [{
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            esModule: false,
            limit: 10000
          }
        }]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  // resolve: {
  //   alias: {
  //     '~': resolve(__dirname, 'src')
  //   },
  //   extensions: ['.js', '.vue', '.json', '.css']
  // },
  devServer: {
    host: '0.0.0.0',
    port: 8010,
    proxy: {
      '/api/': {
        target: 'http://localhost:9933',
        changeOrigin: true
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    },
    historyApiFallback: {
      index: url.parse('/assets/').pathname
    }
  }
})
