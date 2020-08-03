const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputDirectory = 'dist';

module.exports = {
  entry: ['babel-polyfill', './src/client/index.js'],
  output: {
    path: path.join(__dirname, outputDirectory),
    // publicPath: outputDirectory+'/',
    filename: '[name].bundle.js',
    chunkFilename:'[name].bundle.js'
    // chunkFilename: mode === 'production' ? '[name].[chunkhash].js' : '[name].[hash].js'
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    port: 3100,
    open: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8090',
      '/img': {
        target: 'http://localhost:8090',
        secure: false
      }
    }
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': argv.mode
    // }),
    // new webpack.EnvironmentPlugin({ DEBUG: "on" }),
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    })
  ]
};
