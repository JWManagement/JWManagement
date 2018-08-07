#!/bin/bash

npm install

mup deploy --config=./mup.staging.js --settings=settings.json
