#!/bin/bash

source config

echo '===> Install whois'
apt install whois

echo '===> Create user "meteor"'
useradd -s /bin/bash -m -d /home/meteor meteor

echo '===> Setting permissions for user "meteor"'
usermod -aG sudo meteor
echo 'meteor ALL=(ALL:ALL) NOPASSWD:/home/meteor/scripts/setup.sh' >> /etc/sudoers

echo '===> Allow login for user "meteor"'
cp -r ~/.ssh ~meteor/.ssh
chown -R meteor:meteor ~meteor/.ssh

echo '===> Setup folder /meteor/scripts'
mkdir ~meteor/scripts
chown -R meteor:meteor ~meteor/scripts
mv /root/config ~meteor/scripts/config

echo '===> Setup folder /meteor/build'
mkdir ~meteor/build
chown -R meteor:meteor ~meteor/build

echo '===> Setup folder /meteor/db'
mkdir ~meteor/db
chown -R meteor:meteor ~meteor/db

rm -- "$0"

exit
