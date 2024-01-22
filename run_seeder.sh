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

echo "--- Seeding: Started ---"

echo -ne '\n'
echo "=== SEEDING DB Project ==="
cd apps/$PROJECT
ENV_PATH=.env.$MODE npx sequelize-cli db:seed --seed 20240121111914-seeder-category-2.js --env $MODE
cd ../..

echo -ne '\n'
echo "--- Seeding: Finished ---"