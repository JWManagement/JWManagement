#!/bin/bash

rm -rf .meteor/local/db

MONGO_URL= meteor &

sleep 180

npm run cypress:run
