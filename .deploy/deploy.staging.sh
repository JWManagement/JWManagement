#!/bin/bash

mup setup --config=.deploy/mup.staging.js

mup deploy --verbose --config=.deploy/mup.staging.js --settings=.deploy/settings.json

mup logs --config=.deploy/mup.staging.js
