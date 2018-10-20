#!/bin/bash

rm -rf .meteor/local/db

npm start &

sleep 180

npm run cypress:run
