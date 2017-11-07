APP_HOME=$(echo `pwd` | sed 's/\/bin//')
SERVER_PATH=$APP_HOME/server
LOG_PATH=$APP_HOME/log
DIR_ARR=(${APP_HOME//// })
APP_NAME=${DIR_ARR[${#DIR_ARR[@]}-1]}

if [ $1 = "start" -o $1 = "restart" ] && [ $2 = "testing" -o $2 = "production" ];
then
  echo "Will" $1 "server with environment > " $2
else
  echo -e "\n \033[47;31m Usage: server.sh {start|restart} {testing|production} \033[0m \n"
  echo "This shell shall only be executed for these situation:"
  echo "1. First time to launch a server of project dev and built with vue-koa-boilerplate"
  echo "2. Force restart the server. Will delete the original application in PM2"
  exit -1
fi

cd $SERVER_PATH

case "$1" in
  start)
    echo "Luanching application server with PM2 for the first time..."
    sleep 1
    pm2 start pm2.json --env $2
    echo "Commands of PM2 are available now."
    ;;
  stop)
    echo "This shell is not built for stop appliation."
    echo "Please try pm2 stop" $APP_NAME
    ;;
  restart)
    echo "Force restating application..."
    echo "Stop and remove application from PM2"
    pm2 stop $APP_NAME
    sleep 1
    pm2 delete $APP_NAME
    sleep 1
    echo "Restarting application with PM2"
    pm2 start pm2.json --env $2
    echo "Commands of PM2 are available now."
    ;;
esac

exit 0
