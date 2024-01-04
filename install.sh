echo "> INSTALL ROOT"
yarn install

echo "> INSTALL LIBS"
yarn add @qbit-tech/libs-session
yarn add @qbit-tech/libs-authv3
yarn add @qbit-tech/libs-role

echo "> RUN MIGRATION"
./run_migration.sh mayora local

echo "==== Install End Successfully ===="