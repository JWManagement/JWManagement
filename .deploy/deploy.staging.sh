#!/bin/bash

git stash --all

npm install

mup deploy --config=.deploy/mup.staging.js --settings=.deploy/settings.json
