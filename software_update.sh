#!/bin/bash
sudo launchctl stop com.RFB.launchServer

cd "$HOME/github/rfb2-client-app"
git pull
npm install
npm run build

cd "$HOME/github/rfb2-server"
git pull
npm install

npm run migration

sudo launchctl start  com.RFB.launchServer
