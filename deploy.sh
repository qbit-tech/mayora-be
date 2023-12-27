#!/bin/bash
echo -n "Project: "
read PROJECT
echo -n "Mode (development | staging | production): "
read MODE

if [ -z "$PROJECT" ]
then
  echo "Project Not Found"
  exit
fi

if [ -z "$MODE" ]
then
  MODE="staging"
fi

if [ -f ./apps/$PROJECT/.env.$MODE ]
then
  # Load Environment Variables
  export $(cat ./apps/$PROJECT/.env.$MODE | grep -v '#' | awk '/=/ {print $1}')
  # For instance, will be example_kaggle_key
  SERVER=$IP_SERVER
fi

echo "===== Migrate DB Project ====="
cd apps/$PROJECT
ENV_PATH=.env.$MODE npx sequelize-cli db:migrate --env $MODE
cd ../..

echo "===== Build $PROJECT:$MODE =====" # ./deploy.sh cms staging
npx nest build $PROJECT
cd dist/apps/$PROJECT
rm $PROJECT-api-$MODE.tar.gz
cp ../../../yarn.lock .
cp ../../../package.json .
# && cp ../../../apps/$PROJECT/app.json .
tar -czvf $PROJECT-api-$MODE.tar.gz *

# if [[ "$MODE" != 'development' ]]; then
  echo "===== Upload Build to Server ====="
  scp $PROJECT-api-$MODE.tar.gz root@$SERVER:/var/www/html/apps/$PROJECT-api-$MODE/dist/apps/$PROJECT

  echo "===== Uploaded Successfully ====="
  rm $PROJECT-api-$MODE.tar.gz
  # cd ..

  # echo "===== WHAT'S NEXT ====="
  # echo "sudo ssh -i ~/.ssh/id_rsa root@$SERVER"
  # echo "cd /var/www/html/apps/$PROJECT-api-$MODE && tar -xzvf $PROJECT-api-$MODE.tar.gz"
  # echo "yarn install"
  # echo "pm2 restart $PROJECT-api-$MODE && pm2 log $PROJECT-api-$MODE"

  echo "===== RUN COMMAND IN SERVER ====="
ssh root@$SERVER PROJECT=$PROJECT MODE=$MODE 'bash -s' <<-'ENDSSH'
  echo "== Copy env file ==";
  cp /env/.env.$PROJECT-api-$MODE /var/www/html/apps/$PROJECT-api-$MODE/dist/apps/$PROJECT/.env;
  echo "== Copy project & extract ==";
  cd /var/www/html/apps/$PROJECT-api-$MODE/dist/apps/$PROJECT && tar -xzvf $PROJECT-api-$MODE.tar.gz;
  echo "== yarn install ==";
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh";
  yarn install;
  pm2 delete $PROJECT-api-$MODE;
  pm2 start;
ENDSSH

# fi


# BACK TO ROOT
cd ../../..

# SEND TELEGRAM NOTIFICATION
TELEGRAM_BOT_TOKEN=$(jq -r '.TELEGRAM_BOT_TOKEN' ./notif.json)
CHAT_ID=$(jq -r '.CHAT_ID' ./notif.json)
VERSION=$(jq -r '.version' ./apps/$PROJECT/app.json)

# echo $TELEGRAM_BOT_TOKEN;
# echo $CHAT_ID;
echo $VERSION;

read -r -d '' jsonPayload << _EOM_
  {
    "chat_id": "$CHAT_ID",
    "text": "$PROJECT BACKEND $MODE v$VERSION has been deployed manually"
  }
_EOM_

curl -X POST \
     -H "Content-Type: application/json" \
     -d "$jsonPayload"   \
     https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage
