#!/bin/bash

source scripts/config

echo '===> Install NVM'
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
source ~/.bashrc

echo '===> Install Node'
nvm install 4.6.2

echo '===> Install NPM'
apt install npm -y

echo '===> Install PM2'
npm install pm2 -g

echo '===> Link PM2 with Keymetrics'
pm2 link bw9n1s8l14101el zl579z8yuq993n3

echo '===> Install PM2 Server Monitor'
pm2 install pm2-server-monit

echo '===> Install MongoDB'
pm2 install pm2-mongodb
pm2 set pm2-mongodb:authDB 1
pm2 set pm2-mongodb:username 'meteor'
pm2 set pm2-mongodb:password ${MONGO_PASSWORD}

echo '===> Install Nginx'
apt-get install nginx -y

echo '===> Copy Nginx config file'
mv ~meteor/scripts/nginx.conf /etc/nginx

echo '===> Start application'
pm2 start ~meteor/scripts/pm2.json

echo '===> Register PM2 in system'
pm2 startup ubuntu
pm2 save

echo '===> Clean up'
apt autoremove -y
