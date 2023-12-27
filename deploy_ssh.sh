ssh root@159.223.45.20 DB_HOST="ABC" 'bash -s' <<-'ENDSSH'
  #commands to run on remote host
  echo $DB_HOST;
  touch example;
  echo DB_HOST="$DB_HOST" >> example;
  cat example;
ENDSSH