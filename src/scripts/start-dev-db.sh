if [[ "$#" < 3 ]]; then
  echo "Error. Not enough arguments" >&2
  echo "Usage: start-dev-db.sh {{DB_NAME}} {{DB_PASWORD}} {{SERVER_NAME}} [[SERVER_PORT]]" >&2
  exit 1
elif [[ "$#" > 4 ]]; then
  echo "Error. Too many arguments" >&2
  echo "Usage: start-dev-db.sh {{DB_NAME}} {{DB_PASWORD}} {{SERVER_NAME}} [[SERVER_PORT]]" >&2
  exit 1
else
  echo "Arguments count correct. Processing..."
fi

regex='^[0-9]+$'

set -e

DB="$1";
PW="$2";
SERVER="$3";
PORT=$4;

if ! [[ $PORT =~ $regex ]]; then
  echo "Error: Port [$PORT] is not a valid port using default port 5432" >&2
  set -e PORT=5432;
fi

echo "echo stop & remove old docker [$SERVER] and starting new fresh instance of [$SERVER]"
(docker kill $SERVER || :) && \
  (docker rm $SERVER || :) && \
  docker run --name $SERVER -e POSTGRES_PASSWORD=$PW \
  -e PGPASSWORD=$PW \
  -p $4:5432 \
  -d postgres

# wait for pg to start
echo "sleep wait for pg-server [$SERVER] to start";
SLEEP 3;

# create the db 
echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres
echo "\l" | docker exec -i $SERVER psql -U postgres