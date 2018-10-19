#!/bin/bash

npm start &

sleep 180

npm run cypress:run
