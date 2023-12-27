MAYORA-BE

## TABLE OF CONTENT
- [Requirements](#requirementss)
- [Prepare](#prepare)
- [Folder Structure](#folder-structure)
- [First Time Setup](#first-time-setup)
- [How to Run Migration](#how-to-run-migration)
- - How to Run Migration Automatically
- - How to Run Migration Manually
- [How to Run App (Mac Only)](#how-to-run-app-mac-only)
- [How to Run App (Windows)](#how-to-run-app-windows)
- [How to Generate & Run Migration](#how-to-generate-run-migration)

## Requirements
- Use yarn
- NodeJS v16
- Database PostgreSQL

## Prepare
1. Create file .npmrc
```
registry=https://registry.npmjs.org/
@qbit-tech:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=GITHUB_TOKEN
```
*Notes: Replace GITHUB_TOKEN with your token (Generate here -> https://github.com/settings/tokens). Permission: read:packages, write:packages, and delete:packages*

## FOLDER STRUCTURE
- apps/`[project-name]`
- libs/`[library-name]`

## FIRST TIME SETUP
- Install redis-server
- - Ubuntu: https://redis.io/docs/getting-started/installation/install-redis-on-linux/
- - Mac OS: https://redis.io/docs/getting-started/installation/install-redis-on-mac-os/
- - Windows
- Install PostgreSQL: https://www.postgresql.org/download/
- Create account for your PostgreSQL `(please take note your account, you will need this in the next step)`
- Install PgAdmin: https://www.pgadmin.org/download/
- cd apps/[project-name]
- Copy file `.env.example` to new files (`.env` and `.env.development`)
- Adjust this line in your `.env` and `.env.development`
```
DB_USER=[your_username]
DB_PASS=[your_password]
DB_NAME=[your_database_name]
```

-----
----- YOU ARE READY -----
-----

## HOW TO RUN MIGRATION
### - AUTOMATICALLY (MAC ONLY)
This script will run migration automatically
- Run command `./run_migration.sh mayora local`

### - MANUALLY
#### Before Running App, Run Migration First From Local `(if there is new migration file)`
- cd apps/[project]
- ENV_PATH=.env.[mode] npx sequelize-cli db:migrate --env [mode]
- cd ../..

## HOW TO RUN APP
### - HOW TO RUN APP (MAC ONLY)
- before start, run `redis-server`
- yarn start:[project]-[dev|staging|prod]
- If you want to see documentation, see http://localhost:3000

Example: `yarn start:oxone-dev` or `yarn start:mayora-dev`

### - HOW TO RUN APP (WINDOWS)
For Windows: `npx nest start [folder] --watch`
For Windows: https://dev.to/divshekhar/how-to-install-redis-on-windows-10-3e99
For Windows: to run redis-server: `redis-server --port 6380 --slaveof 127.0.0.1 6379`

-----

## HOW TO GENERATE & RUN MIGRATION
#### Generate New Migration
- cd apps/[project]
- npx sequelize migration:generate --name [migration_name]
- write some code in new created file
- cd ../..

### RUN MIGRATION DATABASE
- cd apps/[project]
- ENV_PATH=.env.[mode] npx sequelize-cli db:migrate --env [mode]
- cd ../..

-----

## SETUP SERVER
- Install mysql/postgresql
- Install nginx
- Setup nginx
```
server {
        listen 80;
        listen [::]:80;

        root /var/www/html;

        # Add index.php to the list if you are using PHP
        index index.html index.htm index.nginx-debian.html;

        server_name [DOMAIN];

        location / {
                proxy_pass http://localhost:[PORT];
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
}
```

```
server {
        listen 80;
        listen [::]:80;

        root /var/www/html/apps/[project]-[platform];

        # Add index.php to the list if you are using PHP
        index index.html index.htm index.nginx-debian.html;

        server_name [DOMAIN];

        location / {
                try_files $uri $uri/ /index.html;
        }
}
```
- Setup lets encrypt: https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04

-----

### HOW TO CREATE SYMLINK
- cd /etc/nginx/sites-enabled
- ln -s ../sites-available/spoonful-api-production spoonful-api-production

-----

## HOW TO INIT PROJECT IN SERVER
- ./init.sh
- - fill project with your project (folder) name. e.g `mayora`
- - fill mode with your current stage. e.g `development`

## HOW TO DEPLOY
``
platform: `api | cms | web`
``
## HOW TO DEPLOY MANUALLY
### Build Locally
- npx nest build [project]
- cd dist/apps/[project]/ && cp ../../../yarn.lock . && cp ../../../package.json .
- tar -czvf [project]-[platform].tar.gz .

### Create folder for projects in Server `first time only`
- sudo ssh -i ~/.ssh/id_rsa root@[server]
- cd /var/www/html/apps/ && mkdir [project]-[platform]

### Upload File to Server
- scp [project]-[platform].tar.gz root@[server]:/var/www/html/apps/[project]-[platform]

### Setup File in Server
- sudo ssh -i ~/.ssh/id_rsa root@[server]
- cd /var/www/html/apps/[project]-[platform] && tar -xzvf [project]-[platform].tar.gz
- yarn install
- pm2 init simple `(first time only)`

```
module.exports = {
  apps : [{
    name   : "[project]-api-[mode]",
    script : "./main.js",
    watch: true,
    exp_backoff_restart_delay: 100
  }]
}
```

- nano .env and write something `(first time only)`

If first time:
- pm2 start && pm2 log `(first time only)`

If you have uploaded file and want to restart:
- pm2 status
- find service name
- pm2 restart [service] && pm2 log [service] (to restart)

-----

# ADDITIONAL SETUP
## HOW TO ALLOW REMOTE ACCESS (POSTGRESQL)
### Find Config File
- su - postgres
- psql
- SHOW config_file;
- SHOW hba_file;

### Allow Remote Access
Change this part:
- listen_addresses = '*'
- host    all             all              0.0.0.0/0                       md5

### Create New Database
- CREATE DATABASE sales
- CREATE DATABASE sales OWNER salesapp 

### Create New User
- su - postgres
- create user user_name with encrypted password 'mypassword';
- GRANT ALL PRIVILEGES ON DATABASE sample_db TO user_name;

### Grant Access as Superuser
- su - postgres
- psql
- ALTER USER myuser WITH SUPERUSER;

## HOW TO ALLOW REMOTE ACCESS (MYSQL)
### Create Special Access for Remote
- CREATE USER 'username'@'%' IDENTIFIED BY 'password';
- GRANT ALL PRIVILEGES ON *.* TO 'username'@'%' WITH GRANT OPTION;
- FLUSH PRIVILEGES;

### Allow Remote Access
- sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
- Change and save this >> bind-address = 0.0.0.0 `or` bind-address = ‘*’
- sudo systemctl restart mysql

## HOW TO TEST


## HOW TO SETUP LET'S ENCRYPT
https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04

-----

## HOW TO CREATE TAG
Creating tags from the command line. To create a tag on your current branch, run this:

- git tag <tagname>

If you want to include a description with your tag, add -a to create an annotated tag:

- git tag <tagname> -a

This will create a local tag with the current state of the branch you are on. When pushing to your remote repo, tags are NOT included by default. You will need to explicitly say that you want to push your tags to your remote repo:

- git push origin --tags

# COMMON ISSUES
#### If you found this error:
```SequelizeConnectionError: no pg_hba.conf entry for host "xx.xxx.xxx.xxx", user "your-admin-database-username", database "your-database-name", no encryption```

#### How to Solve 
```
dialectOptions: {
      ...(process.env.DB_SSL === 'true'
        ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
        : {}),
      pool: {
        min: parseInt(process.env.POOL_MIN || '0'),
        max: parseInt(process.env.POOL_MAX || '10'),
        acquire: parseInt(process.env.POOL_ACQUIRE || '10'),
        idle: parseInt(process.env.POOL_IDLE || '5'),
      },
    },
```

### HOW TO SEE PM2 LOGS
- Login to your server
- cd /root/.pm2/logs/[project]-api-[mode]-out.log
- cd /root/.pm2/logs/[project]-api-[mode]-error.log