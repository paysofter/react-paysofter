const path = require('path');

module.exports = {
  mode: 'development', // or 'production'
  entry: './script.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'react-paysofter': path.resolve(__dirname, '../react-paysofter/src')
    },
    extensions: ['.js', '.jsx']
  }
};
