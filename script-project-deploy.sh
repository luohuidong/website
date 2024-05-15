#!/bin/bash

git pull

npm install
npm run build 

pm2 stop all
pm2 start
