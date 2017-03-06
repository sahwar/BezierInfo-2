var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

const defaultLocale = "en-GB";
var locale = process.env.locale || defaultLocale;

console.log("Using locale: "+locale);

// Bundle entry point
var entry = ['./components/App.jsx'];

// Bundle target
var target = "web";

// Bundle output
var output = {
  path: path.join(__dirname,locale),
  filename: 'article.js'
};

// Necessary webpack loaders for converting our content:
var webpackLoaders = [
  'babel-loader',
  'eslint-loader',
  __dirname + '/lib/latex-loader',
  __dirname + '/lib/pre-loader',
  __dirname + '/lib/p-loader',
  __dirname + '/lib/textarea-loader'
];

var resolve = {
  alias: {
    LocalizedContent: path.resolve(__dirname, 'locales/en-GB/content.js')
  }
};

// switch the locales
if (locale !== defaultLocale) {
  resolve = {
    alias: {
      LocalizedContent: path.resolve(__dirname, 'locales/' + locale + '/content.js')
    }
  };
  output.filename = 'article.js';
  console.log("using " + resolve.alias.LocalizedContent + " for output " + output.filename);
}

// And the final config that webpack will read in.
module.exports = {
  entry:  entry,
  target: target,
  output: output,
  resolve: resolve,
  module: {
    loaders: [
      {
        test: /\.(png|gif)$/,
        loader: "file?name=images/packed/[hash].[ext]"
      },
      {
        test: /\.less$/,
        loader: "style!css!less"
      },
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /.jsx?$/,
        include: [
          /components/,
          /lib.site/,
          /locales/
        ],
        loaders: webpackLoaders
      }
    ]
  }
};
