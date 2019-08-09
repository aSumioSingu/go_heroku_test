const path = require('path');
const merge = require('webpack-merge');
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

console.log(process.env.APP_NAME);

if (process.env.APP_NAME != null ) {
  module.exports = merge(module.exports, {
    mode: 'production'
  });
} else {
  module.exports = merge(module.exports, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './assets'
    }
  });
};
