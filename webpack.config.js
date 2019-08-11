const path = require('path');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const writeFilePlugin = require('write-file-webpack-plugin');

var config = {
  context: path.resolve(__dirname, 'assets'),
  entry: {
    console: './js/console.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./html/console.html",
      filename: "console.html",
      chunks: ['console']
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
      chunkFilename: '[id].css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    }),
    // new StyleExtHtmlWebpackPlugin() <- Uncomment it if inject css string to head tag of html.
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    new writeFilePlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          // "style-loader", <- MiniCssExtractPlugin can not accept css string output from style-loader.
          "css-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name]-[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':src']
          }
        }
      }
    ]
  },
  output: {
    filename: '[name]-[hash].bundle.js',
    path: path.resolve(__dirname, 'public/assets')
  }
};

console.log(process.env.APP_NAME);

if (process.env.APP_NAME != null ) {
  config = merge(config, {
    mode: 'production'
  });
} else {
  config = merge(config, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      port: 9000 // Default port 8080 is used by github.com/gin-gonic/gin
    }
  });
};

module.exports = config;
