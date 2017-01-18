'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

module.exports = {
  entry: './app/main.jsx',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
      new ExtractTextPlugin('style.css')
  ],
  module: {
    loaders: [
      {
        test: /jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-2']
        }
      },
      {
        test   : /\.scss$/,
        loaders: [ 'style', 'css', 'sass' ],
      }
    ]
  }
};
