#!/bin/bash

MONGO_URL= meteor &

rm -rf .meteor/local/db

npm run cypress:run
