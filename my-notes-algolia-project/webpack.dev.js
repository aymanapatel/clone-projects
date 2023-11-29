const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// const Dotenv = require('dotenv-webpack');
module.exports = {

  // This option controls if and how source maps are generated.
  // https://webpack.js.org/configuration/devtool/
  devtool: 'eval-cheap-module-source-map',

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    index: './src/page-index/main.js'
  },

  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    port: 8080,
    writeToDisk: false // https://webpack.js.org/configuration/dev-server/#devserverwritetodisk-
  },

  target: 'node',

  // https://webpack.js.org/concepts/loaders/
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader'
          // Please note we are not running postcss here
        ]
      },
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              // On development we want to see where the file is coming from, hence we preserve the [path]
              name: '[path][name].[ext]?hash=[hash:20]',
              esModule: false,
              limit: 8192
            }
          }
        ]
      }
    ]
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/page-index/index.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html',
      favicon: './src/assets/favicon.png'
    }),
    new webpack.EnvironmentPlugin(['NODE_KEY'])
    // new Dotenv({
    //   path: './.env', // load this now instead of the ones in '.env'
    //   safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
    //   allowEmptyValues: false, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
    //   systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
    //   silent: true, // hide any errors
    //   defaults: false // load '.env.defaults' as the default values if empty.
    // })
  ]
}
