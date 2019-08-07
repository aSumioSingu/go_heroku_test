const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    console: './assets/js/console.js'
  },
  plugins: [
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    new CleanWebpackPlugin()
  ],
  output: {
    filename: '[name]-[hash].bundle.js',
    path: path.resolve(__dirname, 'public/assets')
  }
};
