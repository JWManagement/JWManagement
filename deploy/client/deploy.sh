#!/bin/bash

cd ../..

npm install --production
meteor build --architecture os.linux.x86_64 --server ${SERVER_URL}

cd bundle
(cd programs/server && npm install --production)

scp ./meteor.tar.gz meteor@${SERVER_ADDRESS}:~meteor/build

ssh meteor@${SERVER_ADDRESS} "scripts/deploy.sh" &
