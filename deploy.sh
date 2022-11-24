gcloud run deploy simple-api-cloudrun-mysql --image gcr.io/nani-food-dev/simple-api-cloudrun-mysql \
  --add-cloudsql-instances nani-food-dev:us-central1:db-nani-food-dev \
  --set-env-vars INSTANCE_UNIX_SOCKET="/cloudsql/nani-food-dev:us-central1:db-nani-food-dev" \
  --set-env-vars INSTANCE_CONNECTION_NAME="nani-food-dev:us-central1:db-nani-food-dev" \
  --set-env-vars DB_NAME="db-nani-food-dev" \
  --set-env-vars DB_USER="nani-user-db" \
  --set-env-vars DB_PASS="1aq2sw3de"