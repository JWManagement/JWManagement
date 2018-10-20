#!/bin/bash

meteor &

rm -rf .meteor/local/db

sleep 180

npm run cypress:run
