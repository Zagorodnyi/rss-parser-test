#!/bin/sh
# start.sh

set -e

npm run setup-env

docker compose up -d mysql

npm run migrate:db

docker compose up -d --build
