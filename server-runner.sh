#!/bin/sh
typeorm migration:generate -n Auto -d ./packages-server/data/src/migration --config ./ormconfig.env
typeorm migration:run
pm2-runtime start pm2.json