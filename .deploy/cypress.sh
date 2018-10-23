#!/bin/bash

rm -rf .meteor/local/db

MONGO_URL= meteor &

sleep 60

npm run cypress:run
