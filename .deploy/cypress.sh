#!/bin/bash

npm start &

sleep 180

rm -rf .meteor/local/db

npm run cypress:run
