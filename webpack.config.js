// entry point
// output the bundle
const { join } = require('path');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [ '@babel/plugin-proposal-class-properties' ]
        }
      }
    }]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: join(__dirname, 'public')
  }
};
