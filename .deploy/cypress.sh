#!/bin/bash

rm -rf .meteor/local/db

MONGO_URL= meteor &

sleep 240

npm run cypress:run
