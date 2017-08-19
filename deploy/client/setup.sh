#!/bin/bash

clear

source config

echo ''
echo '#############################################################################'
echo '#                                                                           #'
echo '#   SERVER SETUP   -   INITIALIZATION   SCRIPT   BY        MARVIN ZEISING   #'
echo '#                                                                           #'
echo '#############################################################################'
echo ''
echo '            !!! CAUTION !!!'
echo ''
echo 'This script is meant for jwmanagement.org ONLY'
echo 'If you want to deploy JW Management onto your own server, please contact'
echo 'Marvin Zeising (marvin@jwmanagement.org) first to check, whether this is'
echo 'a good idea or there is a better solution.'

while true; do
    echo '';
    read -p "Have you contacted Marvin? [y/n] " yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* )
            echo '';
            echo 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
            echo 'X  Please first contact Marvin. X';
            echo 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
            echo '';
            exit;;
        * ) echo "Please answer yes or no.";;
    esac
done

echo ''
echo "Alrighty then!   Let's begin!"
echo ''

echo '=> Setup SSH connection'
ssh-keyscan ${SERVER_ADDRESS} >> ~/.ssh/known_hosts
ssh-copy-id -i ~/.ssh/id_rsa.pub root@${SERVER_ADDRESS}

echo '=> Uploading config file'
scp ../server/config root@${SERVER_ADDRESS}:.

echo '=> Uploading create-user script'
scp ../server/create-user.sh root@${SERVER_ADDRESS}:.

# Describes itself
ssh root@${SERVER_ADDRESS} 'chmod 777 ./create-user.sh; ./create-user.sh'

echo '=> Uploading remaining scripts'
scp ../server/setup.sh meteor@${SERVER_ADDRESS}:/home/meteor/scripts
scp ../server/deploy.sh meteor@${SERVER_ADDRESS}:/home/meteor/scripts
scp ../server/nginx.conf meteor@${SERVER_ADDRESS}:/home/meteor/scripts
scp ../server/pm2.json meteor@${SERVER_ADDRESS}:/home/meteor/scripts

# login with meteor user and exec setup.sh
ssh meteor@${SERVER_ADDRESS} 'chmod 777 ./scripts/setup.sh; sudo /home/meteor/scripts/setup.sh'

echo ''
echo '#######################'
echo '#                     #'
echo '#   UPLOAD COMPLETE   #'
echo '#                     #'
echo '#######################'
echo ''
