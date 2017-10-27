// var webpack = require('webpack');
// var path = require('path');

// var BUILD_DIR = path.resolve(__dirname, 'public');
// var APP_DIR = path.resolve(__dirname, 'src');

// module.exports = {
//   entry: APP_DIR + '/index.js',
//   output: {
//       path: BUILD_DIR,
//       filename: 'bundle.js'
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.js$/,
//         loader: 'babel-loader',
//         exclude: /node_modules/
//       },
//       {
//         test: /\.jsx$/,
//         loader: 'babel-loader',
//         exclude: /node_modules/,
//         query: {
//           presets: ['es2017', 'react']
//         }
//       },
//       {
//         test: /\.[s]?css$/,
//         use: ['style-loader', 'css-loader', 'sass-loader'],
//         exclude: /node_modules/
//       }
//     ]
//   },
//   resolve: {
//     extensions: ['.js', '.jsx']
//   }
// }

var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
