#!/bin/bash

if [ -z "$1" ]
then
  echo -n "Project: "
  read PROJECT
else
  echo "Project: $1"
  PROJECT="$1"
fi

if [ -z "$2" ]
then
  echo -n "Mode (local | development | staging | production): "
  read MODE
else
  echo "Mode: $2"
  MODE="$2"
fi


if [ -z "$PROJECT" ]
then
  echo "Project Not Found"
  exit
fi

if [ -z "$MODE" ]
then
  MODE="local"
fi

echo "--- Migration: Started ---"

echo -ne '\n'
echo "=== MIGRATE DB Project ==="
cd apps/$PROJECT
ENV_PATH=.env.$MODE npx sequelize-cli db:migrate --env $MODE
cd ../..

echo -ne '\n'
echo "=== MIGRATE DB @qbit-tech/libs-notification ==="
cd ./node_modules/@qbit-tech/libs-notification/dist
ENV_PATH=../../../../apps/$PROJECT/.env.$MODE npx sequelize-cli db:migrate --env $MODE
cd ../../../..

echo -ne '\n'
echo "=== MIGRATE DB @qbit-tech/libs-notification-scheduler ==="
cd ./node_modules/@qbit-tech/libs-notification-scheduler/dist
ENV_PATH=../../../../apps/$PROJECT/.env.$MODE npx sequelize-cli db:migrate --env $MODE
cd ../../../..


echo -ne '\n'
echo "--- Migration: Finished ---"