# webpack

```bash
$ npm install

# Build assets
$ npx webpack
# or
$ npm run build
```

# Install dependent Go tools

```bash
# Go Modules can not manage dependent tools now.
$ bin/go-post-compile
```

# DB Migration

```bash
# In development environment
sql-migrate new create_users
sql-migrate up

# In production environment
sql-migrate up -env production
```

# Run App

```bash
$ npx webpack-dev-server
# or
$ npm run start

$ go run main.go
```
