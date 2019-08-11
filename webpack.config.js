const path = require('path');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const writeFilePlugin = require('write-file-webpack-plugin');
const glob = require("glob");

var config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    console: './js/console.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
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
              name: 'assets/[name]-[hash].[ext]'
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
    filename: 'assets/[name]-[hash].bundle.js',
    path: path.resolve(__dirname, 'dst'),
    publicPath: '/'
  }
};

var entryHtmls = glob.sync('src/tmpl/**/*.html');
entryHtmls.forEach(function (html) {
  html = html.replace(/^src\//, '');
  config.plugins.push(new HtmlWebpackPlugin({
    template: html,
    filename: html,
    chunks: path.basename(html) == 'base.html' ? ['console'] : []
  }));
});

config.plugins = config.plugins.concat([
  new MiniCssExtractPlugin({
    filename: 'assets/[name]-[hash].css',
    chunkFilename: 'assets/[id].css',
    ignoreOrder: false // Enable to remove warnings about conflicting order
  }),
  // new StyleExtHtmlWebpackPlugin() <- Uncomment it if replace css link tag to string.
  new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'defer'
  })]);

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
