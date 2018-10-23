#!/bin/bash

mup setup --config=.deploy/mup.production.js

mup deploy --verbose --config=.deploy/mup.production.js --settings=.deploy/settings.json

mup logs --config=.deploy/mup.production.js
