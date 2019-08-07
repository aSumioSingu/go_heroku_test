# webpack

```
npm init -y
npm install webpack webpack-cli webpack-merge clean-webpack-plugin html-webpack-plugin webpack-dev-server --save-dev
# run webpack-dev-server in development environment
npm run start
# build assets in production environment
npm run build
```

# DB Migration

- gooseを使用しています。
- dbディレクトリ以下で設定を管理します。

```bash
# Install
go get bitbucket.org/liamstask/goose/cmd/goose

# Use
heroku run 'goose -env production up' -a $APP_NAME
heroku run 'goose -env production down' -a $APP_NAME
```
