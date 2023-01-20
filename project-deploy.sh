sh project-install-deps.sh
sh project-build.sh
pm2 stop all
pm2 start
