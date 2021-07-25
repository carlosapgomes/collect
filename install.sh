#!/bin/bash

apt -y update
apt -y upgrade
apt -y install ansible

# Install Nodejs
curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
apt-get install -y nodejs

npm install --global yarn
# install backend dependencies
cd ./backend
yarn install
# install frontend dependencies
cd ../collect-frontend
yarn install
yarn build
cd ../
# run ansible playbook
ansible-playbook -i ./ansible/ansible_inv.yml ./ansible/provisioning/playbook.yml
