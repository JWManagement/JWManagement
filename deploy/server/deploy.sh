#! /bin/bash
cd ../build
rm -rf bundle

tar xvf meteor.tar.gz

cd bundle
(cd programs/server && npm install --production)

pm2 restart jwmanagement
