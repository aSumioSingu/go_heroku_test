# webpack

```bash
$ npm install

# Run webpack-dev-server in development environment
$ npm run start

# Test build assets in development environment
$ npx webpack --config webpack.dev.js

# Build assets in production environment
$ npm run build
```

# Install dependent Go tools

```bash
# Go Modules can not manage dependent tools now.
$ bin/go-post-compile
```

# DB Migration

- gooseを使用しています。
- dbディレクトリ以下で設定を管理します。

```bash
# Install
$ go get bitbucket.org/liamstask/goose/cmd/goose

# Use
$ heroku run 'goose -env production up' -a $APP_NAME
$ heroku run 'goose -env production down' -a $APP_NAME
```
