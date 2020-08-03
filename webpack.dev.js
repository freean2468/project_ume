const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const outputDirectory = 'dist';

module.exports = merge(common, {
  mode: 'development',
  plugins:[
    new BundleAnalyzerPlugin()
  ]
});