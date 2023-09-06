#!/bin/bash

git pull

sh script-deps-install.sh
sh script-project-build.sh

pm2 stop all
pm2 start
