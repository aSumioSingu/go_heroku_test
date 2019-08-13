# webpack

```bash
$ npm install

# Build assets
$ npx webpack
```

# Install dependent Go tools

```bash
# Go Modules can not manage dependent tools now.
$ bin/go-post-compile
```

# DB Migration

```bash
# In development environment
$ createdb development
$ sql-migrate new create_users
$ sql-migrate up

# In production environment
$ sql-migrate up -env production
```

# Run App

```bash
$ npx webpack-dev-server
$ go run main.go
```
