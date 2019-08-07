FROM heroku/heroku:18-build as build

COPY . /app
WORKDIR /app

# Setup buildpack
RUN mkdir -p /tmp/nodejs/buildpack /tmp/nodejs/build_cache /tmp/nodejs/env
RUN curl https://codon-buildpacks.s3.amazonaws.com/buildpacks/heroku/nodejs.tgz | tar xz -C /tmp/nodejs/buildpack
RUN mkdir -p /tmp/go/buildpack /tmp/go/build_cache /tmp/go/env
RUN curl https://codon-buildpacks.s3.amazonaws.com/buildpacks/heroku/go.tgz | tar xz -C /tmp/go/buildpack

# Execute Buildpack
# nodejs buildpack install dependencies and run build script(e.g. webpack build)
RUN STACK=heroku-18 /tmp/nodejs/buildpack/bin/compile /app /tmp/nodejs/build_cache /tmp/nodejs/env
RUN STACK=heroku-18 /tmp/go/buildpack/bin/compile /app /tmp/go/build_cache /tmp/go/env

# Prepare final, minimal image
FROM heroku/heroku:18

COPY --from=build /app /app
ENV HOME /app
WORKDIR /app
RUN useradd -m heroku
USER heroku
# Command is defined at heroku.yml
#CMD /app/bin/go_heroku_test