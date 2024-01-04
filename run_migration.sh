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
echo "=== MIGRATE DB @qbit-tech/libs-authv3 ==="
cd ./node_modules/@qbit-tech/libs-authv3/dist
ENV_PATH=../../../../apps/$PROJECT/.env.$MODE npx sequelize-cli db:migrate --env $MODE
cd ../../../..

echo -ne '\n'
echo "=== MIGRATE DB @qbit-tech/libs-role ==="
cd ./node_modules/@qbit-tech/libs-role/dist
ENV_PATH=../../../../apps/$PROJECT/.env.$MODE npx sequelize-cli db:migrate --env $MODE
cd ../../../..


echo -ne '\n'
echo "--- Migration: Finished ---"