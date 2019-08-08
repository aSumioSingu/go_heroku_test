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

- sql-migrationを使用しています。

```bash
# In development environment
sql-migrate new create_users
sql-migrate up

# In production environment
sql-migrate up -env production
```
