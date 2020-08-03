const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const outputDirectory = 'dist';

module.exports = merge(common, {
  mode: 'production'
});