#!/bin/bash

npm run lint

mup setup --config=.deploy/mup.production.js

mup deploy --config=.deploy/mup.production.js --settings=.deploy/settings.json
