#!/bin/bash

echo "update system"
apt -y update
apt -y upgrade

echo "Installing: ansible, curl, sqlite3, rsync"
apt -y install ansible curl sqlite3 rsync

echo "installing Nodejs"
curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
apt-get install -y nodejs

echo "installing yarn"
npm install --global yarn

echo "copy backend code to ansible folder tree"
mkdir -p ansible/provisioning/roles/backend/files/opt/collect
rsync -a backend/ ansible/provisioning/roles/backend/files/opt/collect

echo "install backend dependencies"
cd ansible/provisioning/roles/backend/files/opt/collect
yarn install
cd ../../../../../../../

echo "copy frontend code to ansible folder tree"
mkdir -p ansible/provisioning/roles/frontend/files/collect
rsync -a collect-client/ ansible/provisioning/roles/frontend/files/collect

echo "install frontend dependencies"
cd ansible/provisioning/roles/frontend/files/collect/
yarn install

echo "build frontend"
yarn build
cd ../../../../../../

echo "run ansible playbook"
ansible-playbook \
    --connection=local, \
    --inventory 127.0.0.1, \
    --limit 127.0.0.1 \
    -i ./ansible/ansible_inv.yml ./ansible/provisioning/playbook.yml
