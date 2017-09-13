const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "src/")
        ],
        exclude: [
          path.resolve(__dirname, "node_modules")
        ],
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};