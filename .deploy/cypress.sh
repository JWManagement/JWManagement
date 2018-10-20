#!/bin/bash

MONGO_URL= meteor &

rm -rf .meteor/local/db

sleep 180

npm run cypress:run
