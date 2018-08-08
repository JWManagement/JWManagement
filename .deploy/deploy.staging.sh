#!/bin/bash

npm install

mup deploy --config=.deploy/mup.staging.js --settings=.deploy/settings.json
